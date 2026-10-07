import db from '#db';

export default {
  command: ['join', 'unir'],
  category: 'socket',
  run: async ({ msg, sock, args, usedPrefix, command}) => {
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = db.getSettings(idBot) || {}
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(msg.sender)
    if (!isOwner2) return msg.reply(`❖ el comando *${command}* solo puede ser ejecutado por el dueño del número del bot`)
    if (!args[0]) return msg.reply('《✧》 Ingresa el enlace del grupo para unir el bot.')
    const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i
    const match = args[0].match(linkRegex)
    if (!match || !match[1]) {
      return msg.reply('《✧》 El enlace ingresado no es válido o está incompleto.')
    }
    try {
      const inviteCode = match[1]
      const groupInfo = await sock.groupGetInviteInfo(inviteCode)
      const isAlreadyInGroup = groupInfo.participants?.some(
    participant => participant.id === idBot
  )

       if (isAlreadyInGroup) {
         return msg.reply(`《✧》 ${config.botname || 'El bot'} ya se encuentra dentro de este grupo.`)
       }
        
      await sock.groupAcceptInvite(inviteCode)
      await sock.reply(msg.chat, `❀ ${config.botname} se ha unido exitosamente al grupo.`, msg)
    } catch (e) {
      const errMsg = String(e.message || e)
      if (errMsg.includes('not-authorized') || errMsg.includes('requires-admin')) {
        await msg.reply('《✧》 La unión requiere aprobación de administrador. Espera a que acepten tu solicitud.')
      } else if (errMsg.includes('not-in-group') || errMsg.includes('removed')) {
        await msg.reply('《✧》 No se pudo unir al grupo porque el bot fue eliminado recientemente.')
      } else {
        await msg.reply('《✧》 No se pudo unir al grupo, verifica el enlace o los permisos.')
      }
    }
  },
}