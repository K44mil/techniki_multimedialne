const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User.model');

// @desc    Register user
// @route   POST /api/v1/auth/register
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
  res.status(200).json({
    success: true,
    token
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validation email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password.', 400));
  }
  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials.', 401));
  }
  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new ErrorResponse('Invalid credentials.', 401));
  }
  // Create token
  const token = user.getSignedJwtToken();
  // Send response
  res.status(200).json({
    success: true,
    token
  });
});

// @desc    Get current logged user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});
