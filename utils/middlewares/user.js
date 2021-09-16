// ---------------------------------IMPORTING---------------------------------
const { check } = require('express-validator')

module.exports = {
    userFullValidator: [

        check('userName')
            .trim()
            .not()
            .isEmpty()
            .withMessage('userName name is required!')
            .isString()
            .withMessage('userName name must be string!')
            .isLength({ min: 3, max: 50 })
            .withMessage('userName name must be 3 to 50 characters'),

        check('email')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Email is required!')
            .isEmail()
            .withMessage('Please provide a valid email address'),

        check('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Password is required!')
            .isLength({ min: 8 })
            .withMessage('Password must be minimum 8 characters'),
    ]
}




