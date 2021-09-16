const express = require('express');
const router = express.Router();
const { add, edit, remove, getDetails } = require('../controllers/product');
const { authVerify } = require('../utils/middlewares/auth');



router.post('/product', authVerify, add);
router.get('/product/:id', authVerify, getDetails);
router.delete('/product/:id', authVerify, remove);
router.put('/product/:id', authVerify, edit);


module.exports = router


