# Issue: Contact Page Responsiveness Fix

## Deskripsi
Halaman kontak saat ini memiliki beberapa kendala tampilan pada perangkat mobile (smartphone):
1. Judul utama "Initiate Communication." terlalu besar (`text-6xl`), menyebabkan kata-kata terpotong atau memaksa overflow pada layar kecil (misal: 320px).
2. Form kontak (`Transmission Form`) memiliki padding yang cukup besar, sehingga menyisakan sedikit ruang untuk input teks di layar sempit.
3. Ukuran font input dan placeholder (`text-xl`) terasa terlalu dominan di layar mobile.
4. Vertical centering (`justify-center`) pada container utama membuat konten terpotong di bagian atas jika tinggi layar sangat terbatas (landscape mode atau HP pendek).

## Langkah-langkah Perbaikan

### 1. Penyesuaian Tipografi Judul
Buka file `src/App.tsx` dan cari fungsi `ContactScreen`.
Ubah class pada elemen `h1` agar ukurannya lebih proporsional di mobile.
- **Lama:** `text-6xl md:text-8xl lg:text-9xl`
- **Baru:** `text-4xl sm:text-6xl md:text-8xl lg:text-9xl`

### 2. Penyesuaian Layout Container
Ubah container utama agar tidak memaksa `justify-center` secara kaku di mobile, untuk menghindari konten terpotong di layar pendek.
- **Lama:** `className="... h-full flex flex-col items-center justify-center py-12 md:py-24"`
- **Baru:** `className="... min-h-full flex flex-col items-center justify-start md:justify-center py-16 md:py-24"`

### 3. Optimasi Form dan Input
Ubah padding pada box form agar lebih efisien di layar kecil:
- **Lama:** `<div className="w-full max-w-2xl bg-surface-dim p-6 md:p-12 ...">`
- **Baru:** `<div className="w-full max-w-2xl bg-surface-dim p-5 sm:p-8 md:p-12 ...">`

Ubah ukuran font pada elemen `input` dan `textarea` agar tidak terlalu besar:
- **Lama:** `className="... text-xl md:text-2xl ..."`
- **Baru:** `className="... text-lg md:text-2xl ..."`

### 4. Penyesuaian Spasi Antar Elemen
Ubah margin bawah pada header untuk menghemat ruang vertikal:
- **Lama:** `<div className="text-center mb-12 md:mb-16 ...">`
- **Baru:** `<div className="text-center mb-8 md:mb-16 ...">`

Ubah spasi antar field form:
- **Lama:** `<form className="space-y-8 md:space-y-12 ...">`
- **Baru:** `<form className="space-y-6 md:space-y-12 ...">`

## Cara Verifikasi
1. Jalankan aplikasi: `npm run dev`.
2. Gunakan Inspect Element (F12) dan aktifkan mode mobile.
3. Tes pada ukuran layar 320px (iPhone SE) dan 390px (iPhone 13/14).
4. Pastikan judul "Initiate Communication." tidak terpotong (tidak ada horizontal scroll).
5. Pastikan seluruh form terlihat dan dapat diisi dengan nyaman tanpa harus banyak scrolling yang tidak perlu.
