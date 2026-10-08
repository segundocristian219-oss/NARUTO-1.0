import fs from 'fs';
import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath } from 'url'

global.owner = ['5214428809790']
global.botNumber = ''

global.sessionName = 'Sessions/Owner'
global.version = '^2.0 - Latest'
global.dev = "❖ ρєяѕσηα qυє иσ ¢σησz¢σ dev"
global.wm = "Kaede-Bot"
global.links = {
api: 'https://whatsapp.com/channel/0029VbB1ujH8qIzjgU3Vul1l',
web: 'http://localhost:5010',
channel: "https://whatsapp.com/channel/0029VbB1ujH8qIzjgU3Vul1l",
github: "Sin guthub",
gmail: "ulisesbocs4@gmail.com"
}
global.my = {
ch: '120363399914074176@newsletter',
name: 'Kaede',
}

global.mess = {
socket: '《✧》 Este comando solo puede ser ejecutado por un Socket.',
admin: '《✧》 Este comando solo puede ser ejecutado por los Administradores del Grupo.',
botAdmin: '《✧》 Este comando solo puede ser ejecutado si el Socket es Administrador del Grupo.'
}

global.APIs = {
melody: { url: 'https://api.melodiaauris.qzz.io', key: 'OguriCap-Bot' },
zenzxz: {url: 'https://api.zenzxz.my.id', key: null },
dix: { url: 'https://dix.lat', key: null },
light: { url: 'https://api--shadowcorexyz.replit.app', key: null },
anabot: { url: 'https://anabot.my.id', key: "freeApikey" },
alya: { url: "https://api.alyacore.xyz", key: "LUFFY-GEAR4" },
axi: { url: "https://apiaxi.i11.eu", key: null },
yuki: { url: "https://api.yuki-wabot.my.id", key: "YukiBot-MD" },
vreden: { url: "https://api.vreden.web.id", key: null },
nekolabs: { url: "https://api.nekolabs.web.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
delirius: { url: "https://api.delirius.online", key: null },
ootaizumi: { url: "https://api.ootaizumi.web.id", key: null },
stellar: { url: "https://api.stellarwa.xyz", key: "api-wXCo4" },
apifaa: { url: "https://api-faa.my.id", key: null },
xyro: { url: "https://api.xyro.site", key: null },
yupra: { url: "https://api.yupra.my.id", key: null }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  import(`${file}?update=${Date.now()}`)
})