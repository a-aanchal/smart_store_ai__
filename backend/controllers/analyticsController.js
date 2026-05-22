const analyticsService = require('../services/analyticsService');

exports.getSummary = async (req, res) => {
    try {
        const summary = await analyticsService.getDashboardSummary();
        res.status(200).json(summary);
    } catch (error) {
        console.error('Error fetching analytics summary:', error);
        res.status(500).json({ message: error.message || 'Failed to fetch summary' });
    }
};

exports.getAnalyticsData = async (req, res) => {
    try {
        const data = await analyticsService.getAnalyticsData();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        res.status(500).json({ message: error.message || 'Failed to fetch analytics data' });
    }
};
