const express = require('express');
const router = express.Router();
const {handleGenerateShortURL, handleGetAnalytics} = require('../controllers/url')

router.post('/', handleGenerateShortURL);
router.post('/analytics/:id', handleGetAnalytics);

module.exports = router;