const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const File = require('../models/File.model');
const path = require('path');

// @desc    Download file
// @route   GET /api/v1/files/download/:id
// @access  Private
exports.downloadFile = asyncHandler(async (req, res, next) => {
  const file = await File.findById(req.params.id);
  if (!file) {
    return next(
      new ErrorResponse(`File not found with id of ${req.params.id}`, 404)
    );
  }
  const filePath = `${path.resolve(__dirname, '..')}${file.path}`;
  res.download(filePath, file.name);
});

exports.getFiles = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
