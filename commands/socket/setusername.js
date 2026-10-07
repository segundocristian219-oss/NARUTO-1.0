import db from '#db';

export default {
  command: ['setusername', 'setuser'],
  category: 'socket',
  run: async ({ sock, msg, args, usedPrefix, command }) => {
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net';
    const config = db.getSettings(idBot);
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(msg.sender)
    if (!isOwner2) return msg.reply(`❖ el comando ${command} solo puede ser ejecutado por el dueño del número del bot`)
    const value = args.join(' ').trim()
    if (!value) return msg.reply(`✎ Debes escribir un nombre de usuario valido.\n> Ejemplo: *${usedPrefix + command} Miku Nakano*`)
    await sock.updateProfileName(value)
    return msg.reply(`✿ El nombre de usuario del bot ha sido actualizado a *${value}*!`)
  },
};