const { CREATED, OK } = require('../helpers/httpStatusCodes');

const {
  createRecipe,
  getRecipes,
  getRecipeById,
  validateAndEdit,
  validateAndDelete,
  upload,
} = require('../services/recipesServices');

async function postNewRecipe(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { name, ingredients, preparation } = req.body;
    const post = await createRecipe({ name, ingredients, preparation }, userId);

    return res.status(CREATED).json(post);
  } catch (err) {
    next(err);
  }
}
async function getAllRecipes(req, res, next) {
  try {
    const recipes = await getRecipes();
    
    return res.status(OK).json(recipes);
  } catch (err) {
    next(err);
  }
}

async function getRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(id);

    return res.status(OK).json(recipe);
  } catch (err) {
    next(err);
  }
}

async function editRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { email } = req.user;
    const result = await validateAndEdit(id, email, { name, ingredients, preparation });

    return res.status(OK).json(result);
  } catch (err) {
    next(err);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    await validateAndDelete(id, email);

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function putImage(req, res, next) {
  try {
  const { id } = req.params;
  const result = await upload(id);
  
  return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  putImage,
};