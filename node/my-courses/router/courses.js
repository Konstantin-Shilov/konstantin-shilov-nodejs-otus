const express = require('express');
const coursesService = require('../services/courses');

module.exports = function() {
  const router = express.Router();

  router.get('/courses/:id', async (req, res) => {
    const { id } = req.params;
    const course = await coursesService.getOne(id);

    res.render('pages/course', { course });
  });

  router.get('/courses', async (req, res, next) => {
    const courses = await coursesService.get();

    res.render('pages/courses', { courses });
  });

  return router;
};
