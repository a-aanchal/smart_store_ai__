-- Database schema reference (MongoDB style but shown as SQL-like for clarity)

-- Users
CREATE TABLE users (
  _id VARCHAR(24) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  passwordHash TEXT,
  role VARCHAR(50),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- Products
CREATE TABLE products (
  _id VARCHAR(24) PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  stock INT,
  images JSON,
  metadata JSON,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- Orders
CREATE TABLE orders (
  _id VARCHAR(24) PRIMARY KEY,
  userId VARCHAR(24) REFERENCES users(_id),
  items JSON,
  total DECIMAL(10,2),
  status VARCHAR(50),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- Notes: In the actual project these are MongoDB collections. The above is a relational-style
-- representation for documentation and ER-diagram generation.

