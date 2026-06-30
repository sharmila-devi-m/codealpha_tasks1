const router = require('express').Router();
const c = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
router.get('/', protect, c.get);
router.post('/add', protect, c.add);
router.put('/update', protect, c.update);
router.delete('/remove', protect, c.remove);
module.exports = router;
