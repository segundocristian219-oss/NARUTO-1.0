import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import db from "#db"

async function uploadImage(buffer, mime) {
  const ext = mime.split('/')[1] || 'bin';
  const fileName = `banner_${Date.now()}.${ext}`;

  const form = new FormData();
  const blob = new Blob([buffer], { type: mime });

  form.append('file', blob, fileName);

  const res = await fetch('https://cdn.dix.lat/upload', {
    method: 'POST',
    body: form,
    headers: {
      'User-Agent': 'Drive-Client'
    }
  });

  const json = await res.json();

  if (!json.status || !json.data?.url) {
    throw new Error('Error al subir el archivo: ' + JSON.stringify(json));
  }

  return json.data.url;
}

export default {
  command: ['setbanner', 'setbotbanner'],
  category: 'socket',
  run: async ({ msg, sock, args, usedPrefix, command}) => {
    const client = sock
    const m = msg
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net';
    const config = db.getSettings(idBot)
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(m.sender);
    
    if (!isOwner2) return m.reply(`❖ el comando *${command}* solo puede ser ejecutado por el dueño del número del bot`);
    
    const value = args.join(' ').trim();
    if (!value && !m.quoted && !m.message.imageMessage && !m.message.videoMessage) {
      return m.reply('✎ Debes enviar o citar una imagen o video para cambiar el banner del bot.');
    }
    
    if (value.startsWith('http')) {
      config.banner = value;
      return m.reply(`✿ Se ha actualizado el banner de *${config.namebot}*!`);
    }
    
    const q = m.quoted ? m.quoted : m.message.imageMessage ? m : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    
    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
      return m.reply('✎ Responde a una imagen válida.');
    }
    
    const buffer = await q.download();
    if (!buffer) return m.reply('✎ No se pudo descargar la imagen.');
    
    const url = await uploadImage(buffer, mime);
    db.setSettings(idBot, 'banner', url)
    return m.reply(`✿ Se ha actualizado el banner de *${config.namebot}*!`);
  },
};