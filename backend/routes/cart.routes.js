const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cart.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Apply auth middleware to all cart endpoints
router.use(authenticate);

router.route('/')
  .get(getCart)
  .post(addToCart)
  .put(updateCartItem)
  .delete(clearCart);

router.route('/:productId')
  .delete(removeFromCart);

module.exports = router;
