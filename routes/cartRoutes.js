const express = require('express');
const { getAllCartItems, getCartItemById, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/cart', authMiddleware, getAllCartItems); // ✅ Get all cart items
router.get('/cart/:id', authMiddleware, getCartItemById); // ✅ Get cart item by ID
router.post('/cart', authMiddleware, addToCart);
router.put('/cart/:id', authMiddleware, updateCartItem);
router.delete('/cart/:id', authMiddleware, removeFromCart);

module.exports = router;
