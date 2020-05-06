const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true
    },
    isRejected: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
        required: true
    }
});

module.exports = mongoose.model('Invitation', InvitationSchema);