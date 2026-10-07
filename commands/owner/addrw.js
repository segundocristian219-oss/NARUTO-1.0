import { promises as fs } from "fs"
import db from "#db"

const charactersFilePath = "./core/characters.json"

async function loadCharacters() {
  try {
    const data = await fs.readFile(charactersFilePath, "utf-8")
    return JSON.parse(data)
  } catch {
    await fs.writeFile(charactersFilePath, "{}", "utf-8")
    return {}
  }
}

async function saveCharacters(data) {
  await fs.writeFile(
    charactersFilePath,
    JSON.stringify(data, null, 2), "utf-8")
}

function generateUniqueId(usedIds, type = "character") {
  let id

  do {
    if (type === "series") {
      id = Math.floor(
        10000000 + Math.random() * 90000000
      ).toString()
    } else {
      id = Math.floor(
        1000000 + Math.random() * 9000000
      ).toString()
    }
  } while (usedIds.has(id))

  return id
}

function getUsedIds(data) {
  const usedIds = new Set()

  for (const [seriesId, series] of Object.entries(data)) {
    usedIds.add(seriesId)

    if (!Array.isArray(series.characters)) continue

    for (const character of series.characters) {
      if (character.id) {
        usedIds.add(character.id)
      }
    }
  }

  return usedIds
}

function findSeriesByName(data, name) {
  const query = name.trim().toLowerCase()

  return Object.entries(data).find(
    ([_, series]) =>
      typeof series.name === "string" &&
      series.name.trim().toLowerCase() === query
  )
}

function findCharacterByName(characters, name) {
  const query = name.trim().toLowerCase()

  return characters.find(character => typeof character.name === "string" && character.name.trim().toLowerCase() === query)
}

export default {
  command: ["addrw"],
  category: "gacha",
  isOwner: true,
  run: async ({ sock, msg, args, usedPrefix, command}) => {

    try {

      const chat = db.getChat(msg.chat)

      if (chat.adminonly) {
        return msg.reply(`ꕥ Para utilizar comandos de *Gacha* en este grupo, se requiere desactivar el modo *Sólo administradores*.\n\n> Un *administrador* puede desactivarlo con el comando » *${usedPrefix}onlyadmin off*`)
      }

      if (!chat.gacha) {
        return msg.reply(`ꕥ Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con:\n» *${usedPrefix}gacha on*`)
      }

      const input = args.join(" ").trim()

      if (!input) {
        return msg.reply(`❀ Debes proporcionar todos los datos.\n> Formato: *${usedPrefix}${command} nombre / genero / serie / tag*\n> Ejemplo: *${usedPrefix}${command} Guts / Hombre / Berserk / guts_(berserk)*`)
      }

      const parts = input.split("/").map(part => part.trim())

      if (parts.length !== 4) {
        return msg.reply(`❀ Los datos introducidos son incorrectos.\n\nDebes proporcionar exactamente estos 4 datos:\n1. Nombre del personaje\n2. Género\n3. Serie\n4. Tag\n\n> Formato:\n*${usedPrefix}${command} nombre / genero / serie / tag*\n\n> Ejemplo:\n*${usedPrefix}${command} Guts / Hombre / Berserk / guts_(berserk)*`)
      }

      const [ characterName,gender, seriesName,tag ] = parts

      if (!characterName || !gender || !seriesName || !tag ) {
        return msg.reply(`❀ Todos los datos son obligatorios.\n\nNo puedes dejar vacío ninguno de estos campos:\n\n> ❏ Nombre: ${characterName || "Vacío"}\n> ❏ Género: ${gender || "Vacío"}\n> ❏ Serie: ${seriesName || "Vacío"}\n> ❏ Tag: ${tag || "Vacío"}\n\n> Ejemplo:\n*${usedPrefix}${command} Guts / Hombre / Berserk / guts_(berserk)*`)
      }

      const data = await loadCharacters()
      const usedIds = getUsedIds(data)

      const seriesEntry = findSeriesByName(data, seriesName)

      if (seriesEntry) {
        const [seriesId, series] = seriesEntry
        if (!Array.isArray(series.characters)) {
          series.characters = []
        }

        const existingCharacter =
          findCharacterByName(
            series.characters,
            characterName
          )

        if (existingCharacter) {

          return msg.reply(`《✧》El personaje *${characterName}* ya existe en la serie *${series.name}*.\n\n> ID del personaje: *${existingCharacter.id}*`)
        }

        const characterId = generateUniqueId(usedIds, "character")

        const newCharacter = {
          id: characterId,
          name: characterName,
          gender: gender,
          tags: [tag],
          value: 14587
        }

        series.characters.push(newCharacter)

        await saveCharacters(data)

        return msg.reply(
          `《✧》 Personaje agregado correctamente.\n\n> ❏ Nombre: *${characterName}*\n> ❏ Género: *${gender}*\n> ❏ Serie: *${series.name}*\n> ❏ Tag: *${tag}*\n> ❏ ID: *${characterId}*\n> ❏ Valor: *100*\n\n`)
      }

      const seriesId = generateUniqueId(usedIds, "series")

      usedIds.add(seriesId)

      const characterId =
        generateUniqueId(
          usedIds,
          "character"
        )

      data[seriesId] = {
        name: seriesName,
        characters: [
          {
            id: characterId,
            name: characterName,
            gender: gender,
            tags: [tag],
            value: 100
          }
        ]
      }

      await saveCharacters(data)

      return msg.reply(
        `《✧》 Serie y personaje agregados correctamente.\n\n` +
        `> ❏ Serie: *${seriesName}*\n` +
        `> ❏ ID de serie: *${seriesId}*\n\n` +
        `> ❏ Personaje: *${characterName}*\n` +
        `> ❏ Género: *${gender}*\n` +
        `> ❏ Tag: *${tag}*\n` +
        `> ❏ ID del personaje: *${characterId}*\n` +
        `> ❏ Valor: *100*`
      )

    } catch (err) {
      return msg.reply(`《✧》 Se ha producido un problema al agregar el personaje.\n\n> ${err.message}`)
    }
  }
}
