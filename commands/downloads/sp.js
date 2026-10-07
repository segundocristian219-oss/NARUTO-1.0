import fetch from 'node-fetch'

export default {
    command: ['sp', 'spotify'],
    category: 'downloader',
    run: async (client, m, args, usedPrefix, command) => {
    
    const text = args[0]
        
    if (!text) return m.reply('《✧》 ingresa el *nombre* o *URL* de una cancion de Spotify.')

    try {
        let song;
        const isSpotifyUrl = text.startsWith('https://open.spotify.com/')
        
        if (isSpotifyUrl) {
            song = { url: text }
        } else {
            const results = await fetch(`https://api.delirius.store/search/spotify?q=${encodeURIComponent(text)}&limit=1`)
            const json = await results.json()
            if (!json.status || !json.data.length) return m.reply('《✧》 No se pudo encontrar la *cancion*, intenta de nuevo más tarde.')
            song = json.data[0]
        }
        
        const res = await fetch(`https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(song.url)}&limit=1`)
        const json2 = await res.json()
        const data = json2.data
        if (!json2.status || !data) return m.reply('《✧》 Ha ocurrido un error al obtener resultados.\n> Si el problema persiste reportalo al grupo oficial.')
        
        if (!data?.download) return m.reply('《✧》 Ha ocurrido un error al extraer la descarga.\n> Si el problema persiste reportalo al grupo oficial.')
        
        const caption = `➩ Descargando › *${data.title}*\n\n` +
              `> ❖ Artista › *${data.artist}*\n` +
              (song.album? `> ✩ Álbum › *${song.album}*\n` : '') +
              `> ⴵ Duración › *${data.duration}*\n` +
              `> ❒ Enlace › *${song.url}*`
        
        await client.sendMessage(m.chat, { image: { url: data.image }, caption: caption }, { quoted: m })
        await client.sendMessage(m.chat, { audio: { url: data.download }, mimetype: 'audio/mpeg', fileName: `${data.title}.mp3` }, { quoted: m })
        
    } catch (e) {
        await m.reply(`> Ocurrió un error al ejecutar *${usedPrefix + command}*, Si el error persiste reportalo usando *${usedPrefix}report*\n> [Error: *${e.message}*]`)
    }
    }
}