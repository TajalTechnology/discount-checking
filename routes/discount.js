const express = require('express')
const { add, edit, remove, getDetails } = require('../controllers/discount');
const { authVerify } = require('../utils/middlewares/auth');

const router = express.Router();


router.post('/discount', authVerify, add);
router.put('/discount/:id', authVerify, edit);
router.delete('/discount/:id', authVerify, remove);
router.get('/discount/:id', authVerify, getDetails);


module.exports = router


