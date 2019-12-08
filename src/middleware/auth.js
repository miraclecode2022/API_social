const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config()

const auth = async(req,res,next) => {
    try{
        const token = await req.header('Authorization').replace('Bearer ', '')
        const decodeToken = await jwt.verify(token,process.env.SECRECT_KEY)
        const user = await User.findOne({ _id : decodeToken._id})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch(err){
        res.status(401).send({ error : "Please Authenticate !"})
    }
}

module.exports = auth