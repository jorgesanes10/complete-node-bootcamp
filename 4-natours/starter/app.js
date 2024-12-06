const express = require('express');
const morgan = require('morgan');
const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  res.header('X-JAS', 'something');

  next();
});

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
