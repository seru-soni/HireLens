const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Only allow updating safe fields: name and avatar
    if (req.body.name !== undefined) {
      const trimmedName = req.body.name.trim();
      if (!trimmedName) {
        return res.status(400).json({
          success: false,
          message: 'Name cannot be empty.',
        });
      }
      user.name = trimmedName;
    }

    if (req.body.avatar !== undefined) {
      user.avatar = req.body.avatar.trim();
    }

    // Explicitly do NOT allow role, password hash, createdAt, or email manipulation here
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
