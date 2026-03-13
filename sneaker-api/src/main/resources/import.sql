-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

-- Users
INSERT INTO users (userid, email, passwordhash, firstname, lastname, role, createdat) 
VALUES ('test-user-id-1234', 'test@gmail.com', '$2a$10$aRXAfjvA/RZ3aYoG5GJFrursSK9em90TVYMCkhAEQEr9EWiWb/A0G', 'Test', 'User', 1, NOW());

INSERT INTO users (userid, email, passwordhash, firstname, lastname, role, createdat) 
VALUES ('admin-1234', 'admin@gmail.com', '$2a$10$aRXAfjvA/RZ3aYoG5GJFrursSK9em90TVYMCkhAEQEr9EWiWb/A0G', 'Admin', 'User', 0, NOW());

-- Category
INSERT INTO t_category (name)
VALUES ('Lifestyle');

-- Product
INSERT INTO t_product (categoryid, product_name, description, price, isActive)
VALUES (1, 'Nike Air Force 1', 'Classic Nike sneaker', 129.00, true);

-- ProductVariants
INSERT INTO t_product_variant (product_id, size, color, priceoverride)
VALUES (1, '42', 'White', 129.00);

INSERT INTO t_product_variant (product_id, size, color, priceoverride)
VALUES (1, '42', 'Black', 129.00);

-- Orders
INSERT INTO t_order (userid, status, totalamount, createdat)
VALUES ('test-user-id-1234', 'DELIVERED', 1399.95, NOW());

INSERT INTO t_order (userid, status, totalamount, createdat)
VALUES ('test-user-id-1234', 'DELIVERED', 1399.95, NOW());

INSERT INTO t_order (userid, status, totalamount, createdat)
VALUES ('test-user-id-1234', 'DELIVERED', 1399.95, NOW());

-- OrderItems
INSERT INTO orderitem (order_id, variantid, quantity, price)
VALUES (1, 1, 1, 129.00);

INSERT INTO orderitem (order_id, variantid, quantity, price)
VALUES (1, 2, 2, 129.00);

-- Inventory
INSERT INTO t_product (productId, product_name, description, price, isActive, img)
VALUES (1, 'Sneaker Classic', 'En klassisk sneaker', 120, true, '/sneaker2.png');

INSERT INTO t_product_variant (variantId, product_id, size, color)
VALUES (1, 1, '42', 'White');

INSERT INTO inventory (inventoryId, variantId, stockQty, reservedQty)
VALUES (1, 1, 10, 0);