# Caesar Cipher dan LSB Encryption API

Proyek ini adalah API berbasis [NestJS](https://nestjs.com/) yang menyediakan fitur enkripsi dan dekripsi menggunakan metode Caesar Cipher dan LSB (Least Significant Bit).

## 📋 Fitur

- **Caesar Cipher**: 
  - Enkripsi teks
  - Dekripsi teks
- **LSB Encryption**: 
  - Enkripsi pesan dalam gambar
  - Dekripsi pesan dari gambar
  - Mendapatkan informasi metadata gambar

## 🛠️ Persyaratan Sistem

Pastikan Anda memiliki perangkat lunak berikut yang terinstal:

- **Node.js**: Versi 16 atau lebih baru
- **NPM** (atau **Yarn**) untuk mengelola paket
- **Docker** (opsional, jika menggunakan container)

## 🚀 Langkah Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek secara lokal:

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
   ```

2. **Instalasi Dependensi**
   Jalankan perintah berikut untuk menginstal semua dependensi:
   ```bash
   npm install
   ```

3. **Konfigurasi Lingkungan**
   Buat file `.env` di root proyek berdasarkan file `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Contoh konfigurasi `.env`:
   ```env
   PORT=3000
   NODE_ENV=development
   ```

4. **Jalankan Server**
   Untuk menjalankan server secara lokal, gunakan perintah berikut:
   ```bash
   npm run start:dev
   ```
   Server akan berjalan di: [http://localhost:3000](http://localhost:3000)

## 📖 Dokumentasi API

Berikut adalah daftar endpoint yang tersedia dalam API ini:

### **Caesar Cipher**
- **POST** `/caesar-chiper/encrypt`
  - Enkripsi teks menggunakan Caesar Cipher.
- **POST** `/caesar-chiper/decrypt`
  - Dekripsi teks menggunakan Caesar Cipher.

### **LSB Encryption**
- **POST** `/lsb/encrypt-lsb`
  - Enkripsi pesan ke dalam gambar menggunakan LSB.
- **POST** `/lsb/decrypt-lsb`
  - Dekripsi pesan dari gambar menggunakan LSB.
- **POST** `/lsb/get-info`
  - Mendapatkan informasi metadata dari gambar.


## 👨‍💻 Kontribusi

Kami menyambut kontribusi Anda untuk meningkatkan proyek ini. Silakan fork repository ini dan buat pull request.


*Dikembangkan dengan ❤️ oleh rangga.*

