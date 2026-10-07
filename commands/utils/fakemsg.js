import { delay } from '@whiskeysockets/baileys';
import { getMessage } from '#langs';

export default {
  command: ["fakereply", "fake", "fakemsg"],
  category: "utils",
  run: async({ sock, msg, userLang, text }) => {
    if (!msg.quoted) {
      return msg.reply(getMessage(userLang, 'fake'))
    }
    if (!text) return msg.reply(getMessage(userLang, 'fakefail'))
    if (global.owner.map(num => num + '@s.whatsapp.net').includes(msg.quoted.sender)) return msg.reply(getMessage(userLang, 'fakeowner'))
    const stanzaId = msg.quoted.id

    try { 
      const tempId = await sock.relayMessage(msg.chat, 
        { extendedTextMessage: { text: '', contextInfo: { isGroupStatus: true } } }, 
      {})
      const tempId2 = await sock.relayMessage(msg.chat, {
        protocolMessage: {
          key: { remoteJid: msg.chat, fromMe: true, id: tempId },
          type: 14,
          editedMessage: {
            extendedTextMessage: { 
              text,
              contextInfo: { isGroupStatus: false } 
            }
          }
        }
      }, { messageId: stanzaId })

      await delay(300)
      await sock.sendMessage(msg.chat, { delete: { remoteJid: msg.chat, id: tempId, fromMe: true } })
      await sock.sendMessage(msg.chat, { delete: { remoteJid: msg.chat, id: tempId2, fromMe: true } })

    } catch (e) {
      console.log(e)
      await msg.reply(`> [Error: ${e?.name}] ${e?.message}`)
    }
  }
}