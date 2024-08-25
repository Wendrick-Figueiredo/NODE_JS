const _ = require('lodash')

const a = [1, 2, 3, 4]
const b = [3, 6, 9, 12]

const diff = _.difference(a, b)

console.log(chalk.red.bold(diff))