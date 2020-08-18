require('dotenv').config();

const yargs = require('yargs');
const mongoose = require('mongoose');

const courses = require('./data/courses.json');
const lessons = require('./data/lessons.json');
const users = require('./data/users.json');

const Course = require('../models/courses');
const Lesson = require('../models/lessons');
const User = require('../models/users');

const withMongo = async fn => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    await fn();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

const create = async () => {
  await User.create(users);
  await Course.create(courses);
  await Lesson.create(lessons);
  console.log('Data Created...');
};

const remove = async () => {
  await User.deleteMany();
  await Course.deleteMany();
  await Lesson.deleteMany();
  console.log('Data Deleted...');
};

const { argv } = yargs
  .command('create', 'Fill database', () => withMongo(create))
  .command('delete', 'Clear database', () => withMongo(remove))
  .alias('h', 'help')
  .help();