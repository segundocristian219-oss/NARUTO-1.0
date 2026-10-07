import { gotScraping } from 'got-scraping'

const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'

const QUERY_ID = 'tmhPpO5sDermwYmq3h034A'

const FEATURES = {
  "creator_subscriptions_tweet_preview_api_enabled": true,
  "tweetypie_unmention_optimization_enabled": true,
  "responsive_web_edit_tweet_api_enabled": true,
  "graphql_is_translatable_rweb_tweet_is_translatable_enabled": true,
  "view_counts_everywhere_api_enabled": true,
  "longform_notetweets_consumption_enabled": true,
  "responsive_web_twitter_article_tweet_consumption_enabled": true,
  "tweet_awards_web_tipping_enabled": false,
  "freedom_of_speech_not_reach_fetch_enabled": true,
  "standardized_nudges_misinfo": true,
  "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": true,
  "rweb_video_timestamps_enabled": true,
  "longform_notetweets_rich_text_read_enabled": true,
  "longform_notetweets_inline_media_enabled": true,
  "responsive_web_graphql_exclude_directive_enabled": true,
  "verified_phone_label_enabled": false,
  "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false,
  "responsive_web_graphql_timeline_navigation_enabled": true,
  "responsive_web_enhance_cards_enabled": false
}


function parseTweetUrl(input) {
  const match = String(input).match(/status\/(\d+)/)
  if (match) return match[1]
  if (/^\d+$/.test(input)) return input
  return null
}

async function obtenerGuestToken() {
  const res = await gotScraping({
    url: 'https://api.twitter.com/1.1/guest/activate.json',
    method: 'POST',
    headers: { 'Authorization': `Bearer ${BEARER_TOKEN}` },
    responseType: 'json',
    retry: { limit: 2 }
  })
  return res.body.guest_token
}

function makeHeaders(guestToken) {
  return {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'x-guest-token': guestToken,
    'x-twitter-active-user': 'yes',
    'x-twitter-client-language': 'es'
  }
}

async function fetchTweetRaw(tweetId, guestToken) {
  const params = new URLSearchParams({
    variables: JSON.stringify({ tweetId, withCommunity: true, includePromotedContent: true, withVoice: true }),
    features: JSON.stringify(FEATURES)
  })

  const res = await gotScraping({
    url: `https://api.x.com/graphql/${QUERY_ID}/TweetResultByRestId?${params}`,
    headers: makeHeaders(guestToken),
    responseType: 'json',
    retry: { limit: 2 }
  })

  return res.body?.data?.tweetResult?.result
}

function extraerVideos(tweetResult) {
  const legacy = tweetResult?.legacy || tweetResult?.tweet?.legacy
  if (!legacy?.extended_entities?.media) return []

  const videos = []
  for (const media of legacy.extended_entities.media) {
    if (media.type !== 'video' && media.type !== 'animated_gif') continue
    const variantes = (media.video_info?.variants || [])
      .filter(v => v.content_type === 'video/mp4')
      .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))
    if (variantes.length) {
      videos.push({
        url: variantes[0].url,
        bitrate: variantes[0].bitrate,
        thumbnail: media.media_url_https,
        duracionMs: media.video_info?.duration_millis
      })
    }
  }
  return videos
}

function extraerInfo(tweetResult) {
  const legacy = tweetResult?.legacy || tweetResult?.tweet?.legacy
  const author = tweetResult?.core?.user_results?.result?.legacy
  return {
    texto: legacy?.full_text,
    autor: author?.screen_name,
    nombre: author?.name,
    avatar: author?.profile_image_url_https,
    likes: legacy?.favorite_count,
    retweets: legacy?.retweet_count,
    replies: legacy?.reply_count,
    vistas: tweetResult?.views?.count,
    fecha: legacy?.created_at
  }
}

async function descargarBuffer(url) {
  const res = await gotScraping({ url, responseType: 'buffer', timeout: { request: 120000 } })
  return res.body
}

async function descargarAvatar(url) {
  if (!url) return null
  try {
    const res = await gotScraping({ url, responseType: 'buffer', timeout: { request: 10000 } })
    if (res.body.length > 500) return res.body
  } catch {}
  return null
}


export async function twitterDescargar(urlOId) {
  const tweetId = parseTweetUrl(urlOId)
  if (!tweetId) throw new Error('No se pudo extraer el ID del tweet')

  const guestToken = await obtenerGuestToken()
  const result = await fetchTweetRaw(tweetId, guestToken)
  if (!result) throw new Error('Tweet no encontrado o es privado')

  const info = extraerInfo(result)
  const videos = extraerVideos(result)
  const avatarBuffer = await descargarAvatar(info.avatar)

  const buffers = []
  for (const v of videos) {
    const buf = await descargarBuffer(v.url)
    buffers.push({
      buffer: buf,
      bitrate: v.bitrate,
      duracionMs: v.duracionMs,
      thumbnail: v.thumbnail
    })
  }

  return {
    id: tweetId,
    ...info,
    avatarBuffer,
    videos: buffers,
    tieneVideo: buffers.length > 0
  }
}


export async function twitterInfo(urlOId) {
  const tweetId = parseTweetUrl(urlOId)
  if (!tweetId) throw new Error('No se pudo extraer el ID del tweet')

  const guestToken = await obtenerGuestToken()
  const result = await fetchTweetRaw(tweetId, guestToken)
  if (!result) throw new Error('Tweet no encontrado o es privado')

  const info = extraerInfo(result)
  const videos = extraerVideos(result)

  return {
    id: tweetId,
    ...info,
    videos: videos.map(v => ({
      url: v.url,
      bitrate: v.bitrate,
      duracionMs: v.duracionMs,
      thumbnail: v.thumbnail
    })),
    tieneVideo: videos.length > 0
  }
}


export async function twitterVideoUrl(urlOId) {
  const tweetId = parseTweetUrl(urlOId)
  if (!tweetId) throw new Error('No se pudo extraer el ID del tweet')

  const guestToken = await obtenerGuestToken()
  const result = await fetchTweetRaw(tweetId, guestToken)
  if (!result) throw new Error('Tweet no encontrado o es privado')

  const videos = extraerVideos(result)
  if (!videos.length) return null
  return videos[0].url
}