import makeWaSocket, { Browsers, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, DisconnectReason, jidDecode } from '@whiskeysockets/baileys';
import { useSQLiteAuthState } from '../../core/SQLiteAuth.js';
import events from '../events.js';
import qrcode from "qrcode";
import NodeCache from 'node-cache';
import main from '#main';
import chalk from 'chalk';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { smsg, patchGroupMetadata, getCachedMeta } from '#message';
import db from '#db';

if (!global.conns) global.conns = [];
let reintentos = {};
let commandFlags = {};
let cleanerStarted = false;
const cleanJid = (jid = '') => jid.replace(/:\d+/, '').split('@')[0];
const sessionsPath = path.resolve(process.cwd(), 'Sessions');
const premsPath = path.join(sessionsPath, 'Prems');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getClient(client) {
  const userId = client?.user?.id?.split(':')[0];
  if (!userId) return client;
  return global.conns?.find((c) => c?.user?.id?.split(':')[0] === userId) || client;
}

export function remove(sock) {
  if (!sock) return;
  try { sock.ev.removeAllListeners(); } catch {}
  try { sock.ws?.close(); } catch {}
  try { sock.end?.(new Error('replaced')); } catch {}
  try { sock.msgRetryCounterCache?.close(); } catch {}
}

const logger = pino({ level: "silent" });
const versionCache = { value: null, expiresAt: 0 };
async function getVersion() {
  if (versionCache.value && Date.now() < versionCache.expiresAt) return versionCache.value;
  try {
    const latest = await fetchLatestBaileysVersion();
    versionCache.value = latest.version;
    versionCache.expiresAt = Date.now() + 60 * 60 * 1000;
  } catch (e) {
    if (!versionCache.value) versionCache.value = [2, 3000, 1033105955];
  }
  return versionCache.value;
}

function normalizePhone(input) {
  let s = String(input).replace(/\D/g, '');
  if (!s) return '';
  if (s.startsWith('0')) s = s.replace(/^0+/, '');
  if (s.length === 10 && s.startsWith('3')) s = '57' + s;
  if (s.startsWith('52') && !s.startsWith('521') && s.length >= 12) s = '521' + s.slice(2);
  if (s.startsWith('54') && !s.startsWith('549') && s.length >= 11) s = '549' + s.slice(2);
  return s;
}

export async function cleanExpiredPremiums() {
  try {
    const now = Date.now()
    const tokens = db.getToken() || []

    for (const token of tokens) {
      if (!token?.expires_at || now < token.expires_at) continue

      const active = token.active_user
      if (!active) {
        db.stmt('DELETE FROM tokens WHERE token = ?').run(token.token)
        continue
      }

      const number = active.split('@')[0]

      const conn = global.conns?.find(
        (c) => c.userId === number
      )

      if (conn) {
        try {
          await conn.logout()
          if (conn.ws) conn.ws.close()
        } catch {}
      }

      const sessionPath = `./Sessions/Prems/${number}/creds.db`

      if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { force: true })
      }

      if (global.conns) {
        global.conns = global.conns.filter(
          (c) => c.userId !== number
        )
      }
        
      if (typeof reintentos !== 'undefined') {
        delete reintentos[number]
      }
      
      db.stmt('DELETE FROM tokens WHERE token = ?').run(token.token)

      console.log(
        chalk.gray(`[ ✿ ] Premium expirado cerrado: ${number}`)
      )
    }
  } catch (e) {
    console.log(chalk.gray(`[ ✿ ] Error limpiando premiums: ${e.message}`))
  }
}

