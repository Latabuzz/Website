# 🚀 Cara Menjalankan Website Desa Kapoya

## 📁 Struktur File
```
d:\wenzzz\Web_Desa\
├── index.html          # Halaman utama
├── profile.html         # Profil desa
├── services.html        # Layanan publik
├── news.html           # Berita
├── gallery.html        # Galeri foto
├── contact.html        # Kontak
├── assets\
│   ├── css\style.css   # Styling
│   ├── js\script.js    # JavaScript
│   └── img\            # Gambar (tambahkan sendiri)
└── RUN-WEBSITE.md      # File ini
```

## 🌐 Cara Menjalankan

### Metode 1: Browser Langsung (Termudah)
1. Buka File Explorer
2. Navigate ke: `d:\wenzzz\Web_Desa\`
3. Double-click `index.html`
4. Website akan terbuka di browser default

### Metode 2: VS Code Live Server
1. Buka VS Code
2. File → Open Folder → Pilih `d:\wenzzz\Web_Desa\`
3. Install extension "Live Server"
4. Klik kanan `index.html` → "Open with Live Server"
5. Website: `http://localhost:5500`

### Metode 3: Python Server
```bash
cd d:\wenzzz\Web_Desa\
python -m http.server 8000
# Buka: http://localhost:8000
```

### Metode 4: Node.js Server
```bash
npm install -g http-server
cd d:\wenzzz\Web_Desa\
http-server
# Buka: http://localhost:8080
```

## 📱 Akses dari Device Lain
1. Cari IP komputer: `ipconfig`
2. Akses dari HP: `http://[IP]:8000`
3. Contoh: `http://192.168.1.100:8000`

## ✅ Fitur Website
- Responsive design (mobile, tablet, desktop)
- Interactive navigation
- WhatsApp integration
- Google Maps
- Contact form
- Gallery with filter
- Modern UI/UX

## 🛠️ Kustomisasi
1. **Gambar**: Tambahkan logo dan foto ke folder `assets/img/`
2. **Konten**: Edit file HTML sesuai data aktual desa
3. **Kontak**: Update nomor WhatsApp dan informasi kontak
4. **Warna**: Modifikasi CSS variables di `style.css`

## 📞 Kontak Support
Jika ada masalah, hubungi developer website.

---
© 2025 Website Desa Kapoya by Owen Kalumata
