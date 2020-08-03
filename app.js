const Express = require('express')
const App = Express()
const Handlebars = require('express-handlebars')
const BodyParser = require('body-parser')
const Path = require('path')
const Auth = require('./public/routes/authentication')


//configs
App.engine('handlebars', Handlebars({defaultLayout: 'login'}))

App.use(Express.static(Path.join(__dirname, '/public')))

App.set('view engine', 'handlebars')

App.use(BodyParser.urlencoded({extended: false}))


//parse application/json
App.use(BodyParser.json())


//routes
App.use('/Auth', Auth)

//run server
App.listen(8081, ()=>{
    console.log('Server running!');
})