export async function startPremBot(msg, client, caption = '', isCode = false, phone = '', chatId = '', isCommand = false) {
  let cleanerTimer;
  if(!cleanerStarted){
    cleanerStarted=true
    cleanerTimer=setInterval(cleanExpiredPremiums,60000)
  }
  const id = normalizePhone(phone || (msg?.sender || '').split('@')[0]);
  if (!id) throw new Error('No se pudo obtener el número del Sub-Bot.');
  ensureDir(premsPath);
  const sessionFolder = path.join(premsPath, id);
  ensureDir(sessionFolder)
  const session = path.join(sessionFolder, 'creds.db')
  const senderId = msg?.sender;
  const { state, saveCreds: saveCredsDB } = await useSQLiteAuthState(session);
  const version = await getVersion();
  let saveCredsTimer = null;
  const saveCreds = () => { clearTimeout(saveCredsTimer); saveCredsTimer = setTimeout(saveCredsDB, 2000); };
  const msgRetryCounterCache = new NodeCache({ stdTTL: 3600, checkperiod: 600, useClones: false });
  const msgStore = new Map();
  const msgLimit = 500;
  console.info = () => {};
  const socks = makeWaSocket({
    version,
    logger,
    printQRInTerminal: false,
    browser: Browsers.windows('Chrome'),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, logger) },
    markOnlineOnConnect: false,
    syncFullHistory: false,
    shouldSyncHistoryMessage: () => false,
    fireInitQueries: false,
    generateHighQualityLinkPreview: false,
    shouldIgnoreJid: (jid) => jid.endsWith('@broadcast'),
    keepAliveIntervalMs: 30000,
    connectTimeoutMs: 20000,
    transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
    emitOwnEvents: false,
    msgRetryCounterCache,
    cachedGroupMetadata: async (jid) => getCachedMeta(jid) ?? undefined,
    getMessage: async (key) => msgStore.get(key.remoteJid + ':' + key.id),
  });
  patchGroupMetadata(socks);
  socks.msgRetryCounterCache = msgRetryCounterCache;
  socks.isCommand = isCommand;
  socks.senderId = senderId;
  socks.chatId = chatId;
  socks.client = client;
  socks.isCode = isCode;
  socks.sessionFolder = sessionFolder;
  socks.ev.on('creds.update', saveCreds);
  socks.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      const decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + '@' + decode.server) || jid;
    }
    return jid;
  };
  let bootTime = Date.now();
  let botReady = false;
  socks.ev.on('messages.upsert', async ({ messages, type }) => {
    if (!botReady) return;
    if (type !== 'notify') return;
    for (const raw of messages) {
      if (raw?.message && raw?.key?.id) {
        const sid = raw.key.remoteJid + ':' + raw.key.id;
        msgStore.set(sid, raw.message);
        if (msgStore.size > msgLimit) msgStore.delete(msgStore.keys().next().value);
      }
      try {
        if (!raw?.message || raw.key?.remoteJid === 'status@broadcast') continue;
        if ((raw.messageTimestamp * 1000) < bootTime - 15_000) continue;
        if (raw.message.ephemeralMessage) raw.message = raw.message.ephemeralMessage.message;
        const m = await smsg(socks, raw);
        if (typeof main === 'function') main(socks, m, messages).catch((err) => console.error('[ ✿  ]  Main Sub »', err?.message || err));
      } catch (e) { console.log(e); }
    }
  });
  try { await events(socks, msg); } catch (err) { console.log(chalk.gray(`[ EVENT ERROR  ]  → ${err}`)); }
  socks.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
    if (connection === 'open') {
      bootTime = Date.now();
      botReady = true;
      socks.uptime = Date.now();
      socks.userId = cleanJid(socks.user?.id?.split('@')[0]);
      const botDir = socks.userId + '@s.whatsapp.net';
      const settings = db.getSettings(botDir);
      settings.type = 'Prem';
      db.setSettings(botDir, 'type', settings.type);
      db.setSettings(botDir, 'botprem', 1)
      const conss = global.conns.findIndex((c) => c.userId === socks.userId);
      if (conss !== -1) { global.conns[conss] = socks; } else { global.conns.push(socks); }
      delete reintentos[socks.userId || id];
      console.log(chalk.gray(`[ ✿  ]  PREM-BOT conectado: ${socks.userId}`));
      const sentFlagFile = path.join(socks.sessionFolder, 'msg_sent.flag');
      const hasSentMessage = fs.existsSync(sentFlagFile);
      if (msg && socks.isCommand && !hasSentMessage && socks.client && socks.chatId) {
        await socks.client.sendMessage(chatId, { text: `✿ Has registrado un nuevo bot premium! [@${socks.userId}]\n> Puedes ver la informacion con el comando *#infobot*.`, mentions: [`${socks.userId + '@s.whatsapp.net'}`] }, { quoted: msg });
        fs.writeFileSync(sentFlagFile, '1');
        socks.isCommand = false;
        if (commandFlags[socks.senderId]) delete commandFlags[socks.senderId];
      }
    }
    if (connection === 'close') {
      const botId = socks.userId || id;
      const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.reason || 0;
      remove(socks);
      const intentos = reintentos[botId] || 0;
      reintentos[botId] = intentos + 1;
      if ([401, 403].includes(reason)) {
        if (intentos < 5) {
          console.log(chalk.gray(`[ ✿  ]  PREM-BOT ${botId} Conexión cerrada (código ${reason}) intento ${intentos}/5 → Reintentando...`));
          setTimeout(() => startPremBot(msg, getClient(client), caption, isCode, phone, chatId, isCommand), 4000);
        } else {
          console.log(chalk.gray(`[ ✿  ]  PREM-BOT ${botId} Falló tras 5 intentos. Eliminando sesión.`));
          try { fs.rmSync(sessionFolder, { recursive: true, force: true }); } catch (e) { console.error(`[ ✿  ] No se pudo eliminar ${sessionFolder}:`, e); }
          delete reintentos[botId];
        }
        return;
      }
      if ([DisconnectReason.connectionClosed, DisconnectReason.connectionLost, DisconnectReason.timedOut, DisconnectReason.connectionReplaced].includes(reason)) {
        setTimeout(() => startPremBot(msg, getClient(client), caption, isCode, phone, chatId, isCommand), 4000);
        return;
      }
      setTimeout(() => startPremBot(msg, getClient(client), caption, isCode, phone, chatId, isCommand), 4000);
    }
    if (qr && isCode && phone && socks.client && chatId && senderId && commandFlags[senderId]) {
      try {
        let codeGen = await socks.requestPairingCode(phone, "KAEDPREM");
        codeGen = codeGen.match(/.{1,4}/g)?.join('-') || codeGen;
        const sentMsg = await socks.client.sendMessage(chatId, { text: caption }, { quoted: msg });
        const msgCode = await socks.client.sendMessage(chatId, { text: codeGen }, { quoted: msg });
        delete commandFlags[senderId];
        setTimeout(async () => {
          try { await socks.client.sendMessage(chatId, { delete: sentMsg.key }); } catch {}
          try { await socks.client.sendMessage(chatId, { delete: msgCode.key }); } catch {}
        }, 60000);
      } catch (err) { console.error('[Código Error]', err); }
    }
    if (qr && !isCode && socks.client && chatId && senderId && commandFlags[senderId]) {
      try {
        const msgQR = await socks.client.sendMessage(chatId, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption }, { quoted: msg });
        delete commandFlags[senderId];
        setTimeout(async () => { try { await socks.client.sendMessage(chatId, { delete: msgQR.key }); } catch {} }, 60000);
      } catch (err) { console.error('[QR Error]', err); }
    }
  });
  return socks;
}

