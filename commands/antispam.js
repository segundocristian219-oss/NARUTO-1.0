export default async (client, m) => {
  if (!m.isGroup || !m.text) return

  const MAX_CHARS = 15000

  if (m.text.length < MAX_CHARS) return

  const groupMetadata = await client.groupMetadata(m.chat).catch(() => null)
  if (!groupMetadata) return

  const participants = groupMetadata.participants || []
  const admins = participants
    .filter(p => p.admin)
    .map(p => p.phoneNumber || p.jid || p.id || p.lid)

  const isAdmin = admins.includes(m.sender)
  const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
  const isBotAdmin = admins.includes(botId)
  const isSelf = global.db.data.settings[botId]?.self ?? false
  if (isSelf) return
  const chat = global?.db?.data?.chats?.[m.chat]
  const primaryBotId = chat?.primaryBot
  const isPrimary = !primaryBotId || primaryBotId === botId
  const userName = global.db.data.users[m.sender]?.name || m.pushName || 'Usuario'
  
  if (isAdmin || !isBotAdmin || !isPrimary) return

  await client.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }})
  
  await client.reply(m.chat, `> ꕥ se ha eliminado a *${userName}* del grupo por protección contra spam. [Mensaje demasiado largo].`, null)
  await client.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}