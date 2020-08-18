const createError = require('http-errors');

function catch404 (req, res, next) {
  next(createError(404));
}

const sendError = (req, res) => (status, error) => {
  res.status(status);
  if (req.headers['content-type'] === 'application/json') {
    res.send({ error: error.message });
  } else {
    console.warn('status', status);
    res.render('error', { status, error: error.message });
  }
};

function errorHandler (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === 'MongoError') {
    sendError(400, err);
    return;
  }

  console.warn(err);
  sendError(500, err);
}

module.exports = {
  catch404,
  errorHandler
};
