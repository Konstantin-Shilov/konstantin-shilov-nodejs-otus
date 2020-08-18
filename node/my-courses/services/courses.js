const Course = require('../models/courses');

const get = async () => {
  return await Course.find();
};

const getOne = async id => {
  const course = await Course.findById(id).populate('lessons');
  if (!course) {
    throw new Error(`Course not found with id of ${id}`);
  }
  return course;
};

const createCourse = async data => {
  return await Course.create(data);
};

const updateCourse = async (id, data) => {
  const course = await Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    throw new Error(`Course not found with id of ${id}`);
  }
  return course;
};

const deleteCourse = async id => {
  const course = await Course.findById(id);
  if (!course) {
    throw new Error(`Course not found with id of ${id}`);
  }
  course.remove();
};

module.exports = {
  get,
  getOne,
  createCourse,
  updateCourse,
  deleteCourse
};
