import db from '#db';

export default {
  command: ['rt', 'roulette', 'ruleta'],
  category: 'rpg',
  run: async ({ sock, msg, args, usedPrefix, command, text }) => {
    const chatId = msg.chat
    const senderId = msg.sender
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const botSettings = db.getSettings(botId)
    const chatData = db.getChat(msg.sender)
    if (chatData.adminonly || !chatData.economy) return msg.reply(`ꕥ Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
    const user = db.getChatUser(chatId, senderId)
    const currency = botSettings.currency || 'Monedas'
    if (args.length < 2) return msg.reply(`《✧》 Debes especificar *black* o *red.*\n> Ejemplo » *${usedPrefix + command} 25000 red*`)
    let amount, color
    if (!isNaN(parseInt(args[0]))) {
      amount = parseInt(args[0])
      color = args[1].toLowerCase()
    } else if (!isNaN(parseInt(args[1]))) {
      color = args[0].toLowerCase()
      amount = parseInt(args[1])
    } else {
      return msg.reply(`《✧》 Formato inválido. Ejemplo: *rt 2000 black* o *rt black 2000*`)
    }
    const validColors = ['red', 'black', 'green']
    if (isNaN(amount) || amount < 200) return msg.reply(`《✧》 La cantidad mínima de ${currency} a apostar es 200.`)
    if (!validColors.includes(color)) return msg.reply(`《✧》 Por favor, elige un color válido: red, black, green.`)
    if (user.coins < amount) return msg.reply(`《✧》 No tienes suficientes *${currency}* para hacer esta apuesta.`)
    const resultColor = validColors[Math.floor(Math.random() * validColors.length)]
    if (resultColor === color) {
      const reward = amount * (resultColor === 'green' ? 14 : 2)
      db.setChatUser(chatId, senderId, 'coins', (user.coins || 0) + reward)
      await sock.sendMessage(chatId, { text: `「✿」 La ruleta salió en *${resultColor}* y has ganado *¥${reward.toLocaleString()} ${currency}*.`, mentions: [senderId] }, { quoted: msg })
    } else {
      db.setChatUser(chatId, senderId, 'coins', (user.coins || 0) - amount)
      await sock.sendMessage(chatId, { text: `「✿」 La ruleta salió en *${resultColor}* y has perdido *¥${amount.toLocaleString()} ${currency}*.`, mentions: [senderId] }, { quoted: msg })
    }
  },
}