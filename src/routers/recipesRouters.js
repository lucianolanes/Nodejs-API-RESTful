const express = require('express');
const validateJWT = require('../middlewares/validateJWT');
const {
  postNewRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
} = require('../controllers/recipesControllers');

const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getRecipe);

router.use('/', validateJWT);

router.post('/', postNewRecipe);

router.put('/:id', editRecipe);

router.delete('/:id', deleteRecipe);

module.exports = router;