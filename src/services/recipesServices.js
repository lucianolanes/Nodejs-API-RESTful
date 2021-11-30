const { createNewRecipe, getAllRecipes } = require('../models/recipesModels');
const { BAD_REQUEST } = require('../helpers/httpStatusCodes');

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

module.exports = {
  createRecipe,
  getRecipes,
};