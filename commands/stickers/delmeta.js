import db from '#db';

export default {
    command: ['delmeta', 'delstickermeta'],
    category: 'stickers',
    run: async ({ msg, sock, args, usedPrefix, command }) => {
        try {
            const userData = db.getUser(msg.sender);
            if ((!userData.metadatos || userData.metadatos === '') && (!userData.metadatos2 || userData.metadatos2 === '')) {
                return msg.reply(`《✧》 No tienes metadatos asignados.`);
            }
            db.setUser(msg.sender, 'metadatos', '');
            db.setUser(msg.sender, 'metadatos2', '');
            await sock.sendMessage(msg.chat, { text: `✐ Se restablecio el pack y autor por defecto para tus stickers.`}, { quoted: msg })
       } catch (e) {
        await msg.reply(`> Ocurrió un error al ejecutar *${usedPrefix + command}.* Si el error persiste usa *${usedPrefix}report*\n> [Error: *${e.name || 'Error'}: ${e.message}*]`)
       }
    }
}