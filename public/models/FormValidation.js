const Db = require('./Database')
const Bcrypt = require('bcrypt')

//sign-in functions

const isARegister = async (login, password) => {
    try {

        const response = await Db.sequelize.query("select * from `clientes` where clientLogin = '" + login + "';", {
            type: Db.QueryTypes.SELECT
        })

        if (response.length > 0) {
            const compareResponse = await Bcrypt.compare(password, response[0].clientPassword)

            console.log('compareResponse: ' + compareResponse)
            if (compareResponse == false) {

                return {
                    isRegistered: false,
                    errorMsg: 'Senha incorreta!'
                }
            } else {
                return {
                    isRegistered: true
                }
            }
        } else if (response.length < 0 || response.length == 0) {

            return {
                isRegistered: false,
                errorMsg: 'Login incorreto!'
            }
        }
    } catch (error) {
        console.log(`Erro no isARegister: ${error}`)
        return {
            isRegistered: false,
            errorMsg: 'Login e/ou senha inválidos!'
        }
    }
}



//sign-up functions

const isAvaiableLogin = async (login) => {
    try {

        let errorMsg = 'Login indisponível!'
        let isAvaiable = true

        const res = await Db.sequelize.query("select count(clientId) from `clientes` where clientLogin = '" + login + "';", {
            type: Db.QueryTypes.SELECT
        })

        if (res[0]['count(clientId)'] > 0) {
            isAvaiable = false
        }

        return {
            isAvaiable: isAvaiable,
            errorMsg: errorMsg
        }

    } catch (error) {
        console.log(`Erro no isAvaiableLogin: ${error}`)
        return false
    }
}



module.exports = {
    isARegister,
    isAvaiableLogin
}