const express = require('express');
const router = express.Router();

const { add, list, remove, update, listone } = require('../controllers/positions');
const { auth } = require('../middlewares/auth');
const uploadMiddleware = require('../middlewares/upload');

router.post('/add', auth, uploadMiddleware, add);
router.get('/list', auth, list);
router.delete('/remove', auth, remove);
router.patch('/update', auth, uploadMiddleware, update);
router.post('/listone', auth, listone);


module.exports = router