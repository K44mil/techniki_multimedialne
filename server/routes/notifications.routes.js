const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getNotifications } = require('../controllers/notifications.cotroller');

router
    .route('/myNotifications')
    .get(protect, getNotifications);

module.exports = router;