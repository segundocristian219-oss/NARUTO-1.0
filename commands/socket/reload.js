import { startSubBot } from './subbot.js'
import fs from 'fs'
import path from 'path'
import { jidDecode } from '@whiskeysockets/baileys'
import db from '#db'

export default {
  command: ['reload'],
  category: 'socket',
  run: async ({ sock, msg, command, usedPrefix, args }) => {
    const rawId = sock?.user?.id || ''
    const decoded = jidDecode(rawId)
    const botId = decoded?.user || rawId.split('@')[0]
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = db.getSettings(idBot)
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(msg.sender)
    if (!isOwner2) return msg.reply(`❖ el comando ${command} solo puede ser ejecutado por el dueño del número del bot`)

    const botSettings = db.getSettings(idBot)

    const isOficialBot = botSettings.type === 'Owner'
    const isPremiumBot = botSettings.botprem === 1
    const isModBot = botSettings.modbot === 1

    const botType = isOficialBot ? 'Principal' : isPremiumBot ? 'Premium' : isModBot ? 'Main' : 'SubBot'

    const basePath = 'Sessions'
    const sessionTypes = ['Subs']

    const sessionPath = sessionTypes
      .map(type => path.join(basePath, type, `${botId}/creds.db`))
      .find(p => fs.existsSync(p))

    if (!sessionPath) {
      return msg.reply('《✧》 Este comando solo debe usarse desde una instancia de un socket secundario..')
    }

    const caption = '✿ La sesión fue recargada correctamente.'
    const phone = args[0]?.replace(/\D/g, '') || botId
    const chatId = msg.chat
    await startSubBot(msg, sock, caption, false, phone, chatId, {}, true, sessionPath)
  }
}
