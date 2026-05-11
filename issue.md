# Issue: 404 Not Found - Formly Project Image

## Deskripsi Masalah
Ditemukan error **404 Not Found** saat mencoba memuat gambar project Formly:
`GET http://localhost:3000/image/formly.png [HTTP/1.1 404 Not Found]`

**Analisis:**
Aplikasi ini dikonfigurasi dengan base path `/taufiq-portfolio-new/` (terlihat di `vite.config.ts` dan URL referer). Saat kode menggunakan path `/image/formly.png`, browser mencarinya di root domain (`localhost:3000/`), bukan di dalam folder aplikasi kita.

---

## Langkah-Langkah Perbaikan (Paling Mudah)

### 1. Pastikan Lokasi File Fisik Benar
Vite hanya melayani file statis dari folder `public`.
- **Tindakan:** Pindahkan file gambar ke:
  `public/image/formly.png`
- **Verifikasi:** Pastikan folder `public` ada di root project, lalu buat sub-folder `image`.

### 2. Update Path di `src/App.tsx` (Solusi Base Path)
Kita harus menyertakan base path agar browser mencari di lokasi yang benar.

- **Buka File:** `src/App.tsx`
- **Cari Bagian:** `const PROJECTS`
- **Ubah `imageUrl` menjadi:**
  ```typescript
  imageUrl: '/taufiq-portfolio-new/image/formly.png',
  ```

### 3. Alternatif (Cara Lebih Profesional/Otomatis)
Jika Anda tidak ingin melakukan hardcode nama folder, gunakan `import.meta.env.BASE_URL`:
- **Ubah `imageUrl` menjadi:**
  ```typescript
  imageUrl: `${import.meta.env.BASE_URL}image/formly.png`,
  ```

---

## Cara Verifikasi
1. Simpan perubahan.
2. Buka browser (biasanya otomatis reload).
3. Periksa tab **Network** di Inspect Element (F12).
4. Pastikan request sekarang mengarah ke:
   `http://localhost:3000/taufiq-portfolio-new/image/formly.png`
5. Status code harus **200 OK**.

---

## Kenapa Solusi Ini Penting?
Karena project ini menggunakan `base: '/taufiq-portfolio-new/'` di `vite.config.ts`, semua aset yang dipanggil menggunakan path absolut (dimulai dengan `/`) harus menyertakan prefix tersebut agar Vite dapat menemukannya di folder `public` saat masa pengembangan maupun saat sudah di-deploy ke GitHub Pages.
