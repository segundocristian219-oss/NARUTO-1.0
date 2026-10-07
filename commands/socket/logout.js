import fs from 'fs';
import path from 'path';
import {jidDecode} from '@whiskeysockets/baileys';
import db from '#db'

export default {
  command: ['logout'],
  category: 'socket',
  run: async ({ msg, sock, args, usedPrefix, command}) => {
    const rawId = sock.user?.id || ''
    const decoded = jidDecode(rawId)
    const cleanId = decoded?.user || rawId.split('@')[0]
    const sessionTypes = ['Subs', 'Prems']
    const basePath = 'Sessions'
    const sessionPath = sessionTypes.map((type) => path.join(basePath, type, `${cleanId}.db`)).find((p) => fs.existsSync(p))
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = db.getSettings(idBot)
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(msg.sender)
    if (!isOwner2) return msg.reply(`❖ el comando ${command} solo puede ser ejecutado por el dueño del número del bot`)
      
    if (!sessionPath) {
      return msg.reply('《✧》 Este comando solo puede ser usado desde una instancia de un socket.')
    }
    try {
      await msg.reply('《✧》 Cerrando sesión del Socket...')
      await sock.logout()
      setTimeout(() => {
        if (fs.existsSync(sessionPath)) {
          fs.rmSync(sessionPath, { recursive: true, force: true })
          console.log(`《✧》 Sesión de ${cleanId} eliminada de ${sessionPath}`)
        }
      }, 2000)
      setTimeout(() => {
        msg.reply(`《✧》 Sesión finalizada correctamente.\nPuedes reconectarte usando *${usedPrefix}code*`)
      }, 3000)
    } catch (e) {
      await msg.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};
