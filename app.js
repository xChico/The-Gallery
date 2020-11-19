
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const logger = require('morgan')
const http = require('http')
const session = require('express-session')
const MemoryStore=require('memorystore')(session)
const connectFlash=require('connect-flash')


const mongoose=require('mongoose')
mongoose.connect(process.env.DB_URL,{
    userNewUrlParser:true,
    useUnifiedTopology:true,
    userCreateIndex: true

})
    .catch(err=>{
        console.log(err)
    })


const appsupport = require('./appsupport')
const indexRouter = require('./routes/index')
const descriptionRouter = require('./routes/description')
const usersRouter=require('./routes/users')


const app = express()
exports.app = app


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout:'default',
    layoutsDir:__dirname + '/views/layouts/',
    partialsDir:__dirname + '/views/partials/'
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    //secret:'secret_password',
    secret:process.env.SECRET,
    cookie: { maxAge: 86400000},
    store:new MemoryStore( {
        checkPeriod: 84600000
    }),
    resave: false,
    saveUninitialized:false

}))
app.use(connectFlash())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/assets/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')))
app.use('/assets/vendor/jquery', express.static(path.join(__dirname,'node_modules', 'jquery', 'dist')))
app.use('/assets/vendor/popper.js', express.static(path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')))

app.use('/assets/vendor/feather-icons', express.static(path.join(__dirname,'node_modules', 'feather-icons', 'dist')))

app.use((req,res,next)=>{
  res.locals.flashMessages = req.flash()  /////////////////////
    next()
})


//Router functions lists


app.use('/', indexRouter)
app.use('/description' , descriptionRouter)
app.use('/users', usersRouter)



// Error handlers
app.use(appsupport.basicErrorHandler)
app.use(appsupport.handle404)

const port = appsupport.normalizePort(process.env.PORT || '3000')
exports.port = port
app.set('port', port)


const server = http.createServer(app)
exports.server = server
server.listen(port)
server.on('error', appsupport.onError)
server.on('listening', appsupport.onListening)


