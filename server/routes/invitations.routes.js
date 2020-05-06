const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createInvitation,
    acceptInvitation,
    rejectInvitation
} = require('../controllers/invitations.controller');

router
    .route('/')
    .post(protect, authorize('teacher', 'admin'), createInvitation);

router
    .route('/:id/accept')
    .get(protect, authorize('student', 'admin'), acceptInvitation);

router
    .route('/:id/reject')
    .get(protect, authorize('student', 'admin'), rejectInvitation);

module.exports = router;