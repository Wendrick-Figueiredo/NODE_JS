const fs = require("fs")

const arqAntigo = "arquivo.txt"
const arqNovo = "novo.txt"

fs.rename("arquivo.txt", "novoarquivo.txt", function (err) {
    if (err) {
        console.log(err)
        return
    }

    console.log(`O arquivo ${arqAntigo} foi renomeado para ${arqNovo}`)
})