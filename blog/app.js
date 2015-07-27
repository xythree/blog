var express = require('express')
var session = require('express-session')
var path = require('path')
var bodyParser = require('body-parser')
var multer = require('multer')
var config = require('./config')


var app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(multer())

app.set('view engine', 'html')
app.engine('.html', require('ejs').__express)
app.set('views/', __dirname)

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.cookieMaxAge
    }
}))


global.getModel = require('./common/db').getModel


require('./routes/reg')(app, session)
require('./routes/login')(app, session)
require('./routes/home')(app, session)
require('./routes/content')(app, session)


require('./routes/admin/index')(app, session)
require('./routes/admin/add')(app, session)

app.get('/404', function (req, res) {
    res.render('404')
})

app.listen(config.port)



