const mongoose = require('mongoose');

const UserTestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    activeTestId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'ActiveTest'
    },
    status: {
        type: String,
        enum: ['Nierozpoczęty', 'W trakcie', 'Zakończony'],
        default: 'Nierozpoczęty'
    },
    result: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('UserTest', UserTestSchema);