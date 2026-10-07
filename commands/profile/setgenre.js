import db from '#db';

export default {
  command: ['setgenre', 'setgenero'],
  category: 'profile',
  run: async ({ msg, args, usedPrefix, command}) => {
    const user = db.getUser(msg.sender);
    const input = args.join(' ').toLowerCase().trim()
    if (!input) return msg.reply(`《✧》 Debes ingresar un género válido.\n✎ Ejemplos:\n> *${usedPrefix + command} hombre*\n> *${usedPrefix + command} mujer*`)
    const genresList = ['Hombre', 'Mujer']
    let genre = null
    if (!isNaN(input)) {
      const index = parseInt(input) - 1;

      if (index >= 0 && index < genresList.length) {
        genre = genresList[index]; 
      }
    } else {
      const found = genresList.find(g => g.toLowerCase() === input)
      if (found) genre = found
    }
    if (!genre) {
      const opciones = genresList.map((g, i) => `${i + 1}. ${g}`).join('\n')
      return msg.reply(`《✧》 Elije un género válido.\n\nOpciones:\n${opciones}`)
    }
    db.setUser(msg.sender, 'genre', genre);
    return msg.reply(`✎ Se ha establecido tu género como: *${user.genre}*`)
  },
}