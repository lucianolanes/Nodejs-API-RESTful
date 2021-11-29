const express = require('express');
const { createNewUser, login } = require('../controllers/userControllers');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', createNewUser);

app.post('/login', login);

module.exports = app;
