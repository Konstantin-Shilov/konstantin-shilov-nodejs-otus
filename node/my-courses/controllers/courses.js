const asyncHandler = require('../middleware/asyncHandler');
const service = require('../services/courses');

const getCourses = asyncHandler(async (req, res, next) => {
  const courses = await service.get();
  res.status(200).json({ success: true, data: courses });
});

const getCourse = asyncHandler(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.status(200).json({ success: true, data: course });
});

const createCourse = asyncHandler(async (req, res, next) => {
  const course = await service.create(req.body);
  res.status(201).json({
    success: true,
    msg: `Course created`,
    data: course,
  });
});

const updateCourse = asyncHandler(async (req, res, next) => {
  const course = await service.update(req.params.id, req.body);
  res.status(201).json({
    success: true,
    msg: `Course updated`,
    data: course,
  });
});

const deleteCourse = asyncHandler(async (req, res, next) => {
  await service.delete(req.params.id);
  res.status(200).json({ success: true, msg: 'Course deleted', data: {} });
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
};
