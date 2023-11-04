const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const appRoute = require('./routes/index');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('then');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({ origin: 'https://mesto.nomoredomainsmonster.ru', credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(requestLogger);

app.use(appRoute);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
