const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) =>
  Object.keys(obj).reduce((acc, current) => {
    if (allowedFields.includes(current) && obj[current] !== undefined) {
      acc[current] = obj[current];
    }

    return acc;
  }, {});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;

  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Use /updateMyPassword instead',
        400,
      ),
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
