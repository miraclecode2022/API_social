const express = require('express')
const router = express.Router()

// Load controller
const userClr = require('../controllers/userController')

// Load Validator
const userSignValidator = require('../validators/userSignValidator')
const userLoginValidator = require('../validators/userLoginValid')

// Load middleware
const auth = require('../middleware/auth')

// Sign new user
router.post('/signup', userSignValidator, userClr.createUser)

// User login
router.post('/login', userLoginValidator, userClr.userLogin)

// Get Profile User
router.get('/profile', auth, userClr.getCurrentUser)

// Update User
router.patch('/updateProfile', auth, userClr.updateUser)

// User Logout
router.post('/logout', userClr.userLogout)

// User Delete
router.delete('/deleteUser', auth, userClr.removeUser)

module.exports = router