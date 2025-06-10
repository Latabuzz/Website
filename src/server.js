require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { executeQuery } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, '../public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Health check endpoint untuk deployment
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Web Desa server is running',
    timestamp: new Date().toISOString()
  });
});

// Route utama - Halaman beranda
app.get('/', async (req, res) => {
  try {
    const berita = await executeQuery('SELECT * FROM berita ORDER BY created_at DESC LIMIT 5');
    const totalPenduduk = await executeQuery('SELECT COUNT(*) as total FROM penduduk');
    res.render('index', { 
      title: 'Web Desa - Beranda',
      page: 'home',
      berita: berita,
      totalPenduduk: totalPenduduk[0]?.total || 0
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('index', { 
      title: 'Web Desa - Beranda',
      page: 'home',
      berita: [],
      totalPenduduk: 0
    });
  }
});

// Route berita
app.get('/berita', async (req, res) => {
  try {
    const berita = await executeQuery('SELECT * FROM berita ORDER BY created_at DESC');
    res.render('berita', { 
      title: 'Berita Desa',
      page: 'berita',
      berita: berita 
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('berita', { 
      title: 'Berita Desa',
      page: 'berita',
      berita: [] 
    });
  }
});

// Route data penduduk
app.get('/penduduk', async (req, res) => {
  try {
    const penduduk = await executeQuery('SELECT * FROM penduduk ORDER BY nama ASC');
    res.render('penduduk', { 
      title: 'Data Penduduk',
      page: 'penduduk',
      penduduk: penduduk 
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('penduduk', { 
      title: 'Data Penduduk',
      page: 'penduduk',
      penduduk: [] 
    });
  }
});

// API untuk tambah penduduk
app.post('/api/penduduk', async (req, res) => {
  try {
    const { nik, nama, alamat, rt, rw } = req.body;
    await executeQuery(
      'INSERT INTO penduduk (nik, nama, alamat, rt, rw) VALUES (?, ?, ?, ?, ?)',
      [nik, nama, alamat, rt, rw]
    );
    res.json({ success: true, message: 'Data penduduk berhasil ditambahkan' });
  } catch (error) {
    console.error('Error:', error);
    res.json({ success: false, message: 'Gagal menambah data penduduk' });
  }
});

// API untuk tambah berita
app.post('/api/berita', async (req, res) => {
  try {
    const { judul, konten, penulis } = req.body;
    await executeQuery(
      'INSERT INTO berita (judul, konten, penulis) VALUES (?, ?, ?)',
      [judul, konten, penulis]
    );
    res.json({ success: true, message: 'Data berita berhasil ditambahkan' });
  } catch (error) {
    console.error('Error:', error);
    res.json({ success: false, message: 'Gagal menambah data berita' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Web Desa berjalan di: http://localhost:${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✨ Siap melayani warga desa!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});