import { normalizeJid, resolveParticipantJid, resolveJidSync, deleteCachedMeta, getCachedMeta, setCachedMeta } from '../core/message.js';
import chalk from 'chalk';
import moment from 'moment-timezone';
import { prepareWAMessageMedia } from '@whiskeysockets/baileys';
import db from '#db';

function getGroupAdmins(participants) {
  return (participants ?? []).filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id).filter(Boolean);
}

function resolveEventParticipant(p, sock) {
  if (typeof p === 'string') return resolveJidSync(p, sock) || p;
  return resolveParticipantJid(p, sock) || normalizeJid(p.id || p.phoneNumber || p.jid || p.lid || '') || '';
}

export default async (sock, msg) => {
  sock.ev.on('group-participants.update', async (anu) => {
    try {
      if (['add', 'remove', 'leave', 'promote', 'demote'].includes(anu.action)) {
        deleteCachedMeta(anu.id);
      }
      const metadata = await (async () => {
        const cached = getCachedMeta(anu.id);
        if (cached) return cached;
        for (let i = 0; i < 3; i++) {
          const m = await sock.groupMetadata(anu.id).catch(() => null);
          if (m) { setCachedMeta(anu.id, m); return m; }
          await new Promise(r => setTimeout(r, 1500));
        }
        return null;
      })();
      const groupAdmins = metadata ? getGroupAdmins(metadata.participants) : [];
      const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const chat = db.getChat(anu.id) || {};
      const settings = db.getSettings(botId) || {};
      const link = 'https://dix.lat/s/fz8fc';
      const botname = settings.botname || '';
      const namebot = settings.namebot || '';
      const banner = settings.banner;
      const isGif = banner?.endsWith('.gif') || banner?.endsWith('.mp4') || banner?.endsWith('.webm');
      const primaryBotId = chat?.primaryBot;
      const now = new Date();
      const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
      const tiempo = colombianTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/g, '');
      const tiempo2 = moment.tz('America/Bogota').format('hh:mm A');
      const memberCount = metadata?.participants?.length || 0;
      const isSelf = (settings.self ?? false) || (chat.isMute ?? false);
      if (isSelf) return;

      const jids = (anu.participants ?? []).map(p => resolveEventParticipant(p, sock)).filter(Boolean);
      if (!jids.length) {
        return;
      }

      const mentions = jids.map(jid => `@${jid.split('@')[0]}`);
      const users = jids.map(jid => `\t\t✰ @${jid.split('@')[0]}`).join('\n');

      const contextBase = {
        mentionedJid: jids,
        isForwarded: false
      };

      for (const p of anu.participants) {
        const jid = resolveEventParticipant(p, sock);
        if (!jid) continue;
        const phone = jid.split('@')[0];

        if (anu.action === 'add' && chat?.welcome && (!primaryBotId || primaryBotId === botId)) {
          if (!metadata) continue;
          let caption;
          if (chat.sWelcome && chat.sWelcome.trim() !== '') {
            caption = chat.sWelcome.replace(/@user/g, mentions.join(', ')).replace(/@group/g, metadata.subject).replace(/@desc/g, metadata.desc || 'Sin descripción').replace(/@members/g, memberCount).replace(/@time/g, `${tiempo} ${tiempo2}`);
          } else {
            caption = `╭┈──̇─̇─̇────̇─̇─̇──◯◝\n┊「 *Bienvenido (⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)* 」\n┊︶︶︶︶︶︶︶︶︶︶︶\n┊ *Grupo ›* ${metadata.subject}\n${users}\n┊┈─────̇─̇─̇─────◯◝\n┊➤ *Ahora somos ${memberCount} membros.*\n> ➤ Puedes usar *#help* para ver la lista de comandos\n ➤ ${link}\n┊ ︿︿︿︿︿︿︿︿︿︿︿\n╰─────────────────╯`;
          }
          if (isGif) {
            await sock.sendMessage(anu.id, {
              video: { url: banner },
              gifPlayback: true,
              caption: caption,
              contextInfo: contextBase
            }, { quoted: null });
          } else {
            await sock.sendMessage(anu.id, { 
              text: caption,
              linkPreview: link && banner ? (await prepareWAMessageMedia({ image: { url: banner } }, { upload: sock.waUploadToServer, mediaTypeOverride: 'thumbnail-link' }).then(({ imageMessage }) => ({
                'canonical-url': link,
                'matched-text': link,
                title: botname,
                description: `${namebot}, mᥲძᥱ ᥕі𝗍һ ♥ ᑲᥡ ${dev}`,
                jpegThumbnail: imageMessage?.jpegThumbnail ? Buffer.from(imageMessage.jpegThumbnail) : undefined,
                highQualityThumbnail: imageMessage || undefined
              }))) : undefined,
              contextInfo: contextBase
            }, { quoted: null });
          }
        }

        if ((anu.action === 'remove' || anu.action === 'leave') && chat?.goodbye && (!primaryBotId || primaryBotId === botId)) {
          if (!metadata) continue;
          let caption;
          if (chat.sGoodbye && chat.sGoodbye.trim() !== '') {
            caption = chat.sGoodbye.replace(/@user/g, `@${phone}`).replace(/@group/g, metadata.subject).replace(/@desc/g, metadata.desc || 'Sin descripción').replace(/@members/g, memberCount).replace(/@time/g, `${tiempo} ${tiempo2}`);
          } else {
            caption = `╭┈──̇─̇─̇────̇─̇─̇──◯◝\n┊「 *Hasta pronto (⁠╥⁠﹏⁠╥⁠)* 」\n┊︶︶︶︶︶︶︶︶︶︶︶\n┊ *Grupo ›* ${metadata.subject}\n\t\t✰ @${phone}\n┊┈─────̇─̇─̇─────◯◝\n┊➤ *Ojalá que vuelva pronto.*\n┊➤ *Ahora somos ${memberCount} miembros.*\n\n> ➤ *${link}*\n┊ ︿︿︿︿︿︿︿︿︿︿︿\n╰─────────────────╯`;
          }
          if (isGif) {
            await sock.sendMessage(anu.id, {
              video: { url: banner },
              gifPlayback: true,
              caption: caption,
              contextInfo: contextBase
            }, { quoted: null });
          } else {
            await sock.sendMessage(anu.id, { 
              text: caption,
              linkPreview: link && banner ? (await prepareWAMessageMedia({ image: { url: banner } }, { upload: sock.waUploadToServer, mediaTypeOverride: 'thumbnail-link' }).then(({ imageMessage }) => ({
                'canonical-url': link,
                'matched-text': link,
                title: botname,
                description: `${namebot}, mᥲძᥱ ᥕі𝗍һ ♥ ᑲᥡ ${dev}`,
                jpegThumbnail: imageMessage?.jpegThumbnail ? Buffer.from(imageMessage.jpegThumbnail) : undefined,
                highQualityThumbnail: imageMessage || undefined
              }))) : undefined,
              contextInfo: contextBase
            }, { quoted: null });
          }
        }

        if (anu.action === 'remove' || anu.action === 'leave') {
          const user = db.getChatUser(anu.id, jid);
          if (user && typeof user.afk === 'number' && user.afk > -1) {
            db.setChatUser(anu.id, jid, 'afk', -1);
            db.setChatUser(anu.id, jid, 'afkReason', '');
          }
        }

        if (anu.action === 'promote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const authorJid = normalizeJid(anu.author) || anu.author;
          await sock.sendMessage(anu.id, { text: `「✎」 *@${phone}* ha sido promovido a Administrador por *@${authorJid.split('@')[0]}.*`, mentions: [jid, authorJid, ...groupAdmins] });
        }

        if (anu.action === 'demote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const authorJid = normalizeJid(anu.author) || anu.author;
          await sock.sendMessage(anu.id, { text: `「✎」 *@${phone}* ha sido degradado de Administrador por *@${authorJid.split('@')[0]}.*`, mentions: [jid, authorJid, ...groupAdmins] });
        }
      }
    } catch (err) {
      console.log(chalk.gray(`[ EVENT ERROR ]  → ${err}`));
    }
  });
};