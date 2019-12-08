require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        trim : true
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
},{timestamps : true})

// hash password pre save
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// create token. Sử dụng this làm function thì methods
userSchema.methods.SignJWT = async function() {
    const user = this
    const token = await jwt.sign({ _id : user._id.toString() }, process.env.SECRECT_KEY, {expiresIn : '1h'})
    return token
}

const User = mongoose.model('users', userSchema)
module.exports = User