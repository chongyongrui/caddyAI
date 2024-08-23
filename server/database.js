const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'password', // Replace with your MySQL password
    database: 'caddyai', // Replace with your database name
    port: 3306 // Default MySQL port
});

module.exports = pool;

// No need for connection.connect() because createPool handles the connection pooling automatically.
