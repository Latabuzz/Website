# Web Desa Kapoya

Website resmi Desa Kapoya dengan Node.js, Express, dan MySQL.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- MySQL/MariaDB
- XAMPP/Laragon (untuk development)

### Installation

1. **Clone/Download project**
```bash
cd d:\wenzzz\Web_Desa\my-nodejs-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
copy .env.example .env
# Edit .env file sesuai konfigurasi database Anda
```

4. **Setup database**
```bash
npm run setup-db
```

5. **Test database connection**
```bash
npm run test-db
```

6. **Run development server**
```bash
npm run dev
```

7. **Run production server**
```bash
npm start
```

## 📁 Struktur Project

```
my-nodejs-project/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── create-tables.js
│   ├── views/
│   │   └── index.ejs
│   └── server.js
├── public/
├── .env.example
├── package.json
└── README.md
```

## 🔧 Scripts

- `npm start` - Jalankan production server
- `npm run dev` - Jalankan development server dengan nodemon
- `npm run setup-db` - Setup database dan tabel
- `npm run test-db` - Test koneksi database
- `npm run deploy` - Full deployment process

## 🌐 Deployment

### Vercel/Netlify
```bash
npm run deploy
```

### Manual Deploy
1. Upload semua file ke server
2. Install dependencies: `npm install`
3. Setup database: `npm run setup-db`
4. Start server: `npm start`

## 📞 Support

Untuk bantuan teknis, hubungi developer.