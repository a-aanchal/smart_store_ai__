const mongoose = require('mongoose');
const Product = require('../models/Product');
const Order = require('../models/Order');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'smartstore'
        });
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
        
        // Auto-seed data
        await seedData();
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        const productCount = await Product.countDocuments();
        let seededProducts = [];
        
        if (productCount === 0) {
            console.log('No products found in DB. Seeding sample products...');
            const sampleProducts = [
                {
                    title: 'Wireless ANC Headphones',
                    price: 99.99,
                    stock: 25,
                    description: 'Premium active noise-canceling headphones with rich spatial audio and a 30-hour battery life.',
                    category: 'Electronics',
                    tags: ['Electronics', 'Audio', 'Wireless'],
                    seoTags: 'headphones, wireless, noise canceling, audio',
                    marketingCaption: 'Block out the noise, tune into the sound. Get 20% off our best-selling headphones today! 🎧✨'
                },
                {
                    title: 'Mechanical Gaming Keyboard',
                    price: 129.99,
                    stock: 8,
                    description: 'Tactile mechanical keyboard with hot-swappable switches and customizable per-key RGB backlighting.',
                    category: 'Electronics',
                    tags: ['Electronics', 'Gaming', 'Keyboard'],
                    seoTags: 'keyboard, mechanical, rgb, gaming',
                    marketingCaption: 'Elevate your gaming and typing experience. Dynamic RGB, premium tactile feedback. ⌨️🔥'
                },
                {
                    title: 'Ergonomic Mesh Office Chair',
                    price: 249.99,
                    stock: 15,
                    description: 'High-back ergonomic office chair featuring adjustable lumbar support, 3D armrests, and premium breathable mesh.',
                    category: 'Furniture',
                    tags: ['Furniture', 'Office', 'Ergonomic'],
                    seoTags: 'chair, ergonomic, office, furniture',
                    marketingCaption: 'Work in absolute comfort. Say goodbye to back pain with our mesh chair! 🪑💼'
                },
                {
                    title: 'Stainless Steel Water Bottle',
                    price: 24.99,
                    stock: 50,
                    description: 'Double-walled vacuum insulated water bottle. Keeps drinks icy cold for 24 hours or hot for 12 hours.',
                    category: 'Fitness',
                    tags: ['Fitness', 'Accessories', 'Water Bottle'],
                    seoTags: 'water bottle, insulated, stainless steel, fitness',
                    marketingCaption: 'Stay hydrated in style. Eco-friendly, durable, and perfectly insulated. 💧🚴'
                },
                {
                    title: 'Smart Fitness Tracker Watch',
                    price: 199.99,
                    stock: 4,
                    description: 'Advanced fitness watch with built-in GPS, continuous heart rate tracking, sleep scores, and smart notifications.',
                    category: 'Electronics',
                    tags: ['Electronics', 'Fitness', 'Wearable'],
                    seoTags: 'smartwatch, fitness watch, tracker, wearables',
                    marketingCaption: 'Track your goals and monitor your health. The ultimate workout partner on your wrist! ⌚💪'
                }
            ];
            seededProducts = await Product.insertMany(sampleProducts);
            console.log(`Seeded ${seededProducts.length} sample products.`);
        } else {
            seededProducts = await Product.find();
        }

        const orderCount = await Order.countDocuments();
        if (orderCount === 0 && seededProducts.length > 0) {
            console.log('No orders found in DB. Seeding sample order history...');
            const sampleOrders = [];
            const currentDate = new Date();
            
            // Generate about 40 orders spread over the last 6 months
            for (let i = 0; i < 40; i++) {
                const daysAgo = Math.floor(Math.random() * 180);
                const orderDate = new Date();
                orderDate.setDate(currentDate.getDate() - daysAgo);
                
                const numProducts = Math.floor(Math.random() * 3) + 1;
                const orderProducts = [];
                let totalAmount = 0;
                
                const selectedIndices = new Set();
                while (selectedIndices.size < numProducts) {
                    selectedIndices.add(Math.floor(Math.random() * seededProducts.length));
                }
                
                selectedIndices.forEach(idx => {
                    const prod = seededProducts[idx];
                    const qty = Math.floor(Math.random() * 3) + 1;
                    orderProducts.push({
                        product: prod._id,
                        quantity: qty,
                        price: prod.price
                    });
                    totalAmount += prod.price * qty;
                });
                
                sampleOrders.push({
                    products: orderProducts,
                    totalAmount: Math.round(totalAmount * 100) / 100,
                    status: 'Completed',
                    createdAt: orderDate,
                    updatedAt: orderDate
                });
            }
            
            await Order.insertMany(sampleOrders);
            console.log(`Seeded ${sampleOrders.length} sample orders.`);
        }
    } catch (err) {
        console.error('Seeding database failed:', err);
    }
};

module.exports = connectDB;
