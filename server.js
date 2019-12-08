const http = require('http')
require('dotenv').config()

const app = require('./src/app')
const port = process.env.PORT

const server = http.createServer(app)

server.listen(port, (err) => {
    if(err){
        console.log("Can't Open Server")
    }
        console.log("This Server Opened On Port " + port)
})