const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Task = require('../models/Task.model');
const User = require('../models/User.model');
const Group = require('../models/Group.model');
const File = require('../models/File.model');
const path = require('path');
const fs = require('fs');
const TaskSolution = require('../models/TaskSolution.model');
const Notification = require('../models/Notification.model');
const UserNotification = require('../models/UserNotification.model');

// @desc    Create task
// @route   POST /api/v1/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  const { name, description, expireDate, groupId } = req.body;
  const user = req.user;
  // Check if user is group exists
  const group = await Group.findById(groupId);
  if (!group) {
    return next(
      new ErrorResponse(`Group with id ${groupId} does not exists`, 400)
    );
  }
  // Check if user is a group owner
  if (group.owner.toString() !== user.id.toString() && user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized`, 401));
  }
  // Check if date is correct
  const expireAt = new Date(expireDate);
  if (expireAt < Date.now()) {
    return next(new ErrorResponse(`Invalid expire date.`, 400));
  }
  // --File upload-
  // Check file size
  const taskFiles = [];
  if (req.files && req.files.fileList) {
    const files =
      req.files.files.length === undefined
        ? new Array(req.files.files)
        : req.files.files;
    // Check if there is max 3 files
    if (files.length > 3) {
      return next(
        new ErrorResponse(`You can add maximum 3 files to task.`, 400)
      );
    }
    // Check file size
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        return next(new ErrorResponse(`File ${file.name} is too big.`, 400));
      }
    }
    // Save files
    for (const file of files) {
      const type = path
        .extname(file.name)
        .toString()
        .replace('.', '');
      const createdFile = await File.create({
        name: file.name,
        type: type
      });
      taskFiles.push(createdFile.id);
      createdFile.path = `/private/${createdFile.id}.${createdFile.type}`.toString();
      await createdFile.save();
      file.mv(`${path.resolve(__dirname, '..')}/${createdFile.path}`);
    }
  }
  // Create task
  const task = await Task.create({
    name,
    description,
    group: groupId,
    expireAt,
    files: taskFiles
  });
  // Get group members and add to Task
  group.members.forEach(id => {
    task.students.push(id);
  });
  // Save task
  await task.save();
  // Create notification
  const notification = await Notification.create({
    text: `Użytkownik ${user.firstName} ${user.lastName} dodał nowe zadanie w grupie ${group.name}.`
  });
  // Set notification to all group members
  for (const student of task.students) {
    await UserNotification.create({
      user: student,
      notification: notification
    });
  }
  // Send response
  // console.log(req.files);

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  const user = req.user;
  // Check if task exists
  if (!task) {
    return next(
      new ErrorResponse(`Task with id ${req.params.id} not found.`, 400)
    );
  }
  // Check if user is an tasks group owner
  const group = await Group.findById(task.group);
  if (!group) {
    return next(
      new ErrorResponse(`Task group with id ${task.group} not found.`, 400)
    );
  }
  if (group.owner.toString() !== user.id.toString() && user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized.`, 401));
  }
  // Delete files assigned to this task
  if (task.files) {
    for (const taskFile of task.files) {
      const file = await File.findById(taskFile);
      if (file) {
        fs.unlink(`${path.resolve(__dirname, '..')}${file.path}`, () => {
          console.log(`File ${file.path} deleted.`);
        });
        await file.deleteOne();
      }
    }
  }
  // Delete task
  await task.remove();
  // Send response
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add solution to task
// @route   POST /api/v1/tasks/:id/addSolution
// @access  Private
// TODO:
exports.addTaskSolution = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  const user = req.user;
  const group = await Group.findById(task.group);
  const { text } = req.body.text || '';
  // Check if task exists
  if (!task) {
    return next(
      new ErrorResponse(`Task with id ${req.params.id} does not exist.`, 400)
    );
  }
  // Check if authorized
  if (!group.members.includes(user.id)) {
    return next(new ErrorResponse('Not authorized.', 401));
  }
  // Check if solution exist
  let taskSolution = await TaskSolution.find({
    user: user.id,
    task: task.id
  });
  if (taskSolution) {
    return next(
      new ErrorResponse('You already gave solution to this task.', 400)
    );
  }
  // Check files
  let taskSolutionFile = null;
  if (req.files && req.files.files) {
    const files =
      req.files.files.length === undefined
        ? new Array(req.files.files)
        : req.files.files;
    // Check if there is max 1 file
    if (files.length > 1) {
      return next(
        new ErrorResponse(`You can add maximum 1 file to task solution.`, 400)
      );
    }
    // Check file size
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        return next(new ErrorResponse(`File ${file.name} is too big.`, 400));
      }
    }
    // Save files
    for (const file of files) {
      const type = path
        .extname(file.name)
        .toString()
        .replace('.', '');
      const createdFile = await File.create({
        name: file.name,
        type: type
      });
      taskSolutionFile = createdFile.id;
      createdFile.path = `/private/${createdFile.id}.${createdFile.type}`.toString();
      await createdFile.save();
      file.mv(`${path.resolve(__dirname, '..')}/${createdFile.path}`);
    }
  }
  // Create Task Solution
  if (taskSolutionFile) {
    taskSolution = await TaskSolution.create({
      text: text,
      user: user.id,
      task: task.id,
      file: taskSolutionFile
    });
  } else {
    taskSolution = await TaskSolution.create({
      text: text,
      user: user.id,
      task: task.id
    });
  }
  // Create notification
  // Create notification
  const notification = await Notification.create({
    text: `Użytkownik ${user.firstName} ${user.lastName} dodał odpowiedź na Twoje zadanie w grupie ${group.name}.`
  });
  await UserNotification.create({
    user: group.owner,
    notification: notification.id
  });
  // Send response
  res.status(200).json({
    success: true,
    data: taskSolution
  });
});
