const express = require('express');
const validateJWS = require('../middlewares/validateJWS');
const { postNewRecipe, getAllRecipes, getRecipe } = require('../controllers/recipesControllers');

const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getRecipe);

router.use('/', validateJWS);

router.post('/', postNewRecipe);

module.exports = router;