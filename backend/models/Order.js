const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    fullName: String, address: String, city: String,
    postalCode: String, country: String, phone: String
  },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
