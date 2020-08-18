/* const Bcrypt = require('bcrypt')

const {
    Sequelize,
    QueryTypes
} = require('sequelize')
const sequelize = new Sequelize('registro', 'root', 'Superx50@turbo', {
    host: 'localhost',
    dialect: 'mysql'
})



const test = async login => {
    try {
        const response = await sequelize.query("select * from `clientes` where clientLogin = '" + login + "';", {
            type: QueryTypes.SELECT
        })

        console.log(response[0]);
    } catch (error) {
        console.log(error);
    }
}


//test('Superx50')



const comparePassword = async (login, password) => {
    try {
        const response = await sequelize.query("select * from `clientes` where clientLogin = '" + login + "';", {
            type: QueryTypes.SELECT
        })

        const result = await Bcrypt.compare(password, response[0].clientPassword)

        console.log('result: ' + result)
        if (result == false) {

            console.log('novo valor 1')

            return {
                isARegistered: false,
                errorMsg: 'Senha incorreta!'
            }
        } else {
            return {
                isARegistered: true
            }
        }

    } catch (error) {
        console.log(error);
    }
}

comparePassword('Superx50', 'patum10').then(res => {
    console.log(res);
})
*/