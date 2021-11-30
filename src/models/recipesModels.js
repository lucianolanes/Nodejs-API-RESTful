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

async function getRecipe(id) {
  return connection()
    .then((db) => db.collection(RECIPES).findOne({ _id: id }));
}

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipe,
};
