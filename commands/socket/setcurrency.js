import db from '#db'

export default {
  command: ['setbotcurrency', 'setcurrency'],
  category: 'socket',
  run: async ({ sock, msg, args, usedPrefix, command }) => {
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = db.getSettings(idBot);
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(msg.sender)
    if (!isOwner2) return msg.reply(`❖ el comando *${command}* solo puede ser ejecutado por el dueño del número del bot`)
    const value = args.join(' ').trim()
    if (!value) return msg.reply(`✐ Debes escribir un nombre de moneda valido.\n> Ejemplo: *${usedPrefix + command} Coins*`)
    db.setSettings(idBot, 'currency', value)
    return msg.reply(`✿ Se ha cambiado la moneda del bot a *${value}*`)
  },
};