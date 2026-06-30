const router = require('express').Router();
const { body } = require('express-validator');
const { register, login, me } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', [
  body('name').trim().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], login);

router.get('/me', protect, me);
module.exports = router;
