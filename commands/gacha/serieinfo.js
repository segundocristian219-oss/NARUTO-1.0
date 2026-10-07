import { promises as fs } from "fs"
import stringSimilarity from "string-similarity"
import db from '#db'

const charactersFilePath = "./core/characters.json"

async function loadCharacters() {
  try {
    const data = await fs.readFile(charactersFilePath, "utf-8")
    return JSON.parse(data)
  } catch {
    await fs.writeFile(charactersFilePath, "{}")
    return {}
  }
}

function getSeriesByName(data, query) {
  query = query.toLowerCase()
  const entries = Object.entries(data)

  const exactName = entries.find(([_, s]) =>
    s.name.toLowerCase() === query
  )
  if (exactName) return exactName

  const exactTag = entries.find(([_, s]) =>
    Array.isArray(s.tags) &&
    s.tags.some(tag => tag.toLowerCase() === query)
  )
  if (exactTag) return exactTag

  const allNames = entries.map(([_, s]) => s.name)
  const nameMatch = stringSimilarity.findBestMatch(query, allNames)

  if (nameMatch.bestMatch.rating >= 0.4) {
    const bestName = nameMatch.bestMatch.target
    return entries.find(([_, s]) => s.name === bestName)
  }

  const allTags = entries.flatMap(([_, s]) => s.tags || [])
  const tagMatch = stringSimilarity.findBestMatch(query, allTags)

  if (tagMatch.bestMatch.rating >= 0.4) {
    const bestTag = tagMatch.bestMatch.target
    return entries.find(([_, s]) =>
      (s.tags || []).includes(bestTag)
    )
  }

  return null
}

export default {
  command: ["ainfo", "animeinfo", "serieinfo"],
  category: "gacha",
  run: async ({ sock, msg, args, usedPrefix, command}) => {
    try {
      const chat = db.getChat(msg.chat)
      if (chat.adminonly) {
        return msg.reply(`ꕥ Para utilizar comandos de *Gacha* en este grupo, se requiere desactivar el modo *Sólo administradores*.\n\n> Un *administrador* puede desactivarlo con el comando » *${usedPrefix}onlyadmin off*`)
      }   
      if (!chat.gacha) {
        return msg.reply(`ꕥ Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con:\n» *${usedPrefix}gacha on*`)
      }

      if (!args[0]) {
        return msg.reply(`❀ Debes especificar la serie.\n> Ejemplo: *${usedPrefix + command} Blue Archive*`)
      }


      let page = 1
      const pageArg = args.find(a => /^page=\d+$/i.test(a))
      if (pageArg) page = parseInt(pageArg.split("=")[1]) || 1

      const query = args
        .filter(a => a !== pageArg)
        .join(" ")
        .trim()

      const allCharactersData = await loadCharacters();
      const seriesEntry = getSeriesByName(allCharactersData, query);

      if (!seriesEntry) {
        return msg.reply(`ꕥ No se encontró la serie *${query}*.\n> Usa ${usedPrefix}suggest Sugerencia de la serie: ${query}`)
      }

      const [seriesId, series] = seriesEntry
      const characters = Array.isArray(series.characters) ? [...series.characters].sort((a, b) => {
      const valA = Number(db.getCharacter(a.id)?.value ?? a.value ?? 100)
      const valB = Number(db.getCharacter(b.id)?.value ?? b.value ?? 100)
      return valB - valA
      }) : []
      const allChatUsers = db.getChatUser(msg.chat);

      if (!characters.length) {
        return msg.reply(`ꕥ La serie *${series.name}* no tiene personajes.`)
      }

      for (const u of allChatUsers) {
        if (u.characters && typeof u.characters === "string") {
          try {
            u.characters = JSON.parse(u.characters)
          } catch {
            u.characters = []
          }
        }
      }

      const owners = new Map()

      for (const user of allChatUsers) {
        if (!Array.isArray(user.characters)) continue
        for (const id of user.characters) {
          owners.set(id, user)
        }
      }

      const total = characters.length

      const claimedChars = characters.filter(c => allChatUsers.some(u => Array.isArray(u.characters) && u.characters.includes(c.id)));

      const claimed = claimedChars.length
      const percent = ((claimed / total) * 100).toFixed(0)

      const perPage = 90
      const totalPages = Math.ceil(total / perPage)

      if (page > totalPages) {
        return msg.reply(`❀ La página *${page}* no existe.\n> Esta serie solo tiene *${totalPages}* páginas.\n> Ejemplo: *${usedPrefix + command} ${series.name} page=1*`)
      }

      const start = (page - 1) * perPage
      const end = Math.min(start + perPage, total)

      let text = `*❀ Nombre:* \`<${series.name}>\`\n\n`
      text += `❏ Personajes » *\`${total}\`*\n`
      text += `♡ Reclamados » *\`${claimed}/${total} (${percent}%)\`*\n`
      text += `❏ Lista de personajes:\n\n`

      for (let i = start; i < end; i++) {
  const c = characters[i]

const ownerEntry = owners.get(c.id)

let estado = "Libre"

if (ownerEntry) {
  const who = ownerEntry.user_id

  let name = db.getUser(who)?.name

  if (!name) {
    try {
      const n = await sock.getName(who)
      name = typeof n === "string" && n.trim()
        ? n
        : who.split("@")[0]
    } catch {
      name = who.split("@")[0]
    }
  }

  estado = `Reclamado por *${name}*`
}

const character = db.getCharacter(c.id)

const value = Number(character?.value ?? c.value ?? 100)

text += `» *${c.name}* (${value}) • ${estado}.\n`
}

text += `\n> ⌦ _Página *${page}* de *${totalPages}*_`

if (totalPages > 1) {
  if (page > 1) {
    text += `\n> Usa *${usedPrefix}${command} ${series.name} page=${page - 1}* para ver la página anterior.`
  }

  if (page < totalPages) {
    text += `\n> Usa *${usedPrefix}${command} ${series.name} page=${page + 1}* para ver la siguiente página.`
  }
}

   await sock.reply(msg.chat, text, msg)

    } catch (err) {
      await msg.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${err.message}`)
    }
  }
}