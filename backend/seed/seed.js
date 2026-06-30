require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

const products = [
  { name: 'Wireless Headphones', description: 'Noise cancelling over-ear headphones.', price: 129.99, category: 'Electronics', stock: 25, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600' },
  { name: 'Smart Watch', description: 'Fitness tracker with heart-rate monitor.', price: 89.5, category: 'Electronics', stock: 40, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600' },
  { name: 'Running Shoes', description: 'Lightweight breathable running shoes.', price: 75, category: 'Fashion', stock: 60, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600' },
  { name: 'Backpack', description: 'Waterproof 25L laptop backpack.', price: 49.99, category: 'Fashion', stock: 30, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600' },
  { name: 'Coffee Maker', description: 'Programmable 12-cup drip coffee maker.', price: 59, category: 'Home', stock: 18, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600' },
  { name: 'Desk Lamp', description: 'LED desk lamp with USB charging.', price: 32, category: 'Home', stock: 50, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600' },
  { name: 'Novel: The Journey', description: 'Bestselling adventure novel.', price: 14.99, category: 'Books', stock: 100, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600' },
  { name: 'Yoga Mat', description: 'Non-slip eco-friendly yoga mat.', price: 28, category: 'Sports', stock: 45, image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600' }
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany(); await User.deleteMany();
  await Product.insertMany(products);
  await User.create({ name: 'Admin', email: 'admin@shop.com', password: 'admin123', role: 'admin' });
  await User.create({ name: 'Demo User', email: 'user@shop.com', password: 'user123' });
  console.log('Seeded:', products.length, 'products + admin@shop.com / admin123 + user@shop.com / user123');
  process.exit();
})();
