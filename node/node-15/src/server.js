const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const receivedData = require('./routes/data');
const errorHandler = require('./middlware/error');

const app = express();

app.use(bodyParser.json());

const mode = process.env.NODE_ENV;
const port = process.env.PORT;

if (mode === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 300,
});
app.use(limiter);
app.use(cors());

app.use(receivedData);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${mode} mode on port ${port}`);
});
