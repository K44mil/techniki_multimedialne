const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { downloadFile, getFiles } = require('../controllers/files.controller');

router
    .route('/download/:id')
    .get(protect, downloadFile);

router
    .route('/')
    .get(getFiles);

module.exports = router;