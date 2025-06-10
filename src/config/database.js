const mysql = require('mysql2');

// Konfigurasi koneksi dengan environment variables untuk production
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'web_desa_db',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Buat pool koneksi
const pool = mysql.createPool(dbConfig);

// Cek koneksi
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    console.error('Pastikan:');
    console.error('1. XAMPP/Laragon MySQL sudah running');
    console.error('2. Database "web_desa_db" sudah dibuat di phpMyAdmin');
    console.error('3. Port 3306 tidak digunakan aplikasi lain');
    return;
  }
  if (connection) {
    console.log('✅ Berhasil terhubung ke database Web Desa!');
    connection.release();
  }
});

// Fungsi helper untuk query database dengan error handling yang lebih baik
const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.execute(query, params, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        // Log query untuk debugging
        console.error('Failed query:', query);
        console.error('Query params:', params);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Fungsi untuk graceful shutdown
const closeConnection = () => {
  return new Promise((resolve, reject) => {
    pool.end((err) => {
      if (err) {
        console.error('Error closing database connection:', err);
        reject(err);
      } else {
        console.log('Database connection closed.');
        resolve();
      }
    });
  });
};

// Handle process termination
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Gracefully shutting down...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Gracefully shutting down...');
  await closeConnection();
  process.exit(0);
});

module.exports = {
  pool: pool.promise(),
  executeQuery,
  closeConnection
};
