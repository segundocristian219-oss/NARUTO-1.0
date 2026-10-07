import { gotScraping } from 'got-scraping'

const RE_URL = /(?:https?:\/\/)?(?:www\.|m\.|web\.|l\.)?facebook\.com\/[^\s<>"']+|fb\.watch\/[^\s<>"']+/i
const RE_ID = /\/reel\/(\d+)|[?&]v=(\d+)|\/videos\/(\d+)/
const RE_SHORT = /\/share\/(?:v|r|p)\/|fb\.watch\//

const HDR = {
  accept: 'text/html,application/xhtml+xml',
  'accept-language': 'es-ES,es;q=0.9'
}

const GOT = {
  headerGeneratorOptions: {
    browsers: ['chrome'],
    operatingSystems: ['windows']
  },
  followRedirect: true
}

export const fbRequest = (url, options = {}) =>
  gotScraping(url, {
    ...GOT,
    ...options
  })

export const reelPage = id =>
  `https://www.facebook.com/reel/${id}`

export const reelId = url =>
  (url.match(RE_ID) || []).slice(1).find(Boolean)

export const unescapeFB = str =>
  str
    .replace(/\\u([0-9a-f]{4})/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    )
    .replace(/\\\//g, '/')

export function parseNumber(value) {
  if (value == null || value === '') return null

  const n = parseFloat(
    String(value)
      .replace(/[^\d.,KMB]/gi, '')
      .replace(',', '.')
  )

  if (Number.isNaN(n)) return null

  const upper = String(value).toUpperCase()

  if (/K|MIL/.test(upper)) return Math.round(n * 1e3)
  if (/M/.test(upper)) return Math.round(n * 1e6)

  return Math.round(n)
}

export const extractFromTitle = (title, key) =>
  parseNumber(
    title?.match(
      new RegExp(`([\\d.,]+)\\s*(mil|k|m)?\\s*${key}`, 'i')
    )?.[0]
  )

export const beforePost = (html, postId, regex) =>
  html.match(
    new RegExp(
      `${regex.source}[\\s\\S]{0,8000}?"post_id":"${postId}"`
    )
  )?.[1]

export function parseStats(html, id) {
  const ogTitle =
    html.match(/property="og:title" content="([^"]+)"/i)?.[1]

  const ogDescription =
    html.match(/property="og:description" content="([^"]+)"/i)?.[1]

  const postId =
    html.match(
      new RegExp(
        `"video":\\{"id":"${id}"[\\s\\S]{0,12000}?"post_id":"(\\d+)"`
      )
    )?.[1] ||
    html.match(/"post_id":"(\d+)"/)?.[1]

  const last =
    ogTitle?.split('|').pop()?.trim()

  const stats = {
    reelId: id,
    url: reelPage(id),

    description:
      ogDescription ||
      (
        last &&
        !/views|reproducciones|reactions|reacciones/i.test(last)
      )
        ? last
        : null,

    views:
      +(
        html.match(
          /"(?:play|video_view|view)_count":(\d+)/
        )?.[1] || ''
      ) ||
      extractFromTitle(
        ogTitle,
        'reproducciones|views?'
      ),

    reactions: postId
      ? +(
          beforePost(
            html,
            postId,
            /"unified_reactors":\{"count":(\d+)/
          ) || ''
        )
      : null,

    comments: postId
      ? +(
          beforePost(
            html,
            postId,
            /"total_comment_count":(\d+)/
          ) || ''
        )
      : null,

    shares: postId
      ? parseNumber(
          beforePost(
            html,
            postId,
            /"share_count_reduced":"([^"]+)"/
          )
        )
      : null,

    ownerId:
      html.match(
        new RegExp(
          `facebook\\.com/(\\d+)/videos/[^"']*${id}`
        )
      )?.[1]
  }

  if (!stats.reactions) {
    stats.reactions = extractFromTitle(
      ogTitle,
      'reacciones|reactions?'
    )
  }

  if (!stats.views) {
    stats.views = extractFromTitle(
      ogTitle,
      'reproducciones|views?'
    )
  }

  return stats
}

export function parseVideo(html, id) {
  const chunk = html.includes(`"id":"${id}"`)
    ? html.slice(
        html.indexOf(`"id":"${id}"`),
        html.indexOf(`"id":"${id}"`) + 25000
      )
    : html

  const match = regex =>
    (chunk.match(regex) || html.match(regex))?.[1]

  return unescapeFB(
    match(
      /"browser_native_hd_url":"((?:\\.|[^"\\])+)"/
    ) ||
    match(
      /"browser_native_sd_url":"((?:\\.|[^"\\])+)"/
    ) ||
    ''
  )
}

export async function getReel(input) {
  const raw = String(input || '').trim()

  const link = (
    raw.match(RE_URL)?.[0] ||
    raw.split(/\s+/)[0]
  )?.replace(/[.,;:!?)]+$/g, '')

  if (!link) return null

  const source = link.startsWith('http')
    ? link
    : `https://${link}`

  let id = reelId(source)
  let html

  if (!id && RE_SHORT.test(source)) {
    const response = await fbRequest(source, {
      timeout: { request: 45000 },
      headers: HDR
    })

    id =
      reelId(response.url) ||
      response.body.match(/\/reel\/(\d+)/)?.[1]

    html = response.body

    if (!id) return null
  }

  if (!id) return null

  const url = reelPage(id)

  if (!html) {
    const response = await fbRequest(url, {
      timeout: { request: 45000 },
      headers: HDR
    })

    if (response.statusCode !== 200) {
      throw new Error(`HTTP ${response.statusCode}`)
    }

    if (/login|two_step_verification/i.test(response.url)) {
      throw new Error(
        'Reel privado'
      )
    }

    html = response.body
  }

  const stats = parseStats(html, id)

  stats.sourceUrl =
    source !== url
      ? source
      : undefined

  stats.videoUrl = parseVideo(html, id)

  return stats
}

export async function downloadReel(url) {
  const reel = await getReel(url)

  if (!reel) {
    throw new Error('No se pudo obtener el reel')
  }

  if (!reel.videoUrl) {
    throw new Error('Video no disponible')
  }

  const video = await fbRequest(reel.videoUrl, {
    responseType: 'buffer',
    timeout: {
      request: 120000
    },
    headers: {
      referer: reel.url,
      origin: 'https://www.facebook.com'
    }
  })

  if (
    video.statusCode !== 200 ||
    video.rawBody.length < 5000
  ) {
    throw new Error(
      'No se pudo descargar el video'
    )
  }

  return {
    ...reel,
    buffer: video.rawBody
  }
}

export function formatNumber(n) {
  if (n == null) return '—'

  if (n >= 1e6) {
    return `${(n / 1e6)
      .toFixed(1)
      .replace(/\.0$/, '')}M`
  }

  if (n >= 1e4) {
    return `${Math.round(n / 1e3)}K`
  }

  return `${n}`
}

export function createCaption(data) {
  return `> ❀ Título » *${data.description || 'Reel'}*\n> ⴵ Vistas » *${data.views || 'Desconocido'}*\n> ❏ Comentarios » *${data.comments}*\n\n> 🜸 URL » *${data.url}*`
}