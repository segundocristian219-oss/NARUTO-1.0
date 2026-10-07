import fetch from 'node-fetch'
import db from '#db'

export default {
  command: ['twitter', 'x', 'xdl'],
  category: 'downloader',
  run: async ({ msg, sock, args, usedPrefix, command}) => {
    const client = sock
    const m = msg
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isOficialBot = botId === global.sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const isPremiumBot = db.getSettings(botId)?.botprem === 1
    const isModBot = db.getSettings(botId)?.botmod === 1
    if (!isOficialBot && !isPremiumBot && !isModBot) {
      return client.reply(m.chat, `《✧》El comando *${command}* no está disponible en *Sub-Bots.*`, m)
    }
    if (!args[0]) {
      return m.reply('《✧》 Por favor, ingrese un enlace de Twitter/X.')
    }
    if (!args[0].match(/(twitter|x)\.com\/\w+\/status\//)) {
      return m.reply('《✧》 El enlace no parece válido. Asegúrate de que sea de Twitter/X.')
    }
    try {
      const data = await getTwitterMedia(args[0])
      if (!data) return m.reply('《✧》 No se pudo obtener el contenido.')
      const caption =
        `${data.title ? `> ⴵ Título › ${data.title}\n` : ''}` +
        `${data.author ? `> ✐ Autor › ${data.author}\n` : ''}` +
        `${data.date ? `> ꕥ Fecha › ${data.date}\n` : ''}` +
        `${data.duration ? `> ❀ Duración › ${data.duration}\n` : ''}` +
        `${data.resolution ? `> ✰ Resolución › ${data.resolution}\n` : ''}` +
        `${data.views ? `> ❖ Vistas › ${data.views}\n` : ''}` +
        `${data.likes ? `> ✿ Likes › ${data.likes}\n` : ''}` +
        `${data.comments ? `> ❏ Comentarios › ${data.comments}\n` : ''}` +
        `${data.retweets ? `> ꕤ Retweets › ${data.retweets}\n` : ''}` +
        `> 🜸 Enlace › ${args[0]}`
      if (data.type === 'video') {
        await client.sendMessage(m.chat, { video: { url: data.url }, caption, mimetype: 'video/mp4', fileName: 'twitter.mp4' }, { quoted: m })
      } else if (data.type === 'image') {
        await client.sendMessage(m.chat, { image: { url: data.url }, caption }, { quoted: m })
      } else {
        throw new Error('Contenido no soportado.')
      }
    } catch (e) {
      const errorName = e.message.startsWith('KaedeApiError') ? e.message: `${e.name}: ${e.message}`
      await m.reply(`《✧》 Ocurrió un error al descargar el video: *${errorName}*\n> Si el error persiste reportalo en el grupo oficial`)
    }
  }
}

async function getTwitterMedia(url) {
  const apis = [
    { endpoint: `${global.APIs.delirius.url}/download/twitterdl?url=${encodeURIComponent(url)}`, extractor: (res) => {
        if (!res.found || !res.media?.length) return null
        return { type: res.type || 'video', title: res.info?.text || null, author: res.info?.user_name || res.info?.user_screen_name || null, date: res.info?.date || null, url: res.media[0]?.url || null, likes: res.info?.likes || null, comments: res.info?.replies || null, retweets: res.info?.retweets || null }
      }
    },
    { endpoint: `${global.APIs.yuki.url}/dl/twitter?url=${encodeURIComponent(url)}&key=${global.APIs.yuki.key}`, extractor: (res) => {
        if (!res.status || !res.data?.result?.length) return null
        const hd = res.data.result.find(x => x.quality === '1920p' || x.quality === '1280p')
        const sd = res.data.result.find(x => x.quality === '852p' || x.quality === '568p')
        const media = hd || sd || res.data.result[0]
        if (!media?.url) return null
        return { type: res.data.type || 'video', title: res.data.title || null, duration: res.data.duration || null, resolution: media.quality || null, url: media.url, thumbnail: res.data.thumbnail || null }
      }
    },
    { endpoint: `${global.APIs.zenzxz.url}/download/twitter?url=${encodeURIComponent(url)}`, extractor: (res) => {
        if (!res.status || !res.result?.length) return null
        const hd = res.result.find(x => x.quality.includes('1080') || x.quality.includes('HD'))
        const sd = res.result.find(x => x.quality.includes('720'))
        const media = hd || sd || res.result[0]
        if (!media?.url) return null
        return { type: 'video', resolution: media.quality || null, url: media.url }
      }
    }
  ]

  for (const { endpoint, extractor } of apis) {
    try {
      const res = await fetch(endpoint).then(r => r.json())
      const result = extractor(res)
      if (result) return result
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }
  return null
}