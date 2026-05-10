# Issue: Background & Expertise Text Overlap on Scroll

## Deskripsi Masalah
Pada bagian "Expertise" di halaman utama, terdapat bug visual saat pengguna melakukan scrolling. Teks sub-deskripsi *"A narrative of my technical focus and professional milestones."* terlihat seolah-olah "masuk" atau terscroll ke bawah teks judul *"Background & Expertise"*.

Hal ini disebabkan karena class `sticky` hanya diterapkan pada elemen `<h2>`, sehingga elemen `<p>` di bawahnya tetap mengikuti alur scroll normal dan akhirnya bertabrakan dengan judul yang diam di posisi sticky.

## Lokasi Kode
File: `src/App.tsx`
Baris: Sekitar 254-257

## Langkah-langkah Perbaikan (Untuk Junior Dev / AI)

1. **Buka file `src/App.tsx`**.
2. **Cari bagian komentar `{/* Expertise */}`** atau cari teks "Background & Expertise".
3. **Identifikasi struktur HTML berikut:**
   ```tsx
   <div className="md:col-span-4 lg:col-span-3">
     <h2 className="text-4xl md:text-5xl sticky top-32">Background & Expertise</h2>
     <p className="mt-4 text-on-surface-variant">A narrative of my technical focus and professional milestones.</p>
   </div>
   ```
4. **Pindahkan class `sticky top-32`** dari elemen `<h2>` ke elemen `<div>` pembungkusnya.
5. **Tambahkan class `h-fit` atau pastikan div tersebut memiliki alignment yang benar** agar tidak meregang mengikuti tinggi row grid. Disarankan menambahkan `h-fit` atau `self-start`.

### Hasil Akhir yang Diharapkan:
Struktur kode harus berubah menjadi seperti ini:
```tsx
<div className="md:col-span-4 lg:col-span-3 sticky top-32 h-fit">
  <h2 className="text-4xl md:text-5xl">Background & Expertise</h2>
  <p className="mt-4 text-on-surface-variant">A narrative of my technical focus and professional milestones.</p>
</div>
```

## Verifikasi
- Jalankan aplikasi.
- Scroll ke bawah hingga bagian "Background & Expertise".
- Pastikan judul DAN sub-deskripsinya tetap terlihat bersamaan saat posisi sticky aktif, tidak saling tumpang tindih.
