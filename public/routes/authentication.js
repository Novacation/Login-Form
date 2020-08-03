const Express = require("express")
const Router = Express.Router()
const Client = require('../models/Client')


Router.get('/signin', (req, res) => {
    res.render('login-form', {layout: 'login.handlebars'})
})


Router.post('/check-signin', (req, res) => {
    

})


Router.get('/signup', (req, res) => {

    //renderizar form de registro 

    res.send('Register form')
})


Router.post('/check-signup', (req, res) => {
    const [Login, Password] = [req.body.txtLogin, req.body.txtPassword]
    Client.signUp(Login, Password).then(result => {
        if (result) {
            res.send("Login: " + Login + " Senha: " + Password)
        } else res.send("Login indisponível.")
    })    
})





Router.get('/access-confirmed', (req, res) => {
    
})



module.exports = Router