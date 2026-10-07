import db from '#db';

export default {
  command: ['dep', 'deposit', 'd'],
  category: 'economy',
  run: async ({ sock, msg, args, userLang, usedPrefix, command }) => {
    const chatData = db.getChat(msg.chat);
    const user = db.getChatUser(msg.chat, msg.sender)
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const settings = db.getSettings(idBot)
    const monedas = settings.currency
    if (chatData.adminonly || !chatData.economy) return msg.reply(getMessage(userLang, 'economyOff', { usedPrefix }))
    if (!args[0]) {
      return msg.reply(`《✧》 Ingresa la cantidad de *${monedas}* que quieras *depositar*.`)
    }
    if (args[0] < 1 && args[0].toLowerCase() !== 'all') {
      return msg.reply('✎ Ingresa una cantidad *válida* para depositar')
    }
    if (args[0].toLowerCase() === 'all') {
      if (user.coins <= 0) return msg.reply(`✎ No tienes *${monedas}* para depositar en tu *banco*`)
      const count = user.coins
      db.setChatUser(msg.chat, msg.sender, 'coins', (user.coins || 0) - count)
      db.setChatUser(msg.chat, msg.sender, 'bank', (user.bank || 0) + count)
      await msg.reply(`ꕥ Has depositado *¥${count.toLocaleString()} ${monedas}* en tu Banco`)
      return true
    }
    if (!Number(args[0]) || parseInt(args[0]) < 1) {
      return msg.reply('《✧》 Ingresa una cantidad *válida* para depositar')
    }
    const count = parseInt(args[0])
    if (user.coins <= 0 || user.coins < count) {
      return msg.reply(`❀ No tienes suficientes *${monedas}* para depositar`)
    }
    db.setChatUser(msg.chat, msg.sender, 'coins', (user.coins || 0) - count)
    db.setChatUser(msg.chat, msg.sender, 'bank', (user.bank || 0) + count)
    await msg.reply(`ꕥ Has depositado *¥${count.toLocaleString()} ${monedas}* en tu Banco`)
  },
};