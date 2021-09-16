const router = require('express').Router();
const { authVerify } = require('../utils/middlewares/auth');
const { add, edit, remove } = require('../controllers/subCategory');


router.post('/sub-category', authVerify);
router.put('/sub-category/:id', authVerify, edit);
router.delete('/sub-category/:id', authVerify, remove);


module.exports = router;