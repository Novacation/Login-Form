const Express = require("express")
const Router = Express.Router()
const Client = require('../models/Client')
const Bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const Db = require('../models/Database')
const tokenFunctions = require('../token/check-token')



Router.get('/signin', (req, res) => {
    res.render('login-form', {
        layout: 'login.handlebars'
    })
})


Router.post('/check-signin', (req, res) => {

    const [Login, Password] = [req.body.login, req.body.password]
    Client.signIn(Login, Password).then(response => {

        if (response.access) {
            //token
            const token = Jwt.sign({
                    clientId: response.tokenData.clientId,
                    clientLogin: response.tokenData.clientLogin
                },
                process.env.JWT_KEY, {
                    expiresIn: "60m"
                })

            res.json({
                access: true,
                token: token
            })

        } else {

            res.json({
                access: false,
                message: response.msg
            })
        }
    })
})


Router.get('/signup', (req, res) => {
    //renderizar form de registro 
    res.render('register-form', {
        layout: 'register.handlebars'
    })
})


Router.post('/check-signup', (req, res) => {
    const [Login, Password] = [req.body.login, req.body.password]

    Bcrypt.hash(Password, 10, (errBcrypt, hash) => {
        if (errBcrypt) {
            res.json({
                access: false,
                message: errBcrypt
            })
        }

        Client.signUp(Login, hash).then(response => {
            if (response.access) {
                //token ao executar signup
                const token = Jwt.sign({
                        clientId: response.tokenData.clientId,
                        clientLogin: response.tokenData.clientLogin
                    },
                    process.env.JWT_KEY, {
                        expiresIn: "60m"
                    })

                res.json({
                    access: true,
                    token: token
                })
            } else {
                res.json({
                    access: false,
                    message: response.errorMessage
                })
            }
        })
    })
})


Router.post('/check-token', (req, res) => {
    const token = req.body.noVacationToken

    tokenFunctions.checkToken(token).then(result => {
        return res.json({
            verifyResponse: result
        })
    })
})


Router.get('/main-page', (req, res) => {
    res.render('main-page', {
        layout: 'main-page.handlebars'
    })
})

Router.post('/photos-website', (req, res) => {
    const token = req.body.inviData
    tokenFunctions.checkToken(token).then(result => {

        if (result) {
            res.render('photos-website', {
                layout: 'photos.handlebars',
                clientLogin: result.clientLogin
            })
        } else {
            res.status(404).send('Token inválido, faça o login novamente.')
        }
    })
})

Router.post('/news-website', (req, res) => {
    const token = req.body.inviData2
    tokenFunctions.checkToken(token).then(result => {

        if (result) {
            res.render('news-website', {
                layout: 'news.handlebars',
                clientLogin: result.clientLogin
            })
        } else {
            res.status(404).send('Token inválido, faça o login novamente.')
        }
    })
})


Router.post('/send-comment', (req, res) => {
    const token = req.headers.authorization
    const comment = req.body.clientComment
    const table = req.body.table

    tokenFunctions.checkToken(token).then(result => {
        if (result) {

            (async () => {
                try {
                    await Db.sequelize.query("insert into `" + table + "` (clientId, clientComment) values ('" + result.clientId + "','" + comment + "');", {
                        type: Db.QueryTypes.INSERT
                    })
                    return true
                } catch (error) {
                    console.log(error)
                }
            })().then(result => {
                let message = 'Failed to send!'

                if (result) {
                    message = 'Sucessfuly sended!'
                }

                res.json({
                    message: message
                })
            })
        }
    })
})

module.exports = Router