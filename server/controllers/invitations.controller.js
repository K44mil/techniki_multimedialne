const Invitation = require('../models/Invitation.model');
const User = require('../models/User.model');
const Group = require('../models/Group.model');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Create invitation
// @route   POST /api/v1/auth/invitations
// @access  Private
exports.createInvitation = asyncHandler(async (req, res, next) => {
    const { userId, groupId } = req.body;
    // Check if user exists
    const user = await User.findById(userId);
    if(!user) {
        return next(
            new ErrorResponse(`User with id ${userId} does not exists`, 400)
        );
    }
    // Check if group exists
    const group = await Group.findById(groupId);
    if(!group) {
        return next(
            new ErrorResponse(`Group with id ${groupId} does not exists`, 400)
        );
    }
    // Check if the invitator is a group owner
    if(group.owner.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse('Not authorized.', 401)
        );
    }
    // Check if invitation exists
    let invitation = await Invitation.find({
        isActive: true,
        user: user.id,
        group: group.id
    });
    if(invitation) {
        return next(
            new ErrorResponse(`User with id ${user.id} is already invited to group with id ${group.id}.`, 400)
        );
    }
    // Check if user already is a member of a group
    if(group.members.includes(user.id)) {
        return next(
            new ErrorResponse(`User with id ${user.id} is already a member of a group with id ${group.id}`, 400)
        );
    }
    // Create invitation
    invitation = await Invitation.create({
        user: user.id,
        group: group.id
    });
    // Send response
    res.status(200).json({
        success: true,
        data: invitation
    });
});

// @desc    Accept invitation
// @route   GET /api/v1/invitations/:id/accept
// @access  Private
exports.acceptInvitation = asyncHandler(async (req, res, next) => {
    const invitation = await Invitation.findById(req.params.id);
    const user = req.user;
    // Check if invitation exists
    if(!invitation) {
        return next(
            new ErrorResponse(`Invitation with id ${req.params.id} does not exists`, 400)
        );
    }
    // Check if authorized
    if(invitation.user.toString() !== user.id.toString() && user.role !== 'admin') {
        return next(
            new ErrorResponse('Not authorized.', 401)
        );
    }
    // Check if invitation is active
    if(!invitation.isActive) {
        return next(
            new ErrorResponse(`Invitation with id ${invitation.id} is inactive.`, 401)
        );
    }
    // Check if the group exists
    const group = await Group.findById(invitation.group);
    if(!group) {
        return next(
            new ErrorResponse(`Group with id ${invitation.group} does not exists`, 400)
        );
    }
    // Add user to group
    group.members.push(user.id);
    await group.save();
    // Change invitation property 
    invitation.isActive = false;
    await invitation.save();
    // Send response 
    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Reject invitation
// @route   GET /api/v1/invitations/:id/reject
// @access  Private
exports.rejectInvitation = asyncHandler(async (req, res, next) => {
    const invitation = await Invitation.findById(req.params.id);
    const user = req.user;
    // Check if invitation exists
    if(!invitation) {
        return next(
            new ErrorResponse(`Invitation with id ${req.params.id} does not exists`, 400)
        );
    }
    // Check if authorized
    if(invitation.user.toString() !== user.id.toString() && user.role !== 'admin') {
        return next(
            new ErrorResponse('Not authorized.', 401)
        );
    }
    // Check if invitation is active
    if(!invitation.isActive) {
        return next(
            new ErrorResponse(`Invitation with id ${invitation.id} is inactive.`, 401)
        );
    }
    // Reject invitation
    invitation.isActive = false;
    invitation.isRejected = true;
    await invitation.save();
    // Send response
    res.status(200).json({
        success: true,
        data: {}
    });
});