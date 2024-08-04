const client = require('./index');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createUser({
  firstname,
  lastname,
  username,
  password,
  telephone,
}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(firstname, lastname, username, password, telephone) VALUES ($1, $2, $3, $4, $5) 
        RETURNING id, username
      `,
      [firstname, lastname, username, hashedPassword, telephone]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  // first get the user
  try {
    const { rows } = await client.query(
      `SELECT * FROM users WHERE username = $1;`,
      [userName]
    );
    // if it doesn't exist, return null
    if (!rows || !rows.length) return null;
    // if it does:
    // delete the 'password' key from the returned object
    const [user] = rows;
    // delete user.password;
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

// FOR POSTMAN USE ONLY DELETE BEFORE DEPLOYMENT
async function getUsers() {
  try {
    const { rows } = await client.query(`SELECT * FROM users ORDER BY id`);
    delete rows.password;
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query('SELECT * FROM users WHERE users.id = $1', [id]);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserById,
  getUserByUsername,
};
