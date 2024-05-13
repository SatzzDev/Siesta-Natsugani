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
const fs = require('fs')
const chalk = require('chalk')
const moment = require("moment-timezone");
const { pickRandom } = require('./lib/myfunc')
moment.tz.setDefault('Asia/Jakarta');
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()




global.weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
global.week = d.toLocaleDateString(locale, { weekday: 'long' })
global.calender = d.toLocaleDateString("id", {day: 'numeric', month: 'long', year: 'numeric'})
global.owner = ['6281316701742'] 
global.botname = 'sɪᴇsᴛᴀ ɴᴀᴛsᴜɢᴀɴɪ'
global.packname = `${global.week}, ${global.calender}`
global.author = "© ꜱᴀᴛɢᴀɴᴢᴅᴇᴠꜱ"
global.prefa = ['','!','.',',','🐤','🗿']
global.wm = 'sɪᴇsᴛᴀ ɴᴀᴛsᴜɢᴀɴɪ'
global.botName = 'sɪᴇsᴛᴀ ɴᴀᴛsᴜɢᴀɴɪ'
global.img = ["https://images7.alphacoders.com/126/1264830.jpg","https://mangalist.org/wp-content/uploads/2021/06/IMG_20210605_200453_1_compress13.jpg","https://images4.alphacoders.com/126/thumb-1920-1264831.jpg","https://rare-gallery.com/mocahbig/393191-the-detective-is-already-dead-anime-siesta-kimihiko.jpg","https://lh5.googleusercontent.com/EvAcdhab5Y6ZxbejjArkHSjYiWAYUJcVFFyNV-8YDEC7J4_o_t9f3y7d0RL5GdDJcls3HVAVQRXWXaETMae6Hw6HpS2qv_Lcs3HOh5n8iDUNPrlkSKY8B1N3rHOC9JXp04LHl7fi","https://rare-gallery.com/mocahbig/1361121-Siesta-The-Detective-Is-Already-DeadThe-Detective.jpg","https://images4.alphacoders.com/131/1317383.png"]
global.sessionName = 'session' 
global.sp = '⭔' 
global.sgc = "https://chat.whatsapp.com/G6W25LQb4Ce2i8r4Z0du1q"
global.link = "https://instagram.com/kurniawan_satria__"
global.limitawal = {
premium: "Infinity",
free: 10
}

global.mess = {
  success: "```Success!```",
  wait: "```Please wait a moment...```",
  premium: "```[❗] Only for Premium Users!```",
  owner: "```[❗] Only for Bot Owners!```",
  admin: "```[❗] Only for Admins!```",
  grup: "```[❗] Only for Group Chats!```",
  group: "```[❗] Only for Private Chats!```",
  pc: "```[❗] Only for Group Chats!```",
  bodmin: "```[❗] Bot must be an Admin first!```",
  limit: "```[❗] Your limit has been reached, please type .buylimit to purchase more limits with your balance```",
}


let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(chalk.blueBright(`「 Updated 」 ${__filename}`));
delete require.cache[file];
require(file);
});