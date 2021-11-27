exports.userSignUpValidator = (req, res, next) => {
    req.check('FullName', 'name is required').notEmpty()
    req.check('Identity', 'identity is required').notEmpty()
    req.check('Telephone', 'phone number is required').notEmpty()
    req.check('Password', 'the password is required').notEmpty().isLength({min: 10}).withMessage('password must contain at less 10 character')

    const errors = req.validationErrors()

    if(errors) {
        const arrayError = errors.map(errorList => {
            return errorList.msg
        })
        return res.status(400).json(arrayError)
    }
    next()
}
