const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser : true,
     useCreateIndex: true,
      useFindAndModify : true
}, (err) => {
    if (err) {
        return console.log("Data Error : " + err.message)
    }else {
        console.log("Data Connected")
    }  
})