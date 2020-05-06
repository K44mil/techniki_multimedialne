const Group = require('../models/Group.model');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Create group
// @route   POST /api/v1/auth/groups
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
// @route   DELETE /api/v1/auth/groups/:id
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
    // Delete group
    await group.remove();
    // Send response
    res.status.json({
        success: true,
        data: {}
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