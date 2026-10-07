import db from '#db';
import moment from 'moment-timezone';
moment.locale('es');

export default {
  command: ['allbirths', 'allbirthdays'],
  category: 'profile',
  description: 'Ver todos los cumpleaños del grupo.',
  run: async ({ msg, sock, participants, groupMetadata }) => {
    try {
      const groupName = groupMetadata?.subject;
      const memberJids = participants.map(p => p.id).filter(jid => jid);

      const birthdays = [];
      const now = moment().tz('America/Mexico_City');

      for (const jid of memberJids) {
        const userInfo = db.getUser(jid);

        if (!userInfo?.birth) continue;

        const birthDate = moment(userInfo.birth, 'dddd, DD [de] MMMM [de] YYYY', 'es');

        if (!birthDate.isValid()) continue;

        let nextBirthday = moment.tz({
          year: now.year(),
          month: birthDate.month(),
          date: birthDate.date(),
          hour: 0,
          minute: 0,
          second: 0
        }, 'America/Mexico_City');

        if (nextBirthday.isBefore(now)) {
          nextBirthday.add(1, 'year');
        }

        const diff = nextBirthday.diff(now);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        birthdays.push({
          name: userInfo.name || 'Usuario',
          date: nextBirthday,
          time: `${days} dias ${hours} horas ${minutes} minutos ${seconds} segundos`
        });
      }

      if (!birthdays.length) {
        return msg.reply('《✧》No hay usuarios con cumpleaños registrados en este grupo.');
      }

      birthdays.sort((a, b) => a.date - b.date);

      let text = `「✿」Cumpleaños en *${groupName}*\n\n`;

      for (const birth of birthdays) {
        text += `♚ ${birth.name} » *${birth.date.format('dddd, D [de] MMMM')}*\n`;
        text += `\t\t→ _${birth.time}_\n\n`;
      }

      await sock.sendMessage(msg.chat, { text }, { quoted: msg });

    } catch (e) {
      console.log(e);
      msg.reply(`《✧》Error al obtener cumpleaños:\n${e.message}`);
    }
  }
};