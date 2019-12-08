const express = require('express')
const router = express.Router()

// Load controller
const postClr = require('../controllers/postController')

// Load validators
const postValidator = require('../validators/postValid')

// Load middleware
const auth = require('../middleware/auth')

// GET - GET ALL POSTS 
router.get('/',auth, postClr.getPost)

// POST - CREATE NEW POST
router.post('/create',auth, postClr.createPost, postValidator)

// GET - GET Current User
router.get('/getcurrentpost', auth, postClr.getCurrentPost)

// PATCH - UPDATE POST
router.patch('/updatePost/:id', auth, postValidator, postClr.updatePost)

// DELETE - DELETE POST
router.delete('/deletePost/:id', auth, postClr.deletePost)

module.exports = router