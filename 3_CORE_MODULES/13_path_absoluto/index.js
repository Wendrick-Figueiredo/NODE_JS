const path = require("path")

// path absoluto
console.log(path.relative('teste.txt'))

// formar path 
const midFolder = "relatorios"
const fileName = "wendrick.txt"

const finalPath = path.join("/", 'arquivos', midFolder, fileName)

console.log(fileName)