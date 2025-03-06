const Product = require('../models/Product');

// ✅ Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// ✅ Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// ✅ Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;

        if (!name || !price || !description || stock === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = new Product({ name, price, description, stock });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product' });
    }
};

// ✅ Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, stock },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product' });
    }
};

// ✅ Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };
