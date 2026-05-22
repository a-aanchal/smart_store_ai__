const geminiService = require('../services/geminiService');
const analyticsService = require('../services/analyticsService');

exports.generateContent = async (req, res) => {
    const { title, attributes } = req.body;
    try {
        const generatedData = await geminiService.generateProductContent(title, attributes);
        res.status(200).json(generatedData);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to generate content' });
    }
};

exports.getSalesInsights = async (req, res) => {
    try {
        const summary = await analyticsService.getDashboardSummary();
        const stats = {
            revenue: summary.totalRevenue,
            totalProducts: summary.totalProducts,
            lowStockCount: summary.lowStockCount
        };
        const insights = await geminiService.generateSalesSuggestions(stats);
        res.status(200).json(insights);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to get insights' });
    }
};
