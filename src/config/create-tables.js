const { pool } = require('./database');

async function createTables() {
  try {
    console.log('🔄 Membuat tabel untuk Web Desa...');

    // Tabel untuk data penduduk
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS penduduk (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nik VARCHAR(16) UNIQUE NOT NULL,
        nama VARCHAR(100) NOT NULL,
        alamat TEXT,
        rt VARCHAR(3),
        rw VARCHAR(3),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel untuk berita
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS berita (
        id INT AUTO_INCREMENT PRIMARY KEY,
        judul VARCHAR(200) NOT NULL,
        konten TEXT NOT NULL,
        penulis VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Semua tabel berhasil dibuat!');
    console.log('📋 Tabel: penduduk, berita');

  } catch (error) {
    console.error('❌ Error membuat tabel:', error.message);
  }
}

// Jalankan pembuatan tabel
createTables();
