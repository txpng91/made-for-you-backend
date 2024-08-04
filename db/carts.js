const client = require('./index');

// Get all carts
async function getAllCarts() {
  try {
    const { rows } = await client.query(`SELECT * FROM carts ORDER BY id`);
    return rows;
  } catch (error) {
    console.error(error.message);
  }
}

// Get all carts
async function getCartByUserId(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(`SELECT * FROM carts WHERE userId=$1;`, [userId]);
    return cart;
  } catch (error) {
    console.error(error.message);
  }
}

// Create a cart
async function createCart(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `INSERT INTO carts (userid, products) VALUES ($1, '[]') RETURNING *`,
      [id]
    );
    return cart;
  } catch (error) {
    console.error(error.message);
  }
}

// Update products array from user's cart
async function updateCart(userId, products) {
  try {
    const {
      rows: [updatedCart],
    } = await client.query(
      `UPDATE carts SET products = $2 WHERE userid=$1 RETURNING *;`,
      [userId, JSON.stringify(products)] // NOTE: Stringify the array when updating the object
    );
    return updatedCart;
  } catch (error) {
    throw error;
  }
}

module.exports = { getAllCarts, getCartByUserId, createCart, updateCart };
