
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const http = require('http')
const hbs = require('express-handlebars')

const inMemoryDescriptionStore= require('./models/description-memory').inMemoryDescriptionStore
let descriptionStore = new inMemoryDescriptionStore()
exports.descriptionStore = descriptionStore






const appsupport = require('./appsupport')
const indexRouter = require('./routes/index')
const descriptionRouter = require('./routes/description')

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
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))





//Router functions lists


app.use('/', indexRouter)
app.use('/description' , descriptionRouter)



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


