# Formly - Sistem Manajemen Formulir Digital

**Formly** adalah aplikasi manajemen formulir digital yang dirancang untuk memudahkan pelaku bisnis dalam mengumpulkan respon dan mengelola data pelanggan secara efisien. Aplikasi ini menggabungkan antarmuka pengguna yang modern dengan sistem backend yang tangguh.

## Teknologi Utama
Aplikasi ini dikembangkan menggunakan stack teknologi modern untuk memastikan performa dan pengalaman pengguna yang optimal:
- **Frontend:** [React.js](https://react.dev/) (dengan Vite, TypeScript, dan Tailwind CSS 4)
- **Backend:** [Laravel](https://laravel.com/) (REST API)

## Fitur Utama

### 1. Dashboard & Analitik
- Pantau performa bisnis melalui ringkasan total respon, jumlah formulir aktif, dan rata-rata konversi.
- Visualisasi tren respon menggunakan grafik interaktif untuk pengambilan keputusan yang lebih baik.

### 2. Pembuat Formulir (Form Builder)
- Antarmuka pembuatan formulir yang dinamis dan intuitif.
- Berbagai tipe input tersedia: Teks, Paragraf, Dropdown, Checkbox, Radio, Email, No. HP, dan Alamat.
- Kustomisasi field formulir sesuai dengan kebutuhan bisnis unik Anda.

### 3. Manajemen Respon (Submissions)
- Daftar respon yang masuk dengan fitur filter dan pencarian.
- Detail data yang lengkap untuk memudahkan proses pengolahan data.
- Manajemen status respon (Baru, Dibaca, Selesai).
- Fitur ekspor data respon.

### 4. Integrasi WhatsApp
- Konfigurasi WhatsApp API untuk pengiriman notifikasi otomatis setiap ada respon baru.
- Kustomisasi template pesan WhatsApp untuk memberikan respon cepat kepada pelanggan.

### 5. UI/UX Modern & Responsif
- Desain yang bersih dan responsif menggunakan **Tailwind CSS 4**.
- Animasi halus menggunakan **Motion** (Framer Motion) untuk pengalaman interaksi yang lebih hidup.
- Ikonografi yang konsisten dengan **Lucide React**.

## Arsitektur Sistem
- **Single Page Application (SPA):** Memastikan navigasi yang cepat tanpa reload halaman.
- **Secure Authentication:** Sistem login dan registrasi admin yang aman.
- **Modular Services:** Komunikasi API yang terorganisir di lapisan service untuk kemudahan pemeliharaan kode.
