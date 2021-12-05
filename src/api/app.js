const express = require('express');
const path = require('path');
const { login } = require('../controllers/usersControllers');
const recipesRouter = require('../routers/recipesRouter');
const usersRouter = require('../routers/usersRouter');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.resolve(__dirname, '../uploads')));

app.post('/login', login);

app.use('/users', usersRouter);

app.use('/recipes', recipesRouter);

app.use(errorMiddleware);

module.exports = app;
