const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, default: 'General' },
    description: { type: String },
    tags: [{ type: String }],
    seoTags: { type: String },
    marketingCaption: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
