export const bodyMenu = `> ❀ Hola! Soy *$namebot*, Aquí tienes la lista de comandos$cat

╭┈ࠢ͜┅ࠦ͜͜╾݊͜─֟͜─ؕ͜─֫͜─ׄ͜─֟͜─ؕ͜─݊͜╼┅ࠡ͜͜┈࠭͜͜۞͜۞͜۞
|❖ *Usuarios* » $users
|🜸 *Tipo:* ($botType)
|» canal oficial: $link
|ꕥ ${dev}
╰ׅ┈ࠢ͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴ ⋱࣭ ᩴ  ⋮֔   ᩴ ⋰╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜┈ࠢ͜╯ׅ
> Vincula un socket usando *$prefixcode* o *$prefixqr*
‧꒷︶꒷✿꒷‧₊˚꒷︶꒷✿꒷︶꒷˚₊‧꒷✿꒷︶꒷‧`;

export const menuObject = {
      economia: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`ECONOMY\` 𐦯╶͜─͜─͜═͜
> ❖ Comandos de *Economía* para ganar dinero.
 |🜸 \`$prefixw\` »͜ \`$prefixwork\` »͜ \`$prefixtrabajar\`
> ✿ Ganar coins trabajando.
 |🜸 \`$prefixslut\` »͜ \`$prefixprotituirse\`
> ✿ Ganar coins prostituyéndote.
 |🜸 \`$prefixcoinflip\` »͜ \`$prefixflip\` »͜ \`$prefixcf\` + [cantidad] <cara/cruz>
> ✿ Apostar coins en un cara o cruz.
 |🜸 \`$prefixcrime\` »͜ \`$prefixcrimen\`
> ✿ Ganar coins rapido.
 |🜸 \`$prefixroulette\` »͜ \`$prefixrt\` + [red/black] [cantidad]
> ✿ Apostar coins en una ruleta.
 |🜸 \`$prefixbalance\` »͜ \`$prefixbal\` »͜ \`$prefixbank\` + <usuario>
> ✿ Ver cuantos coins tienes en el banco.
 |🜸 \`$prefixdeposit\` »͜ \`$prefixdep\` »͜ \`$prefixdepositar\` »͜ \`$prefixd\` + [cantidad] | all
> ✿ Depositar tus coins en el banco.
 |🜸 \`$prefixwithdraw\` »͜ \`$prefixwith\` »͜ \`$prefixretirar\` + [cantidad] | all
> ✿ Retirar tus coins del banco.
 |🜸 \`$prefixeinfo\` »͜ \`$prefixeconomyinfo\` »͜ \`$prefixinfoeconomy\`
> ✿ Ver tu información de economía en el grupo.
 |🜸 \`#givecoins\` »͜ \`#pay\` »͜ \`#coinsgive\` + [usuario] [cantidad]
> ✿ Dar coins a un usuario.
 |🜸 \`$prefixmiming\` »͜ \`$prefixminar\` »͜ \`$prefixmine\`
> ✿ Realizar trabajos de minería y ganar coins.
 🜸 \`$prefixdaily\` »͜ \`$prefixdiario\`
> ✿ Reclamar tu recompensa diaria.
 |🜸 \`$prefixsteal\` »͜ \`$prefixrobar\` »͜ \`$prefixrob\` + [@mencion]
> ✿ Intentar robar coins a un usuario.
 |🜸 \`$prefixeconomyboard\` »͜ \`$prefixeboard\` »͜ \`$prefixbaltop\` + <pagina>
> ✿ Ver tu información de economía en el grupo.
 |🜸 \`$prefixcurar\` »͜ \`$prefixheal\`
> ✿ Curar salud para salir de aventuras.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      sockets: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`SOCKETS\` 𐦯╶͜─͜─͜═͜
> ❖ para registrar o que solamente puede ejecutar el socket.
 |🜸 \`$prefixcode\` »͜ \`$prefixqr\`
> ✿ Crea un socket con un codigo QR/Code
 |🜸 \`$prefixsetbanner\`
> ✿ Cambia la imagen del menu
 |🜸 \`$prefixsetname\`
> ✿ Cambia el nombre de tu socket
 |🜸 \`$prefixreload\`
> ✿ Recarga la sesion del socket
 |🜸 \`$prefixsetbotcurrency\`
> ✿ Cambia la moneda del socket
 |🜸 \`$prefixsetbotowner\` »͜ \`$prefixsetowner\`
> ✿ Cambiar el dueño del bot.
 |🜸 \`$prefixlogout\`
> ✿ Cierra sesion del socket
 |🜸 \`$prefixsetpfp\` »͜ \`$prefixsetimage\`
> ✿ Cambia la foto de perfil del socket
 |🜸 \`$prefixsetusername\` »͜ \`$prefixsetuser\`
> ✿ Cambiar el nombre de usuario
 |🜸 \`$prefixsetstatus\` + [estado]
> ✿ Cambia el estado del bot
 |🜸 \`$prefixjoin\`
> ✿ unir al bot a un grupo.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      stickers: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`STICKERS\` 𐦯╶͜─͜─͜═͜
> ❖ Comandos de *Stickers* para crear y gestionar.
 |🜸 \`$prefixstickerpack\` »͜ \`$prefixspack\` + <query|url>
> ✿ Busca y descarga pack de stickers.
 |🜸 \`$prefixdelpack\` [nombre del paquete]
> Elimina un paquete de stickers.
 |🜸 \`$prefixgetpack\` »͜ \`$prefixstickerpack\` »͜ \`$prefixpack\` [nombre del paquete]
> ✿ Descarga un paquete de stickers.
 |🜸 \`$prefixnewpack\` »͜ \`$prefixnewstickerpack\` [nombre del paquete]
> ✿ Crea un nuevo paquete de stickers.
 |🜸 \`$prefixsetpackprivate\` »͜ \`$prefixsetpackpriv\` »͜ \`#packprivate\` [nombre del paquete]
> ✿ Establecer un paquete de stickers como privado.
 |🜸 \`$prefixsetpackpublic\` »͜ \`$prefixsetpackpub\` »͜ \`$prefixpackpublic\` [nombre del paquete]
> ✿ Establecer un paquete de stickers como público.
 |🜸 \`$prefixsetstickerpackesc\` »͜ \`$prefixsetpackdesc\` »͜ \`$prefixpackdesc\` [nombre del paquete] | [descripción]
> ✿ Establece a descripción de un paquete de stickers.
 |🜸 \`$prefixstickeradd\` »͜ \`$prefixaddsticker\` [nombre del paquete]
> ✿ Agrega un sticker a un paquete de stickers.
 |🜸 \`$prefixstickerdel\` »͜ \`$prefixdelsticker\` [nombre del paquete]
> ✿ Elimina un sticker a un paquete de stickers.
 |🜸 \`$prefixsticker\` »͜ \`$prefixs\`
> ✿ Crea stickers de (imagen/video)
 |🜸 \`$prefixsetmeta\`
> ✿ Estable un pack y autor para los stickers.
 |🜸 \`$prefixdelmeta\`
> ✿ Elimina tu pack de stickers.
 |🜸 \`$prefixwm\`
> ✿ Cambia el nombre de los stickers.
 |🜸 \`$prefixstickerpacks\` »͜ \`$prefixpacklist\` [nombre del paquete]
> ✿ Lista de tus paquetes de stickers.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      downloads: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`DOWNLOAD\` 𐦯╶͜─͜─͜═͜
> ❖ Comandos de *Descargas* para descargar archivos de varias fuentes.
 |🜸 \`$prefixtiktok\` »͜ \`$prefixtt\` + [Link] / [busqueda]
> ✿ Descargar un video de TikTok.
 |🜸 \`$prefixmediafire\` »͜ \`$prefixmf\` + [Link]
> ✿ Descargar un archivo de MediaFire.
 |🜸 \`$prefixplay\` »͜ \`$prefixytmp3\` »͜ \`$prefixytmp4\` + [Cancion] / [Link]
> ✿ Descargar una cancion de YouTube.
 |🜸 \`$prefixfacebook\` »͜ \`$prefixfb\` + [Link]
> ✿ Descargar un video de Facebook.
 |🜸 \`$prefixtwitter\` »͜ \`$prefixx\` + [Link]
> ✿ Descargar un video de Twitter/X.
 |🜸 \`$prefixig\` »͜ \`$prefixinstagram\` + [Link]
> ✿ Descargar un reel de Instagram.
 |🜸 \`$prefixpinterest\` »͜ \`$prefixpin\` + [busqueda] / [Link]
> ✿ Buscar y descargar imagenes de Pinterest.
 |🜸 \`$prefiximage\` »͜ \`$prefiximagen\` + [busqueda]
> ✿ Buscar y descargar imagenes de Google.
 |🜸 \`$prefixapk\` »͜ \`$prefixmodapk\` + [busqueda]
> ✿ Descargar un apk de Aptoide.
 |🜸 \`$prefixtiktoks\` »͜ \`$prefixtts\` + [busqueda]
> ✿ Buscar videos en tiktok.
 |🜸 \`$prefixytsearch\` »͜ \`$prefixsearch\` + [busqueda]
> ✿ Buscar videos de YouTube.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      anime: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`ANIME\` 𐦯╶͜─͜─͜═͜
> ❖ Comandos de reacciones de anime.
 |🜸 \`#peek\` »͜ \`#mirar\` + <mencion>
> ✿ Mirar a alguien
 |🜸 \`#comfort\` »͜ \`#consolar\` + <mencion>
> ✿ Consolar a alguien
 |🜸 \`#thinkhard\` »͜ \`#pensar\` + <mencion>
> ✿ Pensar intensamente
 |🜸 \`#curious\` »͜ \`#curioso\` »͜ \`#curiosa\` + <mencion>
> ✿ Mostrar curiosidad
 |🜸 \`#sniff\` »͜ \`#oler\` + <mencion>
> ✿ Oler a alguien
 |🜸 \`#stare\` »͜ \`#mirar\` + <mencion>
> ✿ Mirar fijamente
 |🜸 \`#trip\` »͜ \`#tropezar\` + <mencion>
> ✿ Tropezar con alguien
 |🜸 \`#blowkiss\` »͜ \`#besito\` + <mencion>
> ✿ Mandar un besito
 |🜸 \`#angry\` »͜ \`#enojado\` + <mencion>
> ✿ Estar enojado
 |🜸 \`#bath\` »͜ \`#bañarse\` + <mencion>
> ✿ Bañarse
 |🜸 \`#bite\` »͜ \`#morder\` + <mencion>
> ✿ Muerde a alguien
 |🜸 \`#bleh\` »͜ \`#lengua\` + <mencion>
> ✿ Sacar la lengua
 |🜸 \`#blush\` »͜ \`#sonrojarse\` + <mencion>
> ✿ Sonrojarse
 |🜸 \`#bored\` »͜ \`#aburrido\` + <mencion>
> ✿ Estar aburrido
 |🜸 \`#call\` + <mencion>
> ✿ Llamar a alguien
 |🜸 \`#clap\` »͜ \`#aplaudir\` + <mencion>
> ✿ Aplaudir
 |🜸 \`#coffee\` »͜ \`#cafe\` »͜ \`#café\` + <mencion>
> ✿ Tomar café
 |🜸 \`#cold\` »͜ \`#frio\` + <mencion>
> ✿ Tener frio
 |🜸 \`#sing\` »͜ \`#cantar\` + <mencion>
> ✿ Cantar
 |🜸 \`#tickle\` »͜ \`#cosquillas\` + <mencion>
> ✿ Hacer cosquillas
 |🜸 \`#nope\` »͜ \`#no\` + <mencion>
> ✿ Negarse a hacer algo
 |🜸 \`#jump\` »͜ \`#saltar\` + <mencion>
> ✿ Saltar
 |🜸 \`#heat\` »͜ \`#calor\` + <mencion>
> ✿ Tener calor
 |🜸 \`#jugar\` »͜ \`#gaming\` + <mencion>
> ✿ Jugar videojuegos
 |🜸 \`#draw\` »͜ \`#dibujar\` + <mencion>
> ✿ Dibujar
 |🜸 \`#cry\` »͜ \`#llorar\` + <mencion>
> ✿ Llorar por algo o alguien
 |🜸 \`#cuddle\` »͜ \`#acurrucarse\` + <mencion>
> ✿ Acurrucarse
 |🜸 \`#dance\` »͜ \`#bailar\` + <mencion>
> ✿ Sacate los pasitos prohíbidos
 |🜸 \`#dramatic\` »͜ \`#drama\` + <mencion>
> ✿ Drama
 |🜸 \`#drunk\` »͜ \`#borracho\` + <mencion>
> ✿ Estar borracho
 |🜸 \`#eat\` »͜ \`#comer\` + <mencion>
> ✿ Comer algo delicioso
 |🜸 \`#facepalm\` »͜ \`#palmada\` + <mencion>
> ✿ Darte una palmada en la cara
 |🜸 \`#happy\` »͜ \`#feliz\` + <mencion>
> ✿ Salta de felicidad
 |🜸 \`#hug\` »͜ \`#abrazar\` + <mencion>
> ✿ Dar un abrazo
 |🜸 \`#impregnate\` »͜ \`#preg\` »͜ \`#preñar\` »͜ \`#embarazar\` + <mencion>
> ✿ Embarazar a alguien
 |🜸 \`#kill\` »͜ \`#matar\` + <mencion>
> ✿ Toma tu arma y mata a alguien
 |🜸 \`#kiss\` »͜ \`#muak\` + <mencion>
> ✿ Dar un beso
 |🜸 \`#kisscheek\` »͜ \`#beso\` + <mencion>
> ✿ Beso en la mejilla
 |🜸 \`#laugh\` »͜ \`#reirse\` + <mencion>
> ✿ Reírte de algo o alguien
 |🜸 \`#lick\` »͜ \`#lamer\` + <mencion>
> ✿ Lamer a alguien
 |🜸 \`#love\` »͜ \`#amor\` »͜ \`#enamorado\` »͜ \`#enamorada\` + <mencion>
> ✿ Sentirse enamorado
 |🜸 \`#pat\` »͜ \`#palmadita\` »͜ \`#palmada\` + <mencion>
> ✿ Acaricia a alguien
 |🜸 \`#poke\` »͜ \`#picar\` + <mencion>
> ✿ Picar a alguien
 |🜸 \`#push\` »͜ \`#empujar\` + <mencion>
> ✿ Empujar a alguien
 |🜸 \`#pout\` »͜ \`#pucheros\` + <mencion>
> ✿ Hacer pucheros
 |🜸 \`#punch\` »͜ \`#pegar\` »͜ \`#golpear\` + <mencion>
> ✿ Dar un puñetazo
 |🜸 \`#run\` »͜ \`#correr\` + <mencion>
> ✿ Correr
 |🜸 \`#sad\` »͜ \`#triste\` + <mencion>
> ✿ Expresar tristeza
 |🜸 \`#scared\` »͜ \`#asustado\` »͜ \`#asustada\` + <mencion>
> ✿ Estar asustado
 |🜸 \`#seduce\` »͜ \`#seducir\` + <mencion>
> ✿ Seducir a alguien
 |🜸 \`#shy\` »͜ \`#timido\` »͜ \`#timida\` + <mencion>
> ✿ Sentir timidez
 |🜸 \`#slap\` »͜ \`#bofetada\`+ <mencion>
> ✿ Dar una bofetada
 |🜸 \`#sleep\` »͜ \`#dormir\` + <mencion>
> ✿ Tumbarte a dormir
 |🜸 \`#smoke\` »͜ \`#fumar\` + <mencion>
> ✿ Fumar
 |🜸 \`#spit\` »͜ \`#escupir\` + <mencion>
> ✿ Escupir
 |🜸 \`#step\` »͜ \`#pisar\` + <mencion>
> ✿ Pisar a alguien
 |🜸 \`#bonk\` + <mencion>
> ✿ Dar un golpe divertido
 |🜸 \`#think\` »͜ \`#pensar\` + <mencion>
> ✿ Pensar en algo
 |🜸 \`#walk\` »͜ \`#caminar\` + <mencion>
> ✿ Caminar
 |🜸 \`#waifu\`
> ✿ Buscar una waifu aleatoria.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      gacha: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`GACHA\` 𐦯╶͜─͜─͜═͜
> ❖ Comandos de *Gacha* para reclamar y colecciónar personajes.
 |🜸 \`#buycharacter\` »͜ \`#buychar\` »͜ \`#buyc\` + [nombre]
> ✿ Comprar un personaje en venta.
 |🜸 \`#charimage\` »͜ \`#waifuimage\` »͜ \`#cimage\` »͜ \`#wimage\` + [nombre]
> ✿ Ver una imagen aleatoria de un personaje.
 |🜸 \`#charinfo\` »͜ \`#winfo\` »͜ \`#waifuinfo\` + [waifu]
> ✿ Ver información de un personaje.
 |🜸 \`#charvideo\` »͜ \`#cvideo\` »͜ \`#waifuvideo\` »͜ \`#wvideo\` + [waifu]
> ✿ Ver un video aleatorio de un personaje.
 |🜸 \`#claim\` »͜ \`#c\` »͜ \`#reclamar\` + {citar personaje}
> ✿ Reclamar un personaje.
 |🜸 \`#delclaimmsg\`
> ✿ Restablecer el mensaje al reclamar un personaje.
 |🜸 \`#ginfo\` »͜ \`#infogacha\` »͜ \`#gachainfo\`
> ✿ Ver tu información de gacha.
 |🜸 \`#givechar\` »͜ \`#givewaifu\` »͜ \`#regalar\` + [@usuario o citar mensaje] [nombre]
> ✿ Regalar un personaje a otro usuario.
 |🜸 \`#harem\` »͜ \`#waifus\` »͜ \`#claims\` + <@usuario>
> ✿ Ver tus personajes reclamados.
 |🜸 \`#haremshop\` »͜ \`#tiendawaifus\` »͜ \`#wshop\` + <Pagina>
> ✿ Ver los personajes en venta.
 |🜸 \`#removesale\` »͜ \`#removerventa\` + [precio] [nombre]
> ✿ Eliminar un personaje en venta.
 |🜸 \`#rollwaifu\` »͜ \`#rw\` »͜ \`#roll\`
> ✿ Waifu o husbando aleatorio
 |🜸 \`#sell\` »͜ \`#vender\` + [precio] [nombre]
> ✿ Poner un personaje a la venta.
 |🜸 \`#ainfo\` »͜ \`#animeinfo\` + [nombre]
> ✿ Información de un anime.
 |🜸 \`#animelist\`
> ✿ Listar series del bot
 |🜸 \`#setclaimmsg\` »͜ \`#setclaim\` + [mensaje]
> ✿ Modificar el mensaje al reclamar un personaje✿.
 |🜸 \`#trade\` »͜ \`#intercambiar\` + [Tu personaje] / [Personaje 2]
> ✿ Intercambiar un personaje con otro usuario
 |🜸 \`#vote\` »͜ \`#votar\` + [nombre]
> ✿ Votar por un personaje para subir su valor.
 |🜸 \`#waifusboard\` »͜ \`#waifustop\` »͜ \`#topwaifus\` »͜ \`#wtop\` + [número]
> ✿ Ver el top de personajes con mayor valor.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      utils: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`UTILITIES\` 𐦯╶͜─͜─͜═͜
> ❖ Comandos de *Utilidades*.
|🜸 \`$prefixgames\`
> ✿ Crear una nueva partida.
 |🜸 \`$prefixhelp\` »͜ \`$prefixmenu\` + [categoria]
> ✿ Ver el menú de comandos.
 |🜸 \`$prefixsug\` »͜ \`$prefixsuggest\`
> ✿ Sugerir nuevas funciones al desarrollador.
 |🜸 \`$prefixreporte\` »͜ \`$prefixreport\`
> ✿ Reportar fallas o problemas del bot.
 |🜸 \`$prefixgetpic\` »͜ \`$prefixpfp\` + [@usuario]
> ✿ Ver la foto de perfil de un usuario.
 |🜸 \`$prefixtoimg\` »͜ \`$prefiximg\` + {citar sticker}
> ✿ Convertir un sticker/imagen de una vista a imagen.
 |🜸 \`$prefixhd\`
> ✿ Mejorar calidad de una imagen.
 |🜸 \`$prefixread\` »͜ \`$prefixreadviewonce\`
> ✿ Ver imágenes viewonce.
 |🜸 \`$prefixia\` »͜ \`$prefixchatgpt\`
> ✿ Preguntar a Chatgpt.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      grupo: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`GROUPS\` 𐦯╶͜─͜─͜═͜
> ❖ Comandos para *Administradores* de grupos.
 |🜸 \`#tag\` »͜ \`#hidetag\` »͜ \`#invocar\` »͜ \`#tagall\` + [mensaje]
> ✿ Envía un mensaje mencionando a todos los usuarios del grupo.
 |🜸 \`#alerts\` »͜ \`#alertas\` + [enable/disable]
> ✿ Activar/desactivar las alertas de promote/demote
 |🜸 \`#antilink\` »͜ \`#antienlace\` + [enable/disable]
> ✿ Activar/desactivar el antienlace
 |🜸 \`#bot\` + [enable/disable]
> ✿ Activar/desactivar al bot
 |🜸 \`#close\` »͜ \`#cerrar\`
> ✿ Cerrar el grupo para que solo los administradores puedan enviar mensajes.
 |🜸 \`#demote\` + <@usuario> | {mencion}
> ✿ Descender a un usuario de administrador.
 |🜸 \`#antistatus\` »͜ \`#antiestados\` + [enable/disable]
> ✿ Activar/desactivar el antiestado
 |🜸 \`#economy\` + [enable/disable]
> ✿ Activar/desactivar los comandos de economía
 |🜸 \`#gacha\` + [enable/disable]
> ✿ Activar/desactivar los comandos de Gacha y Games.
 |🜸 \`#welcome\` »͜ \`#bienvenida\` + [enable/disable]
> ✿ Activar/desactivar la bienvenida y despedida.
 |🜸 \`#setbye\` + [texto]
> ✿ Establecer un mensaje de despedida personalizado.
 |🜸 \`#setwelcome\` + [texto]
> ✿ Establecer un mensaje de bienvenida personalizado.
 |🜸 \`#kick\` + <@usuario> | {mencion}
> ✿ Expulsar a un usuario del grupo.
 |🜸 \`#onlyadmin\` + [enable/disable]
> ✿ Permitir que solo los administradores puedan utilizar los comandos.
 |🜸 \`#open\` »͜ \`#abrir\`
> ✿ Abrir el grupo para que todos los usuarios puedan enviar mensajes.
 |🜸 \`#promote\` + <@usuario> | {mencion}
> ✿ Ascender a un usuario a administrador.
 |🜸 \`#restablecer\` »͜ \`#revoke\`
> ✿ Restablecer enlace del grupo.
 |🜸 \`#msgcount\` »͜ \`#count\` »͜ \`#messages\` + {mencion}
> ✿ Obtener el conteo de mensajes y comandos de un usuario.
 |🜸 \`#topcount\` »͜ \`#topmessage\` »͜ \`#topmsgcount\`
> ✿ Obtener la lista de los usuarios con mas del grupo.
 |🜸 \`#topinactive\` »͜ \`#topinactiveusers\` »͜ \`#topinactivos\`
> ✿ Obtener el top de los usuarios con menos mensajes del grupo.
 |🜸 \`#warn\` + <@usuario> | {mencion}
> ✿ Advertir aún usuario.
 |🜸 \`#delwarn\` + <@usuario> | {mencion}
> ✿ Quitar advertencias de un usuario.
 |🜸 \`#gpbanner\` »͜ \`#groupimg\`
> ✿ Cambiar la imagen del grupo.
 |🜸 \`#gpname\` »͜ \`#groupname\` [texto]
> ✿ Cambiar la nombre del grupo.
 |🜸 \`#gpdesc\` »͜ \`#groupdesc\` [texto]
> ✿ Cambiar la descripción del grupo.
 |🜸 \`#del\` »͜ \`#delete\` + {citar un mensaje}
> ✿ Eliminar un mensaje.
 |🜸 \`#gp\` »͜ \`#infogrupo\`
> ✿ Ver la Informacion del grupo.
 |🜸 \`#link\`
> ✿ Ver enlace de invitación del grupo.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      profile: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`PROFILES\`𐦯╶͜─͜─͜═͜
> ❖ Comandos de *Perfil* para ver y configurar tu perfil.
 |🜸 \`$prefixallbirthdays\` »͜ \`$prefixallbirths\`
> ✿ Ver todos los cumpleaños.
 |🜸 \`$prefixbirthdays\` »͜ \`$prefixbirths\` »͜ \`#cumpleaños\`
 > ✿ Ver cumpleaños cercanos en el grupo.
 |🜸 \`$prefixleaderboard\` »͜ \`$prefixlboard\` »͜ \`$prefixtop\` + <Paginá>
> ✿ Top de usuarios con más experiencia.
 |🜸 \`$prefixlevel\` »͜ \`$prefixlvl\` + <@Mencion>
> ✿ Ver tu nivel y experiencia actual.
 |🜸 \`$prefixmarry\` »͜\`$prefixcasarse\` + <@Mencion>
> ✿ Casarte con alguien.
 |🜸 \`$prefixprofile\` + <@Mencion>
> ✿ Ver tu perfil.
 |🜸 \`$prefixsetbirth\` + [fecha]
> ✿ Establecer tu fecha de cumpleaños.
 |🜸 \`$prefixsetdescription\` »͜ \`$prefixsetdesc\` + [Descripcion]
> ✿ Establecer tu descripcion.
 |🜸 \`$prefixsetgenre\` + Hombre | Mujer
> ✿ Establecer tu genero.
 |🜸 \`$prefixdelgenre\` »͜ \`$prefixdelgenero\`
> ✿ Eliminar tu género.
 |🜸 \`$prefixdelbirth\` + [fecha]
> ✿ Borrar tu fecha de cumpleaños.
 |🜸 \`$prefixdivorce\`
> ✿ Divorciarte de tu pareja.
 |🜸 \`$prefixdeldescription\` »͜ \`$prefixdeldesc\`
> ✿ Eliminar tu descripción.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      nsfw: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`NSFW\` 𐦯╶͜─͜─͜═͜
> ❖ Comandos de *NSFW* contenido para adultos.
 |🜸 \`$prefixrule34video\` + {|url}
> ✿ Descargar un video de Rule34Videos.
 |🜸 \`$prefixxnxx\` + {query|url}
> ✿ Buscar y descarga videos de XNXX.
 |🜸 \`$prefixxvideos\` + {query|url}
> ✿ Buscar y descarga videos de XVideos.
 |🜸 \`$prefixdanbooru\` »͜ \`$prefixdbooru\` + {tag}
> ✿ Buscar imágenes en Danbooru.
 |🜸 \`$prefixgelbooru\` »͜ \`$prefixgbooru\` + {tag}
> ✿ Buscar imágenes en Gelbooru.
 |🜸 \`$prefixanal\` + {mencion}
> ✿ hacer un anal
 |🜸 \`$prefixblowjob\` »͜ \`$prefixmamada\` »͜ \`#bj\` + {mencion}
> ✿ hacer una mamada
 |🜸 \`$prefixboobjob\` + {mencion}
> ✿ hacer una rusa
 |🜸 \`$prefixbondage\` + {mencion}
> ✿ Hacer un bukkake.
 |🜸 \`$prefixbukkake\` + {mencion}
> ✿ Atar sin escapatoria.
 |🜸 \`$prefixcum\` + {mencion}
> ✿ venirte en alguien
 |🜸 \`$prefixcummouth\` + {mencion}
> ✿ Acabar en la boca de alguien.
 |🜸 \`$prefixcumshot\` + {mencion}
> ✿ Disparar semen.
 |🜸 \`$prefixcreampie\` + {mencion}
> ✿ Dejar un creampie.
 |🜸 \`$prefixdeepthroat\` + {mencion}
> ✿ Hacer una garganta profunda.
 |🜸 \`$prefixfacesitting\` + {mencion}
> ✿ Sentarse en la cara de alguien.
 |🜸 \`$prefixfingering\` + {mencion}
> ✿ Meter los dedos.
 |🜸 \`#fap\`
> ✿ hacerse una paja
 |🜸 \`$prefixfootjob\` + {mencion}
> ✿ hacer una paja con los pies
 |🜸 \`$prefixfuck\` »͜ \`$prefixcoger\` + {mencion}
> ✿ follarte a alguien
 |🜸 \`$prefixgrabboobs\` + {mencion}
> ✿ agarrar tetas
 |🜸 \`$prefixgrop\` + {mencion}
> ✿ manosear a alguien
 |🜸 \`$prefixlickass\` + {mencion}
> ✿ Lamer un culo.
 |🜸 \`$prefixlickdick\` + {mencion}
> ✿ Lamer un pene.
 |🜸 \`$prefixlickpussy\` + {mencion}
> ✿ lamer un coño
 |🜸 \`$prefixrule34\` »͜ \`$prefixr34\` + {tags}
> ✿ buscar imágenes en rule34
 |🜸 \`$prefixorgy\` »͜ \`$prefixorgia\` + {mencion}
> ✿ Organizar una orgía.
 |🜸 \`$prefixpegging\` + {mencion}
> ✿ Dar por detrás.
 |🜸 \`$prefixsixnine\` »͜ \`$prefix69\` + {mencion}
> ✿ hacer un 69 con alguien
 |🜸 \`$prefixspank\` »͜ \`$prefixnalgada\` + {mencion}
> ✿ dar una nalgada
 |🜸 \`$prefixsuckboobs\` + {mencion}
> ✿ chupar tetas
 |🜸 \`$prefixundress\` »͜ \`$prefixencuerar\` + {mencion}
> ✿ desnudar a alguien
 |🜸 \`$prefixthighjob\` + {mencion}
> ✿ Hacer una entre piernas.
 |🜸 \`$prefixyuri\` »͜ \`#tijeras\` + {mencion}
> ✿ hacer tijeras.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,
}