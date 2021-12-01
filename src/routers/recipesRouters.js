const express = require('express');
const path = require('path');

const validateJWT = require('../middlewares/validateJWT');
const validateUploadPermission = require('../middlewares/validateUploadPermission');
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

router.put('/:id', editRecipe);

router.delete('/:id', deleteRecipe);

router.use(express.static(path.resolve(__dirname, 'uploads')));

router.put('/:id/image', validateUploadPermission, uploadFile.single('image'), putImage);

module.exports = router;