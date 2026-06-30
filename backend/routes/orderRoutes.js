const router = require('express').Router();
const c = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', protect, c.create);
router.get('/user', protect, c.myOrders);
router.get('/:id', protect, c.getOne);
module.exports = router;
