import * as mysql from 'mysql2';

import { userData } from './dev/users';

require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3309,
});

// Connect
connection.connect((error) => {
  if (error) {
    console.error('Error when connecting:', error);
    process.exit(1);
  }

  console.log('Connected to the MySQL server');

  // Insert USER data
  connection.query(
    'INSERT INTO user (idUsers, added_on, first_name, last_name, membership, email, subscriber, telephone, address, city, how_meet_us, dni, birth_date, role, password) VALUES ?',
    [userData],
    (error, results) => {
      if (error) {
        console.error('Error when inserting user:', error);
        process.exit(1);
      }

      console.log('User inserted successfully:', results);

      // Close the connection
      connection.end();
    },
  );
});
