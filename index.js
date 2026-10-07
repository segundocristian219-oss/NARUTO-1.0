import "./settings.js";
import main from './main.js';
import events from './commands/events.js';
import { Browsers, makeWASocket, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, jidDecode, DisconnectReason } from "@whiskeysockets/baileys";
import cfonts from 'cfonts';
import pino from "pino";
import qrcode from "qrcode-terminal";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import readlineSync from "readline-sync";
import os from "os";
import { smsg, getCachedMeta, setCachedMeta, deleteCachedMeta, patchGroupMetadata } from "#message";
import db from "#db";
import cmdsLoader from './core/system/commandLoader.js';
import { startSubBot } from './commands/socket/subbot.js';
import { exec } from "child_process";
import { useSQLiteAuthState } from "#core/SQLiteAuth";
import NodeCache from 'node-cache';

const log = {
  info: (msg) => console.log(chalk.bgBlue.white.bold(`INFO`), chalk.white(msg)),
  success: (msg) => console.log(chalk.bgGreen.white.bold(`SUCCESS`), chalk.greenBright(msg)),
  warn: (msg) => console.log(chalk.bgYellowBright.blueBright.bold(`WARNING`), chalk.yellow(msg)),
  warning: (msg) => console.log(chalk.bgYellowBright.red.bold(`WARNING`), chalk.yellow(msg)),
  error: (msg) => console.log(chalk.bgRed.white.bold(`ERROR`), chalk.redBright(msg))
};

const maxCache = 100;
const msgLimit = 500;
let phoneNumber = global.botNumber || "";
let phoneInput = "";
const methodCodeQR = process.argv.includes("--qr");
const methodCode = process.argv.includes("code");
const DIGITS = (s = "") => String(s).replace(/\D/g, "");

function normalizePhoneForPairing(input) {
  let s = DIGITS(input);
  if (!s) return "";
  if (s.startsWith("0")) s = s.replace(/^0+/, "");
  if (s.length === 10 && s.startsWith("3")) s = "57" + s;
  if (s.startsWith("52") && !s.startsWith("521") && s.length >= 12) s = "521" + s.slice(2);
  if (s.startsWith("54") && !s.startsWith("549") && s.length >= 11) s = "549" + s.slice(2);
  return s;
}

const { say } = cfonts
console.log(chalk.magentaBright('\n❀ Iniciando...'))
  say('Kaede Bot', {
  align: 'center',          
  gradient: ['red', 'blue'] 
})
  say('Made with love by Santiago', {
  font: 'console',
  align: 'center',
  gradient: ['blue', 'magenta']
})

const botTypes = [
  { name: 'SubBot', folder: './Sessions/Subs', starter: startSubBot }
];

if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp', { recursive: true });
global.conns = global.conns || [];
const reconnecting = new Set();
const msgStore = new Map();

async function loadBots() {
  for (const { name, folder, starter } of botTypes) {
    if (!fs.existsSync(folder)) continue;
    const botIds = fs.readdirSync(folder);
    for (const file of botIds) {
      let userId;
      let sessionPath;
      if (file.endsWith('.db')) {
        userId = file.replace('.db', '');
        sessionPath = path.join(folder, file);
      } else {
        userId = file;
        sessionPath = path.join(folder, userId);
        const credsPath = path.join(sessionPath, 'creds.db');
        if (!fs.existsSync(credsPath)) continue;
        sessionPath = credsPath;
      }
      if (global.conns.some((conn) => conn.userId === userId)) continue;
      if (reconnecting.has(userId)) continue;
      try {
        reconnecting.add(userId);
        await starter(null, null, 'Auto reconexión', false, userId, sessionPath);
      } catch (e) {
        console.log(chalk.gray(`[ loadBots ] Error iniciando ${name} ${userId}: ${e?.message || e}`));
      } finally {
        reconnecting.delete(userId);
      }
      await new Promise((res) => setTimeout(res, 2500));
    }
  }
  setTimeout(loadBots, 60 * 1000);
}

async function initDB() {
  db.initDB();
  db.clearDB();
  global.db = db;
  console.log('[ ✿ ] Base de datos cargada correctamente')
}

function cleanCache() {
  try {
    const tmpFolder = './tmp';
    if (fs.existsSync(tmpFolder)) {
      const files = fs.readdirSync(tmpFolder);
      let cleaned = 0;
      for (const file of files) {
        try { fs.unlinkSync(path.join(tmpFolder, file)); cleaned++; } catch {}
      }
      if (cleaned > 0) console.log(chalk.gray(`[ 🜸 ] Cache tmp: ${cleaned} archivos eliminados`));
    }
  } catch (e) {
    console.error(chalk.red('Error en cleanCache: '), e);
  }
}

