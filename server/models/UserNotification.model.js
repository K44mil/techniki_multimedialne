const mongoose = require('mongoose');

const UserNotificationSchema = new mongoose.Schema({
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    notification: {
        type: mongoose.Schema.ObjectId,
        ref: 'Notification',
        required: true
    }
});

module.exports = mongoose.model('UserNotification', UserNotificationSchema);