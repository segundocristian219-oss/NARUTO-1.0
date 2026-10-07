import db from '#db';

function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[áàäâ]/g, 'a')
        .replace(/[éèëê]/g, 'e')
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöô]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/0/g, 'o')
        .replace(/1/g, 'i')
        .replace(/3/g, 'e')
        .replace(/4/g, 'a')
        .replace(/5/g, 's')
        //.replace(/7/g, 't')
        .replace(/[@]/g, 'a')
        .replace(/[$]/g, 's')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/([a-z])\1{2,}/g, '$1')
}

function parseToxic(input) {
    const toxicWords = ["wey", "cabron", "cabrona", "perra", "pt", "put[oa]", "mierda", "mrd", "negr[oa]s", "cacorro", "g[ea]y", "lesbian", "homosexual", "homosexuales", "idiota", "idiotas", "imb[eé]cil", "pendej[oa]", "pendej[oa]s", "putit[oa]", "est[uú]pid[oa]", "est[uú]pid[oa]s", "verga", "vrg", "jueputa", "hijueputa", "zorra", "nigga", "nigger", "gonorrea", "gono", "hp", "malparid[oa]", "mlp", "negr[oa]", "marica", "maricon", "bobo", "brut[oa]", "brut[oa]s", "babos[oa]", "babos[oa]s", "loc[oa]", "cachond[oa]", "loc[oa]s", "careverga", "tarad[oa]", "tarad[oa]s", "carajo", "mens[oa]", "in[uú]til", "in[uú]tiles", "cretino", "corrupt[oa]", "z[aá]ngano", "burr[oa]", "pt[oa]", "malparid[oa]s", "pene", "baka", "vagina", "suicidate", "suicidio", "basur", "basuras", "put[oa]s", "tta", "ttas", "teta", "tetas", "pechos", "pecho", "culer[oa]", "culer[oa]s", "culo", "culos", "perras", "perrita", "perritas", "pn", "desgraciad[oa]", "inutiles", "imbeciles", "malcriad[oa]", "malcriad[oa]s", "odio", "tont[oa]", "tont[oa]s", "67"];
    const regex = new RegExp(`\\b(${toxicWords.join('|')})\\b`, 'iu');
    let match = input.match(regex);
    if (!match) {
        const normalized = normalizeText(input);
        match = normalized.match(regex);
    }
    return match ? match[1].toLowerCase() : null;
}

export async function before({ msg, sock, groupMetadata, participants, isAdmins, isBotAdmins }) {
    if (!msg.isGroup || !msg.text) return;
    const owner = global.owner.map(num => num + '@s.whatsapp.net').includes(msg.sender);
    if (owner) return
    if (msg.isBot) return;
    if (!groupMetadata) return;
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
    const chat = db.getChat(msg.chat);
    if (!chat.antitoxic) return;
    const settings = db.getSettings(botId);
    const isSelf = (settings.self ?? false) || (chat.isMute ?? false);
    if (isSelf) return;
    const primaryBotId = chat?.primaryBot;
    const isPrimary = !primaryBotId || primaryBotId === botId;
    const isToxic = parseToxic(msg.text);
    if (!isPrimary || !isBotAdmins || !isToxic) return;
    const user = db.getUser(msg.sender);
    db.setCreate('chat_users', [msg.chat, msg.sender], 'warnings', [])
    let userr = db.getChatUser(msg.chat, msg.sender);
    let warnings = userr.warnings;
    if (typeof warnings == 'string') {
        try { warnings = JSON.parse(warnings); } catch { warnings = [] }
    }
    if (!Array.isArray(warnings)) warnings = [];
    const now = new Date();
    const timestamp = now.toLocaleString('es-CO', { timeZone: 'America/Bogota', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit' })
    warnings.unshift({ reason: 'Anti-Toxic detectado', timestamp, by: botId})
    db.setChatUser(msg.chat, msg.sender, 'warnings', warnings)
    const total = warnings.length;
    const warnLimit = chat.warnLimit || 3;
    const expulsar = chat.expulsar === 1;
    const warningList = warnings.map((w, i) => {
        const index = total - i;
        return `\`#${index}\` » ${w.reason}\n> » Fecha: ${w.timestamp}`;
    }).join('\n');
    let message = `✐ Se ha añadido una advertencia automática a @${msg.sender.split('@')[0]} por *Anti-Toxic*.\n✿ Advertencias totales \`(${total})\`:\n\n${warningList}`;
    const userName = user?.name || msg.pushName || 'Usuario';
    await sock.sendMessage(msg.chat, { delete: { remoteJid: msg.chat, fromMe: false, id: msg.key.id, participant: msg.key.participant}});
    if (total >= warnLimit && expulsar) {
        try {
            await sock.groupParticipantsUpdate(msg.chat, [msg.sender], 'remove');
            db.setChatUser(msg.chat, msg.sender, 'warnings', []);
            message += `\n\n> ❖ El usuario *${userName}* alcanzó el límite de advertencias y fue expulsado del grupo.`;
        } catch {
            message += `\n\n> ❖ El usuario *${userName}* alcanzó el límite, pero no se pudo expulsar automáticamente.`;
        }
    } else if (total >= warnLimit && !expulsar) {
        message += `\n\n> ❖ El usuario *${userName}* ha alcanzado el límite de advertencias.`
    }
    await sock.reply(msg.chat, message, null, { mentions: [msg.sender]});
};