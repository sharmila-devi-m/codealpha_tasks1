const Product = require('../models/Product');

exports.list = async (req, res) => {
  const { q, category, min, max } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  if (min || max) filter.price = { ...(min && { $gte: +min }), ...(max && { $lte: +max }) };
  const products = await Product.find(filter).sort('-createdAt');
  res.json(products);
};

exports.get = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  res.json(p);
};

exports.create = async (req, res) => res.status(201).json(await Product.create(req.body));

exports.update = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!p) return res.status(404).json({ message: 'Product not found' });
  res.json(p);
};

exports.remove = async (req, res) => {
  const p = await Product.findByIdAndDelete(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Deleted' });
};
