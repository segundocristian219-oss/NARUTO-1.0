export const bodyMenu = {
    es: `> ❀ Hola! Soy *$namebot*, Aquí tienes la lista de comandos$cat

╭┈ࠢ͜┅ࠦ͜͜╾݊͜─֟͜─ؕ͜─֫͜─ׄ͜─֟͜─ؕ͜─݊͜╼┅ࠡ͜͜┈࠭͜͜۞͜۞͜۞
|❖ *Usuarios* » $users
|🜸 *Tipo:* ($botType)
|» canal oficial: $link
|ꕥ ${dev}
╰ׅ┈ࠢ͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴ ⋱࣭ ᩴ  ⋮֔   ᩴ ⋰╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜┈ࠢ͜╯ׅ
> Vincula un socket usando *$prefixcode* o *$prefixqr*
‧꒷︶꒷✿꒷‧₊˚꒷︶꒷✿꒷︶꒷˚₊‧꒷✿꒷︶꒷‧`,

    en: `> ❀ Hello! I'm *$namebot*, here is the list of commands$cat

╭┈ࠢ͜┅ࠦ͜͜╾݊͜─֟͜─ؕ͜─֫͜─ׄ͜─֟͜─ؕ͜─݊͜╼┅ࠡ͜͜┈࠭͜͜۞͜۞͜۞
|❖ *Users* » $users
|🜸 *Type:* ($botType)
|» official channel: $link
|ꕥ ${dev}
╰ׅ┈ࠢ͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴ ⋱࣭ ᩴ  ⋮֔   ᩴ ⋰╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜┈ࠢ͜╯ׅ
> Link a socket using *$prefixcode* or *$prefixqr*
‧꒷︶꒷✿꒷‧₊˚꒷︶꒷✿꒷︶꒷˚₊‧꒷✿꒷︶꒷‧`,

    id: `> ❀ Halo! Aku *$namebot*, berikut adalah daftar perintah$cat

╭┈ࠢ͜┅ࠦ͜͜╾݊͜─֟͜─ؕ͜─֫͜─ׄ͜─֟͜─ؕ͜─݊͜╼┅ࠡ͜͜┈࠭͜͜۞͜۞͜۞
|❖ *Pengguna* » $users
|🜸 *Tipe:* ($botType)
|» saluran resmi: $link
|ꕥ ${dev}
╰ׅ┈ࠢ͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜╴ ⋱࣭ ᩴ  ⋮֔   ᩴ ⋰╶͜─ׄ͜─ׄ֟፝͜─ׄ͜─ׄ͜┈ࠢ͜╯ׅ
> Hubungkan socket menggunakan *$prefixcode* atau *$prefixqr*
‧꒷︶꒷✿꒷‧₊˚꒷︶꒷✿꒷︶꒷˚₊‧꒷✿꒷︶꒷‧`
};

