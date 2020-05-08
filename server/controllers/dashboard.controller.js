const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User.model');
const Group = require('../models/Group.model');
const Task = require('../models/Task.model');
const UserNotification = require('../models/UserNotification.model');

// @desc    Get user dashboard info
// @route   GET /api/v1/dashboard
// @access  Private
exports.getDashboard = asyncHandler(async (req, res, next) => {
    const user = req.user;
    let data = {
        groupsCount: 0,
        notificationsCount: 0,
        messagesCount: 0,
        todo: []
    }
    // Role student
    if (user.role === 'student') {
        // Get all data
        let groups = await Group.find({ members: { $in: user.id } });
        let notifications = await UserNotification.find({
            isRead: false,
            user: user.id
        });
        let messages = []; // TODO
        let tasks = await Task.find({ students: user.id });
        // Check data if not null
        if (!groups) groups = [];
        if (!notifications) notifications = [];
        if (!messages) messages = [];
        if (!tasks) tasks = [];
        // Set data to response
        data.groupsCount = groups.length;
        data.notificationsCount = notifications.length;
        data.messagesCount = messages.length;
        data.todo = tasks;
    }
    // Role teacher
    if (user.role === 'teacher') {
        // Get all data
        let groups = await Group.find({ owner: user.id });
        let notifications = []; // TODO
        let messages = []; // TODO
        let taskSolutions = [];
        // Check data if not null
        if (!groups) groups = [];
        if (!notifications) notifications = [];
        if (!messages) messages = [];
        if (!tasks) tasks = [];
        // Set data to response
        data.groupsCount = groups.length;
        data.notificationsCount = notifications.length;
        data.messagesCount = messages.length;
        data.todo = taskSolutions;
    }
    // Send response
    res.status(200).json({
        success: true,
        data: data
    })
});