const express = require('express');
const { createNewUser } = require('../controllers/userControllers');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', createNewUser);

module.exports = app;
