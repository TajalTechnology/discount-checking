const express = require('express');
const router = express.Router();
const { add, invoiceDetails } = require('../controllers/invoice');
const { authVerify } = require('../utils/middlewares/auth');


router.post('/invoice',authVerify, add);
router.get('/invoice/:id',authVerify, invoiceDetails);


module.exports = router


