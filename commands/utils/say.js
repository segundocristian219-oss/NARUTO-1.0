export default {
  command: ['say', 'decir'],
  category: 'grupo',
  isOwner: true,
  run: async ({ msg, sock, args, usedPrefix, command, groupMetadata, participants }) => {
    const groupParticipants = participants || []
    const allMentions = groupParticipants.map(p => sock.decodeJid(p.jid || p.id || p.lid || p.phoneNumber)).filter(Boolean)
    const userText = (args.join(' ') || '').trim()
    const src = msg.quoted || msg
    const hasImage = Boolean(src.message?.imageMessage || src.mtype === 'imageMessage')
    const hasVideo = Boolean(src.message?.videoMessage || src.mtype === 'videoMessage')
    const hasAudio = Boolean(src.message?.audioMessage || src.mtype === 'audioMessage')
    const hasSticker = Boolean(src.message?.stickerMessage || src.mtype === 'stickerMessage')
    const isQuoted = Boolean(msg.quoted)
    const originalText = (src.caption || src.text || src.body || '').trim()
    const textToCheck = (userText || originalText || '').trim()
    const explicitMentions = allMentions.filter(jid => textToCheck.includes(jid.split('@')[0]))
    try {
      const options = { quoted: null, mentions: explicitMentions.length ? explicitMentions : [] }
      if (hasImage || hasVideo) {
        const media = await src.download()
        if (hasImage) {
          return sock.sendMessage(msg.chat, { image: media, caption: textToCheck || '', ...options })
        } else {
          return sock.sendMessage(msg.chat, { video: media, mimetype: 'video/mp4', caption: textToCheck || '', ...options })
        }
      }
      if (hasAudio) {
        const media = await src.download()
        return sock.sendMessage(msg.chat, { audio: media, mimetype: 'audio/mp4', fileName: 'hidetag.mp3', ...options })
      }
      if (hasSticker) {
        const media = await src.download()
        return sock.sendMessage(msg.chat, { sticker: media, ...options })
      }
      if (textToCheck) {
        return sock.sendMessage(msg.chat, { text: textToCheck, ...options })
      }
      return msg.reply('《✧》 Por favor, escribe el texto que deseas repetir.')
    } catch (e) {
      return msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}