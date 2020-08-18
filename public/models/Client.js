const Db = require('./Database')
const FormValidation = require('./FormValidation')

const signUp = async (login, password) => {
    try {

        const response = await FormValidation.isAvaiableLogin(login)

        if (response.isAvaiable) {
            await Db.sequelize.query("insert into `clientes` (clientLogin, clientPassword) values ('" + login + "', '" + password + "');", {
                type: Db.QueryTypes.INSERT
            })

            const clientData = await Db.sequelize.query("select clientId, clientLogin from `clientes` where clientLogin = '" + login + "';", {
                type: Db.QueryTypes.SELECT
            })

            return {
                access: true,
                tokenData: {
                    clientId: clientData[0].clientId,
                    clientLogin: clientData[0].clientLogin
                }
            }
        } else {
            return {
                access: false,
                errorMessage: response.errorMsg
            }
        }
    } catch (error) {
        console.log(`Erro no signUp: ${error}`)
        return false
    }
}


const signIn = async (login, password) => {

    try {

        const response = await FormValidation.isARegister(login, password)

        const clientData = await Db.sequelize.query("select clientId, clientLogin from `clientes` where clientLogin = '" + login + "';", {
            type: Db.QueryTypes.SELECT
        })

        if (response.isRegistered == false) {
            return {
                access: false,
                msg: response.errorMsg
            }
        } else if (response.isRegistered == true) {
            return {
                access: true,
                tokenData: {
                    clientId: clientData[0].clientId,
                    clientLogin: clientData[0].clientLogin
                }
            }
        }
    } catch (error) {
        console.log(`Erro no signIn: ${error}`)
        return {
            access: false
        }
    }
}



module.exports = {
    signUp,
    signIn
}