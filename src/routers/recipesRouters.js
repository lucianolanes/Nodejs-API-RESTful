const express = require('express');
const validateJWT = require('../middlewares/validateJWT');
const {
  postNewRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
} = require('../controllers/recipesControllers');

const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getRecipe);

router.post('/', validateJWT, postNewRecipe);

router.put('/:id', validateJWT, editRecipe);

module.exports = router;