import db from '#db'

export default {
  command: ['setclaim', 'setclaimmsg'],
  category: 'gacha',
  run: async ({ msg, sock, args, usedPrefix, command}) => {
    try {
      const chat = db.getChat(msg.chat)
      if (chat.adminonly) {
        return msg.reply(`ꕥ Para utilizar comandos de *Gacha* en este grupo, se requiere desactivar el modo *Sólo administradores*.\n\n> Un *administrador* puede desactivarlo con el comando » *${usedPrefix}onlyadmin off*`)
      }
      if (!chat.gacha) {
        return msg.reply(`ꕥ Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}gacha on*`)
      }
      if (!args[0]) {
        return msg.reply(`❀ Debes especificar un mensaje para reclamar un personaje.\n> Ejemplos:\n> *${usedPrefix + command} €user ha reclamado el personaje €character!*\n> *${usedPrefix + command} €character ha sido reclamado por €user*`)
      }
      const customMsg = args.join(' ')
      if (!customMsg.includes('€user') || !customMsg.includes('€character')) {
        return msg.reply(`ꕥ Tu mensaje debe incluir *€user* y *€character* para que funcione correctamente.`)
      }
      db.setUser(msg.sender, 'claimMessage', customMsg)
      msg.reply('❀ Mensaje de reclamación modificado.')
    } catch (e) {
      await msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
}