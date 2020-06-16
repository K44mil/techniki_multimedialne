const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        maxlength: 250
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    numberOfQuestions: {
        type: Number
    }
});

module.exports = mongoose.model('Test', TestSchema);