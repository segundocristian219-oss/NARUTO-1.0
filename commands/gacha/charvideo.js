import axios from 'axios';
import { promises as fs } from 'fs';
import db from '#db';

const FILE_PATH = './core/characters.json';

async function loadCharacters() {
  try {
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, '{}');
  }
  const raw = await fs.readFile(FILE_PATH, 'utf-8');
  return JSON.parse(raw);
}

function flattenCharacters(db) {
  return Object.values(db).flatMap(s => Array.isArray(s.characters) ? s.characters : []);
}

function getSeriesNameByCharacter(db, id) {
  return Object.entries(db).find(([, serie]) => Array.isArray(serie.characters) && serie.characters.some(c => String(c.id) === String(id)))?.[1]?.name || 'Desconocido';
}

function formatTag(tag) {
  return String(tag).trim().toLowerCase().replace(/\s+/g, '_');
}

function getRefererForUrl(url) {
  if (url.includes('safebooru.org')) return 'https://safebooru.org/';
  if (url.includes('danbooru.donmai.us')) return 'https://danbooru.donmai.us/';
  if (url.includes('gelbooru.com')) return 'https://gelbooru.com/';
  return '';
}

async function buscarVideoDelirius(tag) {
  const query = formatTag(tag);
  const sources = [
    { url: `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&tags=${query}&limit=100&api_key=98f554258c88c44f4dd28ccde0c28f36682b2a992490ab35ebcc7baf7e196a86d7550b174bce577b8cc3f544e9b3ad0f6aeb09ad63bf89a9141cc3eddb6fbfd2&user_id=1917269`, extract: (data) => {
        const posts = Array.isArray(data) ? data : data?.post || data?.data || [];
        return posts.map(i => i?.file_url).filter(u => typeof u === 'string' && /\.(gif|mp4)(\?.*)?$/i.test(u));
    }},
    { url: `https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=${query}&limit=100`, extract: (data) => {
        const posts = Array.isArray(data) ? data : data?.post || [];
        return posts.map(i => i?.file_url || (i?.directory && i?.image ? `https://safebooru.org/images/${i.directory}/${i.image}` : null)).filter(u => typeof u === 'string' && /\.(gif|mp4)(\?.*)?$/i.test(u));
    }},
    { url: `https://danbooru.donmai.us/posts.json?tags=${query}&limit=100`, extract: (data) => {
        const posts = Array.isArray(data) ? data : [];
        return posts.map(i => i?.file_url || i?.large_file_url).filter(u => typeof u === 'string' && /\.(gif|mp4)(\?.*)?$/i.test(u));
    }}
  ];
  const results = await Promise.allSettled(sources.map(async (source) => {
    const res = await axios.get(source.url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }, timeout: 8000 });
    return source.extract(res.data);
  }));
  const allUrls = results.filter(r => r.status === 'fulfilled' && r.value.length > 0).flatMap(r => r.value);
  return [...new Set(allUrls)];
}

export default {
  command: ['charvideo', 'waifuvideo', 'cvideo', 'wvideo'],
  category: 'gacha',
  run: async ({ sock, msg, args, usedPrefix, command }) => {
    try {
      const chat = db.getChat(msg.chat)
      if (chat.adminonly) {
        return msg.reply(`ꕥ Para utilizar comandos de *Gacha* en este grupo, se requiere desactivar el modo *Sólo administradores*.\n\n> Un *administrador* puede desactivarlo con el comando » *${usedPrefix}onlyadmin off*`)
      }
      if (!chat.gacha) {
        return msg.reply(`ꕥ Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}gacha on*`);
      }
      if (!args.length) {
        return msg.reply(`❀ Por favor, proporciona el nombre de un personaje.\n> Ejemplo » *${usedPrefix + command} Hitori Gotou*`);
      }
      const structure = await loadCharacters();
      const allCharacters = flattenCharacters(structure);
      const nameQuery = args.join(' ').toLowerCase().trim();
      const character = allCharacters.find(c => String(c.name).toLowerCase() === nameQuery) || allCharacters.find(c => String(c.name).toLowerCase().includes(nameQuery) || (Array.isArray(c.tags) && c.tags.some(tag => tag.toLowerCase().includes(nameQuery)))) || allCharacters.find(c => nameQuery.split(' ').some(q => String(c.name).toLowerCase().includes(q) || (Array.isArray(c.tags) && c.tags.some(tag => tag.toLowerCase().includes(q)))));
      if (!character) {
        return msg.reply(`ꕥ No se encontró el personaje *${nameQuery}*.`);
      }
      const tag = Array.isArray(character.tags) ? character.tags[0] : null;
      if (!tag) return msg.reply(`ꕥ El personaje ${character.name} no tiene un tag válido para buscar videos.`);
      const mediaList = await buscarVideoDelirius(tag);
      if (!mediaList.length) return msg.reply(`ꕥ No se encontraron videos para ${character.name}.`);
      const media = mediaList[Math.floor(Math.random() * mediaList.length)];
      const source = getSeriesNameByCharacter(structure, character.id);
      const caption = `❀ Nombre » *${character.name}*\n⚥ Género » *${character.gender || 'Desconocido'}*\n❖ Fuente » *${source}*`;
      const vidRes = await axios.get(media, { responseType: 'arraybuffer', timeout: 20000, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Referer': getRefererForUrl(media) } });
      const buffer = Buffer.from(vidRes.data);
      await sock.sendMessage(msg.chat, { video: buffer, caption: caption }, { quoted: msg });
    } catch (e) {
      await msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`);
    }
  }
};