const Jwt = require('jsonwebtoken')


const checkToken = async (token) => {
    try {

        const response = await Jwt.verify(token, process.env.JWT_KEY)

        console.log(response);
        return response
    } catch (error) {
        console.log("O ERRO: " + error);
        return false
    }
}

module.exports = {
    checkToken
}