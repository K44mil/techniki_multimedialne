const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createTask,
    deleteTask,
    getTask,
    getTaskSolution,
    getTasks
} = require('../controllers/tasks.controller');

router
    .route('/')
    .get(protect, authorize('teacher', 'admin'), getTasks)
    .post(protect, authorize('teacher', 'admin'), createTask);

router
    .route('/:id')
    .get(protect, getTask)
    .delete(protect, authorize('teacher', 'admin'), deleteTask);

router
    .route('/taskSolution/:id')
    .get(protect, getTaskSolution);

module.exports = router;
