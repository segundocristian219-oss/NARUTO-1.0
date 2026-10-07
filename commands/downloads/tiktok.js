import fetch from 'node-fetch'

export default {
  command: ['tiktok', 'tt'],
  category: 'downloader',
  run: async ({ sock, msg, args, usedPrefix, command}) => {
    try {
      if (!args[0]) {
        return msg.reply(`《✧》 Ingresa un enlace de TikTok.`)
      }

      const url = args[0]
      const isUrl = /(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(url)

      if (!isUrl) {
        return msg.reply('《✧》 Eso no es un enlace válido de TikTok.')
      }

      const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`

      const res = await fetch(api)
      if (!res.ok) throw new Error(`Error ${res.status}`)

      const json = await res.json()
      if (json.code !== 0) {
  return msg.reply('《✧》 No se pudo obtener el video.')
}
        
       

      const data = json.data
      const title = data.title
      
      const cleanTitle = (title = '') =>
      title
        .trim() 
        .replace(/\s+/g, ' ')

      const tituloLimpio = cleanTitle(title)
      const videoUrl = data.play
      if (!videoUrl) {
        return msg.reply('《✧》 No hay enlace de descarga disponible.')
      }

      const musicInfo = data.music_info

let musicText = 'No disponible'

if (musicInfo) {
  if (musicInfo.original) {
    musicText = `[${musicInfo.author}] ${musicInfo.title}`
  } else {
    musicText = musicInfo.title
  }
}
      

      const caption = `
❀ Título: \`${tituloLimpio || 'Sin título'}\`
❖ Autor: *${data.author?.nickname || 'Desconocido'}*
> ❒ Vistas: ${data.play_count || 0}
> ✰ Likes: ${data.digg_count || 0}
> 🗨 Comentarios: ${data.comment_count || 0}
> [ ✿ ] Descargas: ${data.download_count || 0}

> ✐ Música: ${musicText}
`.trim()

      await sock.sendMessage(msg.chat, { video: { url: videoUrl }, caption }, { quoted: msg })

    } catch (e) {
      console.error(e)
      await msg.reply(`> Error al descargar el video.\n> ${e.message}`)
    }
  }
}