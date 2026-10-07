import db from '#db'

export default {
  command: ['ping', 'p'],
  category: 'info',
  run: async ({ msg, sock }) => {
    const start = Date.now()
    const m = msg
    const sent = await sock.sendMessage(msg.chat, { text: '`❏ ¡Pong!`' + `\n> *${db.getSettings(sock.user.id.split(':')[0] + "@s.whatsapp.net").namebot}*`}, { quoted: m })
    const latency = Date.now() - start
    await sock.sendMessage(msg.chat, { text: `✿ *Pong!*\n> Tiempo ⴵ ${latency}ms`, edit: sent.key }, { quoted: msg })
  },
};
