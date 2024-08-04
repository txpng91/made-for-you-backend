const express = require('express');
const router = express.Router();

// Import DB Functions
const {
  getAllCarts,
  getCartByUserId,
  createCart,
  updateCart,
} = require('../db/carts');

// GET /api/carts = PUBLIC
router.get('/', async (req, res, next) => {
  try {
    const carts = await getAllCarts();
    res.json(carts);
  } catch (error) {
    next(error);
  }
});

// GET /api/carts/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cart = await getCartByUserId(userId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// POST /api/carts
router.post('/', async (req, res, next) => {
  try {
    const { id } = req.body;
    const newCart = await createCart(id);
    res.json(newCart);
  } catch (error) {
    next(error);
  }
});

// PUT /api/carts/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { products } = req.body;
    const updatedCart = await updateCart(userId, products);
    res.json(updatedCart); //updatedCart;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
