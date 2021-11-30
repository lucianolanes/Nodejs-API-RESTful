const express = require('express');
const { createNewUser, login } = require('../controllers/usersControllers');
const recipesRouter = require('../routers/recipesRouters');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', createNewUser);

app.post('/login', login);

app.use('/recipes', recipesRouter);

module.exports = app;
