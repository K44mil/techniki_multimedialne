const express = require('express');
const router = express.Router();
const { getMessages } = require('../controllers/chatmessage.controller.js');

router
    .route('/group/:id')
    .get(getMessages);

module.exports = router;