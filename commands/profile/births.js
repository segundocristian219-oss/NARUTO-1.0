import db from '#db';
import moment from 'moment';
moment.locale('es');

export default {
  command: ['births', 'birthdays', 'cumpleaños'],
  category: 'profile',
  description: 'Ver cumpleaños cercanos en el grupo.',
  run: async ({ msg, sock, participants, groupMetadata }) => {
    try {
      const groupName = groupMetadata?.subject;
      const memberJids = participants.map(p => p.id).filter(jid => jid);

      const birthdays = [];
      const now = moment();

      for (const jid of memberJids) {
        const userInfo = db.getUser(jid);

        if (!userInfo?.birth) continue;

        const birthDate = moment(userInfo.birth, 'dddd, DD [de] MMMM [de] YYYY', 'es');

        if (!birthDate.isValid()) continue;

        const month = birthDate.month();
        const currentMonth = now.month();
        if (month !== currentMonth) continue;

        let nextBirthday = moment({
          year: now.year(),
          month: month,
          date: birthDate.date(),
          hour: 0,
          minute: 0,
          second: 0
        });

        if (nextBirthday.isBefore(now)) {
          nextBirthday.add(1, 'year');
        }

        const days = nextBirthday.diff(now, 'days');
        const hours = nextBirthday.diff(now, 'hours') % 24;
        const minutes = nextBirthday.diff(now, 'minutes') % 60;
        const seconds = nextBirthday.diff(now, 'seconds') % 60;

        birthdays.push({
          name: userInfo.name || 'Usuario',
          date: nextBirthday,
          time: `${days} dias ${hours} horas ${minutes} minutos ${seconds} segundos`
        });
      }

      if (!birthdays.length) {
        return msg.reply('《✧》No hay usuarios que cumplan años este mes.');
      }

      birthdays.sort((a, b) => a.date - b.date);

      let text = `「✿」Cumpleaños cercanos en *${groupName}:*\n\n`;

      for (const birth of birthdays) {
        text += `♚ ${birth.name} » *${birth.date.format('dddd, D [de] MMMM')}*\n`;
        text += `\t\t→ _${birth.time}_\n\n`;
      }

      await sock.sendMessage(msg.chat, { text }, { quoted: msg });

    } catch (e) {
      msg.reply(`《✧》Error al obtener cumpleaños:\n${e.message}`);
    }
  }
};