const express = require('express');
const { getSummary, getAnalyticsData } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/summary', authMiddleware, getSummary);
router.get('/data', authMiddleware, getAnalyticsData);

module.exports = router;
