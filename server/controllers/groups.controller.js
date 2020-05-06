const Group = require('../models/Group.model');
const User = require('../models/User.model');
const Invitation = require('../models/Invitation.model');
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
        return next(
            new ErrorResponse(`Not authorized to delete this group.`, 401)
        );
    }
    // Delete all invitations to the group
    const invitations = await Invitation.find({ group: group.id });
    invitations.forEach(async (invitation) => {
        await invitation.remove();
    });
    // Delete group
    await group.remove();
    // Send response
    res.status.json({
        success: true,
        data: {}
    });
});

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