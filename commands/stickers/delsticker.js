export default {
  command: ['stickerdel', 'delsticker'],
  category: 'stickers',
  run: async (client, m, args, usedPrefix, command) => {
    try {
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isPremiumBot = global.db.data.settings[botId]?.botprem === true
    const isModBot = global.db.data.settings[botId]?.botmod === true
    if (!isOficialBot && !isPremiumBot && !isModBot) {
      return client.reply(m.chat, `《✧》El comando *${command}* no está disponible en *Sub-Bots.*`, m)
    }
      if (!args.length) {
        return m.reply('《✧》Especifica el nombre del paquete.')
      }
      const packName = args.join(' ').trim()
      const db = global.db.data
      if (!db.stickerspack) db.stickerspack = {}
      const packs = db.stickerspack[m.sender]?.packs || []
      if (!packs || packs.length === 0) {
        return m.reply('《✧》No tienes paquetes creados.')
      }
      const pack = packs.find(p => p.name.toLowerCase() === packName.toLowerCase())
      if (!pack) {
        return m.reply('《✧》No se encontró un paquete con ese nombre.')
      }
      const quoted = m.quoted
      if (!quoted) {
        return m.reply('《✧》Responde a un sticker para eliminarlo del paquete de stickers.')
      }
      const mime = quoted.mimetype || quoted.msg?.mimetype || ''
      if (!/webp/i.test(mime)) {
        return m.reply('《✧》Solo puedes eliminar stickers.')
      }
      if (!pack.stickers || pack.stickers.length === 0) {
        return m.reply('《✧》El paquete no tiene stickers.')
      }
      let buffer = await quoted.download()
      if (!buffer) {
        return m.reply('《✧》No se pudo obtener el sticker.')
      }
      if (!Buffer.isBuffer(buffer)) {
        buffer = Buffer.from(buffer)
      }
      const base64Buffer = buffer.toString('base64')
      const index = pack.stickers.findIndex(stored => stored === base64Buffer)
      if (index === -1) {
        return m.reply('《✧》Ese sticker no está en el paquete.')
      }
      pack.stickers.splice(index, 1)
      pack.lastModified = Date.now().toString()
      db.stickerspack[m.sender].packs = packs
      m.reply(`❀ El sticker ha sido eliminado del paquete de stickers ${pack.name}!`)
    } catch (e) {
      m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}