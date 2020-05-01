// @desc    This is a test response
// @route   GET /api/v1/test
// @access  Public
exports.getTest = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: 'This is test route.' });
}