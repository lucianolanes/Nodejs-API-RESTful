const { CREATED, OK } = require('../helpers/httpStatusCodes');

const {
  createRecipe,
  getRecipes,
  getRecipeById,
  validateAndEdit,
  validateAndDelete,
  upload,
} = require('../services/recipesServices');

async function postNewRecipe(req, res) {
  const { id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  const post = await createRecipe({ name, ingredients, preparation }, userId);

  if (post.code) return res.status(post.code).json({ message: post.message });

  return res.status(CREATED).json(post);
}

async function getAllRecipes(req, res) {
  const recipes = await getRecipes();
  return res.status(OK).json(recipes);
}

async function getRecipe(req, res) {
  const { id } = req.params;
  const recipe = await getRecipeById(id);

  if (recipe.code) return res.status(recipe.code).json({ message: recipe.message });

  return res.status(OK).json(recipe);
}

async function editRecipe(req, res) {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { email } = req.user;
  const result = await validateAndEdit(id, email, { name, ingredients, preparation });

  if (result.code) return res.status(result.code).json({ message: result.message });

  return res.status(OK).json(result);
}

async function deleteRecipe(req, res) {
  const { id } = req.params;
  const { email } = req.user;
  const result = await validateAndDelete(id, email);

  if (result.code) return res.status(result.code).json({ message: result.message });

  return res.status(204).end();
}

async function putImage(req, res) {
  const { id } = req.params;
  const result = await upload(id);
  return res.status(200).json(result);
}

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  putImage,
};