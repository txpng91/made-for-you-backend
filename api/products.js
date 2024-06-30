const express = require('express');
const router = express.Router();

// Import DB Functions
const {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
} = require('../db/products');

// Post a product
router.post('/', async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.json(newProduct);
  } catch (error) {
    console.error(error.message);
  }
});

// GET /v1/api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await getAllProducts(); //Get function from DB
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
});

// GET /v1/api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id); //Get function from DB
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// PUT /v1/api/products/:id
router.put('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
