import db from '#db';

export default {
  command: ['packlist', 'stickerpacks'],
  category: 'stickers',
  run: async ({ sock, msg, usedPrefix, command, text }) => {
    try {
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
                const settings = db.getSettings(botId)
                const isOficialBot = botId === global.sock?.user?.id?.split(':')[0] + '@s.whatsapp.net';
                const isPremiumBot = settings?.botprem === 1
                const isModBot = settings?.botmod === 1
                if (!isOficialBot && !isPremiumBot && !isModBot) {
                  return msg.reply(`《✧》El comando *${command}* no está disponible en *Sub-Bots.*`)
                }
      const stickerPackData = db.getStickersPack(msg.sender);
      const packs = stickerPackData.packs || [];
      if (!packs.length) {
        return msg.reply('《✧》No tienes paquetes de stickers creados.')
      }
      const formatDate = (timestamp) => {
        const date = new Date(parseInt(timestamp))
        return date.toLocaleString('es-CO', { timeZone: 'America/Bogota', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
      }
      let text = `*❀ Lista de tus paquetes de stickers:*\n`
      text += `> ❏ Total: \`${packs.length}\`\n`
      text += `> ❏ Usuario: @${msg.sender.split('@')[0]}\n\n`
      packs.forEach(pack => {
        const estado = pack.spackpublic === 1 ? 'Público' : 'Privado'
        text += `❖ *${pack.name || 'Sin nombre'}*\n`
        text += `> » Stickers: \`${pack.stickers?.length || 0}\`\n`
        text += `> » Modificado: \`${formatDate(pack.lastModified || pack.id)}\`\n`
        text += `> » Estado: \`${estado}\`\n\n`
      })
      await sock.sendMessage(msg.chat, { text, mentions: [msg.sender] }, { quoted: msg })
    } catch (e) {
      msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}