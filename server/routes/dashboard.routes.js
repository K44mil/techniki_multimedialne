const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getDashboard } = require('../controllers/dashboard.controller');

router
    .route('/')
    .get(protect, getDashboard);

module.exports = router;