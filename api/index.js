const express = require('express');
const router = express.Router();

// ROUTER: /api/carts
router.use('/carts', require('./carts'));

// ROUTER: /api/products
router.use('/products', require('./products'));

// ROUTER: /api/users
router.use('/users', require('./users'));

module.exports = router;