let opcion;
if (methodCodeQR) {
  opcion = "1";
} else if (methodCode) {
  opcion = "2";
} else if (!fs.existsSync("./Sessions/Owner/creds.db")) {
  opcion = readlineSync.question(chalk.bold.white("\nSeleccione una opción:\n") + chalk.blueBright("1. Con código QR\n") + chalk.cyan("2. Con código de texto de 8 dígitos\n--> "));
  while (!/^[1-2]$/.test(opcion)) {
    console.log(chalk.bold.redBright(`No se permiten numeros que no sean 1 o 2, tampoco letras o símbolos especiales.`));
    opcion = readlineSync.question("--> ");
  }
  if (opcion === "2") {
    console.log(chalk.bold.redBright(`\nPor favor, Ingrese el número de WhatsApp.\n${chalk.bold.yellowBright("Ejemplo: +57301******")}\n${chalk.bold.magentaBright('---> ')}`));
    phoneInput = readlineSync.question("");
    phoneNumber = normalizePhoneForPairing(phoneInput);
  }
}

let reconexion = 0;
const intentos = 15;
let botReady = false;
let isRestarting = false;
const retriesLimit = 15;
let bootTime = Date.now();
function remove(sock) {
    if (!sock) return;
    try { sock.ev.removeAllListeners(); } catch {};
    try { sock.ws?.close(); } catch {};
    try { sock.end?.(new Error('replaced')); } catch {};
    try { sock.msgRetryCounterCache?.close(); } catch {};
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

async function warmupGroups(client) {
  try {
    const allChats = db.getChat();
    const chatIds = allChats.map(c => c.id).filter(id => typeof id === 'string' && id.endsWith('@g.us')).slice(0, 50);
    if (!chatIds.length) return;
    console.log(chalk.gray(`[ ✿ ] Precargando metadata de ${chatIds.length} grupos...`));
    const t = Date.now();
    const batches = [];
    for (let i = 0; i < chatIds.length; i += 10) {
      batches.push(chatIds.slice(i, i + 10));
    }
    await Promise.allSettled(batches.map(batch => Promise.allSettled(batch.map(async id => {
      try {
        const meta = await client.groupMetadata(id);
        if (meta) setCachedMeta(id, meta)
      } catch {}
    }))));
    console.log(chalk.gray(`[ ✿ ] Warmup completado en ${Date.now() - t}ms`));
  } catch (e) {
    console.log(chalk.gray(`[ ✿ ] warmupGroups → ${e?.message || e}`));
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

async function clearSession() {
  try {
    const sessionDir = './Sessions/Owner';
    if (!fs.existsSync(sessionDir)) return;
    for (const file of fs.readdirSync(sessionsDir)) {
      try { fs.unlinkSync(path.join(sessionDir, file)); } catch {}
    }
    log.warn('Session del principal eliminada - reiniciando para vincular de nuevo.');
  } catch (e) {
    log.error(`ClearSession: ${e?.message || e}`)
  }
}

async function startBot() {
  if (isRestarting) return;
  isRestarting = true;
  bootTime = Date.now();
  const sessionPath = "./Sessions/Owner";
  ensureDir(sessionPath)
  const { state, saveCreds: saveCredsDB } = await useSQLiteAuthState(sessionPath + '/creds.db');
  const version = await getVersion();
  let saveCredsTimer = null;
  const saveCreds = () => { clearTimeout(saveCredsTimer); saveCredsTimer = setTimeout(saveCredsDB, 2000); };
  const msgRetryCounterCache = new NodeCache({ stdTTL: 3600, checkperiod: 600, useClones: false });
  const sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: false,
    browser: ['Ubuntu', 'Chrome', '124.0.0.0'],
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, logger) },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: false,
    syncFullHistory: false,
    shouldSyncHistoryMessage: () => false,
    fireInitQueries: false,
    shouldIgnoreJid: (jid) => jid.endsWith('@broadcast'),
    getMessage: async (key) => msgStore.get(key.remoteJid + ':' + key.id),
    keepAliveIntervalMs: 30000,
    connectTimeoutMs: 20000,
    transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
    emitOwnEvents: false,
    msgRetryCounterCache,
    cachedGroupMetadata: async (jid) => getCachedMeta(jid) ?? undefined,
    maxIdleTimeMs: 60000,
  });

  global.sock = sock;
  patchGroupMetadata(sock);
  sock.msgRetryCounterCache = msgRetryCounterCache;
  sock.isInit = false;
  sock.ev.on("creds.update", saveCreds);

  if (opcion === "2" && !state.creds.registered) {
    setTimeout(async () => {
      try {
        if (!state.creds.registered && phoneNumber) {
          const pairing = await sock.requestPairingCode(phoneNumber);
          const codeBot = pairing?.match(/.{1,4}/g)?.join("-") || pairing;
          console.log(chalk.bold.white(chalk.bgMagenta(`Código de emparejamiento:`)), chalk.bold.white(codeBot));
        }
      } catch (err) {
        console.log(chalk.red("Error al generar código:"), err);
      }
    }, 3000);
  }

  sock.sendText = (jid, text, quoted = "", options) => sock.sendMessage(jid, { text, ...options }, { quoted });

  sock.ev.on("connection.update", async (update) => {
    const { qr, connection, lastDisconnect, isNewLogin, receivedPendingNotifications } = update;
    
    if (qr && (opcion == '1' || methodCodeQR)) {
      console.log(chalk.green.bold("[ ✿ ] Escanea este código QR"));
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
       remove(sock);
      const reason = lastDisconnect?.error?.output?.statusCode || 0;
      if (reason === DisconnectReason.loggedOut || reason === DisconnectReason.forbidden) {
        log.error("Error de sesión, reiniciando...");
        exec("rm -rf ./Sessions/Owner/*");
        process.exit(1);
      } else {
        reconexion++;
        if (reconexion > intentos) {
          log.error(`Demasiados reintentos (${intentos}). Sesion posiblemente corrupta, limpiando...`);
          clearSession()
          process.exit(1);
        }
        const delay = Math.min(3000 * reconexion, 30000);
      const reasonMessages = {
        [DisconnectReason.connectionLost]: "Se perdió la conexión al servidor, intentando reconectar...",
        [DisconnectReason.connectionClosed]: "Conexión cerrada, intentando reconectarse...",
        [DisconnectReason.restartRequired]: "Es necesario reiniciar...",
        [DisconnectReason.timedOut]: "Tiempo de conexión agotado, intentando reconectarse...",
        [DisconnectReason.badSession]: "Sesión inválida, limpiando y reconectando...",
      };
      log.warn(reasonMessages[reason] || `Desconexión (${reason}), reconectando en ${delay / 1000}s...`);
      isRestarting = false;
      setTimeout(startBot, delay);
      }
    }

    if (connection === "open") {
      bootTime = Date.now();
      reconexion = 0;
      isRestarting = false;
      const userName = sock.user?.name || "Desconocido";
      log.success(`[ ✿ ] Conectado exitosamente a: ${userName}`);
      if (!botReady) {
          botReady = true;
          warmupGroups(sock);
      }
    }

    if (receivedPendingNotifications === true) {
      sock.ev.flush();
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (!botReady) return;
      if (type !== 'notify') return;
      for (const msg of messages) {
          if (msg?.message && msg?.key?.id) {
              const sid = msg.key.remoteJid + ':' + msg.key.id;
              msgStore.set(sid, msg.message);
              if (msgStore.size > msgLimit) msgStore.delete(msgStore.keys().next().value);
          }
          try {
              if (!msg?.message || msg.key?.remoteJid === "status@broadcast") continue;
              if ((msg.messageTimestamp * 1000) < bootTime - 15_000) continue;
              if (msg.message.ephemeralMessage) msg.message = msg.message.ephemeralMessage.message;
              const m = await smsg(sock, msg)
              if (typeof main === 'function') main(sock, m, messages).catch((err) => console.error('[ ✿ ] Main Owner:', err?.message));
          } catch (err) {
              console.error('Error:', err)
          }
      }
  });
  sock.ev.on("group-participants.update", ({ id }) => { deleteCachedMeta(id); });
  sock.ev.on("groups.update", (updates) => { for (const update of updates) deleteCachedMeta(update.id); });
  try {
    await events(sock, null);
  } catch (err) {
    console.log(chalk.gray(`[ BOT ] → ${err}`));
  }

  sock.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      const decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    }
    return jid;
  };
}

setInterval(cleanCache, 3 * 60 * 60 * 1000);
cleanCache();

(async () => {
  await initDB();
  await cmdsLoader();
  await startBot();
  await loadBots(); 
})();

function onUncaughtException(e) {
    log.error(`ERROR: ${e?.stack || e?.message || e}`)
}

function onUnhandledRejection(reason) {
    if (reason instanceof SyntaxError) {
        process.nextTick(() => { throw reason; });
        return;
    }
    log.error(`RECHAZO: ${reason?.stack || reason?.message || reason}`);
}
process.on('uncaughtException', onUncaughtException);
process.on('unhandledRejection', onUnhandledRejection);