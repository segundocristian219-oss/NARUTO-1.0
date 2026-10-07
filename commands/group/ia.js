import axios from 'axios'

export default async function before (m, { client}) {
    const botJid =
    client?.user?.id
        ? client.user.id.split(':')[0] + '@s.whatsapp.net'
        : null

    const primaryBot =
        global?.db?.data?.chats[m.chat]
            ?.primaryBot

    if (
        primaryBot &&
        botJid !== primaryBot
    ) return

    const chat =
        global?.db?.data?.chats[m.chat]

    const user =
        global?.db?.data?.users[m.sender]

    if (!chat?.autoresponder)
        return false

    if (m.fromMe) return 

    m.isBot =
        m.id &&
        (
            (
                m.id.startsWith('BAE5') &&
                m.id.length === 16
            ) ||
            (
                m.id.startsWith('3EB0') &&
                (
                    m.id.length === 12 ||
                    m.id.length === 20 ||
                    m.id.length === 22
                )
            ) ||
            (
                m.id.startsWith('B24E') &&
                m.id.length === 20
            )
        )

    if (m.isBot) return

    const text =
        m.text ||
        m.body ||
        ''

    if (!text) return false

    const prefixRegex =
        /^[\\/!#$%^&*?.]/i

    if (prefixRegex.test(text))
        return

    const isMention =
    botJid &&
    Array.isArray(m.mentionedJid) &&
    m.mentionedJid.includes(botJid)
    const quotedUser =
    m.quoted?.sender ||
    m.quoted?.participant ||
    m.quoted?.remoteJid

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
                            Accept: '*/*',
                            'User-Agent':
                                'Mozilla/5.0'
                        }
                    }
                )

            return response.data

        } catch {
            return null
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

    await client.sendPresenceUpdate(
        'composing',
        m.chat
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

    await client.reply(
        m.chat,
        result,
        m
    )
    return
}