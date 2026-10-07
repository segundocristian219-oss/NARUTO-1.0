import axios from 'axios'
import db from '#db'

export async function before ({ msg, sock}) {
    if (!msg.isGroup || !msg.text) return
    if (msg.isBot) return
    const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const chat = db.getChat(msg.chat)
    const settings = db.getSettings(botJid)
    const primaryBot = chat?.primaryBot

    if (
        primaryBot &&
        botJid !== primaryBot
    ) return 


    const user = db.getUser(msg.sender).name

    if (!chat?.autoresponder) return 
    console.log('Autoresponder activo')

    if (msg.fromMe) return 



    const text =
        msg.text ||
        msg.body ||
        ''

    if (!text) return

    const prefixRegex =
        /^[\\/!#$%^&*?.]/i

    if (prefixRegex.test(text))
        return

    const isMention =
    botJid &&
    Array.isArray(msg.mentionedJid) &&
    msg.mentionedJid.includes(botJid)
    const quotedUser =
    msg.quoted?.sender ||
    msg.quoted?.participant ||
    msg.quoted?.remoteJid

const isQuoted = quotedUser === botJid

    if (!isMention && !isQuoted)
        return
    if (
        text.includes('menu') ||
        text.includes('jadibot') ||
        text.includes('serbot') ||
        text.includes('audio') ||
        text.includes('video')
    ) return

    async function chatEverywhereAPI(
        q,
        logic
    ) {
        try {
            const response =
                await axios.post(
                    'https://chateverywhere.app/api/chat/',
                    {
                        model: {
                            id: 'gpt-4',
                            name: 'GPT-4',
                            maxLength: 32000,
                            tokenLimit: 8000,
                            completionTokenLimit: 5000,
                            deploymentName: 'gpt-4'
                        },
                        messages: [
                            {
                                pluginId: null,
                                content: q,
                                role: 'user'
                            }
                        ],
                        prompt: logic,
                        temperature: 0.5
                    },
                    {
                        headers: {
                            Accept: '',
                            'User-Agent':
                                'Mozilla/5.0'
                        }
                    }
                )

            return response.data

        } catch {
            return
        }
    }

    const txtDefault = `
Serás un bot,
Eres un bot de WhatsApp útil.
Sabes JavaScript.
Respondes con humor.
`.trim()


    const logic =
        chat.sAutoresponder ||
        txtDefault

    await sock.sendPresenceUpdate(
        'composing',
        msg.chat
    )

   let result = await chatEverywhereAPI(text, logic)
   result = result?.output || result?.response || result

    if (
        !result ||
        typeof result !== 'string' ||
        !result.trim()
    ) {
        result =
            'No pude generar una respuesta.'
    }

    await sock.reply(
        msg.chat,
        result,
        msg
    )
    return 
}