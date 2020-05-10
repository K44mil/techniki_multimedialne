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

// @desc    Delete notification
// @route   DELETE /api/v1/notifications/:id
// @access  Private
exports.deleteNotification = asyncHandler(async (req, res, next) => {
    const notification = await UserNotification.findById(req.params.id);
    const user = req.user;
    // Check if notification exists
    if (!notification) {
        return next(
            new ErrorResponse(`Notification with id ${req.params.id} does not exist.`, 400)
        );
    }
    // Check if authorized
    if (user.id.toString() !== notification.user.toString() && user.role !== 'admin') {
        return next(
            new ErrorResponse(`Not authorized.`, 401)
        );
    }
    // Delete notification
    await notification.remove();
    // Send response
    res.status(200).json({
        success: true,
        data: {}
    });
});