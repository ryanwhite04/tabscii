const fs = require('fs-extra')

async function main(folder) {
  let files = await fs.readdir(folder).catch(console.error)
  // await files.reduce(async (file => await fs.readdir(`${folder}/${file}`))
  
  return files
}

main('src/files/tabscii').then(console.log).catch(console.error)