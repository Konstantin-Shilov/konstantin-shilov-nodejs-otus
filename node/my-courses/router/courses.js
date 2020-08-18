const express = require('express');
const coursesService = require('../services/courses');
const {authChecker} = require('../middleware/authValidator');

module.exports = function() {
  const router = express.Router();

  router.get('/courses/:id', authChecker, async (req, res) => {
    const { id } = req.params;
    const course = await coursesService.getOne(id);

    res.render('pages/course', { course, isAuth: req.isAuth, userName: req.userName });
  });

  router.get('/courses', authChecker, async (req, res, next) => {
    const courses = await coursesService.get();

    res.render('pages/courses', { courses, isAuth: req.isAuth, userName: req.userName });
  });

  return router;
};
