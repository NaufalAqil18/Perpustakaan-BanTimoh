# Testing Guide - Panel Admin Perpustakaan Ban Timoh

## Setup Testing Environment

### 1. Start Application
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Access Admin Panel
- Buka browser ke: `http://localhost:3000?admin=true`
- Tombol "Admin" akan muncul di navigation bar
- Klik tombol "Admin" untuk membuka panel

## Test Cases

### 1. Hero Section Testing

#### Test Case 1.1: Edit Judul Utama
**Steps:**
1. Buka panel admin
2. Pilih tab "Hero Section"
3. Klik tombol "Edit"
4. Ubah judul utama
5. Klik "Simpan"
6. Refresh halaman website

**Expected Result:**
- Judul utama berubah sesuai input
- Perubahan tersimpan permanen

#### Test Case 1.2: Edit Subtitle
**Steps:**
1. Buka panel admin
2. Pilih tab "Hero Section"
3. Klik tombol "Edit"
4. Ubah subtitle
5. Klik "Simpan"
6. Refresh halaman website

**Expected Result:**
- Subtitle berubah sesuai input
- Perubahan tersimpan permanen

#### Test Case 1.3: Edit Tombol Aksi
**Steps:**
1. Buka panel admin
2. Pilih tab "Hero Section"
3. Klik tombol "Edit"
4. Ubah teks tombol 1 dan 2
5. Klik "Simpan"
6. Refresh halaman website

**Expected Result:**
- Teks tombol berubah sesuai input
- Perubahan tersimpan permanen

### 2. Statistik Testing

#### Test Case 2.1: Tambah Statistik Baru
**Steps:**
1. Buka panel admin
2. Pilih tab "Statistik"
3. Klik tombol "Edit"
4. Klik "Tambah Statistik"
5. Isi nilai, judul, dan deskripsi
6. Klik "Simpan"
7. Refresh halaman website

**Expected Result:**
- Statistik baru muncul di website
- Data tersimpan dengan benar

#### Test Case 2.2: Edit Statistik Existing
**Steps:**
1. Buka panel admin
2. Pilih tab "Statistik"
3. Klik tombol "Edit"
4. Ubah nilai statistik pertama
5. Klik "Simpan"
6. Refresh halaman website

**Expected Result:**
- Nilai statistik berubah sesuai input
- Perubahan tersimpan permanen

#### Test Case 2.3: Hapus Statistik
**Steps:**
1. Buka panel admin
2. Pilih tab "Statistik"
3. Klik tombol "Edit"
4. Klik icon trash pada statistik
5. Klik "Simpan"
6. Refresh halaman website

**Expected Result:**
- Statistik terhapus dari website
- Perubahan tersimpan permanen

### 3. Kontak Testing

#### Test Case 3.1: Edit Informasi Telepon
**Steps:**
1. Buka panel admin
2. Pilih tab "Kontak"
3. Klik tombol "Edit"
4. Ubah nomor telepon
5. Klik "Simpan"
6. Refresh halaman website

**Expected Result:**
- Nomor telepon berubah sesuai input
- Perubahan tersimpan permanen

#### Test Case 3.2: Edit Email
**Steps:**
1. Buka panel admin
2. Pilih tab "Kontak"
3. Klik tombol "Edit"
4. Ubah email
5. Klik "Simpan"
6. Refresh halaman website

**Expected Result:**
- Email berubah sesuai input
- Perubahan tersimpan permanen

#### Test Case 3.3: Edit Alamat
**Steps:**
1. Buka panel admin
2. Pilih tab "Kontak"
3. Klik tombol "Edit"
4. Ubah alamat
5. Klik "Simpan"
6. Refresh halaman website

**Expected Result:**
- Alamat berubah sesuai input
- Perubahan tersimpan permanen

## API Testing

### 1. Test API Endpoints

#### Test GET /api/content
```bash
curl -X GET http://localhost:5000/api/content
```
**Expected Result:**
- Response 200 OK
- JSON data dengan struktur yang benar

#### Test POST /api/content
```bash
curl -X POST http://localhost:5000/api/content \
  -H "Content-Type: application/json" \
  -d '{"hero":{"title":"Test Title"}}'
```
**Expected Result:**
- Response 200 OK
- Message: "Content saved successfully"

#### Test PUT /api/content/hero
```bash
curl -X PUT http://localhost:5000/api/content/hero \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```
**Expected Result:**
- Response 200 OK
- Message: "Section updated successfully"

