const { CREATED, OK } = require('../helpers/httpStatusCodes');
const { createRecipe, getRecipes, getRecipeById } = require('../services/recipesServices');

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

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipe,
};