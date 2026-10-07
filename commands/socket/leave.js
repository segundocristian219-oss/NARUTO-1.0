import db from '#db';

export default {
  command: ['leave'],
  category: 'socket',
  run: async ({ sock, msg, usedPrefix, command }) => {
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const settings = db.getSettings(botId)
    const isOwner = settings?.owner;
    const isSocketOwner = [botId, ...(isOwner ? [isOwner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(msg.sender)
    if (!isSocketOwner) return msg.reply(`❖ el comando ${command} solo puede ser ejecutado por el dueño del número del bot`)
    const groupId = msg.chat
    try {
      await sock.groupLeave(groupId)
    } catch (e) {
      return msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};
