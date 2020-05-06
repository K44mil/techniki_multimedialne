const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Group name is required'],
        maxlength: [100, 'Group name cannot be longer than 100 letters.']
    },
    description: {
        type: String,
        maxlength: [250, 'Group description cannot be longer than 250 letters.']
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Group', GroupSchema);