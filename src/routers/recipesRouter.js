const express = require('express');

const validateJWT = require('../middlewares/validateJWT');
const validateUserPermission = require('../middlewares/validateUserPermission');
const uploadFile = require('../middlewares/uploadFile');

const {
  postNewRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  putImage,
} = require('../controllers/recipesControllers');

const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getRecipe);

router.use('/', validateJWT);

router.post('/', postNewRecipe);

router.use('/:id', validateUserPermission);

router.put('/:id', editRecipe);

router.delete('/:id', deleteRecipe);

router.put('/:id/image', uploadFile.single('image'), putImage);

module.exports = router;