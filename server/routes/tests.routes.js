const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  createTest,
  activateTest,
  getTests,
  getFinishedTests,
  getActiveTests,
  getTestDetails,
  getMyFinishedTests,
  getTest,
  getMyActiveTests,
  startTest,
  checkTest

} = require('../controllers/tests.controller');

router
  .route('/')
  .post(protect, authorize('teacher', 'admin'), createTest)
  .get(protect, authorize('teacher', 'admin'), getTests);

router
  .route('/:testId/group/:groupId')
  .post(protect, authorize('teacher', 'admin'), activateTest);

router.route('/finishedTests').get(protect, getFinishedTests);

router.route('/activeTests').get(protect, getActiveTests);

router.route('/:id/details').get(protect, getTestDetails);

router.route('/myFinishedTests').get(protect, getMyFinishedTests);
router.route('/myActiveTests').get(protect, getMyActiveTests);
router.route('/startTest/:id').get(protect, startTest);

router.route('/checkTest/:id').post(protect, checkTest);

router.route('/:id').get(protect, getTest);

module.exports = router;
