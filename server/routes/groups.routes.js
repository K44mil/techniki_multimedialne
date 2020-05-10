const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createGroup,
    deleteGroup,
    getMyGroups,
    removeStudentFromGroup,
    getGroup
} = require('../controllers/groups.controller');


router
    .route('/myGroups')
    .get(protect, getMyGroups);

router
    .route('/:id')
    .get(protect, getGroup)
    .delete(protect, authorize('teacher', 'admin'), deleteGroup);

router
    .route('/:id/removeStudent/:studentId')
    .put(protect, authorize('teacher', 'admin'), removeStudentFromGroup);

router
    .route('/')
    .post(protect, authorize('teacher', 'admin'), createGroup);


module.exports = router;