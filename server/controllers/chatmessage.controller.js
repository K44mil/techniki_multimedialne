const ChatMessage = require('../models/ChatMessage.model');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Get chat messages for group
// @route   POST /api/v1/chatmessages/group/:id
// @access  Private
exports.getMessages = asyncHandler(async (req, res, next) => {
    const messages = await ChatMessage.find({ group: req.params.id }).populate('user');

    res.status(200).json({
        success: true,
        data: messages
    });
});