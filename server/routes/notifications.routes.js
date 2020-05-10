const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getNotifications,
    deleteNotification
} = require('../controllers/notifications.cotroller');

router
    .route('/myNotifications')
    .get(protect, getNotifications);

router
    .route('/:id')
    .delete(protect, deleteNotification);

module.exports = router;