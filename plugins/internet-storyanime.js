require('../config')
const { Cmd } = require('../command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const Scraper = require("@bochilteam/scraper")
const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
pattern: 'storyanime',
onlyPrem: true,
desc: 'get Random anime Story',
type: 'Internet'
}, async (m, command, Satzz) => {
try {
const urls = ['victher_','kuro_xyz','rummmxygoad',''];
let sheesh = await pickRandom(urls)
let res = await fetchJson(`https://aemt.me/download/asupantt?username=${sheesh}`).catch(_ => fetchJson(`https://aemt.me/download/asupantt?username=${sheesh}`))
await Satzz.sendMediaButtons(m.chat, '', '', global.author,[{type:'btn',text:'Next',id:'.storyanime'}],m,{video:res.result.data.video});
} catch {
const urls = ['victher_','kuro_xyz','rummmxygoad',''];
let sheesh = await pickRandom(urls)
let res = await fetchJson(`https://aemt.me/download/asupantt?username=${sheesh}`).catch(_ => fetchJson(`https://aemt.me/download/asupantt?username=${sheesh}`))
await Satzz.sendMediaButtons(m.chat, '', '', global.author,[{type:'btn',text:'Next',id:'.storyanime'}],m,{video:res.result.data.video});
}
})