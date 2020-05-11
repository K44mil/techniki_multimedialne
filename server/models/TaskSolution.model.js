const mongoose = require('mongoose');

const TaskSolutionSchema = new mongoose.Schema({
    text: {
        type: String,
        maxlength: 250
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    task: {
        type: mongoose.Schema.ObjectId,
        ref: 'Task',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    file: {
        type: mongoose.Schema.ObjectId,
        ref: 'File'
    }
});

module.exports = mongoose.model('TaskSolution', TaskSolutionSchema);