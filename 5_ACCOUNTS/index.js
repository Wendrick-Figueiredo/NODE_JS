// modulos externos 
const inquirer = require('inquerer')
const chalk = require('chalk')

// modulos internos 
const fs = require('fs')
//const { type, machine } = require('os')

operation()

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que voce deseja fazer?',
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        },
    ]).then((answer) => {
        const action = answer['action']

        if (action === 'Criar Conta') {
            createAccount()
        } else if (action === 'Depositar') {
            deposit()
        } else if (action === 'Consultar Saldo') {
            getAccountBalance()
        } else if (action === 'Sacar') {
            widhdraw()
        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado Por Usar o Accounts!'))
            process.exit()
        }
    })
        .catch((err) => console.log(err))

}
// create an account 
function createAccount() {
    console.log(chalk.bgGreen.black('Parabens Por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount() {

    inquirer.prompt([
        {
            name: 'accontName',
            message: 'Digite um nome para a sua conta: '
        }
    ])

        .then(answer => {
            const accontName = answer['accountName']

            console.info(accontName)

            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }

            if (fs.existsSync(`accounts/${accontName}.json`)) {
                console.log(
                    chalk.bgRed.black('Esta conta já existe, escolha outro nome!')
                )
                buildAccount()
                return
            }

            fs.writeFileSync(
                `accounts/${accontName}.json`,
                '{"balance": 0}',
                function (err) {
                    console.log(err)
                },
            )

            console.log(chalk.green('Parabens, a sua conta foi criada!'))
            operation()
        })
        .catch(err => console.log(err))
}

// add an amount to user account 
function deposit() {

    inquirer.prompt([
        {
            name: 'accuntName',
            message: 'Qual o nome da sua conta'
        }
    ])
        .then((answer) => {

            const accontName = answer['accountName']

            // verify if account exists
            if (!checkAccount(accontName)) {
                return deposit()
            }

            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto voce deseja depositar',
                },
            ]).then((answer) => {

                const amount = answer['amount']

                // add an amount 
                addAmount(accontName, amount)
                operation()
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

function checkAccount(accontName) {

    if (!fs.existsSync(`accounts/${accontName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }
    return true
}

function addAmount(accontName, amount) {

    const accountData = getAccount(accontName)

    if (!amount) {
        console.log(chalk.bgRed.black
            ('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accontName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )

    console.log(
        chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`)
    )
}

function getAccount(accontName) {
    const accontName = fs.readFileSync(`accounts/${accontName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

// show account balance
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ])

        .then((answer) => {

            const accontName = answer["accountName"]

            // verify if account exists 
            if (!checkAccount(accontName)) {
                return getAccountBalance()
            }

            const accountData = getAccount(accontName)

            console.log(chalk.bgBlue.black(
                `Olá, o saldo da sua conta é de R$${accountData.balance}`,
            ),
            )
        })

        .catch(err => console.log(err)
        )
}

// withdraw an amount from user account
function widhdraw() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {

        const accontName = answer['accountName']

        if (!checkAccount(accontName)) {
            return widhdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto voce deseja sacar?'
            }
        ])

            .then((answer) => {
                const amount = answer['amount']

                removeAmount(accontName, amount)
            })
            .catch(err => console.log(err))

    }).catch(err => console.log(err))
}

function removeAmount(accontName, amount) {
    const accountData = getAccount(accontName)

    if (!amount) {
        console.log(
            chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
        )
        return widhdraw()
    }

    if(accountData.balance < amount){
       console.log(chalk.bgRed.black('Valor inidisponivel!'))
       return widhdraw() 
    }

    accountData.balance = parseFloat(accountData.balance) - perseFloat(amount)

    fs.writeFileSync(
        `accounts/${accontName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )

    console.log(
        chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`)
    )
    operation()
}