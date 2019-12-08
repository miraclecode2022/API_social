const bcrypt = require('bcryptjs')
const lodash = require('lodash')
// Load Model
const User = require('../models/userModel')

// Create New ( Signup )
exports.createUser = async(req,res,next) => {
    try {
        const user = await User.findOne({ email : req.body.email })
        if(user){
            throw new Error("Email already use! Please try another")
        }
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).send(newUser)
    }catch(err) {
        res.status(400).send(err.msg)
    }
}

// Login
exports.userLogin = async(req,res,next) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).send({error : "Email does not exist, Please try again"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).send({error : "Password is incorrect!"})
        }
        const token = await user.SignJWT() // create Token
        // res.cookie('t', token, { expire : new Date() + 9999} ) // Set cookie name 't'
        res.send({user,token})
    }catch(err) {
        res.status(400).send(err.msg)
    }
}

// Get Current User
exports.getCurrentUser = (req,res) => {
    req.user.password = undefined
    res.send(req.user)
}

// Update User
exports.updateUser = async(req,res) => {
   try{
        let user = req.user
        user = await lodash.extend(user, req.body)
        const userUpdate = await user.save()
        res.send(userUpdate)
    }catch(err) {
        res.status(400).send(err.message)
    }
}

// Logout
exports.userLogout = async(req,res,next) => {
    try {
        res.clearCookie('t')
        res.send({message : "Login Success!"})
    }catch(err) {
        res.status(500).send(err.message)
    }
}

// Remove User
exports.removeUser = async(req,res) => {
    const _id = req.user._id
    try {
        const user = await User.findById({_id})
        if(!user){
            throw new Error()
        }
        const userRemove = await user.remove()
        res.send(userRemove)
    }catch(err){
        res.status(400).send(err.message)
    }
}