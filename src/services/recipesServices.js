const { ObjectId } = require('mongodb');
const { createNewRecipe, getAllRecipes, getRecipe } = require('../models/recipesModels');
const { BAD_REQUEST, NOT_FOUND } = require('../helpers/httpStatusCodes');

function validateRecipeData(recipeData) {
  const { name, ingredients, preparation } = recipeData;
  const message = 'Invalid entries. Try again.';
  if (!name || !ingredients || !preparation) {
    return { message, code: BAD_REQUEST };
  }

  return {};
}

async function createRecipe(recipeData, userId) {
  const validateData = validateRecipeData(recipeData);
  if (validateData.code) return validateData;
  
  const created = await createNewRecipe(recipeData);
  return { recipe: { ...created[0], userId } };
}

async function getRecipes() {
 return getAllRecipes();
}

async function getRecipeById(id) {
  if (!ObjectId.isValid(id)) return { message: 'recipe not found', code: NOT_FOUND };

  const result = await getRecipe(ObjectId(id));
  if (!result) return { message: 'recipe not found', code: NOT_FOUND };
  
  return result;
 }

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};