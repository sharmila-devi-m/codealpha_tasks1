const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.create = async (req, res) => {
  const { shippingAddress } = req.body;
  const u = await User.findById(req.user._id).populate('cart.product');
  if (!u.cart.length) return res.status(400).json({ message: 'Cart empty' });
  const products = u.cart.map(i => ({
    product: i.product._id, name: i.product.name,
    price: i.product.price, quantity: i.quantity
  }));
  const totalAmount = products.reduce((s, p) => s + p.price * p.quantity, 0);
  for (const i of u.cart) {
    await Product.findByIdAndUpdate(i.product._id, { $inc: { stock: -i.quantity } });
  }
  const order = await Order.create({
    userId: req.user._id, products, totalAmount, shippingAddress, status: 'paid'
  });
  u.cart = []; await u.save();
  res.status(201).json(order);
};

exports.myOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort('-createdAt');
  res.json(orders);
};

exports.getOne = async (req, res) => {
  const o = await Order.findById(req.params.id);
  if (!o) return res.status(404).json({ message: 'Order not found' });
  if (String(o.userId) !== String(req.user._id) && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Forbidden' });
  res.json(o);
};
