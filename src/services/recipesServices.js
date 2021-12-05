const { ObjectId } = require('mongodb');
const { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } = require('../helpers/httpStatusCodes');
const { getEmail } = require('../models/usersModels');
const ValidationException = require('../exceptions/validationException');

const {
  createNewRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  uploadImage,
} = require('../models/recipesModels');

const MESSAGE_NOT_FOUND = 'recipe not found';

function validateRecipeData(recipeData) {
  const { name, ingredients, preparation } = recipeData;
  const message = 'Invalid entries. Try again.';
  if (!name || !ingredients || !preparation) {
    throw new ValidationException(message, BAD_REQUEST);
  }
}

async function createRecipe(recipeData, userId) {
  validateRecipeData(recipeData);
  
  const created = await createNewRecipe(recipeData, userId);
  return { recipe: created[0] };
}

async function getRecipes() {
 return getAllRecipes();
}

async function getRecipeById(id) {
  if (!ObjectId.isValid(id)) throw new ValidationException(MESSAGE_NOT_FOUND, NOT_FOUND);

  const result = await getRecipe(ObjectId(id));
  if (!result) throw new ValidationException(MESSAGE_NOT_FOUND, NOT_FOUND);

  return result;
}

 async function verifyPermission(recipeId, email) {
  if (!ObjectId.isValid(recipeId)) throw new ValidationException(MESSAGE_NOT_FOUND, NOT_FOUND);

  const result = await getRecipe(ObjectId(recipeId));
  if (!result) throw new ValidationException(MESSAGE_NOT_FOUND, NOT_FOUND);

  const userData = await getEmail(email);
  const { _id, role } = userData;

  if (_id.toString() !== result.userId && role !== 'admin') {
    throw new ValidationException('You not have permission', UNAUTHORIZED);
  }

  return _id;
}

 async function validateAndEdit(recipeId, email, recipeData) {
  const { name, ingredients, preparation } = recipeData;
  const userId = await getEmail(email);
  await editRecipe(ObjectId(recipeId), name, ingredients, preparation);

  return { _id: recipeId, name, ingredients, preparation, userId };
 }

 async function validateAndDelete(recipeId) {
  return deleteRecipe(ObjectId(recipeId));
 }

 async function upload(recipeId) {
  await uploadImage(ObjectId(recipeId));
  return getRecipeById(ObjectId(recipeId));
}

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  validateAndEdit,
  validateAndDelete,
  upload,
  verifyPermission,
};