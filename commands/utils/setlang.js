import db from '#db';
import { getMessage } from '#langs'; 

const SUPPORTED_LANGS = ['es', 'en', 'id'];

export default {
    command: ['setlang', 'lang'],
    category: 'utils',
    isOwner: true,
    run: async({ msg, sock, args, userLang, usedPrefix, command }) => {
        try {
            const newLang = args[0]?.toLowerCase();

            if (!newLang) {
                return msg.reply(getMessage(userLang, 'setlang', { userLang: userLang.toUpperCase(), usedPrefix, command }));
            }

            if (!SUPPORTED_LANGS.includes(newLang)) {
                return msg.reply(`《✧》 El idioma \`${args[0]}\` no está disponible.\n❏ Idiomas disponibles:\n\tⴵ Español (ES)\n\tⴵ English (EN)\n\tⴵ Bahasa Indonesia (ID)`);
            }
            if (newLang === userLang) {
                return msg.reply(`《✧》 Tu idioma preferido ya está configurado en *${userLang.toUpperCase()}*`);
            }
            db.setUser(msg.sender, 'lang', newLang);
            const successMsg = getMessage(newLang, 'languageChanged');
            await sock.sendMessage(msg.chat, { text: '✎ ' + successMsg }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(msg.chat, { text: getMessage(userLang, 'commandError', { command, error: e.message || e }) }, { quoted: msg });
        }
    }
};