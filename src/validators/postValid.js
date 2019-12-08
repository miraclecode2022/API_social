const postValidator = (req,res,next) => {
    // Check Title
    req.check('title', 'Title cannot be empty, Please write title!!').notEmpty() // Check empty
    req.check('title', 'Title must be between 4 and 150 characters').isLength({
        min : 4,
        max : 150
    })

    // Check Body
    req.check('body', 'Body cannot be empty, Please write body').notEmpty() // Check empty
    req.check('body', 'Body must be more than 10 characters').isLength({
        min : 10
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

module.exports = postValidator