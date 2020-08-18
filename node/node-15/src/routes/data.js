const { Router } = require('express');
const cache = require('../middlware/cache');
const { getData } = require('../controllers/data');

const router = Router();

router.get('/', cache, getData);

module.exports = router;
