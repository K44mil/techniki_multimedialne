const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    path: {
        type: String,
    }
});

module.exports = mongoose.model('File', FileSchema);