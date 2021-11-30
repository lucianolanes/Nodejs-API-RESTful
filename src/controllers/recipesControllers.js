const { CREATED } = require('../helpers/httpStatusCodes');
const { createRecipe } = require('../services/recipesServices');

async function postNewRecipe(req, res) {
  const { id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  const post = await createRecipe({ name, ingredients, preparation }, userId);

  if (post.code) return res.status(post.code).json({ message: post.message });

  return res.status(CREATED).json(post);
}

module.exports = {
  postNewRecipe,
};