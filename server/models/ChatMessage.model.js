const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    group: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Group'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);