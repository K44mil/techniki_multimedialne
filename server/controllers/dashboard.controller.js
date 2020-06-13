const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User.model');
const Group = require('../models/Group.model');
const Task = require('../models/Task.model');
const UserNotification = require('../models/UserNotification.model');
const TaskSolution = require('../models/TaskSolution.model');

// @desc    Get user dashboard info
// @route   GET /api/v1/dashboard
// @access  Private
exports.getDashboard = asyncHandler(async (req, res, next) => {
  const user = req.user;
  let data = {
    groupsCount: 0,
    notificationsCount: 0,
    messagesCount: 0,
    todo: []
  };
  // Role student
  if (user.role === 'student') {
    // Get all data
    let groups = await Group.find({ members: { $in: user.id } });
    let notifications = await UserNotification.find({
      isRead: false,
      user: user.id
    });
    let messages = []; // TODO
    let tasks = await Task.find({ students: { $in: user.id } });
    let taskSolutions = await TaskSolution.find({ user: user.id });
    for (const tS of taskSolutions) {
      tasks.filter(t => t.id.toString() !== tS.id.toString());
    }

    // Check data if not null
    if (!groups) groups = [];
    if (!notifications) notifications = [];
    if (!messages) messages = [];
    if (!tasks) tasks = [];
    // Set data to response
    data.groupsCount = groups.length;
    data.notificationsCount = notifications.length;
    data.messagesCount = messages.length;
    data.todo = tasks;
  }
  // Role teacher
  if (user.role === 'teacher') {
    // Get all data
    let groups = await Group.find({ owner: user.id });
    let groupsId = [];
    for (const group of groups) {
      groupsId.push(group.id);
    }
    let notifications = await UserNotification.find({
      isRead: false,
      user: user.id
    });
    let messages = []; // TODO
    let tasks = await Task.find({ group: { $in: groupsId } });
    let tasksId = [];
    for (const task of tasks) {
      tasksId.push(task.id);
    }
    let taskSolutions = await TaskSolution.find({
      task: { $in: tasksId }
    }).lean();
    for (const tS of taskSolutions) {
      let user = await User.findById(tS.user);
      if (user) {
        tS.userFirstName = user.firstName;
        tS.userLastName = user.lastName;
        tS.userEmail = user.email;
        console.log(tS);
      }
    }

    // Check data if not null
    if (!groups) groups = [];
    if (!notifications) notifications = [];
    if (!messages) messages = [];
    if (!taskSolutions) taskSolutions = [];
    // Set data to response
    data.groupsCount = groups.length;
    data.notificationsCount = notifications.length;
    data.messagesCount = messages.length;
    data.todo = taskSolutions;
  }
  // Send response
  res.status(200).json({
    success: true,
    data: data
  });
});
