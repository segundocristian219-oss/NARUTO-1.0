import { startModBot } from '../../core/mods.js'

if (!global.commandFlags) global.commandFlags = {}

export default {
  command: ['qrmod', 'codemod'],
  category: 'socket',
  isMod: true,
  run: async (client, m, args, usedPrefix, command) => {
    const token = args[0]
    const prefa = ''

    if (!token) {
      return m.reply(
        `「✿」Si ya tienes un token premium, puedes registrar un *Bot* de tipo *Mod* usando los comandos:\n\n` +
        `*✎ ${usedPrefix}qrmod [Token]*\n` +
        `*✎ ${usedPrefix}codemod [Token]*`
      )
    }

    if (token.length !== 8) {
      return m.reply(
        '《✧》 El token proporcionado no es válido.\n' +
        '> ✎ Un token válido debe tener una longitud de 8 caracteres.'
      )
    }

    const tokenData = global.db.data.tokensmod?.[token]
    const now = Date.now()

    if (!tokenData) {
      return m.reply(
        `《✧》 El token \`${token}\` no se encuentra registrado.`
      )
    }

    if (tokenData.expires < now) {
      return m.reply('《✧》 Este token ha expirado.')
    }

    const sender = m.sender
    const phone = sender.split('@')[0]

    /**const basePath = path.join('../../Sessions/Prems')
    const activeBots = fs.existsSync(basePath)
      ? fs.readdirSync(basePath).filter(dir =>
          fs.existsSync(path.join(basePath, dir, 'creds.json'))
        )
      : []**/

    const activeUser = tokenData.active
const activeNumber = activeUser?.split('@')[0]
const isSameUser = activeUser === sender

const liveConn = global.conns.find(
  c => c.userId === activeNumber
)

const hasActiveSession = !!liveConn

if (activeUser) {
    
  if (hasActiveSession && !isSameUser) {
    return client.sendMessage(
      m.chat,
      {
        text:
          `《✧》 Ya existe un bot registrado con ese token: @${activeNumber}.\n` +
          `> Si crees que esto es un error o te han robado el token, puedes contactar con un moderador en el grupo oficial.(https://dix.lat/nr6wd)`,
        mentions: [activeUser],
      },
      { quoted: m }
    )
  }

  if (!hasActiveSession && !isSameUser) {
    tokenData.active = sender
  }

} else {
  tokenData.active = sender
}

    global.commandFlags[sender] = true

    const qrText =
`✿ *Vincula el Socket usando QR.*

✎ Más opciones › Dispositivos vinculados › Vincular un nuevo dispositivo › Escanea el código QR.

_Se recomienda no usar tu cuenta principal._
↺ El código es válido por 60 segundos.`

    const codeText =
`✿ *Vincula el Socket usando código.*

✎ Más opciones › Dispositivos vinculados › Vincular con número › Introduce el código de 8 dígitos.

_Se recomienda no usar tu cuenta principal._
↺ El código es válido por 60 segundos.`

    const body = m.body || m.text || ''
    const prefix = body.charAt(0)
    const commandUsed = body
      .slice(prefix.length)
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase()

    const isCode = commandUsed === 'codemod'
    const caption = isCode ? codeText : qrText

    await startModBot(
      m,
      client,
      caption,
      isCode,
      phone,
      m.chat,
      global.commandFlags,
      true
    )
  },
}
