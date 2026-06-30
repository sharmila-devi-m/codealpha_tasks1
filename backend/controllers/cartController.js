const User = require('../models/User');

const populated = (uid) => User.findById(uid).populate('cart.product');

exports.get = async (req, res) => {
  const u = await populated(req.user._id);
  res.json(u.cart);
};

exports.add = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const u = await User.findById(req.user._id);
  const item = u.cart.find(i => String(i.product) === String(productId));
  if (item) item.quantity += quantity;
  else u.cart.push({ product: productId, quantity });
  await u.save();
  const populatedUser = await populated(req.user._id);
  res.json(populatedUser.cart);
};

exports.update = async (req, res) => {
  const { productId, quantity } = req.body;
  const u = await User.findById(req.user._id);
  const item = u.cart.find(i => String(i.product) === String(productId));
  if (!item) return res.status(404).json({ message: 'Item not in cart' });
  item.quantity = Math.max(1, quantity);
  await u.save();
  const populatedUser = await populated(req.user._id);
  res.json(populatedUser.cart);
};

exports.remove = async (req, res) => {
  const { productId } = req.body;
  const u = await User.findById(req.user._id);
  u.cart = u.cart.filter(i => String(i.product) !== String(productId));
  await u.save();
  const populatedUser = await populated(req.user._id);
  res.json(populatedUser.cart);
};
