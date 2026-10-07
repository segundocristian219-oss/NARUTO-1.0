import axios from 'axios'

export default {
  command: ['tiktoksearch', 'ttsearch', 'tts', 'tiktoks'],
  category: 'search',
  run: async ({ msg, sock, args, usedPrefix, command}) => {
    if (!args.length) {
      return msg.reply(`《✧》 Ingresa un término de búsqueda\n> Ejemplo: *${usedPrefix + command} hitori gotou edits.*`)
    }

    const text = args.join(" ")
    if (text.length > 57) return msg.reply('《✧》 La consulta es demasiado larga, por favor acortala e intenta de nuevo.')
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/feed/search', headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','Cookie': 'current_language=en', 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36' }, data: { keywords: text, count: 20, cursor: 0, HD: 1 }})
      if (res.status !== 200) throw new Error(`El servidor respondio con ${res.status}`)
      const results = res.data?.data?.videos?.filter(v => v.play) || []
      if (!results || results.length === 0) {
        return m.reply(`《✧》 No se encontro resultados para *${args[0]}*.`)
      }

      const data = res.data?.data
      const medias = results.map(v => {
        const caption = `
✎ *Título:* ${v.title || 'Sin título'}
ꕥ *Autor:* ${v.author?.nickname || 'Desconocido'} ${v.author?.unique_id ? `@${v.author.unique_id}` : ''}
> ⴵ *Duración:* ${v.duration || 'N/A'}

> ❒ *Audio:* ${v.music?.title || `[${v.author?.nickname || 'No disponible'}] original sound - ${v.author?.unique_id || "unknow"}`}`.trim()

        return {
          type: 'video',
          data: { url: v.play },
          caption
        }
      }).slice(0, 10)

      await sock.sendAlbumMessage(msg.chat, medias, { quoted: msg })

    } catch (e) {
      await msg.reply(`> Ocurrio un error al ejecutar ${usedPrefix + command}\n> [*Error: ${e.message}*]`)
    }
  },
}