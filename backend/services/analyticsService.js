const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getDashboardSummary = async () => {
    // Total Revenue
    const revenueRes = await Order.aggregate([
        { $match: { status: 'Completed' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueRes.length > 0 ? Math.round(revenueRes[0].total * 100) / 100 : 0;

    // Total Products
    const totalProducts = await Product.countDocuments();

    // Low Stock Count & list
    const lowStockThreshold = 10;
    const lowStockProducts = await Product.find({ stock: { $lt: lowStockThreshold } }).select('title stock price category');
    const lowStockCount = lowStockProducts.length;

    return {
        totalRevenue,
        totalProducts,
        lowStockCount,
        lowStockProducts
    };
};

exports.getAnalyticsData = async () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1); // Start of month 6 months ago

    // 1. Revenue trend over last 6 months
    const trendRes = await Order.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo }, status: 'Completed' } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                revenue: { $sum: "$totalAmount" }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    // Format revenue trend to have contiguous labels
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trendData = [];
    const tempDate = new Date(sixMonthsAgo);

    for (let i = 0; i < 6; i++) {
        const year = tempDate.getFullYear();
        const monthNum = String(tempDate.getMonth() + 1).padStart(2, '0');
        const key = `${year}-${monthNum}`;
        const label = `${months[tempDate.getMonth()]} ${year}`;

        const match = trendRes.find(item => item._id === key);
        trendData.push({
            label,
            revenue: match ? Math.round(match.revenue * 100) / 100 : 0
        });

        tempDate.setMonth(tempDate.getMonth() + 1);
    }

    // 2. Sales by Category
    const categorySales = await Order.aggregate([
        { $match: { status: 'Completed' } },
        { $unwind: "$products" },
        {
            $lookup: {
                from: "products",
                localField: "products.product",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        { $unwind: "$productInfo" },
        {
            $group: {
                _id: "$productInfo.category",
                revenue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } },
                quantity: { $sum: "$products.quantity" }
            }
        },
        { $sort: { revenue: -1 } }
    ]);

    // 3. Top Selling Products
    const topProducts = await Order.aggregate([
        { $match: { status: 'Completed' } },
        { $unwind: "$products" },
        {
            $group: {
                _id: "$products.product",
                totalQty: { $sum: "$products.quantity" },
                revenue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } }
            }
        },
        { $sort: { totalQty: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "details"
            }
        },
        { $unwind: "$details" },
        {
            $project: {
                title: "$details.title",
                category: "$details.category",
                totalQty: 1,
                revenue: { $round: ["$revenue", 2] }
            }
        }
    ]);

    // 4. Recent Orders
    const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('products.product', 'title category price');

    return {
        revenueTrend: trendData,
        categorySales: categorySales.map(item => ({
            category: item._id || 'General',
            revenue: Math.round(item.revenue * 100) / 100,
            quantity: item.quantity
        })),
        topProducts,
        recentOrders
    };
};
