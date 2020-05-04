const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User.model');

// @desc    Register user
// @route   GET /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { email, password, role, firstName, lastName } = req.body;
    // Create user
    const user = await User.create({
        email,
        password,
        role,
        firstName,
        lastName
    });
    // Create token
    const token = user.getSignedJwtToken();
    // Send response
    res
        .status(200)
        .json({ 
            success: true,
            token
         });
});
