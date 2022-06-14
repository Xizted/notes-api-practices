require('dotenv').config();
require('./database/db');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const notesRoute = require('./routes/notes');
const usersRoute = require('./routes/users');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hola Mundo</h1>');
});

app.use('/api/v1/notes', notesRoute);
app.use('/api/v1/users', usersRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
