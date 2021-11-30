const { CREATED, OK } = require('../helpers/httpStatusCodes');
const { createRecipe, getRecipes } = require('../services/recipesServices');

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

module.exports = {
  postNewRecipe,
  getAllRecipes,
};