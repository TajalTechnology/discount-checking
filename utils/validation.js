const { check } = require('express-validator');
const {_response} = require('./responce');

module.exports = {

    ValidSignUp: [

        check('password')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .isLength({ min: 6 })
            .withMessage(_response.length),

        check('email')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isEmail()
            .withMessage(_response.email),

        check('userName')
            .not()
            .isEmpty()
            .withMessage(_response.required)
            .isString()
            .withMessage(_response.string)
            .isLength({ min: 6 })
            .withMessage(_response.length),
    ],

    
}