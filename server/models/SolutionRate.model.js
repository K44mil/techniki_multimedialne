const mongoose = require('mongoose');

const SolutionRateSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }, 
    comment: {
        type: String,
    },
    solution: {
        type: mongoose.Schema.ObjectId,
        ref: 'TaskSolution',
        required: true
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SolutionRate', SolutionRateSchema);