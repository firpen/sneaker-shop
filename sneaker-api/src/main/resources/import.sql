-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;
INSERT INTO users (userid, email, passwordhash, firstname, lastname, role, createdat) 
VALUES ('test-user-id-1234', 'test@gmail.com', '$2a$10$aRXAfjvA/RZ3aYoG5GJFrursSK9em90TVYMCkhAEQEr9EWiWb/A0G', 'Test', 'User', 1, NOW());

INSERT INTO t_order (userid, status, totalamount, createdat)
VALUES ('test-user-id-1234', 'DELIVERED', 1399.95, NOW());

INSERT INTO t_order (userid, status, totalamount, createdat)
VALUES ('test-user-id-1234', 'DELIVERED', 1399.95, NOW());

INSERT INTO t_order (userid, status, totalamount, createdat)
VALUES ('test-user-id-1234', 'DELIVERED', 1399.95, NOW());