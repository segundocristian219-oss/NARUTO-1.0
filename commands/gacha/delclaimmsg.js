import db from '#db';

export default {
  command: ['delclaimmsg', 'resetclaimmsg'],
  category: 'gacha',
  run: async ({ sock, msg, args, usedPrefix, comman }) => {
    try {
      const chat = db.getChat(msg.chat)
      if (chat.adminonly) {
        return msg.reply(`ꕥ Para utilizar comandos de *Gacha* en este grupo, se requiere desactivar el modo *Sólo administradores*.\n\n> Un *administrador* puede desactivarlo con el comando » *${usedPrefix}onlyadmin off*`)
      }
      if (!chat.gacha) {
        return msg.reply(`ꕥ Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}gacha on*`)
      }
      const user = db.getUser(msg.sender);
      if (user.claimMessage) {
        db.setUser(msg.sender, 'claimMessage', '')
      }
      msg.reply('❀ Mensaje de reclamación restablecido.')
    } catch (e) {
      await msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
}