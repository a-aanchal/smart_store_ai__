const Product = require('../models/Product');
const { checkLowStock } = require('../utils/inventoryAlert');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    const productData = req.body;
    const newProduct = new Product(productData);
    try {
        await newProduct.save();
        
        // Check for low stock alert
        checkLowStock(newProduct);
        
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        
        // Check for low stock alert
        if (updatedProduct) {
            checkLowStock(updatedProduct);
        }
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
