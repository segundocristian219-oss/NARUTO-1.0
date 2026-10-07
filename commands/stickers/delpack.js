import db from '#db';

export default {
  command: ['delpack'],
  category: 'stickers',
  run: async ({ sock, msg, args, usedPrefix, command }) => {
    try {
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
            const settings = db.getSettings(botId)
            const isOficialBot = botId === global.sock?.user?.id?.split(':')[0] + '@s.whatsapp.net';
            const isPremiumBot = settings?.botprem === 1
            const isModBot = settings?.botmod === 1
            if (!isOficialBot && !isPremiumBot && !isModBot) {
              return msg.reply(`《✧》El comando *${command}* no está disponible en *Sub-Bots.*`)
            }
      if (!args.length) {
        return msg.reply('《✧》Especifica el nombre del paquete de stickers.')
      }
      const packName = args.join(' ').trim();
      const stickerPackData = db.getStickersPack(msg.sender);
      const packs = stickerPackData.packs || [];
      if (!packs || packs.length === 0) {
        return msg.reply('《✧》No tienes paquetes creados.')
      }
      const packIndex = packs.findIndex(p => p.name.toLowerCase() === packName.toLowerCase())
      if (packIndex === -1) {
        return msg.reply(`《✧》No se encontró el paquete de stickers \`${packName}\`.`)
      }
      const deletedPack = packs[packIndex]
      packs.splice(packIndex, 1)
      db.setStickersPack(msg.sender, 'packs', packs)
      msg.reply(`❀ El paquete de stickers \`${deletedPack.name}\` ha sido eliminado.`)
    } catch (e) {
      msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}