const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const postSchema = new Schema({
    title : {
        type : String,
    },
    body : {
        type : String,
    },
    postImage : {
        data : Buffer,
        contenType : String
    },
    postedBy : {
        type : mongoose.Types.ObjectId,
        ref : 'users'
    }
}, {timestamps : true  })

const Post = mongoose.model('posts', postSchema)
module.exports = Post