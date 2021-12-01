const express = require('express');
const path = require('path');
const { createNewUser, login } = require('../controllers/usersControllers');
const recipesRouter = require('../routers/recipesRouters');

const app = express();

app.use('/images', express.static(path.resolve(__dirname, '../uploads')));

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', createNewUser);

app.post('/login', login);

app.use('/recipes', recipesRouter);

module.exports = app;
