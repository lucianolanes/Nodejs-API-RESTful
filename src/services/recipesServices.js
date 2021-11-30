const { ObjectId } = require('mongodb');
const { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } = require('../helpers/httpStatusCodes');
const { getEmail } = require('../models/usersModels');
const {
  createNewRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
} = require('../models/recipesModels');

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
  
  const created = await createNewRecipe(recipeData, userId);
  return { recipe: created[0] };
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

 async function validateAndEdit(recipeId, email, recipeData) {
  if (!ObjectId.isValid(recipeId)) return { message: 'recipe not found', code: NOT_FOUND };

  const result = await getRecipe(ObjectId(recipeId));
  if (!result) return { message: 'recipe not found', code: NOT_FOUND };
  
  const userData = await getEmail(email);
  const { _id, role } = userData;
  if (_id.toString() !== result.userId && role !== 'admin') {
    return { message: 'You not have permission', code: UNAUTHORIZED };
  }

  const { name, ingredients, preparation } = recipeData;
  await editRecipe(ObjectId(recipeId), name, ingredients, preparation);
  return { _id: recipeId, name, ingredients, preparation, userId: _id };
 }

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  validateAndEdit,
};