#### Test DELETE /api/content
```bash
curl -X DELETE http://localhost:5000/api/content
```
**Expected Result:**
- Response 200 OK
- Message: "Content reset to default"

## Error Handling Testing

### 1. Network Error
**Steps:**
1. Matikan server backend
2. Coba edit konten di panel admin
3. Klik "Simpan"

**Expected Result:**
- Error message muncul
- Data tersimpan di localStorage sebagai backup

### 2. Invalid Data
**Steps:**
1. Buka panel admin
2. Pilih tab "Statistik"
3. Klik "Edit"
4. Hapus semua nilai statistik
5. Klik "Simpan"

**Expected Result:**
- Validasi error muncul
- Data tidak tersimpan

### 3. Server Unavailable
**Steps:**
1. Matikan server backend
2. Refresh halaman website
3. Cek apakah website masih berfungsi

**Expected Result:**
- Website tetap berfungsi
- Data diambil dari localStorage

## Performance Testing

### 1. Load Testing
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test API endpoint
ab -n 100 -c 10 http://localhost:5000/api/content
```

### 2. Memory Usage
```bash
# Monitor memory usage
pm2 monit
```

### 3. Response Time
```bash
# Test response time
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:5000/api/content
```

## Browser Compatibility Testing

### Tested Browsers:
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

### Test Cases:
1. Panel admin berfungsi di semua browser
2. Responsive design bekerja dengan baik
3. LocalStorage berfungsi di semua browser
4. API calls berhasil di semua browser

## Mobile Testing

### Test Cases:
1. Panel admin responsive di mobile
2. Touch interactions berfungsi
3. Form inputs mudah digunakan di mobile
4. Navigation menu berfungsi di mobile

## Security Testing

### 1. XSS Prevention
**Steps:**
1. Masukkan script tag di input field
2. Simpan data
3. Refresh halaman

**Expected Result:**
- Script tidak dieksekusi
- Data ditampilkan sebagai text

### 2. CSRF Protection
**Steps:**
1. Coba akses API dari domain lain
2. Coba POST request tanpa proper headers

**Expected Result:**
- Request ditolak
- Error message muncul

### 3. Input Validation
**Steps:**
1. Masukkan data yang sangat panjang
2. Masukkan karakter khusus
3. Masukkan HTML tags

**Expected Result:**
- Data divalidasi dengan benar
- Error message muncul untuk data invalid

## Automated Testing

### Setup Jest
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Test Scripts
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Example Test
```javascript
// AdminPanel.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import AdminPanel from './AdminPanel';

test('renders admin panel when visible', () => {
  render(<AdminPanel isVisible={true} />);
  expect(screen.getByText('Panel Admin')).toBeInTheDocument();
});

test('saves content when save button clicked', () => {
  const mockSave = jest.fn();
  render(<AdminPanel isVisible={true} onSave={mockSave} />);
  
  fireEvent.click(screen.getByText('Edit'));
  fireEvent.change(screen.getByLabelText('Judul Utama'), {
    target: { value: 'New Title' }
  });
  fireEvent.click(screen.getByText('Simpan'));
  
  expect(mockSave).toHaveBeenCalled();
});
```

## Reporting

### Test Report Template
```
Test Date: _______________
Tester: ________________
Environment: ____________

✅ Passed Tests:
- [ ] Hero Section editing
- [ ] Statistics management
- [ ] Contact information
- [ ] API endpoints
- [ ] Error handling
- [ ] Mobile responsiveness

❌ Failed Tests:
- [ ] Test case description
- [ ] Steps to reproduce
- [ ] Expected vs actual result

🔧 Issues Found:
- [ ] Issue description
- [ ] Severity level
- [ ] Steps to reproduce
- [ ] Suggested fix

Overall Status: PASS/FAIL
Recommendation: ________________
```

## Continuous Integration

### GitHub Actions Workflow
```yaml
name: Test Admin Panel
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '16'
    - run: npm install
    - run: npm test
    - run: npm run build
```

## Maintenance Testing

### Weekly Tests:
- [ ] Panel admin functionality
- [ ] API endpoints
- [ ] Data persistence
- [ ] Performance metrics

### Monthly Tests:
- [ ] Security audit
- [ ] Browser compatibility
- [ ] Mobile responsiveness
- [ ] Backup restoration

### Quarterly Tests:
- [ ] Load testing
- [ ] Stress testing
- [ ] Disaster recovery
- [ ] User acceptance testing
