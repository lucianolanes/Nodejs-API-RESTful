const express = require('express');
const validateJWS = require('../middlewares/validateJWS');
const { postNewRecipe, getAllRecipes } = require('../controllers/recipesControllers');

const router = express.Router();

router.get('/', getAllRecipes);

router.use('/', validateJWS);

router.post('/', postNewRecipe);

module.exports = router;