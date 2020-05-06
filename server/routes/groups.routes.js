const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createGroup,
    deleteGroup,
    getStudentGroups,
    getTeacherGroups,
    getGroup
} = require('../controllers/groups.controller');

router
    .route('/:id')
    .get(protect, getGroup)
    .delete(protect, authorize('teacher', 'admin'), deleteGroup);
    

router
    .route('/')
    .post(protect, authorize('teacher', 'admin'), createGroup);

router
    .route('/student/:id')
    .get(protect, authorize('student', 'admin'), getStudentGroups);

router
    .route('/teacher/:id')
    .get(protect, authorize('teacher', 'admin'), getTeacherGroups);

module.exports = router;