import {
  Browsers,
  makeWASocket,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  jidDecode,
  DisconnectReason,
} from "@whiskeysockets/baileys";
import pino from "pino";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import express from 'express';
import { fileURLToPath } from 'url';
import NodeCache from 'node-cache';
import { startSubBot } from '../subs.js';
import { useSQLiteAuthState } from '../SQLiteAuth.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from '#db';
import controller from "./controller.js"
import { patchGroupMetadata, getCachedMeta } from '#message';

if (!global.conns) global.conns = [];
let reintentos = {};

const cleanJid = (jid = '') => jid.replace(/:\d+/, '').split('@')[0];

export default async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const app = express();
  const PORT = process.env.PORT || 5010;

  const DIGITS = (s = "") => String(s).replace(/\D/g, "");

  function normalizePhoneForPairing(input) {
    let s = DIGITS(input);
    if (!s) return "";
    if (s.startsWith("0")) s = s.replace(/^0+/, "");
    if (s.length === 10 && s.startsWith("3")) {
      s = "57" + s;
    }
    if (s.startsWith("52") && !s.startsWith("521") && s.length >= 12) {
      s = "521" + s.slice(2);
    }
    if (s.startsWith("54") && !s.startsWith("549") && s.length >= 11) {
      s = "549" + s.slice(2);
    }
    return s;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  app.use(express.json());
  app.use(express.static('public'));
  app.use(cors());
  app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
  }));
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.redirect('/home');
  });

  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
  });

  app.post('/api/check-owner', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ verified: false, message: 'Número no proporcionado' });

    try {
        const normalized = normalizePhoneForPairing(phone);
        const user = db.getUser(normalized) || null;

        if (user && user.name) {
            return res.json({
                verified: true,
                name: user.name,
                message: `Verificado: ${user.name}`
            });
        } else {
            return res.json({
                verified: false,
                message: 'No verificado'
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ verified: false, message: 'Error al verificar' });
    }
});

 function remove(sock, phone) {
    if (!sock) return;

    try { sock.ev.removeAllListeners(); } catch {}
    try { sock.ws?.close(); } catch {}
    try { sock.end?.(new Error('replaced')); } catch {}
    try { sock.msgRetryCounterCache?.close(); } catch {}

    if (phone && sockets.get(phone) === sock) {
        sockets.delete(phone);
    }

    const index = global.conns.indexOf(sock);
    if (index !== -1) {
        global.conns.splice(index, 1);
    }
}
    
  const sockets = new Map();
  const sessions = new Map();
  let typingTimer;
  const doneTypingInterval = 800;
  function handleOwnerInput() {
    clearTimeout(typingTimer);
    const ownerInput = document.getElementById('owner').value.trim();
    const statusLabel = document.getElementById('owner-status');

    if (!ownerInput) {
        statusLabel.innerText = "Estado: Sin verificar";
        statusLabel.className = "text-xs font-medium text-slate-500";
        return;
    }

    statusLabel.innerText = "Estado: Escribiendo...";
    statusLabel.className = "text-xs font-medium text-slate-400";

    typingTimer = setTimeout(() => {
        verificar(ownerInput);
    }, doneTypingInterval);
}

  async function verificar(phoneInput) {
    const statusLabel = document.getElementById('owner-status');
    statusLabel.innerText = "Estado: Verificando...";
    statusLabel.className = "text-xs font-medium text-yellow-400 animate-pulse";

    try {
        const response = await fetch('/api/check-owner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: phoneInput })
        });
        const data = await response.json();

        if (data.verified) {
            statusLabel.innerText = `Estado: Verificado (${data.name})`;
            statusLabel.className = "text-xs font-medium text-emerald-400 font-bold";
        } else {
            statusLabel.innerText = "Estado: No verificado";
            statusLabel.className = "text-xs font-medium text-red-400";
        }
    } catch (error) {
        statusLabel.innerText = "Estado: Error de conexión";
        statusLabel.className = "text-xs font-medium text-red-500";
    }
}

  const sessionsPath = path.resolve(process.cwd(), 'Sessions');
  const subsPath = path.join(sessionsPath, 'Subs');

  function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
    
    
   const logger = pino({ level: "silent"})
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

  async function startSocketIfNeeded(phone) {
    if (sockets.has(phone)) return sockets.get(phone);

    const pho = normalizePhoneForPairing(phone);
    const sessionFolder = path.join(subsPath, pho);
    ensureDir(sessionFolder);
    const session = path.join(sessionFolder, 'creds.db')
    const { state, saveCreds: saveCredsDB } = await useSQLiteAuthState(session);
    let saveCredsTimer = null;
    const saveCreds = () => {
        clearTimeout(saveCredsTimer); 
        saveCredsTimer = setTimeout(saveCredsDB, 2000); 
    };
    const msgRetryCounterCache = new NodeCache({ stdTTL: 3600, checkperiod: 600, useClones: false });
    const userDevicesCache = new NodeCache({ stdTTL: 3600, checkperiod: 600, useClones: false });
    console.info = () => {};
    const version = await getVersion();

    const s = makeWASocket({
        version,
        logger,
        printQRInTerminal: false,
        browser: Browsers.windows('Chrome'),
        auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, logger) },
        shouldIgnoreJid: (jid) => jid.endsWith('@broadcast'),
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: false,
        syncFullHistory: false,
        keepAliveIntervalMs: 30_000,
        msgRetryCounterCache,
        userDevicesCache,
        cachedGroupMetadata: async (jid) => getCachedMeta(jid) ?? undefined,
        getMessage: async () => '',
    });

    patchGroupMetadata(s);
    s.isInit = false
    s.msgRetryCounterCache = msgRetryCounterCache;
    s.ev.on('creds.update', saveCreds);
    s.decodeJid = (jid) => {
      if (!jid) return jid;
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (decode.user && decode.server && decode.user + '@' + decode.server) || jid;
      } else return jid;
    };

    s.ev.on('connection.update', async ({ connection, lastDisconnect, isNewLogin }) => {
      if (isNewLogin) s.isInit = false;

      if (connection === 'open') {
        s.isInit = true;
        s.uptime = Date.now();
        s.userId = cleanJid(s.user?.id?.split('@')[0]);

        if (!global.conns.find((c) => c.userId === s.userId)) {
          global.conns.push(s);
        }

        delete reintentos[s.userId || phone];
      }

      if (connection === 'close') {
        const botId = s.userId || phone;
        const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.reason || 0;
        remove(s, pho)
        const intentos = reintentos[botId] || 0;
        reintentos[botId] = intentos + 1;

        if ([401, 403].includes(reason)) {
          if (intentos < 5) {
            console.log(chalk.gray(`[ ✿ ] ${botId} Conexión cerrada (código ${reason}) intento ${intentos}/5 → Reintentando...`));
            setTimeout(() => {
              startSubBot(null, null, 'Auto reinicio', false, pho, null);
            }, 3000);
          } else {
            console.log(chalk.gray(`[ ✿ ] ${botId} Falló tras 5 intentos. Eliminando sesión.`));
            try {
              fs.rmSync(path.join(__dirname, '../../Sessions', 'Subs', pho), { recursive: true, force: true });
            } catch (e) {
              console.error(`[ ✿ ] No se pudo eliminar la carpeta`, e);
            }
            delete reintentos[botId];
          }
          return;
        }

        if ([DisconnectReason.connectionClosed, DisconnectReason.connectionLost, DisconnectReason.timedOut, DisconnectReason.connectionReplaced].includes(reason)) {
          setTimeout(() => {
            startSubBot(null, null, 'Auto reinicio', false, pho, null);
          }, 3000);
          return;
        }

        setTimeout(() => {
          startSubBot(null, null, 'Auto reinicio', false, pho, null);
        }, 3000);
      }
    });

    sockets.set(phone, s);
    return s;
  }

  async function getStatus(phone) {
    const normalizedPhone = normalizePhoneForPairing(phone);

    const credsPath = path.join(
        subsPath,
        normalizedPhone,
        'creds.db'
    );

    const exists = fs.existsSync(credsPath);

    return {
        connected: exists,
        number: exists ? normalizedPhone : ''
    };
}

  async function requestPairingCode(rawPhone) {
    const phoneDigits = normalizePhoneForPairing(rawPhone);
    if (!phoneDigits) throw new Error("Número inválido. Usa solo dígitos con código de país.");
    const s = await startSocketIfNeeded(phoneDigits);
    if (s.user) {
      const jid = s.user.id || "";
      const num = DIGITS(jid.split("@")[0]);
      const session = sessions.get(phoneDigits) || {};
      session.connectedNumber = num;
      session.detect = true;
      sessions.set(phoneDigits, session);
      return null;
    }
    await sleep(1500);
    const code = await s.requestPairingCode(phoneDigits, 'KAEDESUB');
    const pretty = String(code).match(/.{1,4}/g)?.join("-") || code;
    return pretty;
  }

  async function startPairing(rawPhone) {
    const phone = normalizePhoneForPairing(rawPhone);
    const st = await getStatus(phone);
    const numbot = st.number ? st.number + "@s.whatsapp.net" : "";
    if (!st.connected) {
      const code = await requestPairingCode(phone);
      return {
        ok: true,
        connected: false,
        code,
        message: `${code}`
      };
    }
    return {
      ok: true,
      connected: true,
      number: numbot,
      message: `✎ Conectado como ${numbot}`
    };
  }
    
  controller.on('start-pairing', async (data, callback) => {
  try {
    const { phone, label } = data;

    console.log(
      chalk.cyan(`[ WEB ] Solicitud de vinculación recibida: ${phone}`)
    );

    const result = await startPairing(phone);

    callback({
      ok: true,
      label,
      ...result
    });

  } catch (error) {
    console.error(
      chalk.red('[ WEB ] Error iniciando vinculación:'),
      error
    );

    callback({
      ok: false,
      message: error.message || 'Error desconocido'
    });
  }
});

  app.post('/api/verify-recaptcha', async (req, res) => {
    const { token, action } = req.body;
    if (!token || !action) {
      return res.status(400).json({ message: 'Token o acción no proporcionados.' });
    }

    const secretKey = '6Lc82_crAAAAAFboG6u-ZAS6itgGSsh38sbEJDiW';

    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secretKey}&response=${token}`
      });

      const data = await response.json();

      if (!data.success || data.action !== action || data.score < 0.5) {
        return res.status(400).json({ message: 'Verificación de reCAPTCHA fallida.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en la verificación de reCAPTCHA.' });
    }
  });

  app.post('/start-pairing', async (req, res) => {
    const { phone, label } = req.body;
    if (!phone) return res.status(400).json({ message: 'Número de teléfono no proporcionado' });

    const pho = normalizePhoneForPairing(phone);
    const now = Date.now();

    const botRecord = { 
      idDigits: pho, 
      jid: pho + "@s.whatsapp.net", 
      label: label || null, 
      status: 'pending', 
      createdAt: now, 
      updatedAt: now
    };

    try {
      const pairingResult = await startPairing(phone);
      if (pairingResult.connected) {
        return res.json({
          message: `✿ Haz registrado un nuevo Bot gratuito!`,
          connected: true,
          number: pairingResult.number
        });
      }
      res.json({ ok: true, id: botRecord.jid, code: pairingResult.code, status: pairingResult.status, bot: botRecord });
    } catch (error) {
      return res.status(500).json({ message: 'Error al conectar el bot.' });
    }
  });

  app.post('/edit-bot', async (req, res) => {
    const { phone, longName, shortName, canal, prefix, owner, banner, icon, currency, link } = req.body;
    if (!phone) return res.status(400).json({ message: 'Número de teléfono no proporcionado' });

    try {
      const phoneNormalized = normalizePhoneForPairing(phone);
      const idBot = phoneNormalized ? phoneNormalized + "@s.whatsapp.net" : phone.replace(/\D/g, '');
      
      const sockInstance = await startSocketIfNeeded(phoneNormalized);
      let channelId = '';
      let channelName = '';

      if (canal) {
        const channelUrl = canal.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1];
        if (channelUrl) {
          try {
            const info = await sockInstance.newsletterMetadata('invite', channelUrl);
            if (info) {
              channelId = info.id;
              channelName = info.thread_metadata?.name?.text;
            }
          } catch (err) {
            console.log('No se pudo obtener info del canal:', err);
          }
        }
      }

      const currentSettings = db.getSettings(idBot) || {};

      // Corrección de asignación a la base de datos
      const newSettings = {
        botname: longName || currentSettings.botname || 'Columbina',
        namebot: shortName || currentSettings.namebot || 'Columbina',
        banner: banner || currentSettings.banner || '',
        icon: icon || currentSettings.icon || '',
        currency: currency || currentSettings.currency || 'Coins',
        prefix: prefix || currentSettings.prefix || '.',
        owner: owner || currentSettings.owner || '',
        self: currentSettings.self || false,
        newsletter_id: channelId || currentSettings.newsletter_id || '', 
        nameid: channelName || currentSettings.nameid || '',
        type: 'Sub',
        link: link || currentSettings.link || ''
      };

      if (typeof db.setSettings === 'function') {
        db.setSettings(idBot, newSettings);
      } else {
        db.getSettings(idBot) = newSettings;
      }

      res.json({ message: 'Configuración creada y actualizada.' });
    } catch (e) {
      res.status(500).json({ message: `Fail :: [${e.message}]` });
    }
  });

  app.post('/ver-configs', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Número de teléfono no proporcionado' });
    try {
      const phoneNormalized = normalizePhoneForPairing(phone);
      const idBot = phoneNormalized ? phoneNormalized + "@s.whatsapp.net" : phone.replace(/\D/g, '') + "@s.whatsapp.net";


      const botSettings = db.getSettings(idBot) || {}

      res.json({
        message: 'Configuración obtenida exitosamente',
        config: {
          namebot: botSettings.botname,
          namebot2: botSettings.namebot,
          banner: botSettings.banner,
          icon: botSettings.icon,
          currency: botSettings.currency,
          id: botSettings.newsletter_id,
          nameid: botSettings.nameid,
          owner: botSettings.owner,
          link: botSettings.link
        }
      });
    } catch (e) {
      res.status(500).json({ message: `Error al obtener configuración :: [${e.message}]` });
    }
  });

  app.post('/delete-bot', async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: 'Número de teléfono no proporcionado' });
    }

    const pho = normalizePhoneForPairing(phone);
    const sessionDirs = ['Subs'];
    let deleted = false;

    for (const dir of sessionDirs) {
      const botSessionPath = path.join(__dirname, '../../Sessions', dir, pho);

      if (fs.existsSync(botSessionPath)) {
        try {
          fs.rmSync(botSessionPath, { recursive: true, force: true });
          deleted = true;
        } catch (err) {
          return res.status(500).json({ message: `Error al eliminar la sesión en ${dir}` });
        }
      }
    }

    res.json({ message: deleted ? 'Bot eliminado exitosamente.' : 'No se encontró sesión previa, pero se procesó la solicitud.' });
  });

  app.get('/bots/status', async (req, res) => {
    try {
      const phone = String(req.query.phone || '').trim();
      if (!phone) return res.status(400).json({ ok: false, error: 'El campo phone es requerido.' });

      const idDigits = normalizePhoneForPairing(phone); 
      const s = await getStatus(idDigits); 
      const a = s.connected ? 'online' : 'offline';

      res.json({ ok: true, id: idDigits + "@s.whatsapp.net", status: a }); 
    } catch (e) {
      console.error(e);
      res.status(500).json({ ok: false, error: 'Error interno' });
    }
  });
  app.listen(PORT, '0.0.0.0', () => {
  });
};