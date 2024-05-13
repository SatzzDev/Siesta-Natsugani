/*
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _` | __/ _` |/ _` | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/
                   __/ |                                      
                  |___/                                       
*/
process.on('uncaughtException',console.error)
require('./config')
const {
default: makeWASocket, 
useMultiFileAuthState,
DisconnectReason, 
MessageRetryMap,
WAMessageStubType,
makeCacheableSignalKeyStore,
fetchLatestBaileysVersion, 
generateForwardMessageContent, 
prepareWAMessageMedia, 
areJidsSameUser,
generateWAMessageFromContent, 
generateMessageID, 
downloadContentFromMessage,
makeInMemoryStore, 
jidDecode, 
getAggregateVotesInPollMessage, 
proto 
} = require("@whiskeysockets/baileys")
const fs = require('fs')
const pino = require('pino')
const chalk = require('chalk')
const path = require('path')
const readline = require("readline");
const axios = require('axios')
const FileType = require('file-type')
const CFonts = require('cfonts')
const yargs = require('yargs/yargs')
const NodeCache = require('node-cache')
const _ = require('lodash')
const { Boom } = require('@hapi/boom')
const { exec } = require('child_process');
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./lib/myfunc')
const { Socket, smsg } = require("./lib/simple")



var low = require('./lib/lowdb')
const { Low, JSONFile } = low
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(new JSONFile(`./src/database.json`))
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
chats: {},
database: {},
settings: {},
others: {},
...(global.db.data || {})}
 global.db.chain = _.chain(global.db.data)}
loadDatabase()
if (global.db)
// WRITE DATABASE EVERY 30 SECONDS
setInterval(async () => { if (global.db.data) await global.db.write() }, 30 * 1000);



// CLEAR TMP EVERY 15 SECONDS
setInterval(() => {
let directoryPath = path.join();
fs.readdir(directoryPath, async function (err, files) {
var filteredArray = await files.filter(item => 
item.endsWith("jpeg") || 
item.endsWith("gif") || 
item.endsWith("png") || 
item.endsWith("mp3") || 
item.endsWith("mp4") ||  
item.endsWith("jpg") || 
item.endsWith("webp") || 
item.endsWith("webm") || 
item.endsWith("zip"))
if(filteredArray.length > 0){
console.log(chalk.redBright(`[DETECTED] ${filteredArray.length} trash file`));
setInterval(() => {
if(filteredArray.length == 0) return console.log(chalk.green(`[SATZZ] no trash file detected.`));
filteredArray.forEach(function (file) {
let sampah = fs.existsSync(file)
if(sampah) fs.unlinkSync(file)
})
}, 15_000)
}
});
}, 30_000)



// WATCH FILE UPDATE ON DIRECTORY PLUGINS
const chokidar = require('chokidar');
const watcher = chokidar.watch(path.join(__dirname, 'plugins'), { persistent: true, ignoreInitial: true });
watcher.on('add', (filename) => {
console.log(chalk.green(`[ADD] File added: ${filename}`));
require(filename);
}).on('change', (filename) => {
console.log(chalk.redBright(`[UPDATE] File changed: ${filename}`));
delete require.cache[require.resolve(filename)];
require(filename);
});

// WATCH FILE UPDATE ON DIRECTORY LIB
const watchers = chokidar.watch(path.join(__dirname, 'lib'), { persistent: true, ignoreInitial: true });
watchers.on('add', (filename) => {
console.log(chalk.green(`[ADD] File added: ${filename}`));
require(filename);
}).on('change', (filename) => {
console.log(chalk.redBright(`[UPDATE] File changed: ${filename}`));
delete require.cache[require.resolve(filename)];
require(filename);
});







CFonts.say('SIESTA - MD', {
font: 'chrome',
align: 'left',
gradient: ['red', 'blue']
})






