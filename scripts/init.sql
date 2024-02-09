USE umbracledb;

INSERT INTO
    `user` (
        idUsers, added_on, first_name, last_name, membership, email, subscriber, telephone, address, city, how_meet_us, dni, birth_date, `role`, password
    )
VALUES (
        1, '2024-02-09 11:15:06.357519', 'Admin', 'Testing', NULL, 'testemail@testemail.com', 0, 34666666666, NULL, 'Ithaca', NULL, NULL, NULL, 'admin', '12345678'
    );