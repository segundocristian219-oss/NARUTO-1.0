export default {
    command: ["linea"],
    category:["group"],
    run: async({ msg, sock, args, usedPrefix, command}) => {
        try {
            let id = args?.[0]?.match(/\d+\-\d+@g-us/) || msg.chat;
            const participantesUnicos = [...new Set(Object.values(sock.chats[id]?.presences || {}).map(item => item?.key?.participant).filter(Boolean))];
            const ordenados = participantesUnicos.sort((a, b) => {
                if (a && b) {
                    return a.split('@')[0].localeCompare(b.split('@')[0])
                }
            });

            const lista = ordenados.map((k) => `*°* @${k.split("@")[0]}`).join("\n") || "No hay usuarios en linea en este momento."
            await sock.reply(msg.chat, `*Lista de usuarios en linea:*\n\n${lista}`, msg, { mentions: [ordenados]})
        } catch(e) {
            await msg.reply(`> Ocurrió un error al ejecutar *${usedPrefix + command}.*\n> [Error: *${e.name}*] ${e.message}`)
        }
    }
}