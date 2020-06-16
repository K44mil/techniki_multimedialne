const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { createTest } = require('../controllers/tests.controller');

router
    .route('/group/:id')
    .post(protect, authorize('teacher', 'admin'), createTest);
    // .post(createTest);

module.exports = router;