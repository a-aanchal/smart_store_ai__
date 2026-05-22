const express = require('express');
const { generateContent, getSalesInsights } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate', authMiddleware, generateContent);
router.get('/insights', authMiddleware, getSalesInsights);

module.exports = router;
