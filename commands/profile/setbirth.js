import moment from 'moment';
import db from '#db';
moment.locale('es');

export default {
  command: ['setbirth'],
  category: 'profile',
  description: 'Establecer tu fecha de cumpleaños.',
  run: async ({ msg, args, usedPrefix, command, text }) => {
    const user = db.getUser(msg.sender);
    const currentYear = new Date().getFullYear();
    const input = args.join(' ');    
    if (!input) return msg.reply(`《✧》 Debes ingresar una fecha válida para tu cumpleaños.\n✐ Ejemplos:\n> ${usedPrefix + command} *01/01/2000* (día/mes/año)\n> ${usedPrefix + command} *01/01* (día/mes/año)`);
    
    const birth = validarFechaNacimiento(input, currentYear, usedPrefix, command);
    if (typeof birth === 'string' && birth.startsWith('✦'))
      return msg.reply(birth);
    if (!birth)
      return msg.reply(`《✧》 Fecha inválida. Usa › *${usedPrefix + command} 01/01/2000*`);
    
    db.setUser(msg.sender, 'birth', birth);
    return msg.reply(`✎ Se ha establecido tu fecha de nacimiento como: *${birth}*`);
  },
};

function validarFechaNacimiento(text, currentYear, usedPrefix, command) {
  const formatos = ['DD/MM/YYYY', 'DD/MM', 'D MMM', 'D MMM YYYY'];
  let fecha = null;
  const cleanInput = text.trim();

  for (const formato of formatos) {
    const f = moment(cleanInput, formato, true);
    if (f.isValid()) {
      fecha = f;
      break;
    }
  }

  if (!fecha || !fecha.isValid()) return null;

  if (!/\d{4}/.test(cleanInput)) {
    fecha.year(currentYear);
  }

  const año = fecha.year();
  const edad = currentYear - año;

  if (año > currentYear) {
    return `✦ El año no puede ser mayor a ${currentYear}. Ejemplo: ${usedPrefix + command} 01/12/${currentYear}`;
  }
  if (edad > 120 || edad < 0) {
    return `✦ La fecha establecida es invalida.`;
  }

  const fechaReal = moment({
    year: año,
    month: fecha.month(),
    date: fecha.date()
  });

  const diaSemana = fechaReal.format('dddd');
  const dia = fechaReal.date();
  const mes = fechaReal.format('MMMM');
  
  return `${diaSemana}, ${dia < 10 ? '0' + dia : dia} de ${mes} de ${año}`;
}