import fetch from 'node-fetch'
import db from '#db'

export default {
  command: ['waifu', 'neko'],
  category: 'anime',
  run: async ({ msg, sock, args, usedPrefix, command, text}) => {
    try {
      await msg.react('🕒')
      const chat = db.getChat(msg.chat)
      let mode = chat?.nsfw ? 'nsfw' : 'sfw'
      let res = await fetch(`https://nekos.best/api/v2/${command}/${mode === 'nsfw' ? 'type=nsfw' : ''}`)
      if (!res.ok) return
      let json = await res.json()
      if (!json.url) return
      let img = Buffer.from(await (await fetch(json.url)).arrayBuffer())
      await sock.sendFile(msg.chat, img, 'thumbnail.jpg', `ꕥ Aquí tienes tu *${command.toUpperCase()}* ฅ^•ﻌ•^ฅ`, msg)
      await msg.react('✔️')
    } catch (e) {
      await msg.react('✖️')
      await msg.reply(`> Ocurrio un error al ejecutar *${usedPrefix + command}*. Porfavor, intenta nuevamente, si el error persiste contacta con soporte.\n> [Error: *${e.message}*]`)
    }
  },
}
