const ChatMessage = require('../models/ChatMessage.model');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

exports.getMessages = asyncHandler(async (req, res, next) => {
    const messages = await ChatMessage.find({ group: req.params.id }).populate('user');

    res.status(200).json({
        success: true,
        data: messages
    });
});