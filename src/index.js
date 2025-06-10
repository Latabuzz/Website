const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/database');

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to my Node.js application!');
});

// Example query to test the connection with MySQL 8.0.30
db.execute('SELECT VERSION() AS mysql_version, 1 + 1 AS result', (err, results) => {
  if (err) {
    console.error('Query error:', err);
    return;
  }
  console.log('MySQL Version:', results[0].mysql_version);
  console.log('Test query result:', results[0].result);
});

// Example function to create a simple table optimized for MySQL 8.0.30
function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `;
  
  db.execute(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Users table created or already exists');
  });
}

// Contoh query SELECT
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Call the function to create table
createUsersTable();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown for MySQL 8.0.30
process.on('SIGINT', () => {
  console.log('Closing MySQL 8.0.30 connection pool...');
  db.end(() => {
    console.log('MySQL connection pool closed.');
    process.exit(0);
  });
});