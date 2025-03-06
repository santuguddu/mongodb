const Cart = require('../models/Cart');
const Product = require('../models/Product'); // Import Product model

// ✅ Get all cart items
const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('productId');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Get cart item by ID
const getCartItemById = async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id).populate('productId');
        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Add product to cart
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({ message: 'Invalid product ID or quantity' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        const cartItem = new Cart({ productId, quantity });
        await cartItem.save();

        res.status(201).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Update quantity in cart
const updateCartItem = async (req, res) => {
    const { quantity } = req.body;

    try {
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const cartItem = await Cart.findById(req.params.id);
        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

        const product = await Product.findById(cartItem.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ message: 'Cart updated', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Remove product from cart
const removeFromCart = async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);
        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

        await cartItem.deleteOne();
        res.json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllCartItems, getCartItemById, addToCart, updateCartItem, removeFromCart };