export const menuObject = {
    es: {
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
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`
    },

    en: {
      economy: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`ECONOMY\` 𐦯╶͜─͜─͜═͜
> ❖ *Economy* commands to earn money.
 |🜸 \`$prefixw\` »͜ \`$prefixwork\` »͜ \`$prefixtrabajar\`
> ✿ Earn coins by working.
 |🜸 \`$prefixslut\` »͜ \`$prefixprotituirse\`
> ✿ Earn coins through adult-themed work.
 |🜸 \`$prefixcoinflip\` »͜ \`$prefixflip\` »͜ \`$prefixcf\` + [amount] <heads/tails>
> ✿ Bet coins on a coin flip.
 |🜸 \`$prefixcrime\` »͜ \`$prefixcrimen\`
> ✿ Earn coins quickly.
 |🜸 \`$prefixroulette\` »͜ \`$prefixrt\` + [red/black] [amount]
> ✿ Bet coins on roulette.
 |🜸 \`$prefixbalance\` »͜ \`$prefixbal\` »͜ \`$prefixbank\` + <user>
> ✿ Check how many coins you have in the bank.
 |🜸 \`$prefixdeposit\` »͜ \`$prefixdep\` »͜ \`$prefixdepositar\` »͜ \`$prefixd\` + [amount] | all
> ✿ Deposit your coins into the bank.
 |🜸 \`$prefixwithdraw\` »͜ \`$prefixwith\` »͜ \`$prefixretirar\` + [amount] | all
> ✿ Withdraw your coins from the bank.
 |🜸 \`$prefixeinfo\` »͜ \`$prefixeconomyinfo\` »͜ \`$prefixinfoeconomy\`
> ✿ View your economy information in the group.
 |🜸 \`#givecoins\` »͜ \`#pay\` »͜ \`#coinsgive\` + [user] [amount]
> ✿ Give coins to another user.
 |🜸 \`$prefixmiming\` »͜ \`$prefixminar\` »͜ \`$prefixmine\`
> ✿ Perform mining jobs and earn coins.
 🜸 \`$prefixdaily\` »͜ \`$prefixdiario\`
> ✿ Claim your daily reward.
 |🜸 \`$prefixsteal\` »͜ \`$prefixrobar\` »͜ \`$prefixrob\` + [@mention]
> ✿ Try to steal coins from a user.
 |🜸 \`$prefixeconomyboard\` »͜ \`$prefixeboard\` »͜ \`$prefixbaltop\` + <page>
> ✿ View the economy leaderboard in the group.
 |🜸 \`$prefixcurar\` »͜ \`$prefixheal\`
> ✿ Restore health to go on adventures.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      sockets: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`SOCKETS\` 𐦯╶͜─͜─͜═͜
> ❖ Commands for registering and managing sockets.
 |🜸 \`$prefixcode\` »͜ \`$prefixqr\`
> ✿ Create a socket using a QR/Code.
 |🜸 \`$prefixsetbanner\`
> ✿ Change the menu image.
 |🜸 \`$prefixsetname\`
> ✿ Change your socket name.
 |🜸 \`$prefixreload\`
> ✿ Reload the socket session.
 |🜸 \`$prefixsetbotcurrency\`
> ✿ Change the socket currency.
 |🜸 \`$prefixsetbotowner\` »͜ \`$prefixsetowner\`
> ✿ Change the bot owner.
 |🜸 \`$prefixlogout\`
> ✿ Log out the socket.
 |🜸 \`$prefixsetpfp\` »͜ \`$prefixsetimage\`
> ✿ Change the socket profile picture.
 |🜸 \`$prefixsetusername\` »͜ \`$prefixsetuser\`
> ✿ Change the username.
 |🜸 \`$prefixsetstatus\` + [status]
> ✿ Change the bot status.
 |🜸 \`$prefixjoin\`
> ✿ Add the bot to a group.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      stickers: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`STICKERS\` 𐦯╶͜─͜─͜═͜
> ❖ *Sticker* commands for creating and managing sticker packs.
 |🜸 \`$prefixstickerpack\` »͜ \`$prefixspack\` + <query|url>
> ✿ Search and download a sticker pack.
 |🜸 \`$prefixdelpack\` [pack name]
> ✿ Delete a sticker pack.
 |🜸 \`$prefixgetpack\` »͜ \`$prefixstickerpack\` »͜ \`$prefixpack\` [pack name]
> ✿ Download a sticker pack.
 |🜸 \`$prefixnewpack\` »͜ \`$prefixnewstickerpack\` [pack name]
> ✿ Create a new sticker pack.
 |🜸 \`$prefixsetpackprivate\` »͜ \`$prefixsetpackpriv\` »͜ \`#packprivate\` [pack name]
> ✿ Set a sticker pack as private.
 |🜸 \`$prefixsetpackpublic\` »͜ \`$prefixsetpackpub\` »͜ \`$prefixpackpublic\` [pack name]
> ✿ Set a sticker pack as public.
 |🜸 \`$prefixsetstickerpackesc\` »͜ \`$prefixsetpackdesc\` »͜ \`$prefixpackdesc\` [pack name] | [description]
> ✿ Set the description of a sticker pack.
 |🜸 \`$prefixstickeradd\` »͜ \`$prefixaddsticker\` [pack name]
> ✿ Add a sticker to a sticker pack.
 |🜸 \`$prefixstickerdel\` »͜ \`$prefixdelsticker\` [pack name]
> ✿ Remove a sticker from a sticker pack.
 |🜸 \`$prefixsticker\` »͜ \`$prefixs\`
> ✿ Create stickers from an image/video.
 |🜸 \`$prefixsetmeta\`
> ✿ Set a pack name and author for stickers.
 |🜸 \`$prefixdelmeta\`
> ✿ Remove your sticker pack metadata.
 |🜸 \`$prefixwm\`
> ✿ Change the name of stickers.
 |🜸 \`$prefixstickerpacks\` »͜ \`$prefixpacklist\` [pack name]
> ✿ List your sticker packs.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      downloads: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`DOWNLOAD\` 𐦯╶͜─͜─͜═͜
> ❖ *Download* commands for downloading files from different sources.
 |🜸 \`$prefixtiktok\` »͜ \`$prefixtt\` + [Link] / [search]
> ✿ Download a TikTok video.
 |🜸 \`$prefixmediafire\` »͜ \`$prefixmf\` + [Link]
> ✿ Download a file from MediaFire.
 |🜸 \`$prefixplay\` »͜ \`$prefixytmp3\` »͜ \`$prefixytmp4\` + [Song] / [Link]
> ✿ Download a song from YouTube.
 |🜸 \`$prefixfacebook\` »͜ \`$prefixfb\` + [Link]
> ✿ Download a Facebook video.
 |🜸 \`$prefixtwitter\` »͜ \`$prefixx\` + [Link]
> ✿ Download a Twitter/X video.
 |🜸 \`$prefixig\` »͜ \`$prefixinstagram\` + [Link]
> ✿ Download an Instagram reel.
 |🜸 \`$prefixpinterest\` »͜ \`$prefixpin\` + [search] / [Link]
> ✿ Search and download Pinterest images.
 |🜸 \`$prefiximage\` »͜ \`$prefiximagen\` + [search]
> ✿ Search and download Google images.
 |🜸 \`$prefixapk\` »͜ \`$prefixmodapk\` + [search]
> ✿ Download an APK from Aptoide.
 |🜸 \`$prefixtiktoks\` »͜ \`$prefixtts\` + [search]
> ✿ Search for TikTok videos.
 |🜸 \`$prefixytsearch\` »͜ \`$prefixsearch\` + [search]
> ✿ Search for YouTube videos.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      anime: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`ANIME\` 𐦯╶͜─͜─͜═͜
> ❖ Anime reaction commands.
 |🜸 \`#peek\` »͜ \`#mirar\` + <mention>
> ✿ Look at someone.
 |🜸 \`#comfort\` »͜ \`#consolar\` + <mention>
> ✿ Comfort someone.
 |🜸 \`#thinkhard\` »͜ \`#pensar\` + <mention>
> ✿ Think deeply.
 |🜸 \`#curious\` »͜ \`#curioso\` »͜ \`#curiosa\` + <mention>
> ✿ Show curiosity.
 |🜸 \`#sniff\` »͜ \`#oler\` + <mention>
> ✿ Sniff someone.
 |🜸 \`#stare\` »͜ \`#mirar\` + <mention>
> ✿ Stare at someone.
 |🜸 \`#trip\` »͜ \`#tropezar\` + <mention>
> ✿ Trip over someone.
 |🜸 \`#blowkiss\` »͜ \`#besito\` + <mention>
> ✿ Send a kiss.
 |🜸 \`#angry\` »͜ \`#enojado\` + <mention>
> ✿ Be angry.
 |🜸 \`#bath\` »͜ \`#bañarse\` + <mention>
> ✿ Take a bath.
 |🜸 \`#bite\` »͜ \`#morder\` + <mention>
> ✿ Bite someone.
 |🜸 \`#bleh\` »͜ \`#lengua\` + <mention>
> ✿ Stick out your tongue.
 |🜸 \`#blush\` »͜ \`#sonrojarse\` + <mention>
> ✿ Blush.
 |🜸 \`#bored\` »͜ \`#aburrido\` + <mention>
> ✿ Be bored.
 |🜸 \`#call\` + <mention>
> ✿ Call someone.
 |🜸 \`#clap\` »͜ \`#aplaudir\` + <mention>
> ✿ Clap.
 |🜸 \`#coffee\` »͜ \`#cafe\` »͜ \`#café\` + <mention>
> ✿ Drink coffee.
 |🜸 \`#cold\` »͜ \`#frio\` + <mention>
> ✿ Feel cold.
 |🜸 \`#sing\` »͜ \`#cantar\` + <mention>
> ✿ Sing.
 |🜸 \`#tickle\` »͜ \`#cosquillas\` + <mention>
> ✿ Tickle someone.
 |🜸 \`#nope\` »͜ \`#no\` + <mention>
> ✿ Refuse to do something.
 |🜸 \`#jump\` »͜ \`#saltar\` + <mention>
> ✿ Jump.
 |🜸 \`#heat\` »͜ \`#calor\` + <mention>
> ✿ Feel hot.
 |🜸 \`#jugar\` »͜ \`#gaming\` + <mention>
> ✿ Play video games.
 |🜸 \`#draw\` »͜ \`#dibujar\` + <mention>
> ✿ Draw.
 |🜸 \`#cry\` »͜ \`#llorar\` + <mention>
> ✿ Cry over something or someone.
 |🜸 \`#cuddle\` »͜ \`#acurrucarse\` + <mention>
> ✿ Cuddle.
 |🜸 \`#dance\` »͜ \`#bailar\` + <mention>
> ✿ Show off your best dance moves.
 |🜸 \`#dramatic\` »͜ \`#drama\` + <mention>
> ✿ Be dramatic.
 |🜸 \`#drunk\` »͜ \`#borracho\` + <mention>
> ✿ Act drunk.
 |🜸 \`#eat\` »͜ \`#comer\` + <mention>
> ✿ Eat something delicious.
 |🜸 \`#facepalm\` »͜ \`#palmada\` + <mention>
> ✿ Facepalm.
 |🜸 \`#happy\` »͜ \`#feliz\` + <mention>
> ✿ Jump with happiness.
 |🜸 \`#hug\` »͜ \`#abrazar\` + <mention>
> ✿ Give someone a hug.
 |🜸 \`#kill\` »͜ \`#matar\` + <mention>
> ✿ Attack someone in a fictional anime-style reaction.
 |🜸 \`#kiss\` »͜ \`#muak\` + <mention>
> ✿ Give a kiss.
 |🜸 \`#kisscheek\` »͜ \`#beso\` + <mention>
> ✿ Give a cheek kiss.
 |🜸 \`#laugh\` »͜ \`#reirse\` + <mention>
> ✿ Laugh at something or someone.
 |🜸 \`#lick\` »͜ \`#lamer\` + <mention>
> ✿ Lick someone.
 |🜸 \`#love\` »͜ \`#amor\` »͜ \`#enamorado\` »͜ \`#enamorada\` + <mention>
> ✿ Express affection.
 |🜸 \`#pat\` »͜ \`#palmadita\` »͜ \`#palmada\` + <mention>
> ✿ Pat someone.
 |🜸 \`#poke\` »͜ \`#picar\` + <mention>
> ✿ Poke someone.
 |🜸 \`#push\` »͜ \`#empujar\` + <mention>
> ✿ Push someone.
 |🜸 \`#pout\` »͜ \`#pucheros\` + <mention>
> ✿ Make a pout.
 |🜸 \`#punch\` »͜ \`#pegar\` »͜ \`#golpear\` + <mention>
> ✿ Throw a punch.
 |🜸 \`#run\` »͜ \`#correr\` + <mention>
> ✿ Run.
 |🜸 \`#sad\` »͜ \`#triste\` + <mention>
> ✿ Express sadness.
 |🜸 \`#scared\` »͜ \`#asustado\` »͜ \`#asustada\` + <mention>
> ✿ Be scared.
 |🜸 \`#shy\` »͜ \`#timido\` »͜ \`#timida\` + <mention>
> ✿ Feel shy.
 |🜸 \`#slap\` »͜ \`#bofetada\` + <mention>
> ✿ Give a slap.
 |🜸 \`#sleep\` »͜ \`#dormir\` + <mention>
> ✿ Go to sleep.
 |🜸 \`#spit\` »͜ \`#escupir\` + <mention>
> ✿ Spit.
 |🜸 \`#step\` »͜ \`#pisar\` + <mention>
> ✿ Step on someone.
 |🜸 \`#bonk\` + <mention>
> ✿ Give a funny bonk.
 |🜸 \`#think\` »͜ \`#pensar\` + <mention>
> ✿ Think about something.
 |🜸 \`#walk\` »͜ \`#caminar\` + <mention>
> ✿ Walk.
 |🜸 \`#waifu\`
> ✿ Find a random waifu.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      gacha: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`GACHA\` 𐦯╶͜─͜─͜═͜
> ❖ *Gacha* commands to collect characters.
 |🜸 \`#buycharacter\` »͜ \`#buychar\` »͜ \`#buyc\` + [name]
> ✿ Buy a character that is for sale.
 |🜸 \`#charimage\` »͜ \`#waifuimage\` »͜ \`#cimage\` »͜ \`#wimage\` + [name]
> ✿ View a random image of a character.
 |🜸 \`#charinfo\` »͜ \`#winfo\` »͜ \`#waifuinfo\` + [waifu]
> ✿ View character information.
 |🜸 \`#charvideo\` »͜ \`#cvideo\` »͜ \`#waifuvideo\` »͜ \`#wvideo\` + [waifu]
> ✿ View a random video of a character.
 |🜸 \`#claim\` »͜ \`#c\` »͜ \`#reclamar\` + {quoted character}
> ✿ Claim a character.
 |🜸 \`#delclaimmsg\`
> ✿ Reset the character claim message.
 |🜸 \`#ginfo\` »͜ \`#infogacha\` »͜ \`#gachainfo\`
> ✿ View your gacha information.
 |🜸 \`#givechar\` »͜ \`#givewaifu\` »͜ \`#regalar\` + [@user or quoted message] [name]
> ✿ Give a character to another user.
 |🜸 \`#harem\` »͜ \`#waifus\` »͜ \`#claims\` + <@user>
> ✿ View your claimed characters.
 |🜸 \`#haremshop\` »͜ \`#tiendawaifus\` »͜ \`#wshop\` + <page>
> ✿ View characters that are for sale.
 |🜸 \`#removesale\` »͜ \`#removerventa\` + [price] [name]
> ✿ Remove a character from sale.
 |🜸 \`#rollwaifu\` »͜ \`#rw\` »͜ \`#roll\`
> ✿ Get a random waifu or husbando.
 |🜸 \`#sell\` »͜ \`#vender\` + [price] [name]
> ✿ Put a character up for sale.
 |🜸 \`#ainfo\` »͜ \`#animeinfo\` + [name]
> ✿ View anime information.
 |🜸 \`#animelist\`
> ✿ List the bot's series.
 |🜸 \`#setclaimmsg\` »͜ \`#setclaim\` + [message]
> ✿ Change the character claim message.
 |🜸 \`#trade\` »͜ \`#intercambiar\` + [Your character] / [Character 2]
> ✿ Trade a character with another user.
 |🜸 \`#vote\` »͜ \`#votar\` + [name]
> ✿ Vote for a character to increase its value.
 |🜸 \`#waifusboard\` »͜ \`#waifustop\` »͜ \`#topwaifus\` »͜ \`#wtop\` + [number]
> ✿ View the top characters by value.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      utils: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`UTILITIES\` 𐦯╶͜─͜─͜═͜
> ❖ *Utility* commands.
|🜸 \`$prefixgames\`
> ✿ Create a new game.
 |🜸 \`$prefixhelp\` »͜ \`$prefixmenu\` + [category]
> ✿ View the command menu.
 |🜸 \`$prefixsug\` »͜ \`$prefixsuggest\`
> ✿ Suggest new features to the developer.
 |🜸 \`$prefixreporte\` »͜ \`$prefixreport\`
> ✿ Report bot bugs or problems.
 |🜸 \`$prefixgetpic\` »͜ \`$prefixpfp\` + [@user]
> ✿ View a user's profile picture.
 |🜸 \`$prefixtoimg\` »͜ \`$prefiximg\` + {quoted sticker}
> ✿ Convert a sticker/image into an image.
 |🜸 \`$prefixhd\`
> ✿ Improve image quality.
 |🜸 \`$prefixread\` »͜ \`$prefixreadviewonce\`
> ✿ View view-once images.
 |🜸 \`$prefixia\` »͜ \`$prefixchatgpt\`
> ✿ Ask ChatGPT.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      grupo: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`GROUPS\` 𐦯╶͜─͜─͜═͜
> ❖ Commands for *Group Administrators*.
 |🜸 \`#tag\` »͜ \`#hidetag\` »͜ \`#invocar\` »͜ \`#tagall\` + [message]
> ✿ Send a message mentioning all group members.
 |🜸 \`#alerts\` »͜ \`#alertas\` + [enable/disable]
> ✿ Enable/disable promote/demote alerts.
 |🜸 \`#antilink\` »͜ \`#antienlace\` + [enable/disable]
> ✿ Enable/disable anti-link.
 |🜸 \`#bot\` + [enable/disable]
> ✿ Enable/disable the bot.
 |🜸 \`#close\` »͜ \`#cerrar\`
> ✿ Close the group so only administrators can send messages.
 |🜸 \`#demote\` + <@user> | {mention}
> ✿ Remove administrator privileges from a user.
 |🜸 \`#antistatus\` »͜ \`#antiestados\` + [enable/disable]
> ✿ Enable/disable anti-status.
 |🜸 \`#economy\` + [enable/disable]
> ✿ Enable/disable economy commands.
 |🜸 \`#gacha\` + [enable/disable]
> ✿ Enable/disable Gacha and Games commands.
 |🜸 \`#welcome\` »͜ \`#bienvenida\` + [enable/disable]
> ✿ Enable/disable welcome and goodbye messages.
 |🜸 \`#setbye\` + [text]
> ✿ Set a custom goodbye message.
 |🜸 \`#setwelcome\` + [text]
> ✿ Set a custom welcome message.
 |🜸 \`#kick\` + <@user> | {mention}
> ✿ Remove a user from the group.
 |🜸 \`#onlyadmin\` + [enable/disable]
> ✿ Allow only administrators to use commands.
 |🜸 \`#open\` »͜ \`#abrir\`
> ✿ Open the group so everyone can send messages.
 |🜸 \`#promote\` + <@user> | {mention}
> ✿ Promote a user to administrator.
 |🜸 \`#restablecer\` »͜ \`#revoke\`
> ✿ Reset the group invitation link.
 |🜸 \`#msgcount\` »͜ \`#count\` »͜ \`#messages\` + {mention}
> ✿ Get a user's message and command count.
 |🜸 \`#topcount\` »͜ \`#topmessage\` »͜ \`#topmsgcount\`
> ✿ Get the list of users with the most messages.
 |🜸 \`#topinactive\` »͜ \`#topinactiveusers\` »͜ \`#topinactivos\`
> ✿ Get the users with the fewest messages.
 |🜸 \`#warn\` + <@user> | {mention}
> ✿ Warn a user.
 |🜸 \`#delwarn\` + <@user> | {mention}
> ✿ Remove a user's warnings.
 |🜸 \`#gpbanner\` »͜ \`#groupimg\`
> ✿ Change the group image.
 |🜸 \`#gpname\` »͜ \`#groupname\` [text]
> ✿ Change the group name.
 |🜸 \`#gpdesc\` »͜ \`#groupdesc\` [text]
> ✿ Change the group description.
 |🜸 \`#del\` »͜ \`#delete\` + {quoted message}
> ✿ Delete a message.
 |🜸 \`#gp\` »͜ \`#infogrupo\`
> ✿ View group information.
 |🜸 \`#link\`
> ✿ View the group invitation link.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      profile: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`PROFILES\` 𐦯╶͜─͜─͜═͜
> ❖ *Profile* commands to view and configure your profile.
 |🜸 \`$prefixallbirthdays\` »͜ \`$prefixallbirths\`
> ✿ View all birthdays.
 |🜸 \`$prefixbirthdays\` »͜ \`$prefixbirths\` »͜ \`#cumpleaños\`
> ✿ View upcoming birthdays in the group.
 |🜸 \`$prefixleaderboard\` »͜ \`$prefixlboard\` »͜ \`$prefixtop\` + <page>
> ✿ View the top users by experience.
 |🜸 \`$prefixlevel\` »͜ \`$prefixlvl\` + <@mention>
> ✿ View your current level and experience.
 |🜸 \`$prefixmarry\` »͜ \`$prefixcasarse\` + <@mention>
> ✿ Marry someone.
 |🜸 \`$prefixprofile\` + <@mention>
> ✿ View your profile.
 |🜸 \`$prefixsetbirth\` + [date]
> ✿ Set your birthday.
 |🜸 \`$prefixsetdescription\` »͜ \`$prefixsetdesc\` + [description]
> ✿ Set your description.
 |🜸 \`$prefixsetgenre\` + Male | Female
> ✿ Set your gender.
 |🜸 \`$prefixdelgenre\` »͜ \`$prefixdelgenero\`
> ✿ Remove your gender.
 |🜸 \`$prefixdelbirth\` + [date]
> ✿ Delete your birthday.
 |🜸 \`$prefixdivorce\`
> ✿ Divorce your partner.
 |🜸 \`$prefixdeldescription\` »͜ \`$prefixdeldesc\`
> ✿ Delete your description.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      nsfw: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`NSFW\` 𐦯╶͜─͜─͜═͜
> ❖ *NSFW* adult content commands.
 |🜸 \`$prefixrule34video\` + {|url}
> ✿ Download a Rule34Videos video.
 |🜸 \`$prefixxnxx\` + {query|url}
> ✿ Search and download XNXX videos.
 |🜸 \`$prefixxvideos\` + {query|url}
> ✿ Search and download XVideos videos.
 |🜸 \`$prefixdanbooru\` »͜ \`$prefixdbooru\` + {tag}
> ✿ Search images on Danbooru.
 |🜸 \`$prefixgelbooru\` »͜ \`$prefixgbooru\` + {tag}
> ✿ Search images on Gelbooru.
 |🜸 \`$prefixanal\` + {mention}
> ✿ Do anal sex.
 |🜸 \`$prefixblowjob\` »͜ \`$prefixmamada\` »͜ \`#bj\` + {mention}
> ✿ Give a blowjob.
 |🜸 \`$prefixboobjob\` + {mention}
> ✿ Give a titty fuck.
 |🜸 \`$prefixbondage\` + {mention}
> ✿ Tie someone up with no escape.
 |🜸 \`$prefixbukkake\` + {mention}
> ✿ Do a bukkake.
 |🜸 \`$prefixcum\` + {mention}
> ✿ Cum on someone.
 |🜸 \`$prefixcummouth\` + {mention}
> ✿ Cum in someone's mouth.
 |🜸 \`$prefixcumshot\` + {mention}
> ✿ Shoot a cumshot.
 |🜸 \`$prefixcreampie\` + {mention}
> ✿ Give a creampie.
 |🜸 \`$prefixdeepthroat\` + {mention}
> ✿ Do a deepthroat.
 |🜸 \`$prefixfacesitting\` + {mention}
> ✿ Sit on someone's face.
 |🜸 \`$prefixfingering\` + {mention}
> ✿ Finger someone.
 |🜸 \`#fap\`
> ✿ Masturbate.
 |🜸 \`$prefixfootjob\` + {mention}
> ✿ Give a footjob.
 |🜸 \`$prefixfuck\` »͜ \`$prefixcoger\` + {mention}
> ✿ Fuck someone.
 |🜸 \`$prefixgrabboobs\` + {mention}
> ✿ Grab boobs.
 |🜸 \`$prefixgrop\` + {mention}
> ✿ Grope someone.
 |🜸 \`$prefixlickass\` + {mention}
> ✿ Lick an ass.
 |🜸 \`$prefixlickdick\` + {mention}
> ✿ Lick a dick.
 |🜸 \`$prefixlickpussy\` + {mention}
> ✿ Lick a pussy.
 |🜸 \`$prefixrule34\` »͜ \`$prefixr34\` + {tags}
> ✿ Search images on rule34.
 |🜸 \`$prefixorgy\` »͜ \`$prefixorgia\` + {mention}
> ✿ Organize an orgy.
 |🜸 \`$prefixpegging\` + {mention}
> ✿ Do pegging.
 |🜸 \`$prefixsixnine\` »͜ \`$prefix69\` + {mention}
> ✿ Do a 69 with someone.
 |🜸 \`$prefixspank\` »͜ \`$prefixnalgada\` + {mention}
> ✿ Spank someone.
 |🜸 \`$prefixsuckboobs\` + {mention}
> ✿ Suck boobs.
 |🜸 \`$prefixundress\` »͜ \`$prefixencuerar\` + {mention}
> ✿ Undress someone.
 |🜸 \`$prefixthighjob\` + {mention}
> ✿ Give a thighjob.
 |🜸 \`$prefixyuri\` »͜ \`#tijeras\` + {mention}
> ✿ Scissor someone.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`
    },

    id: {
      economy: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`ECONOMY\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah *Ekonomi* untuk mendapatkan uang.
 |🜸 \`$prefixw\` »͜ \`$prefixwork\` »͜ \`$prefixtrabajar\`
> ✿ Dapatkan koin dengan bekerja.
 |🜸 \`$prefixslut\` »͜ \`$prefixprotituirse\`
> ✿ Dapatkan koin melalui pekerjaan bertema dewasa.
 |🜸 \`$prefixcoinflip\` »͜ \`$prefixflip\` »͜ \`$prefixcf\` + [jumlah] <kepala/ekor>
> ✿ Bertaruh koin dalam permainan lempar koin.
 |🜸 \`$prefixcrime\` »͜ \`$prefixcrimen\`
> ✿ Dapatkan koin dengan cepat.
 |🜸 \`$prefixroulette\` »͜ \`$prefixrt\` + [merah/hitam] [jumlah]
> ✿ Bertaruh koin pada roulette.
 |🜸 \`$prefixbalance\` »͜ \`$prefixbal\` »͜ \`$prefixbank\` + <pengguna>
> ✿ Lihat jumlah koin yang kamu miliki di bank.
 |🜸 \`$prefixdeposit\` »͜ \`$prefixdep\` »͜ \`$prefixdepositar\` »͜ \`$prefixd\` + [jumlah] | all
> ✿ Simpan koinmu ke bank.
 |🜸 \`$prefixwithdraw\` »͜ \`$prefixwith\` »͜ \`$prefixretirar\` + [jumlah] | all
> ✿ Tarik koinmu dari bank.
 |🜸 \`$prefixeinfo\` »͜ \`$prefixeconomyinfo\` »͜ \`$prefixinfoeconomy\`
> ✿ Lihat informasi ekonomi kamu di grup.
 |🜸 \`#givecoins\` »͜ \`#pay\` »͜ \`#coinsgive\` + [pengguna] [jumlah]
> ✿ Berikan koin kepada pengguna lain.
 |🜸 \`$prefixmiming\` »͜ \`$prefixminar\` »͜ \`$prefixmine\`
> ✿ Melakukan pekerjaan menambang dan mendapatkan koin.
 🜸 \`$prefixdaily\` »͜ \`$prefixdiario\`
> ✿ Klaim hadiah harianmu.
 |🜸 \`$prefixsteal\` »͜ \`$prefixrobar\` »͜ \`$prefixrob\` + [@mention]
> ✿ Mencoba mencuri koin dari pengguna.
 |🜸 \`$prefixeconomyboard\` »͜ \`$prefixeboard\` »͜ \`$prefixbaltop\` + <halaman>
> ✿ Lihat peringkat ekonomi di grup.
 |🜸 \`$prefixcurar\` »͜ \`$prefixheal\`
> ✿ Memulihkan kesehatan untuk pergi berpetualang.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      sockets: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`SOCKETS\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah untuk mendaftarkan dan mengelola socket.
 |🜸 \`$prefixcode\` »͜ \`$prefixqr\`
> ✿ Membuat socket menggunakan QR/Code.
 |🜸 \`$prefixsetbanner\`
> ✿ Mengubah gambar menu.
 |🜸 \`$prefixsetname\`
> ✿ Mengubah nama socket.
 |🜸 \`$prefixreload\`
> ✿ Memuat ulang sesi socket.
 |🜸 \`$prefixsetbotcurrency\`
> ✿ Mengubah mata uang socket.
 |🜸 \`$prefixsetbotowner\` »͜ \`$prefixsetowner\`
> ✿ Mengubah pemilik bot.
 |🜸 \`$prefixlogout\`
> ✿ Keluar dari sesi socket.
 |🜸 \`$prefixsetpfp\` »͜ \`$prefixsetimage\`
> ✿ Mengubah foto profil socket.
 |🜸 \`$prefixsetusername\` »͜ \`$prefixsetuser\`
> ✿ Mengubah nama pengguna.
 |🜸 \`$prefixsetstatus\` + [status]
> ✿ Mengubah status bot.
 |🜸 \`$prefixjoin\`
> ✿ Menambahkan bot ke grup.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      stickers: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`STICKERS\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah *Stiker* untuk membuat dan mengelola paket stiker.
 |🜸 \`$prefixstickerpack\` »͜ \`$prefixspack\` + <query|url>
> ✿ Mencari dan mengunduh paket stiker.
 |🜸 \`$prefixdelpack\` [nama paket]
> ✿ Menghapus paket stiker.
 |🜸 \`$prefixgetpack\` »͜ \`$prefixstickerpack\` »͜ \`$prefixpack\` [nama paket]
> ✿ Mengunduh paket stiker.
 |🜸 \`$prefixnewpack\` »͜ \`$prefixnewstickerpack\` [nama paket]
> ✿ Membuat paket stiker baru.
 |🜸 \`$prefixsetpackprivate\` »͜ \`$prefixsetpackpriv\` »͜ \`#packprivate\` [nama paket]
> ✿ Menjadikan paket stiker privat.
 |🜸 \`$prefixsetpackpublic\` »͜ \`$prefixsetpackpub\` »͜ \`$prefixpackpublic\` [nama paket]
> ✿ Menjadikan paket stiker publik.
 |🜸 \`$prefixsetstickerpackesc\` »͜ \`$prefixsetpackdesc\` »͜ \`$prefixpackdesc\` [nama paket] | [deskripsi]
> ✿ Mengatur deskripsi paket stiker.
 |🜸 \`$prefixstickeradd\` »͜ \`$prefixaddsticker\` [nama paket]
> ✿ Menambahkan stiker ke paket.
 |🜸 \`$prefixstickerdel\` »͜ \`$prefixdelsticker\` [nama paket]
> ✿ Menghapus stiker dari paket.
 |🜸 \`$prefixsticker\` »͜ \`$prefixs\`
> ✿ Membuat stiker dari gambar/video.
 |🜸 \`$prefixsetmeta\`
> ✿ Mengatur nama paket dan pembuat stiker.
 |🜸 \`$prefixdelmeta\`
> ✿ Menghapus metadata paket stikermu.
 |🜸 \`$prefixwm\`
> ✿ Mengubah nama stiker.
 |🜸 \`$prefixstickerpacks\` »͜ \`$prefixpacklist\` [nama paket]
> ✿ Melihat daftar paket stikermu.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      downloads: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`DOWNLOAD\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah *Download* untuk mengunduh file dari berbagai sumber.
 |🜸 \`$prefixtiktok\` »͜ \`$prefixtt\` + [Link] / [pencarian]
> ✿ Mengunduh video TikTok.
 |🜸 \`$prefixmediafire\` »͜ \`$prefixmf\` + [Link]
> ✿ Mengunduh file dari MediaFire.
 |🜸 \`$prefixplay\` »͜ \`$prefixytmp3\` »͜ \`$prefixytmp4\` + [Lagu] / [Link]
> ✿ Mengunduh lagu dari YouTube.
 |🜸 \`$prefixfacebook\` »͜ \`$prefixfb\` + [Link]
> ✿ Mengunduh video Facebook.
 |🜸 \`$prefixtwitter\` »͜ \`$prefixx\` + [Link]
> ✿ Mengunduh video Twitter/X.
 |🜸 \`$prefixig\` »͜ \`$prefixinstagram\` + [Link]
> ✿ Mengunduh reel Instagram.
 |🜸 \`$prefixpinterest\` »͜ \`$prefixpin\` + [pencarian] / [Link]
> ✿ Mencari dan mengunduh gambar Pinterest.
 |🜸 \`$prefiximage\` »͜ \`$prefiximagen\` + [pencarian]
> ✿ Mencari dan mengunduh gambar Google.
 |🜸 \`$prefixapk\` »͜ \`$prefixmodapk\` + [pencarian]
> ✿ Mengunduh APK dari Aptoide.
 |🜸 \`$prefixtiktoks\` »͜ \`$prefixtts\` + [pencarian]
> ✿ Mencari video TikTok.
 |🜸 \`$prefixytsearch\` »͜ \`$prefixsearch\` + [pencarian]
> ✿ Mencari video YouTube.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      anime: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`ANIME\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah reaksi anime.
 |🜸 \`#peek\` »͜ \`#mirar\` + <mention>
> ✿ Melihat seseorang.
 |🜸 \`#comfort\` »͜ \`#consolar\` + <mention>
> ✿ Menghibur seseorang.
 |🜸 \`#thinkhard\` »͜ \`#pensar\` + <mention>
> ✿ Berpikir dengan serius.
 |🜸 \`#curious\` »͜ \`#curioso\` »͜ \`#curiosa\` + <mention>
> ✿ Menunjukkan rasa penasaran.
 |🜸 \`#sniff\` »͜ \`#oler\` + <mention>
> ✿ Mengendus seseorang.
 |🜸 \`#stare\` »͜ \`#mirar\` + <mention>
> ✿ Menatap seseorang.
 |🜸 \`#trip\` »͜ \`#tropezar\` + <mention>
> ✿ Tersandung seseorang.
 |🜸 \`#blowkiss\` »͜ \`#besito\` + <mention>
> ✿ Mengirim ciuman.
 |🜸 \`#angry\` »͜ \`#enojado\` + <mention>
> ✿ Menjadi marah.
 |🜸 \`#bath\` »͜ \`#bañarse\` + <mention>
> ✿ Mandi.
 |🜸 \`#bite\` »͜ \`#morder\` + <mention>
> ✿ Menggigit seseorang.
 |🜸 \`#bleh\` »͜ \`#lengua\` + <mention>
> ✿ Menjulurkan lidah.
 |🜸 \`#blush\` »͜ \`#sonrojarse\` + <mention>
> ✿ Tersipu.
 |🜸 \`#bored\` »͜ \`#aburrido\` + <mention>
> ✿ Merasa bosan.
 |🜸 \`#call\` + <mention>
> ✿ Menelepon seseorang.
 |🜸 \`#clap\` »͜ \`#aplaudir\` + <mention>
> ✿ Bertepuk tangan.
 |🜸 \`#coffee\` »͜ \`#cafe\` »͜ \`#café\` + <mention>
> ✿ Minum kopi.
 |🜸 \`#cold\` »͜ \`#frio\` + <mention>
> ✿ Merasa kedinginan.
 |🜸 \`#sing\` »͜ \`#cantar\` + <mention>
> ✿ Bernyanyi.
 |🜸 \`#tickle\` »͜ \`#cosquillas\` + <mention>
> ✿ Menggelitik seseorang.
 |🜸 \`#nope\` »͜ \`#no\` + <mention>
> ✿ Menolak melakukan sesuatu.
 |🜸 \`#jump\` »͜ \`#saltar\` + <mention>
> ✿ Melompat.
 |🜸 \`#heat\` »͜ \`#calor\` + <mention>
> ✿ Merasa kepanasan.
 |🜸 \`#jugar\` »͜ \`#gaming\` + <mention>
> ✿ Bermain video game.
 |🜸 \`#draw\` »͜ \`#dibujar\` + <mention>
> ✿ Menggambar.
 |🜸 \`#cry\` »͜ \`#llorar\` + <mention>
> ✿ Menangis karena sesuatu atau seseorang.
 |🜸 \`#cuddle\` »͜ \`#acurrucarse\` + <mention>
> ✿ Meringkuk bersama.
 |🜸 \`#dance\` »͜ \`#bailar\` + <mention>
> ✿ Menunjukkan gerakan tarian terbaikmu.
 |🜸 \`#dramatic\` »͜ \`#drama\` + <mention>
> ✿ Bersikap dramatis.
 |🜸 \`#drunk\` »͜ \`#borracho\` + <mention>
> ✿ Bertingkah seperti mabuk.
 |🜸 \`#eat\` »͜ \`#comer\` + <mention>
> ✿ Makan sesuatu yang lezat.
 |🜸 \`#facepalm\` »͜ \`#palmada\` + <mention>
> ✿ Facepalm.
 |🜸 \`#happy\` »͜ \`#feliz\` + <mention>
> ✿ Melompat karena bahagia.
 |🜸 \`#hug\` »͜ \`#abrazar\` + <mention>
> ✿ Memberikan pelukan.
 |🜸 \`#kill\` »͜ \`#matar\` + <mention>
> ✿ Menyerang seseorang dalam reaksi anime fiksi.
 |🜸 \`#kiss\` »͜ \`#muak\` + <mention>
> ✿ Memberikan ciuman.
 |🜸 \`#kisscheek\` »͜ \`#beso\` + <mention>
> ✿ Memberikan ciuman di pipi.
 |🜸 \`#laugh\` »͜ \`#reirse\` + <mention>
> ✿ Menertawakan sesuatu atau seseorang.
 |🜸 \`#lick\` »͜ \`#lamer\` + <mention>
> ✿ Menjilat seseorang.
 |🜸 \`#love\` »͜ \`#amor\` »͜ \`#enamorado\` »͜ \`#enamorada\` + <mention>
> ✿ Menunjukkan kasih sayang.
 |🜸 \`#pat\` »͜ \`#palmadita\` »͜ \`#palmada\` + <mention>
> ✿ Menepuk seseorang.
 |🜸 \`#poke\` »͜ \`#picar\` + <mention>
> ✿ Menyentuh seseorang.
 |🜸 \`#push\` »͜ \`#empujar\` + <mention>
> ✿ Mendorong seseorang.
 |🜸 \`#pout\` »͜ \`#pucheros\` + <mention>
> ✿ Cemberut.
 |🜸 \`#punch\` »͜ \`#pegar\` »͜ \`#golpear\` + <mention>
> ✿ Melakukan pukulan.
 |🜸 \`#run\` »͜ \`#correr\` + <mention>
> ✿ Berlari.
 |🜸 \`#sad\` »͜ \`#triste\` + <mention>
> ✿ Menunjukkan kesedihan.
 |🜸 \`#scared\` »͜ \`#asustado\` »͜ \`#asustada\` + <mention>
> ✿ Merasa takut.
 |🜸 \`#shy\` »͜ \`#timido\` »͜ \`#timida\` + <mention>
> ✿ Merasa malu.
 |🜸 \`#slap\` »͜ \`#bofetada\` + <mention>
> ✿ Memberikan tamparan.
 |🜸 \`#sleep\` »͜ \`#dormir\` + <mention>
> ✿ Pergi tidur.
 |🜸 \`#spit\` »͜ \`#escupir\` + <mention>
> ✿ Meludah.
 |🜸 \`#step\` »͜ \`#pisar\` + <mention>
> ✿ Menginjak seseorang.
 |🜸 \`#bonk\` + <mention>
> ✿ Memberikan pukulan lucu.
 |🜸 \`#think\` »͜ \`#pensar\` + <mention>
> ✿ Memikirkan sesuatu.
 |🜸 \`#walk\` »͜ \`#caminar\` + <mention>
> ✿ Berjalan.
 |🜸 \`#waifu\`
> ✿ Mencari waifu secara acak.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      gacha: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`GACHA\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah *Gacha* untuk mengoleksi karakter.
 |🜸 \`#buycharacter\` »͜ \`#buychar\` »͜ \`#buyc\` + [nama]
> ✿ Membeli karakter yang sedang dijual.
 |🜸 \`#charimage\` »͜ \`#waifuimage\` »͜ \`#cimage\` »͜ \`#wimage\` + [nama]
> ✿ Melihat gambar acak karakter.
 |🜸 \`#charinfo\` »͜ \`#winfo\` »͜ \`#waifuinfo\` + [waifu]
> ✿ Melihat informasi karakter.
 |🜸 \`#charvideo\` »͜ \`#cvideo\` »͜ \`#waifuvideo\` »͜ \`#wvideo\` + [waifu]
> ✿ Melihat video acak karakter.
 |🜸 \`#claim\` »͜ \`#c\` »͜ \`#reclamar\` + {karakter yang dikutip}
> ✿ Mengklaim karakter.
 |🜸 \`#delclaimmsg\`
> ✿ Mengatur ulang pesan klaim karakter.
 |🜸 \`#ginfo\` »͜ \`#infogacha\` »͜ \`#gachainfo\`
> ✿ Melihat informasi gachamu.
 |🜸 \`#givechar\` »͜ \`#givewaifu\` »͜ \`#regalar\` + [@pengguna atau pesan yang dikutip] [nama]
> ✿ Memberikan karakter kepada pengguna lain.
 |🜸 \`#harem\` »͜ \`#waifus\` »͜ \`#claims\` + <@pengguna>
> ✿ Melihat karakter yang telah kamu klaim.
 |🜸 \`#haremshop\` »͜ \`#tiendawaifus\` »͜ \`#wshop\` + <halaman>
> ✿ Melihat karakter yang sedang dijual.
 |🜸 \`#removesale\` »͜ \`#removerventa\` + [harga] [nama]
> ✿ Menghapus karakter dari penjualan.
 |🜸 \`#rollwaifu\` »͜ \`#rw\` »͜ \`#roll\`
> ✿ Mendapatkan waifu atau husbando secara acak.
 |🜸 \`#sell\` »͜ \`#vender\` + [harga] [nama]
> ✿ Menjual sebuah karakter.
 |🜸 \`#ainfo\` »͜ \`#animeinfo\` + [nama]
> ✿ Melihat informasi anime.
 |🜸 \`#animelist\`
> ✿ Melihat daftar seri di bot.
 |🜸 \`#setclaimmsg\` »͜ \`#setclaim\` + [pesan]
> ✿ Mengubah pesan saat mengklaim karakter.
 |🜸 \`#trade\` »͜ \`#intercambiar\` + [Karaktermu] / [Karakter 2]
> ✿ Menukar karakter dengan pengguna lain.
 |🜸 \`#vote\` »͜ \`#votar\` + [nama]
> ✿ Memilih karakter untuk meningkatkan nilainya.
 |🜸 \`#waifusboard\` »͜ \`#waifustop\` »͜ \`#topwaifus\` »͜ \`#wtop\` + [angka]
> ✿ Melihat karakter dengan nilai tertinggi.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      utils: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`UTILITIES\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah *Utilitas*.
|🜸 \`$prefixgames\`
> ✿ Membuat permainan baru.
 |🜸 \`$prefixhelp\` »͜ \`$prefixmenu\` + [kategori]
> ✿ Melihat menu perintah.
 |🜸 \`$prefixsug\` »͜ \`$prefixsuggest\`
> ✿ Menyarankan fitur baru kepada pengembang.
 |🜸 \`$prefixreporte\` »͜ \`$prefixreport\`
> ✿ Melaporkan bug atau masalah bot.
 |🜸 \`$prefixgetpic\` »͜ \`$prefixpfp\` + [@pengguna]
> ✿ Melihat foto profil pengguna.
 |🜸 \`$prefixtoimg\` »͜ \`$prefiximg\` + {stiker yang dikutip}
> ✿ Mengubah stiker/gambar menjadi gambar.
 |🜸 \`$prefixhd\`
> ✿ Meningkatkan kualitas gambar.
 |🜸 \`$prefixread\` »͜ \`$prefixreadviewonce\`
> ✿ Melihat gambar sekali lihat.
 |🜸 \`$prefixia\` »͜ \`$prefixchatgpt\`
> ✿ Bertanya kepada ChatGPT.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      grupo: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`GROUPS\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah untuk *Administrator Grup*.
 |🜸 \`#tag\` »͜ \`#hidetag\` »͜ \`#invocar\` »͜ \`#tagall\` + [pesan]
> ✿ Mengirim pesan yang menyebut semua anggota grup.
 |🜸 \`#alerts\` »͜ \`#alertas\` + [enable/disable]
> ✿ Mengaktifkan/menonaktifkan notifikasi promote/demote.
 |🜸 \`#antilink\` »͜ \`#antienlace\` + [enable/disable]
> ✿ Mengaktifkan/menonaktifkan anti-link.
 |🜸 \`#bot\` + [enable/disable]
> ✿ Mengaktifkan/menonaktifkan bot.
 |🜸 \`#close\` »͜ \`#cerrar\`
> ✿ Menutup grup agar hanya administrator yang dapat mengirim pesan.
 |🜸 \`#demote\` + <@pengguna> | {mention}
> ✿ Menghapus status administrator pengguna.
 |🜸 \`#antistatus\` »͜ \`#antiestados\` + [enable/disable]
> ✿ Mengaktifkan/menonaktifkan anti-status.
 |🜸 \`#economy\` + [enable/disable]
> ✿ Mengaktifkan/menonaktifkan perintah ekonomi.
 |🜸 \`#gacha\` + [enable/disable]
> ✿ Mengaktifkan/menonaktifkan perintah Gacha dan Games.
 |🜸 \`#welcome\` »͜ \`#bienvenida\` + [enable/disable]
> ✿ Mengaktifkan/menonaktifkan pesan selamat datang dan perpisahan.
 |🜸 \`#setbye\` + [teks]
> ✿ Mengatur pesan perpisahan khusus.
 |🜸 \`#setwelcome\` + [teks]
> ✿ Mengatur pesan selamat datang khusus.
 |🜸 \`#kick\` + <@pengguna> | {mention}
> ✿ Mengeluarkan pengguna dari grup.
 |🜸 \`#onlyadmin\` + [enable/disable]
> ✿ Mengizinkan hanya administrator menggunakan perintah.
 |🜸 \`#open\` »͜ \`#abrir\`
> ✿ Membuka grup agar semua pengguna dapat mengirim pesan.
 |🜸 \`#promote\` + <@pengguna> | {mention}
> ✿ Menjadikan pengguna sebagai administrator.
 |🜸 \`#restablecer\` »͜ \`#revoke\`
> ✿ Mengatur ulang tautan undangan grup.
 |🜸 \`#msgcount\` »͜ \`#count\` »͜ \`#messages\` + {mention}
> ✿ Melihat jumlah pesan dan perintah pengguna.
 |🜸 \`#topcount\` »͜ \`#topmessage\` »͜ \`#topmsgcount\`
> ✿ Melihat daftar pengguna dengan pesan terbanyak.
 |🜸 \`#topinactive\` »͜ \`#topinactiveusers\` »͜ \`#topinactivos\`
> ✿ Melihat pengguna dengan jumlah pesan paling sedikit.
 |🜸 \`#warn\` + <@pengguna> | {mention}
> ✿ Memberikan peringatan kepada pengguna.
 |🜸 \`#delwarn\` + <@pengguna> | {mention}
> ✿ Menghapus peringatan pengguna.
 |🜸 \`#gpbanner\` »͜ \`#groupimg\`
> ✿ Mengubah gambar grup.
 |🜸 \`#gpname\` »͜ \`#groupname\` [teks]
> ✿ Mengubah nama grup.
 |🜸 \`#gpdesc\` »͜ \`#groupdesc\` [teks]
> ✿ Mengubah deskripsi grup.
 |🜸 \`#del\` »͜ \`#delete\` + {pesan yang dikutip}
> ✿ Menghapus pesan.
 |🜸 \`#gp\` »͜ \`#infogrupo\`
> ✿ Melihat informasi grup.
 |🜸 \`#link\`
> ✿ Melihat tautan undangan grup.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      profile: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`PROFILES\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah *Profil* untuk melihat dan mengatur profilmu.
 |🜸 \`$prefixallbirthdays\` »͜ \`$prefixallbirths\`
> ✿ Melihat semua ulang tahun.
 |🜸 \`$prefixbirthdays\` »͜ \`$prefixbirths\` »͜ \`#cumpleaños\`
> ✿ Melihat ulang tahun terdekat di grup.
 |🜸 \`$prefixleaderboard\` »͜ \`$prefixlboard\` »͜ \`$prefixtop\` + <halaman>
> ✿ Melihat pengguna dengan pengalaman tertinggi.
 |🜸 \`$prefixlevel\` »͜ \`$prefixlvl\` + <@mention>
> ✿ Melihat level dan pengalamanmu saat ini.
 |🜸 \`$prefixmarry\` »͜ \`$prefixcasarse\` + <@mention>
> ✿ Menikah dengan seseorang.
 |🜸 \`$prefixprofile\` + <@mention>
> ✿ Melihat profil pengguna.
 |🜸 \`$prefixsetbirth\` + [tanggal]
> ✿ Mengatur tanggal ulang tahunmu.
 |🜸 \`$prefixsetdescription\` »͜ \`$prefixsetdesc\` + [deskripsi]
> ✿ Mengatur deskripsimu.
 |🜸 \`$prefixsetgenre\` + Pria | Wanita
> ✿ Mengatur gendermu.
 |🜸 \`$prefixdelgenre\` »͜ \`$prefixdelgenero\`
> ✿ Menghapus gendermu.
 |🜸 \`$prefixdelbirth\` + [tanggal]
> ✿ Menghapus tanggal ulang tahunmu.
 |🜸 \`$prefixdivorce\`
> ✿ Bercerai dari pasanganmu.
 |🜸 \`$prefixdeldescription\` »͜ \`$prefixdeldesc\`
> ✿ Menghapus deskripsimu.
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`,

      nsfw: `
╭┈ࠢ͜═͜─͜─͜╴𐔌 \`NSFW\` 𐦯╶͜─͜─͜═͜
> ❖ Perintah konten dewasa *NSFW*.
 |🜸 \`$prefixrule34video\` + {|url}
> ✿ Mengunduh video dari Rule34Videos.
 |🜸 \`$prefixxnxx\` + {query|url}
> ✿ Mencari dan mengunduh video XNXX.
 |🜸 \`$prefixxvideos\` + {query|url}
> ✿ Mencari dan mengunduh video XVideos.
 |🜸 \`$prefixdanbooru\` »͜ \`$prefixdbooru\` + {tag}
> ✿ Mencari gambar di Danbooru.
 |🜸 \`$prefixgelbooru\` »͜ \`$prefixgbooru\` + {tag}
> ✿ Mencari gambar di Gelbooru.
 |🜸 \`$prefixanal\` + {mention}
> ✿ Melakukan seks anal.
 |🜸 \`$prefixblowjob\` »͜ \`$prefixmamada\` »͜ \`#bj\` + {mention}
> ✿ Memberikan blowjob (oral seks).
 |🜸 \`$prefixboobjob\` + {mention}
> ✿ Memberikan titty fuck.
 |🜸 \`$prefixbondage\` + {mention}
> ✿ Mengikat tanpa celah melarikan diri.
 |🜸 \`$prefixbukkake\` + {mention}
> ✿ Melakukan bukkake.
 |🜸 \`$prefixcum\` + {mention}
> ✿ Mengeluarkan sperma pada seseorang.
 |🜸 \`$prefixcummouth\` + {mention}
> ✿ Mengeluarkan sperma di mulut seseorang.
 |🜸 \`$prefixcumshot\` + {mention}
> ✿ Menembakkan sperma.
 |🜸 \`$prefixcreampie\` + {mention}
> ✿ Melakukan creampie.
 |🜸 \`$prefixdeepthroat\` + {mention}
> ✿ Melakukan deepthroat.
 |🜸 \`$prefixfacesitting\` + {mention}
> ✿ Duduk di wajah seseorang.
 |🜸 \`$prefixfingering\` + {mention}
> ✿ Memasukkan jari.
 |🜸 \`#fap\`
> ✿ Bermasturbasi.
 |🜸 \`$prefixfootjob\` + {mention}
> ✿ Melakukan footjob.
 |🜸 \`$prefixfuck\` »͜ \`$prefixcoger\` + {mention}
> ✿ Berhubungan badan dengan seseorang.
 |🜸 \`$prefixgrabboobs\` + {mention}
> ✿ Memegang payudara.
 |🜸 \`$prefixgrop\` + {mention}
> ✿ Meraba seseorang.
 |🜸 \`$prefixlickass\` + {mention}
> ✿ Menjilat pantat.
 |🜸 \`$prefixlickdick\` + {mention}
> ✿ Menjilat penis.
 |🜸 \`$prefixlickpussy\` + {mention}
> ✿ Menjilat vagina.
 |🜸 \`$prefixrule34\` »͜ \`$prefixr34\` + {tags}
> ✿ Mencari gambar di rule34.
 |🜸 \`$prefixorgy\` »͜ \`$prefixorgia\` + {mention}
> ✿ Mengadakan orgy.
 |🜸 \`$prefixpegging\` + {mention}
> ✿ Melakukan pegging.
 |🜸 \`$prefixsixnine\` »͜ \`$prefix69\` + {mention}
> ✿ Melakukan posisi 69.
 |🜸 \`$prefixspank\` »͜ \`$prefixnalgada\` + {mention}
> ✿ Menampar bokong.
 |🜸 \`$prefixsuckboobs\` + {mention}
> ✿ Menghisap payudara.
 |🜸 \`$prefixundress\` »͜ \`$prefixencuerar\` + {mention}
> ✿ Menelanjangi seseorang.
 |🜸 \`$prefixthighjob\` + {mention}
> ✿ Melakukan thighjob.
 |🜸 \`$prefixyuri\` »͜ \`#tijeras\` + {mention}
> ✿ Melakukan posisi gunting (tribadism).
╰͜─֟͜─͜═͜─֟͜─͜═͜─֟͜─͜═͜╯`
    }
};