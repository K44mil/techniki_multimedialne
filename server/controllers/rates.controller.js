const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const SolutionRate = require('../models/SolutionRate.model');
const TaskSolution = require('../models/TaskSolution.model');
const Notification = require('../models/Notification.model');
const Task = require('../models/Task.model');
const UserNotification = require('../models/UserNotification.model');
const User = require('../models/User.model');

// @desc    Create rate to solution
// @route   POST /api/v1/rates/solution/:id
// @access  Private
exports.createRate = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { value, comment } = req.body;

  // Check if solution exists
  const solution = await TaskSolution.findById(req.params.id);
  if (!solution) {
    return next(
      new ErrorResponse(
        `Task solution with id ${req.params.id} does not exist.`,
        400
      )
    );
  }
  // Check solution user
  const rate = await SolutionRate.create({
    value: value,
    comment: comment,
    solution: solution.id,
    student: solution.user,
    createdBy: user.id
  });
  // Create notification
  const notification = await Notification.create({
    text: `Użytkownik ${user.firstName} ${user.lastName} wystawił Ci nową ocenę: ${rate.value}.`
  });
  // Set notification
  await UserNotification.create({
    user: solution.user,
    notification: notification.id
  });
  // Send response
  res.status(200).json({
    success: true,
    data: rate
  });
});

// @desc    Get all student rates
// @route   GET /api/v1/rates/myRates
// @access  Private
exports.getMyRates = asyncHandler(async (req, res, next) => {
  const user = req.user;
  let rates = [];
  // Find student rates
  if (user.role === 'student') {
    rates = await SolutionRate.find({
      student: user.id
    })
      .sort('-createdAt')
      .lean();

    for (const rate of rates) {
      const solution = await TaskSolution.findById(rate.solution);
      if (solution) {
        const task = await Task.findById(solution.task);
        if (task) {
          rate.taskName = task.name;
        }
      }
    }
  }
  // Find created rates
  if (user.role === 'teacher') {
    rates = await SolutionRate.find({
      createdBy: user.id
    })
      .sort('-createdAt')
      .lean();

    for (const rate of rates) {
      const solution = await TaskSolution.findById(rate.solution);
      if (solution) {
        const task = await Task.findById(solution.task);
        if (task) {
          rate.taskName = task.name;
        }
        const student = await User.findById(solution.user);
        if (user) {
          rate.studentEmail = student.email;
        }
      }
    }
  }
  // Send response
  res.status(200).json({
    success: true,
    data: rates
  });
});
