import yts from 'yt-search'
import fetch from 'node-fetch'
import { getBuffer } from '#message'
import axios from 'axios'
import { prepareWAMessageMedia } from '@whiskeysockets/baileys'
import db from '#db'

const isYTUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url)

export default {
  command: ['play2', 'mp4', 'ytmp4', 'ytvideo', 'playvideo'],
  category: 'downloader',
  run: async ({ sock, msg, args, usedPrefix, command }) => {
    try {
      if (!args[0]) {
        return msg.reply('《✧》Por favor, menciona el nombre o URL del video que deseas descargar')
      }
      const botId = sock?.user?.id.split(':')[0] + '@s.whatsapp.net';
      const botSettings = db.getSettings(botId)
      const botname = botSettings.botname || '';
      const namebot = botSettings.namebot || '';
      const owner = botSettings.owner || '';
      const text = args.join(' ')
      if (text.length > 65) return msg.reply('《✧》 La consulta es demasiado larga, por favor acortala e intenta de nuevo.')
      const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
      const query = videoMatch ? `https://www.youtube.com/watch?v=${videoMatch[1]}` : text
      let url = query, title = null, thumbBuffer = null
      try {
        const search = await yts(query)
        if (search.all.length) {
          const videoInfo = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
          if (videoInfo) {
            url = videoInfo.url
            title = videoInfo.title
            thumbBuffer = await getBuffer(videoInfo.image)
            const vistas = (videoInfo.views || 0).toLocaleString()
            const canal = videoInfo.author?.name || 'Desconocido'
            const infoMessage = `➩ Descargando › *${title}*

> ❖ Canal › *${canal}*
> ⴵ Duración › *${videoInfo.timestamp || 'Desconocido'}*
> ❀ Vistas › *${vistas}*
> ❒ Enlace › *${url}*`
            await sock.sendMessage(msg.chat, { text: infoMessage, linkPreview: url && thumbBuffer ? (await prepareWAMessageMedia ({ image: thumbBuffer }, { upload: sock.waUploadToServer, mediaTypeOverride: 'thumbnail-link'}).then(({ imageMessage }) => ({'canonical-url': url, 'matched-text': url, title: botname, description: `${namebot}, mᥲძᥱ ᥕі𝗍һ ♥ ᑲᥡ ${dev}`, jpegThumbnail: imageMessage?.jpegThumbnail ? Buffer.from(imageMessage.jpegThumbnail) : undefined, highQualityThumbnail: imageMessage || undefined }))) : undefined, contextInfo: { mentionedJid: [msg.sender], isForwarded: false }}, { quoted: msg })
          }
          }
          } catch(err) {
               console.log('YT Search Error:', err.message)
      }
            const video = await getVideoFromApis(url)
      if (!video?.url) {
        return msg.reply('《✧》 No se pudo descargar el *video*, intenta más tarde.')
      }
       const sizeMB = await getSizeMedia(video.url)
      if (sizeMB && sizeMB > 90) {
        return msg.reply(`《✧》 El video excede el límite de tamaño permitido de 90.00MB. (Tamaño: *${sizeMB.toFixed(2)}MB)*`)
      }
      const videoBuffer = await getBuffer(video.url)
      await sock.sendMessage(msg.chat, { video: videoBuffer, fileName: `${title || 'video'}.mp4`, mimetype: 'video/mp4' }, { quoted: msg })
    } catch (e) {
      await msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}

const api_url = 'https://api.lempi.lat/dl/ytv?url='
const api_key = 'lem_194278ddfa4a1f04552776be1530f068a7b05914';
const max_video_size = 50 * 1024 * 1024

async function getFareVideo(url) {
    const res = await fetch(`${api_url}${encodeURIComponent(url)}&apikey=${api_key}`, {
        headers: {
            accept: 'application/json',
            'user-agent': 'Mozilla/5.0'
        }
    })

    const text = await res.text()

    if (!res.ok) {
        throw new Error(`FareAPIError: ${res.status}: ${text.slice(0, 200)}`)
    }

    try {
        return JSON.parse(text)
    } catch {
        throw new Error(`FareAPIError: ${text.slice(0, 200)}`)
    }
}

async function fetchJson(url, options = {}) {
    const res = await fetch(url, options)
    const json =  await res.json().catch(() => null)
    
    if (!res.ok) {
        throw new Error(json?.message || json?.error || `HTTP ${res.status}`)
    }
    
    return json
}

async function getVideoFromRyze(url) {
    const res = await fetchJson(ryze_api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': ryze_key
        },
        body: JSON.stringify({
            input: {
                url,
                format: ryze_format,
                attempts: ryze_attempts,
                interval_ms: ryze_interval
            }
        })
    })
    
    const result = res?.result
    
    if (!res?.success || !result?.success) {
        throw new Error(res?.error || result?.error || 'El servidor no devolvio una rspuesta valida xd')
    }
    
     const video_url = result?.file_url || result?.download_urls?.[0] || null


    if (!video_url) {
        throw new Error('Ryze no devolvió URL de descarga')
    }
    
    return {
        url: video_url,
        title: result.title || null,
        provider: result.provider || null,
        format: result.format || ryze_format,
        quality: result.selected_media?.quality || result.format || ryze_format,
        extension: result.selected_media?.extension || 'MP4',
        size: result.selected_media?.size || null,
        worker_url: result.diagnostics?.worker_url || null
    }
}
const QUALITY_VIDEO = [144, 240, 360, 480, 720, 1080]

