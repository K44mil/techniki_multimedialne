const mongoose = require('mongoose');

const ActiveTestSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Test'
    },
    groupId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Group'
    },
    availableAt: {
        type: Date,
    },
    availableUntil: {
        type: Date
    },
    numberOfParticipants: {
        type: Number
    },
    numberOfCompleted: {
        type: Number
    }
});

module.exports = mongoose.Model('ActiveTest', ActiveTestSchema);