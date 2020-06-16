const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: true
    },
    questionId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Question'
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);