const Db = require('./Database')
const Form = require('./FormValidation')


const signUp = async (login, password, email) => {
    try {
        let res = false
        if (!(await isClientLogin(login))) {

            res = await Db.sequelize.query("insert into `clientes` (clientLogin, clientPassword) values ('" + login + "', '" + password + "');")
            return (res = true)
        }

        return res
    } catch (error) {
        console.log(`Erro no signUp: ${error}`)
        return false
    }
}


const signIn = async () => {
    try {

    } catch (error) {
        console.log(`Erro no signIn: ${error}`)
        return false
    }
}



module.exports = {
    signUp,
    signIn
}