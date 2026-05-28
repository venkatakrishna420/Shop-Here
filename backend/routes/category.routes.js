const express = require('express');
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(createCategory); // In a fully protected app, we would add authenticate/admin check here

router.route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
