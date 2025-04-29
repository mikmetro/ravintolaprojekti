
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE IF NOT EXISTS users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(50),
    role ENUM('admin', 'customer'),
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER,
    country VARCHAR(100),
    city VARCHAR(100),
    postalcode VARCHAR(20),
    street VARCHAR(255),
    door_code VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER,
    country VARCHAR(100),
    city VARCHAR(100),
    postalcode VARCHAR(20),
    street VARCHAR(255),
    door_code VARCHAR(50),
    sub_total DECIMAL(10,2),
    discount DECIMAL(10,2),
    fee DECIMAL(10,2),
    total DECIMAL(10,2),
    type ENUM('delivery', 'pickup'),
    status ENUM('pending', 'paid', 'preparing', 'delivering', 'completed', 'cancelled'),
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(1000),
    category INTEGER,
    price DECIMAL(10,2),
    status ENUM('active', 'inactive')
);

CREATE TABLE IF NOT EXISTS order_item (
    order_item_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    order_id INTEGER,
    item_id INTEGER,
    quantity INTEGER,
    item_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    status ENUM('active', 'inactive')
);


-- Categories
INSERT INTO categories (name, status) VALUES 
('Pizza', 'active'), 
('Drinks', 'active'), 
('Desserts', 'active'),
('Sale', 'inactive');

-- Items
INSERT INTO items (name, description, category, price, status) VALUES 
('Margherita Pizza', 'Classic pizza with tomato sauce and mozzarella', 1, 9.99, 'active'),
('Pepperoni Pizza', 'Spicy pepperoni with cheese', 1, 11.49, 'active'),
('Coca Cola', '330ml can of Coca Cola', 2, 1.99, 'active'),
('Chocolate Cake', 'Rich chocolate layered cake', 3, 4.50, 'active'),
('Lemonade', 'Freshly squeezed lemonade', 2, 2.49, 'inactive'),
('fdfdssdf', 'Ffsdfdssemonade', 4, 1.49, 'active');
