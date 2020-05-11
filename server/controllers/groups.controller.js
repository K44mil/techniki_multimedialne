const Group = require('../models/Group.model');
const User = require('../models/User.model');
const Invitation = require('../models/Invitation.model');
const Notification = require('../models/Notification.model');
const UserNotification = require('../models/UserNotification.model');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Create group
// @route   POST /api/v1/groups
// @access  Private
exports.createGroup = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const user = req.user;
  // Create Group
  const group = await Group.create({
    name,
    description,
    owner: user.id
  });
  // Send response
  res.status(201).json({
    success: true,
    data: group
  });
});

// @desc    Delete group
// @route   DELETE /api/v1/groups/:id
// @access  Private
exports.deleteGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.id);
  // Check if group exists
  if (!group) {
    return next(
      new ErrorResponse(`Group not found with id of ${req.params.id}`, 404)
    );
  }
  // Check if user is group owner or admin
  if (group.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to delete this group.`, 401));
  }
  // Delete all invitations to the group
  const invitations = await Invitation.find({ group: group.id });
  invitations.forEach(async invitation => {
    await invitation.remove();
  });
  // Delete group
  await group.remove();
  // Send response
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get all user groups
// @route   GET /api/v1/groups/myGroups
// @access  Private
exports.getMyGroups = asyncHandler(async (req, res, next) => {
  const user = req.user;
  let groups = [];
  //User student
  if (user.role === 'student') {
    groups = await Group.find({ members: { $in: user.id } });
  }
  // User teachers
  if (user.role === 'teacher') {
    groups = await Group.find({ owner: user.id });
  }
  //Send response
  res.status(200).json({
    success: true,
    data: groups
  });
});

// @desc    Get group by id
// @route   GET /api/v1/groups/:id
// @access  Private
exports.getGroup = asyncHandler(async (req, res, next) => {
  // Check if group exists
  let group = await Group.findById(req.params.id);
  if (!group) {
    return next(
      new ErrorResponse(`Group with id ${req.params.id} does not exist.`, 401)
    );
  }
  // Check if authorized
  if (
    (req.user.id.toString() !== group.owner.toString() &&
      req.user.role === 'teacher') ||
    (group.members.includes(req.params.id) && req.user.role === 'student')
  ) {
    return next(new ErrorResponse(`Not authorized.`, 401));
  }
  // Get group with members & owner data
  group = await Group.findById(req.params.id)
    .populate('members')
    .populate('owner');
  // Send response
  res.status(200).json({
    success: true,
    data: group
  });
});

// @desc    Remove student from group
// @route   PUT /api/v1/groups/:id/removeStudent/:studentId
// @access  Private
exports.removeStudentFromGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.id);
  const student = await User.findById(req.params.studentId);
  const user = req.user;
  // Check if group exists
  if (!group) {
    return next(
      new ErrorResponse(`Group with id ${req.params.id} does not exist.`, 400)
    );
  }
  // Cech if student exists
  if (!student) {
    return next(
      new ErrorResponse(
        `User with id ${req.params.studentId} does not exist.`,
        400
      )
    );
  }
  // Check if authorized
  if (user.id.toString() !== group.owner.toString() && user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized.`, 401));
  }
  // Check if student is a member of this group
  if (!group.members.includes(student.id)) {
    return next(
      new ErrorResponse(
        `User with id ${student.id} is not a member of group with if ${group.id}`,
        400
      )
    );
  }
  // Remove student from group
  const newMembers = group.members.filter(id => id !== student.id);
  await group.updateOne({
    members: newMembers
  });
  // Create notification for student
  const notification = await Notification.create({
    text: `Użytkownik ${user.firstName} ${user.lastName} usunął Cię z grupy ${group.name}.`
  });
  await UserNotification.create({
    user: student.id,
    notification: notification.id
  });
  // Send response
  res.status(200).json({
    success: true,
    data: group
  });
});

// @desc    Add student to group
// @route   PUT /api/v1/groups/:id/addStudent/:email
// @access  Private
exports.addStudent = asyncHandler(async (req, res, next) => {
  const student = await User.findOne({ email: req.params.email });
  const group = await Group.findById(req.params.id);
  const user = req.user;
  // Check if student exists
  if (!student) {
    return next(
      new ErrorResponse(
        `User with email ${req.params.email} does not exist.`,
        400
      )
    );
  }
  // Check if group exist
  if (!group) {
    return next(new ErrorResponse(`Group with id ${req.params.id}.`, 400));
  }
  // Check if authorized
  if (group.owner.toString() !== user.id.toString() && user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized.', 401));
  }
  // Add student to group
  const newMembers = group.members;
  newMembers.push(student.id);
  await group.updateOne({
    members: newMembers
  });
  // Create notification
  const notification = await Notification.create({
    text: `Użytkownik ${user.firstName} ${user.lastName} dodał Cię do grupy ${group.name}.`
  });
  await UserNotification.create({
    user: student.id,
    notification: notification.id
  });
  // Send response
  res.status(200).json({
    success: true,
    data: group
  });
});

/*
// @desc    Get all student groups
// @route   GET /api/v1/groups/student/:id
// @access  Private
exports.getStudentGroups = asyncHandler(async (req, res, next) => {
    // Check if student exists
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(
            new ErrorResponse(`User with id ${req.params.id} does not exists`, 400)
        );
    }
    // Check if authorized
    if(user.id.toString() !== req.params.id.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`Not authorized.`, 401)
        );
    }
    // Find groups
    const groups = await Group.find({ members: { $in: user.id } });
    // Send response
    res.status(200).json({
        success: true,
        data: groups
    });
});
*/
/*
// @desc    Get all teacher groups
// @route   GET /api/v1/groups/teacher/:id
// @access  Private
exports.getTeacherGroups = asyncHandler(async (req, res, next) => {
    // Check if teacher exists
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(
            new ErrorResponse(`User with id ${userId} does not exists`, 400)
        );
    }
    // Check if authorized
    if(user.id.toString() !== req.params.id.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`Not authorized.`, 401)
        );
    }
    // Find groups
    const groups = await Group.find({ owner: user.id });
    // Send response
    res.status(200).json({
        success: true,
        data: groups
    });
});
*/
// TEST
// @desc    Get groups
// @route   GET /api/v1/auth/groups
// @access  Public
// exports.getGroups = asyncHandler(async (req, res, next) => {
//     const groups = await Group.find().populate('owner');
//     res.status(200).json({
//         success: true,
//         count: groups.length,
//         data: groups
//     });
// });
