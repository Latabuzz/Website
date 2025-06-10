const { pool, executeQuery } = require('./config/database');

async function testDatabase() {
  try {
    console.log('🧪 Testing database...\n');

    // Test insert data
    console.log('1️⃣ Menambah data penduduk...');
    await executeQuery(
      'INSERT INTO penduduk (nik, nama, alamat, rt, rw) VALUES (?, ?, ?, ?, ?)',
      ['1234567890123456', 'Budi Santoso', 'Jl. Merdeka No. 123', '001', '002']
    );
    console.log('✅ Data penduduk ditambahkan');

    // Test select data
    console.log('\n2️⃣ Mengambil data penduduk...');
    const penduduk = await executeQuery('SELECT * FROM penduduk');
    console.log('📋 Jumlah penduduk:', penduduk.length);
    console.log('👤 Nama:', penduduk[0]?.nama);

    // Test insert berita
    console.log('\n3️⃣ Menambah berita...');
    await executeQuery(
      'INSERT INTO berita (judul, konten, penulis) VALUES (?, ?, ?)',
      ['Selamat Datang', 'Website desa telah diluncurkan!', 'Admin Desa']
    );
    console.log('✅ Berita ditambahkan');

    // Test select berita
    console.log('\n4️⃣ Mengambil berita...');
    const berita = await executeQuery('SELECT * FROM berita');
    console.log('📰 Jumlah berita:', berita.length);
    console.log('📝 Judul:', berita[0]?.judul);

    console.log('\n🎉 Database Web Desa siap digunakan!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDatabase();
