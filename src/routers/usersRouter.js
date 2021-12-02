const express = require('express');

const { createNewUser, createNewAdmin } = require('../controllers/usersControllers');

const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', createNewUser);

router.post('/admin', validateJWT, createNewAdmin);

module.exports = router;