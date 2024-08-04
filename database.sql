-- Products table
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(80) NOT NULL,
    image VARCHAR(255)
);

-- Users table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(25) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(255) NOT NULL,
    telephone VARCHAR(25) NOT NULL
);

-- Create a user
INSERT INTO users(firstname, lastname, username, password, telephone)
VALUES ('Pete', 'Garcia', 'txpng91', '91Pet@rva', '8042394544');

-- Create a carts table
CREATE TABLE carts(
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES users,
    products JSONB
);

-- Create a new cart inside table
-- INSERT INTO carts (userId, products) VALUES ($1, '[]') RETURNING *

-- How to update an existing cart
-- UPDATE carts SET products = $2 WHERE userid=$1 RETURNING *;,
--       [userId, JSON.stringify(products)]