const get = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': 'https://app.ytdown.to',
    'Referer': 'https://app.ytdown.to/es29/',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 13; SM-S908E Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/148.0.7778.178 Mobile Safari/537.36'
  },
  timeout: 30000
})

export async function getSizeMedia(url) {
  try {
    const res = await axios.head(url)

    const length = parseInt(res.headers['content-length'])

    if (isNaN(length)) return null

    return length / (1024 * 1024) // MB
  } catch {
    return null
  }
}

async function getMediaItems(url) {
  const { data } = await get.post('https://app.ytdown.to/proxy.php', new URLSearchParams({ url }).toString())
  const json = typeof data === 'string' ? JSON.parse(data) : data
  if (json?.api?.status !== 'ok') throw new Error('Ocurrió un error al procesar el audio: ', json)
  return json.api.mediaItems || []
}

async function pollUrl(mediaUrl, attempts = 25, interval = 3000) {
  for (let i = 0; i < attempts; i++) {
    const { data } = await get.post('https://app.ytdown.to/proxy.php', new URLSearchParams({ url: mediaUrl }).toString())
    const raw = typeof data === 'string' ? data : JSON.stringify(data)

    const direct = raw.match(/https:\/\/dl\.iamworker\.com[^\s"'<>\\]+/)?.[0]
    if (direct) return direct

    let json
    try { json = typeof data === 'string' ? JSON.parse(data) : data } catch { json = null }
    
    const fileUrl = json?.api?.fileUrl
    if (fileUrl && fileUrl !== 'Waiting...') return fileUrl

    await new Promise(r => setTimeout(r, interval))
  }
  throw new Error('Tiempo de espera agotado, intenta de nuevo')
}

async function getVideoWithRetry(ytUrl, quality, maxRetries = 3) {
  let lastError
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const items = await getMediaItems(ytUrl)
      const videos = items.filter(i => i.type === 'Video')
      if (!videos.length) throw new Error('No se encontraron formatos de video')
      const chosen = videos.find(i => i.mediaUrl.includes(`${quality}p`)) || videos[0]
      const realQuality = QUALITY_VIDEO.find(q => chosen.mediaUrl.includes(`${q}p`)) || quality
      const downloadUrl = await pollUrl(chosen.mediaUrl)
      return { downloadUrl, size: chosen.mediaFileSize || '?', res: chosen.mediaRes || '?', quality: realQuality }
    } catch (e) {
      lastError = e
      if (attempt < maxRetries) await new Promise(r => setTimeout(r, 2000))
    }
  }
  throw lastError
}

async function getVideoFromApis(url) {
  const apis = [
    { 
      api: 'Fare', 
      custom: true,
      extractor: async () => {
        const res = await getFareVideo(url)

        return (
          res?.result?.download ||
          res?.result?.url ||
          res?.download ||
          res?.url ||
          null
        )
      }
    },
    { api: 'Axi', endpoint: `${global.APIs.axi.url}/down/ytvideo?url=${encodeURIComponent(url)}`, extractor: res => res?.resultado?.url_dl },        
    { api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/v1/download/youtube/video?url=${encodeURIComponent(url)}&quality=360`, extractor: res => res.result?.download?.url },
    { api: 'Stellar', endpoint: `${global.APIs.yuki.url}/dl/ytdl?url=${encodeURIComponent(url)}&format=mp4&key=${global.APIs.yuki.key}`, extractor: res => res.result?.download },
    { api: 'Nekolabs', endpoint: `${global.APIs.nekolabs.url}/downloader/youtube/v1?url=${encodeURIComponent(url)}&format=360`, extractor: res => res.result?.downloadUrl },
    { api: 'Vreden v2', endpoint: `${global.APIs.vreden.url}/api/v1/download/play/video?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
    { api: 'Betabotz', endpoint: `https://betabotz.eu.org/api/download/ytmp4?url=${encodeURIComponent(url)}&apikey=Btz-b2H2x`, extractor: res => res.data?.result?.mp4 || res.data?.result?.url },
    { api: 'Dix lat', endpoint: `${global.APIs.dix.url}/mp4?url=${encodeURIComponent(url)}`, extractor: res => res.data?.dl}
  ]

  for (const { api, endpoint, extractor } of apis) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      const res = await fetch(endpoint, {
        signal: controller.signal
      }).then(r => r.json())

      clearTimeout(timeout)

      const link = extractor(res)

      if (link) {
        return {
          url: link,
          api
        }
      }
    } catch {}
  }
  try {
    const download = await getFareVideo(url)
    return {
      url: download?.descarga?.url,
      api: 'lempi'
    }
  } catch (e) {
    console.log('Lempi:', e.message)
  }
  try {
    const video = 480
    const download = await getVideoWithRetry(url, video)

    if (download) {
      return {
        url: download.downloadUrl,
        api: 'YTDown'
      }
    }
  } catch (e) {
    console.log('YTDown error:', e.message)
  }

  return null
}
