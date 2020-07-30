const Express = require('express')
const App = Express()
const Handlebars = require('express-handlebars')
const BodyParser = require('body-parser')
const Client = require('./models/Client')



App.engine('handlebars', Handlebars({defaultLayout: 'main'}))

App.set('view engine', 'handlebars')

App.use(BodyParser.urlencoded({extended: false}))

//parse application/json
App.use(BodyParser.json())

//routes
App.get('/pagamento', (req, res)=>{
    res.render('pagamento')
})

App.get('/cad-pagamento', (req, res)=>{
    res.render('cad-pagamento')
})

App.post('/add-pagamento', (req, res)=>{
    const [Login, Password] = [req.body.login, req.body.password];
    Client.addClient(Login, Password).then(result => {
        if(result){
            res.send("Login: " + Login + " Senha: " + Password)
        } else res.send("Login indisponível.")
    })
    
})

//run server
App.listen(8081, ()=>{
    console.log('Server running!');
})