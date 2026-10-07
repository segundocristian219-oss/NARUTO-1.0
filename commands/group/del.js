/**export default {
  command: ['del', 'delete'],
  category: 'grupo',
  run: async (client, m) => {
    try {
      if (!m.quoted) {
        return m.reply('《✧》 Responde al mensaje que quieres borrar.');
      }

      const chat = global.db.data.chats[m.chat]
      const quotedId = m.quoted?.id
chat.rolls[quotedId]
        
      if (quotedId && chat?.rolls?.[quotedId]) {
          return m.reply('《✧》 No puedes eliminar el mensaje citado.')
      }
        
      const groupMetadata = await client.groupMetadata(m.chat).catch(() => null);
      if (!groupMetadata) return;

      const participants = groupMetadata.participants || [];
      const groupAdmins = participants
        .filter(p => p.admin)
        .map(p => p.phoneNumber || p.jid || p.id || p.lid);

      const isAdmin = groupAdmins.includes(m.sender);
      const botId = client.user.id.split(':')[0] + '@s.whatsapp.net';
      const isBotAdmin = groupAdmins.includes(botId);

      const quotedSender = m.quoted.sender;

      if (quotedSender === botId) {
        await client.sendMessage(m.chat, {
          delete: m.quoted.key
        });
        return;
      }

      if (!isAdmin) {
        return m.reply('《✧》 Necesitas ser admin para borrar mensajes de otros.');
      }

      if (!isBotAdmin) {
        return m.reply('《✧》 El bot necesita ser admin para borrar mensajes.');
      }

      await client.sendMessage(m.chat, {
        delete: m.quoted.key
      });

    } catch (e) {
      await m.reply(`Error: ${e.message}`);
    }
  }
};*/

import db from '#db'

export default {
  command: ['del', 'delete'],
  category: 'grupo',
  run: async ({ msg, sock, isAdmins, isBotAdmins }) => {
    const m = msg
    const client = sock
    try {
      if (!m.quoted) {
        return m.reply('《✧》 Responde al mensaje que quieres borrar.');
      }

      if (!m.isGroup) {
        await client.sendMessage(m.chat, { delete: m.quoted.key });
        return;
      }

      const chat = db.getChat(m.chat)
      const quotedId = m.quoted?.id;
      if (typeof chat.wimage === 'string') {
        chat.wimage = JSON.parse(chat.wimage || '{}');
      }

      if (quotedId && chat?.rolls?.[quotedId] || quotedId && chat?.wimage?.[quotedId]) {
        return m.reply('《✧》 No puedes eliminar el mensaje citado.');
      }

      const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
      const quotedSender = m.quoted.sender;

      if (quotedSender === sock.user.lid.split(':')[0] + '@lid' || quotedSender === botId) {
        await client.sendMessage(m.chat, {
          delete: m.quoted.key
        });
        return;
      }

      if (!isAdmins) {
        return m.reply('《✧》 Necesitas ser admin para borrar mensajes de otros.');
      }

      if (!isBotAdmins) {
        return m.reply('《✧》 El bot necesita ser admin para borrar mensajes.');
      }

      await client.sendMessage(m.chat, {
        delete: m.quoted.key
      });

    } catch (e) {
      m.reply(`Error: ${e.message}`);
    }
  }
};