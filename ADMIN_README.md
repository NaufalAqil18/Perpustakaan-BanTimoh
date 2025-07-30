# Admin Panel - Perpustakaan Ban Timoh

## 🚀 Akses Admin Panel

Untuk mengakses admin panel, tambahkan parameter `?admin=true` pada URL website:

```
http://localhost:3000/?admin=true
```

## 📋 Fitur Admin Panel

### 1. **Dashboard Overview**
- Statistik real-time perpustakaan
- Quick actions untuk akses cepat
- Overview data penting

### 2. **Manajemen Profil Perpustakaan**
- **Statistik**: Edit jumlah anggota aktif, koleksi buku, tahun pengalaman
- **Sejarah**: Update sejarah berdirinya perpustakaan, SK pendirian
- **Visi & Misi**: Edit visi dan misi perpustakaan
- **Misi**: Tambah/hapus/edit poin-poin misi

### 3. **Manajemen Galeri & Event**
- **Upload Foto**: Tambah foto baru dengan kategori
- **Edit Foto**: Update judul, deskripsi, tanggal, kategori
- **Hapus Foto**: Hapus foto yang tidak relevan
- **Kategori**: KKN Literasi, Program Literasi, Event, Kegiatan Umum

### 4. **Manajemen Testimoni**
- **Tambah Testimoni**: Input testimoni baru dari mahasiswa KKN/pengunjung
- **Edit Testimoni**: Update nama, peran, rating, dan isi testimoni
- **Hapus Testimoni**: Hapus testimoni yang tidak sesuai
- **Rating System**: Sistem rating 1-5 bintang

### 5. **Manajemen Struktur Organisasi**
- **Penanggung Jawab**: Edit keuchik dan penanggung jawab
- **Pengurus**: Tambah/edit/hapus pengurus perpustakaan
- **Mahasiswa KKN**: Kelola daftar mahasiswa KKN yang berkontribusi
- **Warna Kode**: Sistem warna untuk membedakan jabatan

### 6. **Manajemen Kontak & Lokasi**
- **Informasi Kontak**: Update telepon, email, alamat
- **Jam Operasional**: Set jam buka/tutup perpustakaan
- **Link Kontak**: Update link WhatsApp, email, Google Maps
- **Cara Mencapai**: Edit informasi cara mencapai lokasi

### 7. **Pengaturan Sistem**
- **Profil Admin**: Update username, email, password
- **Keamanan**: Two-factor auth, timeout sesi, maksimal login
- **Notifikasi**: Email, push notification, laporan mingguan
- **Sistem**: Maintenance mode, auto backup, retensi data
- **Backup**: Export/import data dalam format JSON

## 🔧 Cara Penggunaan

### Login Admin
1. Akses admin panel dengan URL `?admin=true`
2. Masukkan username dan password (saat ini bypass untuk demo)
3. Klik "Masuk" untuk mengakses dashboard

### Edit Konten
1. Pilih menu yang ingin diedit dari sidebar
2. Klik tombol "Edit" pada section yang diinginkan
3. Lakukan perubahan pada form yang muncul
4. Klik "Simpan" untuk menyimpan perubahan
5. Klik "Batal" untuk membatalkan perubahan

### Upload Foto Galeri
1. Klik "Tambah Foto" di halaman Galeri
2. Upload file gambar (JPG, PNG, GIF, max 5MB)
3. Isi informasi foto (judul, tanggal, kategori, deskripsi)
4. Klik "Simpan" untuk menambahkan foto

### Tambah Testimoni
1. Klik "Tambah Testimoni" di halaman Testimoni
2. Isi nama, peran/jabatan, rating, dan testimoni
3. Klik "Simpan" untuk menambahkan testimoni

### Export/Import Data
1. Buka halaman "Pengaturan" > "Backup"
2. Klik "Export Data" untuk mengunduh backup
3. Klik "Import Data" untuk memulihkan dari backup

## 🎨 Fitur UI/UX

### Design System
- **Dark Theme**: Interface gelap yang nyaman di mata
- **Gradient Colors**: Kombinasi warna biru-ungu yang menarik
- **Responsive**: Kompatibel dengan desktop, tablet, dan mobile
- **Smooth Animations**: Transisi halus antar halaman dan elemen

### Komponen UI
- **Modal**: Popup untuk form input dan konfirmasi
- **Cards**: Layout card untuk menampilkan data
- **Buttons**: Tombol dengan hover effects dan loading states
- **Forms**: Input fields dengan validasi dan styling konsisten
- **Tables**: Tabel untuk menampilkan data dalam format terstruktur

## 🔒 Keamanan

### Fitur Keamanan
- **Session Management**: Timeout otomatis untuk sesi admin
- **Password Protection**: Sistem password untuk akses admin
- **Data Validation**: Validasi input untuk mencegah data tidak valid
- **Backup System**: Sistem backup untuk melindungi data

### Best Practices
- Gunakan password yang kuat
- Logout setelah selesai menggunakan admin panel
- Backup data secara berkala
- Jangan share kredensial admin dengan orang lain

## 📱 Responsive Design

### Desktop (1024px+)
- Sidebar tetap di sebelah kiri
- Layout 2-3 kolom untuk konten
- Modal full-size untuk form

### Tablet (768px - 1023px)
- Sidebar collapse menjadi hamburger menu
- Layout 1-2 kolom untuk konten
- Modal responsive dengan scroll

### Mobile (< 768px)
- Sidebar menjadi overlay menu
- Layout single column
- Touch-friendly buttons dan inputs

## 🚀 Deployment

### Build untuk Production
```bash
npm run build
```

### Environment Variables
Buat file `.env` untuk konfigurasi:
```env
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=password123
REACT_APP_API_URL=https://api.perpustakaan-bantimoh.com
```

### Hosting
- **Vercel**: Deploy dengan `vercel --prod`
- **Netlify**: Drag & drop folder `build`
- **Firebase**: `firebase deploy`

## 🐛 Troubleshooting

### Masalah Umum
1. **Admin panel tidak muncul**: Pastikan URL mengandung `?admin=true`
2. **Foto tidak upload**: Cek ukuran file (max 5MB) dan format (JPG, PNG, GIF)
3. **Data tidak tersimpan**: Cek koneksi internet dan console browser
4. **Layout rusak**: Refresh halaman dan cek responsive breakpoint

### Debug Mode
Aktifkan debug mode dengan menambahkan `&debug=true` pada URL:
```
http://localhost:3000/?admin=true&debug=true
```

## 📞 Support

Untuk bantuan teknis atau pertanyaan tentang admin panel, hubungi:
- Email: admin@perpustakaan-bantimoh.com
- WhatsApp: +62-xxx-xxx-xxxx
- GitHub Issues: [Repository Issues](https://github.com/perpustakaan-bantimoh/issues)

## 🔄 Changelog

### v1.0.0 (2025-01-XX)
- ✅ Admin panel pertama kali dirilis
- ✅ Fitur manajemen profil perpustakaan
- ✅ Fitur manajemen galeri dan testimoni
- ✅ Fitur manajemen struktur organisasi
- ✅ Fitur manajemen kontak dan lokasi
- ✅ Fitur pengaturan sistem
- ✅ Responsive design untuk semua device

---

**Dibuat dengan ❤️ untuk Perpustakaan Ban Timoh** 