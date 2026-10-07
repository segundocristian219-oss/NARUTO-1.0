import { promises as fs } from 'fs';
import db from '#db';

const charactersFilePath = './core/characters.json';
async function loadCharacters() {
  const data = await fs.readFile(charactersFilePath, 'utf-8');
  return JSON.parse(data);
}
function flattenCharacters(structure) {
  return Object.values(structure).flatMap(s => Array.isArray(s.characters) ? s.characters : []);
}

export default {
  command: ['setfav', 'setfavourite'],
  category: 'gacha',
  run: async ({ msg, sock, args, usedPrefix, command}) => {
    const chat = db.getChat(msg.sender)
    if (chat.adminonly) {
        return msg.reply(`ꕥ Para utilizar comandos de *Gacha* en este grupo, se requiere desactivar el modo *Sólo administradores*.\n\n> Un *administrador* puede desactivarlo con el comando » *${usedPrefix}onlyadmin off*`)
    }
    if (!chat.gacha) {
      return msg.reply(`ꕥ Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}gacha on*`)
    }
    if (!args.length) {
      return msg.reply(`❀ Debes especificar un personaje.\n> Ejemplo » *${usedPrefix + command} Hitori Gotou*`)
    }
    db.setCreate('chat_users', [msg.chat, msg.sender], 'favorite', '');
    db.setCreate('users', msg.sender, 'favorite', '')
    let user = db.getChatUser(msg.chat, msg.sender)
    if (!Array.isArray(user.characters)) user.characters = [];
    try {
      const structure = await loadCharacters()
      const allCharacters = flattenCharacters(structure)
      const name = args.join(' ').toLowerCase().trim()
     // const character = allCharacters.find(c => c.name.toLowerCase() === name)
      const character = allCharacters.find(c => String(c.name).toLowerCase() === name) || allCharacters.find(c => String(c.name).toLowerCase().includes(name) || (Array.isArray(c.tags) && c.tags.some(tag => tag.toLowerCase().includes(name)))) || allCharacters.find(c => name.split(' ').some(q => String(c.name).toLowerCase().includes(q) || (Array.isArray(c.tags) && c.tags.some(tag => tag.toLowerCase().includes(q)))))
      if (!character) return msg.reply(`《✧》 No se ha encontrado el personaje *${name}*.\n> Para añadir animes al bot » *${usedPrefix}addanime*`)
      const isClaimed = user.characters.includes(character.id);
      if (!isClaimed) return msg.reply(`ꕥ El personaje *${character.name}* no está reclamado por ti.`)
      const previousId = user.favorite
      db.setChatUser(msg.chat, msg.sender, 'favorite', character.id);
      db.setUser(msg.sender, 'favorite', character.id);
      if (previousId && previousId !== character.id) {
        const prevChar = db.getCharacter(previousId);
        const prevName = prevChar?.name || 'personaje anterior'
        return msg.reply(`❀ Se ha reemplazado tu favorito *${prevName}* por *${character.name}*!`)
      }
      return msg.reply(`❀ Ahora *${character.name}* es tu personaje favorito!`)
    } catch (e) {
      await msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
}