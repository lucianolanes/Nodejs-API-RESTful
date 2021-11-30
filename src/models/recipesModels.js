const connection = require('./connection');

const RECIPES = 'recipes';

async function createNewRecipe(recipeData) {
  return connection()
    .then((db) => db.collection(RECIPES)
      .insertOne(recipeData))
    .then((result) => result.ops);
}

module.exports = {
  createNewRecipe,
};