async function connectToWhatsApp() {
setInterval(() => {
let data = global.db.data.database['runtime']
if (data) { 
if ((new Date - data.lastTime) > (60000*60)){
data.runtime = + new Date
data.lastTime = + new Date
} else data.lastTime = + new Date
} else{ global.db.data.database['runtime'] = {
runtime: + new Date,
lastTime: + new Date
}
}
},60_000)
fs.readdirSync('./plugins').forEach(plugin => {
if (path.extname(plugin).toLowerCase() == '.js') {
require('./plugins/' + plugin);
}
});    
    

const { state, saveCreds } = await useMultiFileAuthState(global.sessionName)
const store = makeInMemoryStore({ logger: pino().child({ level: 'fatal', stream: 'store' }) })
async function getMessage(key) {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return proto.Message.fromObject({})
}  
const auth = { creds: state.creds,keys: makeCacheableSignalKeyStore(state.keys, pino().child({ level: 'fatal', stream: 'store' })) }
const msgRetryCounterCache = new NodeCache()
const connectionOptions = {
logger: pino({ level: "fatal" }),
printQRInTerminal: true,
auth,
browser: ['Safari (Linux)', '', ''],
getMessage,
MessageRetryMap,
msgRetryCounterCache,
keepAliveIntervalMs: 20000,
defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
connectTimeoutMs: 30000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
markOnlineOnConnect: false,
}

const Satzz = Socket(connectionOptions)
store?.bind(Satzz.ev)    
    
    
    
Satzz.ev.process(async(events) => {


// CONNECTION UPDATE
if (events['connection.update']) {
const update = events['connection.update']
let { connectionUpdate } = require("./message/connection.js")
await connectionUpdate(connectToWhatsApp, Satzz, update)
}

// CREDS UPDATE
if (events['creds.update']) { 
await saveCreds()
}   

// RECEIVE NEW MESSAGE
if (events['messages.upsert']) {
const chatUpdate = events['messages.upsert']
if (global.db.data) await global.db.write() 
let m = chatUpdate.messages[0] || chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m.message) return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
Satzz.readMessages([m.key])
m = await smsg(Satzz, m, store)
require("./message/case.js")(Satzz, m, chatUpdate, store)
}

// MESSAGE UPDATE, LIKE POLL MESSAGE
if (events['messages.update']) {
const chatUpdate = events["messages.update"];
for (const { key, update } of chatUpdate) {
if (update.pollUpdates) {
const pollCreation = await getMessage(key);
if (pollCreation) {
let pollUpdate = await getAggregateVotesInPollMessage({
message: pollCreation,
pollUpdates: update.pollUpdates,
})
var toCmd = pollUpdate.filter((v) => v.voters.length !== 0)[0]?.name;
if (toCmd == undefined) return;
var prefCmd = '.' + toCmd;
Satzz.appenTextMessage(prefCmd, chatUpdate);
}
}
}    
}

// CALL EVENT
if (events.call) {
const celled = events.call
let botNumber = await Satzz.decodeJid(Satzz.user.id);
for (let kopel of celled) if (!kopel.isGroup) {
await Satzz.query({ tag: 'call', attrs: { from: botNumber, to: kopel.from }, content: [{ tag: 'reject', attrs: { 'call-id': kopel.id, 'call-creator': kopel.from, count: '0' }, content: undefined }] });
if (kopel.status === "offer") {
let nomer = await Satzz.sendTextWithMentions(kopel.from, `*\`[SYSTEM AUTO BLOCK]*\`\n\nYou have been blocked for calling the bot. Contact the owner to unblock.`);
const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Satzz Dev.\nORG:CLAY;\nTEL;type=CELL;type=VOICE;waid=6281316701742:+62 813 1670 1742\nX-ABLabel:Perlu kepedihan yang mendalam untuk menjadi seorang yang kuat. Kepedihanmu itu masih belum cukup\nEND:VCARD`;
await Satzz.sendMessage(kopel.from, { contacts: { displayName: 'Satria?', contacts: [{ vcard }] } }, { quoted: nomer });
await sleep(10000);
await Satzz.updateBlockStatus(kopel.from, "block");
}
}
}
    
// RECEIVE GROUP JOIN, LEAVE, PROMOTE DEMOTE
if (events["group-participants.update"]) {
const anu = events["group-participants.update"];
const { memberUpdate } = require("./message/welcome.js")
memberUpdate(Satzz, anu)
}

// CONTACT UPDATE, LIKE CHANGE PROFILE PICTURE, CHANGE NAME, etc
if (events['contacts.update']) {
const update = events["contacts.update"]
for (let contact of update) {
let id = Satzz.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
}
})

    
return Satzz
}

connectToWhatsApp()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