function msToTime(ms) {
  const totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0
    ? `${minutes} minuto${minutes !== 1 ? 's' : ''} y ${seconds} segundo${seconds !== 1 ? 's' : ''}`
    : `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
}

if (!global.commandFlags) global.commandFlags = {}

export default {
  command: ['qrpremium', 'codepremium'],
  category: 'socket',
  run: async ({ sock, msg, args, command, usedPrefix }) => {
    const token = args[0]

    if (!token) {
      return msg.reply(
        `「✿」Si ya tienes un token premium, puedes registrar un *Bot* de tipo *Premium* usando los comandos:\n\n` +
        `*✎ ${usedPrefix}qrpremium [Token]*\n` +
        `*✎ ${usedPrefix}codepremium [Token]*`
      )
    }

    if (token.length !== 8) {
      return msg.reply(
        '《✧》 El token proporcionado no es válido.\n' +
        '> ✎ Un token válido debe tener una longitud de 8 caracteres.'
      )
    }

    const tokenData = db.getToken(token)
    const now = Date.now()

    if (!tokenData) {
      return msg.reply(
        `《✧》 El token \`${token}\` no se encuentra registrado.`
      )
    }

    if (tokenData.expires_at < now) {
      return msg.reply('《✧》 Este token ha expirado.')
    }

    const sender = msg.sender
    const phone = normalizePhone(sender.split('@')[0]);

    const activeUser = tokenData.active_user
    const activeNumber = activeUser?.split('@')[0]
    const isSameUser = activeUser === sender

    const liveConn = global.conns?.find(
      c => c.userId === activeNumber
    )

    const hasActiveSession = !!liveConn

    if (activeUser) {
      if (hasActiveSession && !isSameUser) {
        return sock.sendMessage(
          msg.chat,
          {
            text:
              `《✧》 Ya existe un bot registrado con ese token: @${activeNumber}.\n` +
              `> Si crees que esto es un error o te han robado el token, puedes contactar con un moderador en el grupo oficial. (https://dix.lat/s/nr6wd)`,
            mentions: [activeUser],
          },
          { quoted: msg }
        )
      }

      if (!hasActiveSession && !isSameUser) {
        tokenData.active_user = sender
        db.setToken(token, tokenData)
      }
    } else {
      tokenData.active_user = sender
      db.setToken(token, tokenData)
    }
    commandFlags[msg.sender] = true  
    const qrText =
`✿ *Vincula el Socket Premium usando QR.*

✎ Más opciones › Dispositivos vinculados › Vincular un nuevo dispositivo › Escanea el código QR.

_Se recomienda no usar tu cuenta principal._
↺ El código es válido por 60 segundos.`

    const codeText =
`✿ *Vincula el Socket Premium usando código.*

✎ Más opciones › Dispositivos vinculados › Vincular con número › Introduce el código de 8 dígitos.

_Se recomienda no usar tu cuenta principal._
↺ El código es válido por 60 segundos.`

    const body = msg.body || msg.text || ''
    const prefix = body.charAt(0)
    const commandUsed = body
      .slice(prefix.length)
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase()

    const isCode = /^(codepremium)$/.test(command);
    const isCommand = /^(codepremium|qrpremium)$/.test(command);
    const caption = isCode ? codeText : qrText;
    await startPremBot(msg, sock, caption, isCode, phone, msg.chat, isCommand);
  },
}