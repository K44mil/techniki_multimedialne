const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        maxlength: [100, 'Task name cannot be longer than 100 letters.']
    },
    description: {
        type: String,
        maxlength: [200, 'Task description cannot be longer than 200 letters.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        required: true
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
        required: true
    },
    files: [{
        type: mongoose.Schema.ObjectId,
        ref: 'File',
    }],
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Task', TaskSchema);