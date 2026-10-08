import path from "path"
import { lookup } from "mime-types"
import axios from "axios"
import { gotScraping } from "got-scraping";
import db from '#db';

export default {
  command:["r34video", "rule34video"],
  category:"downloader",
  run: async({ sock, msg, args, usedPrefix, command})=>{
  const chat = db.getChat(msg.chat);
  if (!chat?.nsfw) return msg.reply(`ꕥ El contenido *NSFW* está desactivado en este grupo.\n\nUn *administrador* puede activarlo con el comando:\n» *${usedPrefix}nsfw on*`)

const url = args[0]
const isRule34Video = (url) => {
  return /^https?:\/\/(www\.)?rule34video\.com\/video\/\d+\/[a-zA-Z0-9_-]+\/?$/i.test(url)
}

if(!url){
return msg.reply(`《✧》 Ingresa un enlace del video.`)
}
if(!isRule34Video(url)){
 return msg.reply("《✧》Ingresa un enlace valido.")
}

try{
const data = await getRule34Video(url)

 if (!data.descarga){
   return msg.reply("《✧》 No se encontró el video.")
 }

    const videoBuffer = await axios.get(data.descarga, {
  responseType: "arraybuffer",
  headers:{
    "User-Agent":"Mozilla/5.0",
    "Referer": url
  }
})


const filename = (data.titulo || "video").replace(/[\/\\:*?"<>|]/g,"") + ".mp4"
const ext = path.extname(filename)
const mime = lookup(ext) || "video/mp4"
const caption =
`✰ ᩧ　𓈒　ׄ　𝖱𝗎𝗅𝖾𝟥𝟦 𝖵𝗂𝖽𝖾𝗈　ׅ　✿

ׄ ﹙ׅ✿﹚ּ *Titulo* › ${data.titulo || "Desconocido"}
ׄ ﹙ׅ✿﹚ּ *Categoria* › ${data.categoria || "N/A"}
ׄ ﹙ׅ✿﹚ּ *Formato* › MP4`

  await sock.sendMessage(msg.chat, { image:{ url: data.thumbnail }, caption }, { quoted: msg })

  await sock.sendMessage(msg.chat, { document: { url: data.descarga }, fileName: filename, mimetype: mime }, { quoted: msg })

}catch(e){

return msg.reply(`> Ocurrio un error al ejecutar *${usedPrefix + command}.*\n> [Error: *${e.message}*]`)
}
}
}

export async function getRule34Video(url) {

  const html = await gotScraping({
    url,
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  }).text();


  function extraer(nombre) {
    const regex = new RegExp(`${nombre}:\\s*'([^']*)'`);
    const resultado = html.match(regex);
    return resultado ? resultado[1] : null;
  }


  return {
    titulo: extraer("video_title"),
    categoria: extraer("video_categories"),
    thumbnail: extraer("preview_url"),
    descarga: extraer("video_url"),
    calidad480: extraer("video_alt_url"),
    calidad720: extraer("video_alt_url2"),
    calidad1080: extraer("video_alt_url3")
  };
}