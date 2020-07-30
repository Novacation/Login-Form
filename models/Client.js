const db = require('./db')


const isClient = async (login) => {
    try {
        const res = await db.sequelize.query("select count(clientId) from `clientes` where clientLogin = '" + login + "';", {
            type: db.QueryTypes.SELECT
        })

        if (res[0]['count(clientId)'] > 0) {
            return true
        } else return false

    } catch (error) {
        console.log(`Erro no isClient: ${error}`)
        return false
    }
}

const addClient = async (login, password) => {
    try {
        let res = false
        if (!(await isClient(login))) {

            res = await db.sequelize.query("insert into `clientes` (clientLogin, clientPassword) values ('" + login + "', '" + password + "');")
            console.log('Valor do res addClient\n')
            console.log(res)
            return (res = true)
        }

        return res
    } catch (error) {
        console.log(`Erro no addClient: ${error}`)
        return false
    }
}


module.exports = {
    addClient
}