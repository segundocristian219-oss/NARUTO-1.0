import yts from 'yt-search'
import fetch from 'node-fetch'
import { getBuffer } from '#message'
import crypto from 'crypto'
import axios from 'axios'
import { prepareWAMessageMedia } from '@whiskeysockets/baileys'
import db from '#db'

class KaedeApiError extends Error {
    constructor(message) {
        super(message)
        this.name = 'KaedeApiError'
    }
}

class SaveTube {
  constructor() {
    this.ky = 'C5D58EF67A7584E4A29F6C35BBC4EB12'
    this.m = /^((?:https?:)?\/\/)?((?:www|m|music)\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?([a-zA-Z0-9_-]{11})/
    this.is = axios.create({
      headers: {
        'content-type': 'application/json',
        origin: 'https://yt.savetube.me',
        'user-agent': 'Mozilla/5.0 (Android 15; Mobile; SM-F958; rv:130.0) Gecko/130.0 Firefox/130.0'
      }
    })
  }
    
  async decrypt(enc) {
    const [sr, ky] = [Buffer.from(enc, 'base64'), Buffer.from(this.ky, 'hex')]
    const [iv, dt] = [sr.slice(0, 16), sr.slice(16)]
    const dc = crypto.createDecipheriv('aes-128-cbc', ky, iv)
    return JSON.parse(Buffer.concat([dc.update(dt), dc.final()]).toString())
  }

  async getCdn() {
    const r = await this.is.get('https://media.savetube.vip/api/random-cdn')
    return r.data.cdn
  }
    
  async download(url, isAudio) {
    const id = url.match(this.m)?.[3]
    if (!id) throw new Error('ID inválido')

    const cdn = await this.getCdn()

    const info = await this.is.post(`https://${cdn}/v2/info`, {
      url: `https://www.youtube.com/watch?v=${id}`
    })

    const dec = await this.decrypt(info.data.data)

    const dl = await this.is.post(`https://${cdn}/download`, {
      id,
      downloadType: isAudio ? 'audio' : 'video',
      quality: isAudio ? '128' : '720',
      key: dec.key
    })

    return {
      dl: dl.data.data.downloadUrl,
      title: dec.title
    }
  }
}
    
const isYTUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i.test(url)

async function getVideoInfo(query, videoMatch) {
  const search = await yts(query)
  if (!search.all.length) return null
  const videoInfo = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
  return videoInfo || null
}

function getMelodyApi() {
 const mel = global.APIs?.melody
 const url = (typeof mel?.url === 'string' ? mel.url : '').trim().replace(/\/+/, '')
 const key = (typeof mel?.key === 'string' ? mel.key : '').trim()
 if (!url) return null
 return {
  url,
  key: key || null,
  headers: key ? { 'x-api-key' : key } : {}
 }   
}

export default {
  command: ['play', 'mp3', 'ytmp3', 'ytaudio', 'playaudio'],
  category: 'downloader',
  run: async ({ sock, msg, args, usedPrefix, command }) => {
    try {
      if (!args[0]) {
        return msg.reply('《✧》 Por favor, menciona el nombre o URL del video que deseas descargar')
      }
      const text = args.join(' ')
      if (!isYTUrl(text) && text.length > 57) {
        return msg.reply('《✧》 La consulta es demasiado larga, por favor acórtala e intenta de nuevo.')
      }

      const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
      const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text
      let url = query, title = null, thumbBuffer = null

      try {
        const videoInfo = await getVideoInfo(query, videoMatch)
        if (videoInfo) {
          url = videoInfo.url
          title = videoInfo.title
          thumbBuffer = await getBuffer(videoInfo.image)
          const vistas = (videoInfo.views || 0).toLocaleString()
          const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
          const botSettings = db.getSettings(botId) || {}
          const botname = botSettings.botname || ''
          const namebot = botSettings.namebot || ''
          const canal = videoInfo.author?.name || 'Desconocido'
          
          const infoMessage = `➩ Descargando › ${title}\n\n> ❖ Canal › *${canal}*\n> ⴵ Duración › *${videoInfo.timestamp || 'Desconocido'}*\n> ❀ Vistas › *${vistas}*\n> ✩ Publicado › *${videoInfo.ago || 'Desconocido'}*\n> ❒ Enlace › *${url}*`
          
          await sock.sendMessage(msg.chat, { 
            text: infoMessage, 
            linkPreview: url && thumbBuffer ? (await prepareWAMessageMedia({ image: thumbBuffer }, { upload: sock.waUploadToServer, mediaTypeOverride: 'thumbnail-link'}).then(({ imageMessage }) => ({ 'canonical-url': url, 'matched-text': url, title: botname, description: `${namebot}, mᥲძᥱ ᥕі𝗍һ ♥ ᑲᥡ ${dev}`, jpegThumbnail: imageMessage?.jpegThumbnail ? Buffer.from(imageMessage.jpegThumbnail) : undefined, highQualityThumbnail: imageMessage || undefined }))) : undefined, 
            contextInfo: { mentionedJid: [msg.sender], isForwarded: false } 
          }, { quoted: msg })
        }
      } catch (err) {
        console.error('[YTSearch Error]:', err)
      }

      let audio = await getAudioFromApis(url);

      if (!audio?.url) {
        return msg.reply('《✧》 No se pudo descargar el *audio*, intenta más tarde.')
      }
      
      const audioBuffer = await getBuffer(audio?.url); 

      if (!audioBuffer || audioBuffer.length < 10000) {
        throw new Error('Audio vacío o inválido')
      }

      await sock.sendPresenceUpdate('recording', msg.chat)
      await new Promise(resolve => setTimeout(resolve, 3000))
      await sock.sendPresenceUpdate('paused', msg.chat)
      
      await sock.sendMessage(msg.chat, { 
        audio: audioBuffer, 
        fileName: `${title || 'audio'}.mp3`, 
        mimetype: 'audio/mpeg' 
      }, { quoted: msg })

    } catch (e) {
      await msg.reply(`《✧》 Ocurrió un error al descargar el audio: *KaedeApiError: ${e.message}*\n> Si el error persiste, por favor repórtalo en el grupo de soporte.`)
    }
  }
}
        
async function getAudioFromApis(url) {
  const apis = [
    { api: 'Yuki V2', endpoint: `${global.APIs?.yuki?.url || ''}/dl/ytmp3v2?url=${encodeURIComponent(url)}&key=${global.APIs?.yuki?.key || ''}`, extractor: res => res?.data?.dl },
    { api: 'AnaBot', endpoint: `${global.APIs?.anabot?.url || ''}/api/download/ytmp3?url=${encodeURIComponent(url)}&apikey=${global.APIs?.anabot?.key || ''}`, extractor: res => res?.data?.result?.urls },
    { api: 'lempi', endpoint: `https://api.lempi.lat/dl/ytv?url=${encodeURIComponent(url)}&apikey=montekey28`, extractor: res => res?.datos?.url },
    { api: 'Alya', endpoint: `${global.APIs?.alya?.url || ''}/dl/ytmp3?url=${encodeURIComponent(url)}&key=${global.APIs?.alya?.key || ''}`, extractor: res => res?.data?.dl },
    { api: 'Shadow', endpoint: `${global.APIs?.light?.url || ''}/download/ytdl?q=${encodeURIComponent(url)}&format=mp3&quality=128`, extractor: res => res?.resul?.dl_url },
    { api: 'Axi', endpoint: `${global.APIs?.axi?.url || ''}/down/ytaudio?url=${encodeURIComponent(url)}`, extractor: res => res?.resultado?.url_dl },    
    { api: 'Ootaizumi', endpoint: `${global.APIs?.ootaizumi?.url || ''}/downloader/youtube/play?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download },
    { api: 'Vreden', endpoint: `${global.APIs?.vreden?.url || ''}/api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=256`, extractor: res => res.result?.download?.url },
    { api: 'Stellar', endpoint: `${global.APIs?.stellar?.url || ''}/dl/ytdl?url=${encodeURIComponent(url)}&format=mp3&key=${global.APIs?.stellar?.key || ''}`, extractor: res => res.result?.download },
    { api: 'Ootaizumi v2', endpoint: `${global.APIs?.ootaizumi?.url || ''}/downloader/youtube?url=${encodeURIComponent(url)}&format=mp3`, extractor: res => res.result?.download },
    { api: 'Vreden v2', endpoint: `${global.APIs?.vreden?.url || ''}/api/v1/download/play/audio?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
    { api: 'Nekolabs', endpoint: `${global.APIs?.nekolabs?.url || ''}/downloader/youtube/v1?url=${encodeURIComponent(url)}&format=mp3`, extractor: res => res.result?.downloadUrl },
    { api: 'Nekolabs v2', endpoint: `${global.APIs?.nekolabs?.url || ''}/downloader/youtube/play/v1?q=${encodeURIComponent(url)}`, extractor: res => res.result?.downloadUrl }
  ]

  for (const { api, endpoint, extractor } of apis) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const response = await fetch(endpoint, { signal: controller.signal })
      clearTimeout(timeout)
      if (!response.ok) continue
      const res = await response.json()
      const link = extractor(res)
      if (link) return { url: link, api }
    } catch (e) {}
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  try {
    const savetube = new SaveTube()
    const res = await savetube.download(url, true)
    if (res?.dl) {
      return {
        url: res.dl,
        api: 'SaveTube CDN',
        title: res.title
      }
    }
  } catch (e) {
    console.log('SaveTube falló:', e.message)
  }
  
  return null
}