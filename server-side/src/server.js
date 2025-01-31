const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')



const corsOptions = {
    origin: '*', 
    credentials: true,
}

//middleware//
const app = express()
app.use(express.json())
app.use(cors())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('uploads'))
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