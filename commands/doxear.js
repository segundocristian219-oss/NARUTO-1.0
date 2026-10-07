import db from '#db'

const pickRandom = list => list[Math.floor(Math.random() * list.length)]
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
  command: ['doxear', 'doxxeo', 'doxeo'],
  category: 'fun',
  run: async ({ sock, msg, command, usedPrefix }) => {
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const isOficialBot = botId === global.sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const isPremiumBot = db.getSettings(botId)?.botprem === 1
    const isModBot = db.getSettings(botId)?.botmod === 1
    if (!isOficialBot && !isPremiumBot && !isModBot) {
      return sock.reply(msg.chat, `《✧》El comando *${msg.command}* no está disponible en *Sub-Bots.*`, msg)
    }
    try {
      let userId = msg.mentionedJid?.[0] || msg.quoted ? msg.quoted.sender : null

      if (!userId) {
        return msg.reply('❀ Por favor, menciona o responde a un usuario.')
      }

      let userName = db.getUser(userId)?.name || await sock.getName(userId).catch(() => userId.split('@')[0])

      let start = `ꕥ *Iniciando doxeo*...`

      let boost = `*${pickRandom(['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'])}%*`
      let boost2 = `*${pickRandom(['21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40'])}%*`
      let boost3 = `*${pickRandom(['41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'])}%*`
      let boost4 = `*${pickRandom(['61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80'])}%*`
      let boost5 = `*${pickRandom(['81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100'])}%*`

      const { key } = await client.sendMessage(
        msg.chat,
        { text: start },
        { quoted: msg }
      )

      await delay(1000)
      await sock.sendMessage(msg.chat, { text: boost, edit: key })

      await delay(1000)
      await sock.sendMessage(msg.chat, { text: boost2, edit: key })

      await delay(1000)
      await sock.sendMessage(msg.chat, { text: boost3, edit: key })

      await delay(1000)
      await sock.sendMessage(msg.chat, { text: boost4, edit: key })

      await delay(1000)
      await sock.sendMessage(msg.chat, { text: boost5, edit: key })

      let doxeo = `
❀ *Persona doxeada*

✦ ${new Date().toLocaleDateString()}
✧ ${new Date().toLocaleTimeString()}

✰ Resultados:

*Nombre:* ${userName}
*Ip:* 92.28.211.234
*DNS:* 8.8.8.8
*ISP:* Ucom Universal
*MAC:* 5A:78:3E:7E:00
*WAN:* 100.23.10.15
*GATEWAY:* 192.168.0.1
*TCP OPEN PORTS:* 443
*UDP OPEN PORTS:* 8080, 80
      `.trim()

      await sock.sendMessage(
        msg.chat,
        {
          text: doxeo,
          edit: key,
          mentions: [userId]
        },
        { quoted: msg }
      )

    } catch (e) {
      console.error(e)
      msg.reply(`✖️ Error:\n${e.message}`)
    }
  }
}