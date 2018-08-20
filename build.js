const fs = require('fs-extra')

// async function main(folder) {
//   let files = await fs.readdir(folder).catch(console.error)
//   // await files.reduce(async (file => await fs.readdir(`${folder}/${file}`))
  
//   return files
// }

// main('src/files/tabscii').then(console.log).catch(console.error)
const instruments = require('./src/json/instruments.json')

const text = instruments.optgroups
  .map(({ label, options }, i) => `# ${label}

${options.map((option, instrument) => {
    let group = i.toString(16).toUpperCase();
    return `A|I${group}${instrument}|---0-2-3-5-7-8-A-C---| ${option}`
  }).join('\n')}`
).join('\n\n')


fs.writeFile('./src/files/tabscii/Instruments.txt', text)
  .then(console.log)
  .catch(console.error)