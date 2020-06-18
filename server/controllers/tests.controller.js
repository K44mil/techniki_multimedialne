const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Test = require('../models/tests_module/Test.model');
const UserTest = require('../models/tests_module/UserTest.model');
const Question = require('../models/tests_module/Question.model');
const Answer = require('../models/tests_module/Answer.model');
const Group = require('../models/Group.model');
const ActiveTest = require('../models/tests_module/ActiveTest.model');
const { userJoin } = require('../utils/chatUser');

// @desc    Create test
// @route   POST /api/v1/tests
// @access  Private
exports.createTest = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { name, description, questions } = req.body;

  const test = await Test.create({
    name: name,
    description: description,
    createdBy: user.id
  });

  let numberOfQ = 0;
  for (const q of questions) {
    const question = await Question.create({
      text: q.text,
      type: q.type,
      testId: test.id
    });
    for (const a of q.answers) {
      await Answer.create({
        text: a.text,
        isCorrect: a.isCorrect,
        questionId: question.id
      });
    }
    numberOfQ++;
  }

  await test.updateOne({
    numberOfQuestions: numberOfQ
  });

  res.status(200).json({
    success: true,
    data: test
  });
});

// @desc    Activate test for group
// @route   POST /api/v1/tests/:testId/group/:groupId
// @access  Private
exports.activateTest = asyncHandler(async (req, res, next) => {
  const test = await Test.findById(req.params.testId);
  const group = await Group.findById(req.params.groupId);
  const user = req.user;
  let { availableAt, availableUntil } = req.body;
  // Set dates if null
  if (!availableAt) availableAt = new Date(0);
  if (!availableUntil) availableUntil = new Date(Math.pow(10, 13));
  // Check if test and group exist
  if (!test) {
    return next(
      new ErrorResponse(
        `Test with id ${req.params.testId} does not exist.`,
        400
      )
    );
  }
  if (!group) {
    return next(
      new ErrorResponse(
        `Group with id ${req.params.groupId} does not exist.`,
        400
      )
    );
  }
  // Check if authorized
  if (user.id.toString() !== group.owner.toString()) {
    return next(new ErrorResponse(`Not authorized.`, 401));
  }
  // Create ActiveTest
  let activeTest = await ActiveTest.create({
    testId: test.id,
    groupId: group.id,
    availableAt: availableAt,
    availableUntil: availableUntil,
    numberOfCompleted: 0
  });
  // Set test participants
  let numberOfP = 0;
  for (const u of group.members) {
    const userTest = await UserTest.create({
      userId: u,
      activeTestId: activeTest.id
    });
    if (userTest) numberOfP++;
  }

  await activeTest.updateOne({
    numberOfParticipants: numberOfP
  });

  // Send response
  res.status(200).json({
    success: true,
    data: activeTest
  });
});

// @desc    Get all created tests (for teacher)
// @route   GET /api/v1/tests
// @access  Private
exports.getTests = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const tests = await Test.find({
    createdBy: user.id
  });
  // Send response
  res.status(200).json({
    success: true,
    data: tests
  });
});

// @desc    Get all finished test (for teacher)
// @route   GET /api/v1/tests/finishedTests
// @access  Private
exports.getFinishedTests = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const tests = await Test.find({
    createdBy: user.id
  });
  let finishedTests = [];
  if (tests) {
    for (const t of tests) {
      const activeTests = await ActiveTest.find({
        testId: t.id
      });
      if (activeTests) {
        for (const aT of activeTests) {
          if (aT.availableUntil < new Date()) {
            finishedTests.push(aT);
          }
        }
      }
    }
  }
  // Send response
  res.status(200).json({
    success: true,
    data: finishedTests
  });
});

// @desc    Get all active tests (for teacher)
// @route   GET /api/v1/tests/activeTests
// @access  Private
exports.getActiveTests = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const tests = await Test.find({
    createdBy: user.id
  });
  let data = [];
  if (tests) {
    for (const t of tests) {
      const activeTests = await ActiveTest.find({
        testId: t.id
      }).lean();
      if (activeTests) {
        for (const aT of activeTests) {
          const group = await Group.findById(aT.groupId);
          if (aT.availableUntil > new Date()) {
            let aT2 = aT;
            aT2.groupName = group.name;
            aT2.testName = test.name;
            data.push(aT2);
          }
        }
      }
    }
  }
  // Send response
  res.status(200).json({
    success: true,
    data: data
  });
});

// @desc    Get test participants details (for teacher)
// @route   GET /api/v1/tests/:id/details
// @access  Private
exports.getTestDetails = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const activeTest = await ActiveTest.findById(req.params.id);
  const test = await Test.findById(activeTest.testId);
  const group = await Group.findById(activeTest.groupId);

  if (!activeTest) {
    return next(
      new ErrorResponse(`Test with id ${req.params.id} does not exist.`, 400)
    );
  }
  const details = await UserTest.find({
    activeTestId: activeTest.id
  }).lean();
  // Send response
  res.status(200).json({
    success: true,
    data: {
      details,
      testName: test.name,
      groupName: group.name
    }
  });
});

// @desc    Get all finished tests (for student)
// @route   GET /api/v1/tests/myFinishedTests
// @access  Private
exports.getMyFinishedTests = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const userTests = await UserTest.find({
    userId: user.id
  });
  let finishedTests = [];
  for (const uT of userTests) {
    const activeTest = await ActiveTest.findById(uT.activeTestId);
    const test = await Test.findById(activeTest.testId);
    const group = await Group.findById(activeTest.groupId);

    if (activeTest && activeTest.availableUntil < new Date()) {
      let obj = uT;
      obj.testName = test.name;
      obj.groupName = group.name;
      finishedTests.push(obj);
    }
  }
  // Send response
  res.status(200).json({
    success: true,
    data: finishedTests
  });
});

// @desc    Get all tests (for student)
// @route   GET /api/v1/tests/myActiveTests
// @access  Private
exports.getMyActiveTests = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const userTests = await UserTest.find({
    userId: user.id
  });
  let activeTests = [];
  for (const uT of userTests) {
    const activeTest = await ActiveTest.findById(uT.activeTestId);
    const test = await Test.findById(activeTest.testId);
    const group = await Group.findById(activeTest.groupId);

    if (activeTest && activeTest.availableUntil > new Date()) {
      let obj = uT;
      obj.testName = test.name;
      obj.groupName = group.name;
      activeTests.push(obj);
    }
  }
  // Send response
  res.status(200).json({
    success: true,
    data: activeTests
  });
});

// @desc    Get test by id (for teacher)
// @route   GET /api/v1/tests/:id
// @access  Private
exports.getTest = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const test = await Test.findById(req.params.id);
  if (!test) {
    return next(
      new ErrorResponse(`Test with id ${req.params.id} does not exist.`, 400)
    );
  }
  if (user.id.toString() !== test.createdBy.toString()) {
    return next(new ErrorResponse(`Not authorized.`, 401));
  }
  // Send response
  res.status(200).json({
    success: true,
    data: test
  });
});
