# Perpustakaan Ban Timoh - Website dengan Panel Admin

Website perpustakaan modern dengan panel admin yang dapat mengubah konten secara realtime.

## Fitur Utama

### 🎨 Website Perpustakaan
- **Hero Section** - Tampilan utama dengan judul dan tombol aksi
- **Statistik** - Menampilkan data perpustakaan secara dinamis
- **Profil** - Sejarah, visi, dan misi perpustakaan
- **OPAC** - Sistem katalog online
- **AR Experience** - Pengalaman augmented reality
- **Galeri** - Dokumentasi kegiatan dan event
- **Testimoni** - Ulasan dari pengguna
- **Kontak** - Informasi lokasi dan kontak

### ⚙️ Panel Admin
- **Edit Konten Real-time** - Ubah konten website tanpa reload
- **Manajemen Hero Section** - Edit judul, subtitle, dan tombol
- **Manajemen Statistik** - Tambah, edit, hapus statistik
- **Manajemen Kontak** - Update informasi kontak
- **Auto-save** - Konten tersimpan otomatis
- **Backup System** - Data tersimpan di localStorage dan server

## Teknologi yang Digunakan

### Frontend
- **React 18** - Framework JavaScript
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Icon library
- **Custom Hooks** - State management

### Backend
- **Express.js** - Server Node.js
- **CORS** - Cross-origin resource sharing
- **File System** - Penyimpanan data JSON

## Instalasi dan Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd perpustakaan-bantimoh
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Menjalankan Development Server
```bash
# Menjalankan server backend dan frontend secara bersamaan
npm run dev

# Atau menjalankan secara terpisah
npm run server  # Backend (port 5000)
npm start       # Frontend (port 3000)
```

### 4. Build untuk Production
```bash
npm run build
```

## Cara Menggunakan Panel Admin

### 1. Akses Mode Admin
- Tambahkan `?admin=true` di URL website
- Contoh: `http://localhost:3000?admin=true`

### 2. Panel Admin Features

#### Hero Section
- Edit judul utama website
- Edit subtitle/deskripsi
- Edit teks tombol aksi

#### Statistik
- Tambah statistik baru
- Edit nilai, judul, dan deskripsi
- Hapus statistik yang tidak diperlukan

#### Kontak
- Update nomor telepon
- Update email
- Update alamat perpustakaan

### 3. Menyimpan Perubahan
- Klik tombol "Edit" untuk mengaktifkan mode edit
- Lakukan perubahan pada form
- Klik "Simpan" untuk menyimpan perubahan
- Klik "Batal" untuk membatalkan perubahan

## Struktur File

```
perpustakaan-bantimoh/
├── src/
│   ├── components/
│   │   └── AdminPanel.js          # Panel admin component
│   ├── hooks/
│   │   └── useContentManager.js   # Hook untuk manajemen konten
│   ├── App.js                     # Component utama website
│   └── index.js                   # Entry point
├── server.js                      # Backend server
├── package.json                   # Dependencies dan scripts
└── README.md                      # Dokumentasi
```

## API Endpoints

### GET /api/content
Mengambil semua konten website

### POST /api/content
Menyimpan konten website baru

### PUT /api/content/:section
Mengupdate section tertentu

### DELETE /api/content
Reset konten ke default

## Penyimpanan Data

### Development
- Data tersimpan di `data/content.json`
- Backup di localStorage browser

### Production
- Data tersimpan di file system server
- Backup otomatis di localStorage

## Deployment

### 1. Build Frontend
```bash
npm run build
```

### 2. Setup Environment Variables
```bash
# .env
REACT_APP_API_URL=https://your-domain.com
PORT=5000
```

### 3. Deploy ke Platform
- **Vercel**: Deploy React app
- **Railway/Heroku**: Deploy Express server
- **VPS**: Setup manual dengan PM2

## Fitur Keamanan

- **CORS Protection** - Mencegah akses dari domain yang tidak sah
- **Input Validation** - Validasi data sebelum disimpan
- **Error Handling** - Penanganan error yang robust
- **Backup System** - Data tersimpan di multiple location

## Troubleshooting

### Masalah Umum

1. **Panel Admin tidak muncul**
   - Pastikan URL mengandung `?admin=true`
   - Refresh halaman

2. **Perubahan tidak tersimpan**
   - Cek koneksi internet
   - Cek console browser untuk error
   - Data akan tersimpan di localStorage sebagai backup

3. **Server tidak berjalan**
   - Pastikan port 5000 tidak digunakan
   - Cek apakah semua dependencies terinstall

## Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## Lisensi

MIT License - lihat file LICENSE untuk detail

## Kontak

Untuk pertanyaan atau dukungan, silakan hubungi tim pengembang.
