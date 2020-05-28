const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { 
    createRate,
    getMyRates
} = require('../controllers/rates.controller');

router
    .route('/solution/:id')
    .post(protect, authorize('teacher', 'admin'), createRate);

router
    .route('/myRates')
    .post(protect, getMyRates);

module.exports = router;