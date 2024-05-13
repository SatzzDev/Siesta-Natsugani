require('dotenv').config();
const { Cmd } = require('../command.js');
const { Octokit } = require("octokit");
const chalk = require("chalk")
const fs = require('fs');
const path = require('path');


Cmd({
pattern: 'backup',
onlyOwner: true,
desc: 'Backup File',
type: 'Owner'
}, async (m, command, Satzz) => {
const owner = 'SatzzDev';
const repo = 'Siesta-Natsugani';
const token = process.env.GITHUB_TOKEN;
const tanggal = new Date().toLocaleDateString('id', { weekday: 'long' }) + ',' + ' ' + new Date().toLocaleDateString("id", {day: 'numeric', month: 'long', year: 'numeric'})
let length = 1
const filesToUpload = getFilesToUpload();
for (const filepath of filesToUpload) {
const fileContent = fs.readFileSync(filepath.replace('/home/container/', './'));
await uploadToGitHub(token, owner, repo, filepath.replace('/home/container/', ''), fileContent);
length++
}
await Satzz.sendMessage(m.sender, { text: `Berhasil Mengupload ${length} file.` }, {quoted: m});
})


const getFilesToUpload = () => {
    const filesToUpload = [];
    
    function traverseDir(dir) {
        fs.readdirSync(dir).forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                if (!/^(node_modules|session)|^\./.test(file)) {
                    traverseDir(filePath);
                }
            } else {
                // Tambahkan pengecualian untuk file .env
                if (file !== '.env') {
                    filesToUpload.push(filePath);
                }
            }
        });
    }
    
    traverseDir(process.cwd());
    return filesToUpload;
};


async function uploadToGitHub(token, owner, repo, filePath, fileContent) {
const octokit = new Octokit({ auth: token });
const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
owner: owner,
repo: repo,
path: filePath,
message: `Add ${filePath}`,
committer: {
name: 'Satzz(BOT)',
email: 'satganzdevs@gmail.com'
},
content: Buffer.from(fileContent).toString('base64'),
headers: {
'X-GitHub-Api-Version': '2022-11-28'
}
});
console.log(chalk.bgGreen(chalk.white(`File ${filePath} uploaded successfully.`)));
}
