const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const path = require('path')

const corsOptions = {
    origin: '*',  // Allow the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],  // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
    credentials: true,  // Allow cookies or authentication headers (if necessary)
}

//middleware//
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../uploads')))
const server = http.createServer(app)

const accountRoutes = require('./Routes/accountRoutes')
const imageRoutes = require('./Routes/imageRoutes')
const branchRoutes = require('./Routes/branchRoutes')
const bookRoutes = require('./Routes/bookRoutes')
const borrow = require('./Routes/borrowRoutes')
const genre = require('./Routes/genreRoutes')
const feedback = require('./Routes/feedbackRoutes')

app.use('/account', accountRoutes)
app.use('/image', imageRoutes)
app.use('/branch', branchRoutes)
app.use('/book', bookRoutes)
app.use('/borrow', borrow)
app.use('/genre', genre)
app.use('/feedback', feedback)

// database connection//
const port = process.env.PORT || 5001

server.listen(port, ()=> {
    console.log('Listening to port: ', port)
})