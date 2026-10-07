import { prepareWAMessageMedia } from '@whiskeysockets/baileys';
import db from '#db';

export default {
  command: ['testwelcome', 'tw'],
  category: 'group',
  description: 'Prueba el mensaje de bienvenida.',
  run: async ({ msg, sock, groupMetadata }) => {
    try {
      const chatId = msg.chat;
      const userId = msg.sender;
      const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const chat = db.getChat(chatId);
      const botSettings = db.getSettings(botId) || {};
      const link = 'https://dix.lat/fz8fc';
      const botname = botSettings.botname || '';
      const namebot = botSettings.namebot || '';
      const banner = botSettings.banner;
      const memberCount = groupMetadata.participants.length;
      const isGif = banner?.endsWith('.gif') || banner?.endsWith('.mp4') || banner?.endsWith('.webm');
      const phone = userId.split('@')[0];

      const sWelcome = chat.sWelcome || '';
      const mensajes = {
        add: sWelcome 
          ? `\n┊➤ ${sWelcome.replace(/{usuario}/g, `@${phone}`).replace(/{grupo}/g, `*${groupMetadata.subject}*`).replace(/{desc}/g, groupMetadata?.desc || '✿ Sin Desc ✿')}` 
          : ''
      };

      const contextBase = {
        mentionedJid: [userId],
        isForwarded: false
      };

      const caption = `╭┈──̇─̇─̇────̇─̇─̇──◯◝
┊「 *Bienvenido (⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)* 」
┊︶︶︶︶︶︶︶︶︶︶︶
┊  *Nombre ›* @${phone}
┊  *Grupo ›* ${groupMetadata.subject}
┊┈─────̇─̇─̇─────◯◝
┊➤ *Usa #menu para ver los comandos.*
┊➤ *Ahora somos ${memberCount} miembros.* ${mensajes.add}
┊
┊➤  *Link*: ${link}
┊ ︿︿︿︿︿︿︿︿︿︿︿
╰─────────────────╯`;

      if (isGif) {
        await sock.sendMessage(chatId, {
          video: { url: banner },
          gifPlayback: true,
          caption: caption,
          contextInfo: contextBase
        }, { quoted: null });
      } else {
        await sock.sendMessage(chatId, { 
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
    } catch (e) {
      console.error(e);
      await msg.reply(`> Ocurrió un error al probar la bienvenida: *${e.message}*`);
    }
  }
};