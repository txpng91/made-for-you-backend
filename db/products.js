const client = require('./index');

// Get all products
async function getAllProducts() {
  try {
    const { rows } = await client.query(`SELECT * FROM products ORDER BY id`);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get all products by id
async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(` SELECT * FROM products WHERE id=${productId}`);
    return product;
  } catch (error) {
    throw error;
  }
}

async function createProduct(body) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `INSERT INTO products (title, price, description, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [body.title, body.price, body.description, body.category, body.image]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(productId, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(',');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `UPDATE products SET ${setString} WHERE id=${productId} RETURNING *`,
      Object.values(fields)
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
