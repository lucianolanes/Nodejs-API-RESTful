const connection = require('./connection');

const RECIPES = 'recipes';

async function createNewRecipe(recipeData) {
  return connection()
    .then((db) => db.collection(RECIPES)
      .insertOne(recipeData))
    .then((result) => result.ops);
}

async function getAllRecipes() {
  return connection()
    .then((db) => db.collection(RECIPES).find().toArray());
}

module.exports = {
  createNewRecipe,
  getAllRecipes,
};
