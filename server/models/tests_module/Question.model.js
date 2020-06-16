const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 1000
    },
    type: {
        type: String,
        enum: ['o', 'z'], // o - pytanie otwarte, z - pytanie zamknięte
        require: true
    },
    testId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Test'
    }
});

module.exports = mongoose.model('Question', QuestionSchema);