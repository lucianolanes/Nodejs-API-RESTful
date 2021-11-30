const connection = require('./connection');

const RECIPES = 'recipes';

async function createNewRecipe(recipeData, userId) {
  return connection()
    .then((db) => db.collection(RECIPES)
      .insertOne({ ...recipeData, userId }))
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

async function editRecipe(id, name, ingredients, preparation) {
  return connection()
    .then((db) => db.collection(RECIPES)
      .updateOne({ _id: id }, { $set: { name, ingredients, preparation } }));
}

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
};
