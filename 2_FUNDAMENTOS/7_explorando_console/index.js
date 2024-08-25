// mais de um valor 

const x = 10
const y = 'Algum texto'
const z = [1, 2]

console.log(x, y, z)

// Contagem de Impressões 
console.count(`O Valor de x é: ${x}, contagem`)
console.count(`O Valor de x é: ${x}, contagem`)
console.count(`O Valor de x é: ${x}, contagem`)
console.count(`O Valor de x é: ${x}, contagem`)

// Variavel entre string
console.log('O Nome é %s, ele é programador', y)

// Limpar o Console
setTimeout(() => {
    console.clear()
}, 2000)