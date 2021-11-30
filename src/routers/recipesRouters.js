const express = require('express');
const validateJWS = require('../middlewares/validateJWS');
const { postNewRecipe } = require('../controllers/recipesControllers');

const router = express.Router();

router.use('/', validateJWS);

router.post('/', postNewRecipe);

module.exports = router;