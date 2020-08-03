const Db = require('./Database')

const maxLoginLength = 15
const minLoginLength = 6

const isValidLoginLength = (login) => {
    let errorMsg = 'Login inválido'
    let isValid = true

    if (login < minLoginLength) {
        errorMsg += `\n\nQuantidade de caracteres inferior a ${minLoginLength}!`
        isValid = false
    }

    if (login > maxLoginLength) {
        errorMsg += `\n\nQuantidade de caracteres superior a ${maxLoginLength}!`
        isValid = false
    }

    return {
        isValid: isValid,
        errorMsg: errorMsg
    }
}


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
    isValidLoginLength,

}