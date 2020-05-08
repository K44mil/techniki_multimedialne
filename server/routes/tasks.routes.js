const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createTask,
    deleteTask
} = require('../controllers/tasks.controller');

router
    .route('/')
    .post(protect, authorize('teacher', 'admin'), createTask);

router
    .route('/:id')
    .delete(protect, authorize('teacher', 'admin'), deleteTask);

module.exports = router;