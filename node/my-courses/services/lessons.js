const Lesson = require('../models/lessons');

const get = async course => {
  return await Lesson.find({ course });
};

const getOne = async id => {
  const lesson = await Lesson.findById(id);
  if (!lesson) {
    throw new Error(`Lesson not found with id of ${id}`);
  }
  return lesson;
};

const createLesson = async data => {
  return await Lesson.create(data);
};

const updateLesson = async (id, data) => {
  const lesson = await Lesson.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!lesson) {
    throw new Error(`Lesson not found with id of ${id}`);
  }
  return lesson;
};

const deleteLesson = async id => {
  const lesson = await Lesson.findById(id);
  if (!lesson) {
    throw new Error(`Lesson not found with id of ${id}`);
  }
  lesson.remove();
};

module.exports = {
  get,
  getOne,
  createLesson,
  updateLesson,
  deleteLesson
};