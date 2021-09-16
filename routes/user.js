
const express = require('express')

const router = express.Router();
const { signUp, signIn } = require('../controllers/user');
const { ValidSignUp } = require('../utils/validation');

router.post('/sign-up', ValidSignUp, signUp);
router.post('/sign-in', signIn);


module.exports = router


