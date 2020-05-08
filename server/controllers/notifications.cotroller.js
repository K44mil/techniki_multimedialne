const UserNotification = require('../models/UserNotification.model');
const User = require('../models/User.model');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Get all user notifications
// @route   GET /api/v1/notifications/myNotifications
// @access  Private
exports.getNotifications = asyncHandler(async (req, res, next) => {
    const user = req.user;
    let notifications = await UserNotification.find({ user: user.id })
                                              .populate('notification')
                                              .sort('-createdAt');  
                                          
    if (notifications) {
        await UserNotification.updateMany({ user: user.id }, { $set: { isRead: true } });
    } else if (!notifications) {
        notifications = [];
    }
    
    // Send response
    res.status(200).json({
        success: true,
        data: {
            notifications: notifications,
            notificationsCount: notifications.length
        }
    });
});