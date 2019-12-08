const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const cors = require('cors')

// Use Mongodb
require('./db/mongoose')

//
const app = express()


// Load Routes
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended : false}))
app.use(cookieParser())
app.use(expressValidator())

// Use router
app.use('/posts', postRouter)
app.use('/users', userRouter)

app.use('/', async(req,res,next) => {
    const data = await fs.readFileSync('src/documents/apiDoc.json')
    const docs = await JSON.parse(data)
    res.send(docs)
})

app.use('*', (req,res,next) =>{
    res.send("Page Not Found")
})

module.exports = app