import db from '#db'

export default {
  command: ['setbotname', 'setname'],
  category: 'socket',
  run: async ({msg, sock, args, usedPrefix, command}) => {
    const m = msg
    const client = sock
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = db.getSettings(idBot) || {};
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(m.sender)
    if (!isOwner2) return m.reply(`❖ el comando ${command} solo puede ser ejecutado por el dueño del número del bot`)
    const value = args.join(' ').trim()
    if (!value) return m.reply(`✐ Debes escribir un nombre corto y un nombre largo valido.\n> Ejemplo: *${usedPrefix + command} Kaede / Kaede Suzu*`)
    const formatted = value.replace(/\s*\/\s*/g, '/')
    let [short, long] = formatted.includes('/') ? formatted.split('/') : [value, value]
    if (!short || !long) return m.reply('✎ Usa el formato: Nombre Corto / Nombre Largo')
    if (/\s/.test(short)) return m.reply('❖ El nombre corto no puede contener espacios.')
    db.setSettings(idBot, 'namebot', short.trim())
    db.setSettings(idBot, 'botname', long.trim())
    return m.reply(`✿ El nombre del bot ha sido actualizado!\n\n❒ Nombre corto: *${short.trim()}*\n❒ Nombre largo: *${long.trim()}*`)
  },
};