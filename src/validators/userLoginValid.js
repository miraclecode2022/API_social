const userLoginValidator = (req,res,next) => {

    // Check Email
    req.check('email', 'Email cannot be empty').notEmpty() // Check empty
    req.check('email', 'Email is wrong format').isEmail() 

    // Check Password
    req.check('password', 'Password cannot be empty!!').notEmpty() // Check empty
    req.check('password', 'Password must be between 6 and 100 characters').isLength({
        min : 6,
        max : 100
    })

    // Check for errors
    const errors = req.validationErrors()
    // if have errors then show the first error
    if(errors){
        const firstError = errors.map( error => error.msg)[0]
        return res.status(400).send({error : firstError})
    }

    // run next
    next()
}

module.exports = userLoginValidator