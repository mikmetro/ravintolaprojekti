
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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



-- users
INSERT INTO users (email, password, name, phone, role, created_at) VALUES
('anna.virtanen@example.com', 'hashedpassword1', 'Anna Virtanen', '+358401112233', 'customer', '2024-11-20 12:15:00'),
('jukka.makinen@example.com', 'hashedpassword2', 'Jukka Mäkinen', '+358402223344', 'customer', '2025-01-05 08:00:00'),
('laura.laine@example.com', 'hashedpassword3', 'Laura Laine', '+358403334455', 'customer', '2025-02-14 10:45:00'),
('mikko.niemi@example.com', 'hashedpassword4', 'Mikko Niemi', '+358404445566', 'admin', '2025-03-10 16:20:00'),
('sari.korhonen@example.com', 'hashedpassword5', 'Sari Korhonen', '+358405556677', 'customer', '2025-04-02 09:35:00');



-- orders
INSERT INTO orders (
    user_id, country, city, postalcode, street, door_code,
    sub_total, discount, fee, total,
    type, status, created_at
) VALUES
-- Order 1: Delivery, paid
(1, 'Finland', 'Helsinki', '00100', 'Mannerheimintie 12', 'A12',
 35.00, 5.00, 3.50, 33.50, 'delivery', 'paid', '2025-05-05 02:03:00'),

-- Order 2: Pickup, completed
(2, 'Finland', 'Espoo', '02150', 'Länsiväylä 88', NULL,
 22.00, 0.00, 0.00, 22.00, 'pickup', 'completed', '2025-05-05 02:00:00'),

-- Order 3: Delivery, cancelled
(3, 'Finland', 'Vantaa', '01300', 'Tikkurilantie 30', 'B2',
 18.50, 2.50, 3.00, 19.00, 'delivery', 'cancelled', '2025-05-05 00:25:20'),

-- Order 4: Delivery, pending
(4, 'Finland', 'Tampere', '33100', 'Hämeenkatu 55', NULL,
 42.00, 0.00, 4.00, 46.00, 'delivery', 'pending', '2025-05-05 01:50:00'),

-- Order 5: Pickup, preparing
(1, 'Finland', 'Helsinki', '00500', 'Sturenkatu 16', NULL,
 30.00, 0.00, 0.00, 30.00, 'pickup', 'preparing', '2025-05-04 23:00:00'),

-- Order 6: Delivery, delivering
(5, 'Finland', 'Turku', '20100', 'Yliopistonkatu 4', 'C4',
 27.00, 3.00, 2.50, 26.50, 'delivery', 'delivering', '2025-05-04 19:45:00');


 -- order_item
INSERT INTO order_item (order_id, item_id, quantity, item_price) VALUES
(1, 1, 2, 9.99),    -- 2x Margherita Pizza in order 1
(1, 3, 2, 1.99),    -- 2x Coca Cola in order 1

(2, 2, 1, 11.49),   -- 1x Pepperoni Pizza in order 2
(2, 4, 1, 4.50),    -- 1x Chocolate Cake in order 2

(3, 3, 3, 1.99),    -- 3x Coca Cola in order 3
(3, 4, 2, 4.50),    -- 2x Chocolate Cake in order 3

(4, 1, 1, 9.99),    -- 1x Margherita Pizza in order 4
(4, 6, 1, 1.49),    -- 1x fdfdssdf (category 4) in order 4

(5, 2, 2, 11.49),   -- 2x Pepperoni Pizza in order 5
(5, 5, 1, 2.49);    -- 1x Lemonade (inactive) in order 5