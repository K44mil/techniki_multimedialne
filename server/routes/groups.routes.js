const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createGroup,
    deleteGroup,
    getGroups
} = require('../controllers/groups.controller');

router
    .route('/:id')
    .delete(protect, authorize('teacher', 'admin'), deleteGroup);

router
    .route('/')
    .post(protect, authorize('teacher', 'admin'), createGroup);
    // .get(getGroups);

module.exports = router;