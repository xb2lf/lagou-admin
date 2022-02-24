const express = require('express');
const router = express.Router();

const { add, list, remove } = require('../controllers/positions');
const { auth } = require('../middlewares/auth');

router.post('/add', auth, add);
router.get('/list', auth, list);
router.delete('/remove', auth, remove);


module.exports = router