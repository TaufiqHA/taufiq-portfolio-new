# Planning: Responsive Design (Mobile & Tablet)

## Goal
Make all pages (Home, Work, Project Detail, Contact) fully responsive and visually polished on mobile and tablet devices.

---

## Strategy (For Junior Dev/AI)

### 1. Implement Mobile Navigation Menu
Saat ini, menu navigasi disembunyikan di mobile. Kita perlu menambahkan "Hamburger Menu" atau "Overlay Menu" untuk mobile.

**Langkah:**
- Tambahkan state `isMenuOpen` menggunakan `useState` di komponen `Nav`.
- Tambahkan tombol menu (ikon `Menu` dan `X` dari `lucide-react`) yang hanya muncul di `block md:hidden`.
- Buat `AnimatePresence` untuk menampilkan menu overlay full-screen saat `isMenuOpen` bernilai true.

### 2. Fluid Typography (Penyesuaian Ukuran Font)
Beberapa teks sangat besar (seperti `text-8xl`). Kita harus memastikan ukurannya mengecil secara proporsional di layar kecil.

**Langkah:**
- Gunakan prefix responsif Tailwind secara konsisten:
  - `text-4xl` (Mobile) -> `text-6xl` (Tablet) -> `text-8xl` (Desktop).
- Periksa komponen `HomeScreen` (Hero section) dan `WorkScreen` (Header).

### 3. Grid & Layout Refactoring
Ubah tata letak kolom agar lebih fleksibel.

**Langkah:**
- **Hero Section:** Pastikan gambar portrait di `HomeScreen` berada di bawah teks saat mobile (`grid-cols-1`) dan di samping saat desktop (`md:col-span-5`).
- **Expertise Section:** Di tablet, gunakan `grid-cols-1` atau perkecil gap agar tidak terlalu sempit.
- **Project Detail:** Bagian Metadata (`aside`) harus pindah ke atas atau bawah konten utama pada mobile, bukan di samping.

### 4. Spacing & Padding Adjustment
Jarak antar section (`mt-32`, `py-24`) seringkali terlalu besar untuk layar handphone.

**Langkah:**
- Gunakan utility spacing yang bervariasi:
  - Contoh: `py-12 md:py-24` atau `mt-16 md:mt-32`.
- Pastikan `max-w-7xl` tetap memiliki padding samping yang cukup (`px-4` atau `px-6`).

### 5. Interactive Elements (Touch Friendly)
Pastikan semua tombol dan link mudah diklik dengan jari.

**Langkah:**
- Pastikan `min-h-[44px]` untuk elemen interaktif.
- Hilangkan efek `hover` yang mengganggu di mobile (karena hover di mobile seringkali "lengket" setelah diklik). Gunakan `@media (hover: hover)`.

---

## Checklist Implementasi

### [ ] Navigation (Nav)
- [ ] Tombol Hamburger muncul di < 768px.
- [ ] Menu overlay berfungsi dengan animasi halus.

### [ ] Home Screen
- [ ] Hero text tidak terpotong (overflow).
- [ ] Grid "Technical Proficiency" rapi di mobile (1 kolom).

### [ ] Work Screen
- [ ] Card project memenuhi lebar layar dengan margin yang pas.
- [ ] Ikon panah (`ArrowUpRight`) tidak bertabrakan dengan teks.

### [ ] Project Detail
- [ ] Gambar utama (aspect-video) terlihat bagus di mobile.
- [ ] Tabel metadata berubah menjadi layout tumpuk (stacked).

### [ ] Contact Screen
- [ ] Form input tidak terlalu lebar.
- [ ] Padding dalam box `TRANSMISSION_FORM` dikurangi untuk mobile.

---

## Cara Verifikasi
1. Gunakan **Chrome DevTools** (F12).
2. Aktifkan **Device Mode** (ikon HP/Tablet).
3. Test pada resolusi:
   - **Mobile:** 375px (iPhone SE/12)
   - **Tablet:** 768px (iPad)
   - **Desktop:** 1440px+
