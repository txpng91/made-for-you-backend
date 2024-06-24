const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); //What creates a JSON Web Token
const { JWT_SECRET = 'neverTell' } = process.env;

// Get functions from DB
const {
  createUser,
  getUser,
  getUserByUsername,
  getUsers, // FOR POSTMAN USE ONLY DELETE BEFORE DEPLOYMENT
  getUserById,
} = require('../db/users');

// Register a New User
// /v1/api/users/sign-up
router.post('/sign-up', async (req, res, next) => {
  try {
    const { firstname, lastname, username, password, telephone } = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: 'PasswordLengthError',
        message: 'Password Too Short!',
      });
    } else {
      const user = await createUser({
        firstname,
        lastname,
        username,
        password,
        telephone,
      });
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        });
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: '1w' }
        );
        res.send({ user, message: "you're signed up!", token });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Get all users: FOR POSTMAN USE ONLY DELETE BEFORE DEPLOYMENT
router.get('/', async (req, res) => {
  try {
    const allUsers = await getUsers();
    res.json(allUsers);
  } catch (error) {
    console.error(error.message);
  }
});

// Get User
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.json(user);
  } catch (error) {
    console.error(error.message);
  }
});

// Login a User
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  // Conditions moving forward
  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password',
    });
  }

  // Then continue with the login process
  try {
    const user = await getUser({ username, password });
    if (!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1w' }
      );
      // Return response
      res.send({ user, message: "you're logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
