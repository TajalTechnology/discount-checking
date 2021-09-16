const router = require('express').Router();
const { authVerify } = require('../utils/middlewares/auth');
// const { validCategory, validStatus } = require('../../../utils/validations/services');


const { add, edit, remove, getDetails } = require('../controllers/category');


router.post('/category', authVerify, add);
router.put('/category/:id', authVerify, edit);
router.delete('/category/:id', authVerify, remove);
router.get('/category', authVerify, getDetails);


module.exports = router;