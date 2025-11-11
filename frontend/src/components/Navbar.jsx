// src/components/Navbar.jsx

// 1. Import useState dan useEffect
import React, { useState, useEffect } from 'react';

function Navbar() {
  // 2. Buat state untuk melacak apakah sudah di-scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // 3. Buat useEffect untuk mendengarkan event 'scroll'
  useEffect(() => {
    // Fungsi ini akan dijalankan saat user scroll
    const handleScroll = () => {
      // window.scrollY adalah posisi scroll vertikal
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Tambahkan event listener saat komponen dimuat
    window.addEventListener('scroll', handleScroll);

    // Hapus event listener saat komponen dibongkar (penting!)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // [] (array kosong) berarti effect ini hanya jalan sekali

  return (
    // 4. Gunakan 'isScrolled' untuk MENGUBAH class secara dinamis
    <nav 
      className={`top-0 left-0 right-0 z-10 transition-all duration-300 
        ${isScrolled ? 'fixed bg-white shadow-md' : 'absolute'}
      `}
    >
      {/* Penjelasan class di atas:
        - 'transition-all duration-300': Agar perubahan warnanya halus.
        - Jika 'isScrolled' true: Tambahkan 'fixed bg-white shadow-md'
        - Jika 'isScrolled' false: Tambahkan 'absolute' (tetap transparan)
      */}

      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Bagian Kiri: Logo (KITA AKAN UBAH INI DI LANGKAH 2) */}
        <a 
            href="#" 
            className="text-2xl font-bold text-blue-600"
            // TAMBAHKAN ONCLICK INI:
            onClick={(e) => {
                e.preventDefault(); // Mencegah URL berubah menjadi /#
                window.scrollTo({
                top: 0,
                behavior: 'smooth' // Membuatnya 'smooth' (sudah Anda aktifkan)
                });
            }}
            >
            🩺 DiabetesPredict
        </a>

        {/* Bagian Kanan: Menu & Tombol */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#about" 
              // 5. Ubah warna teks link saat di-scroll
              className={`${isScrolled ? 'text-gray-700' : 'text-gray-700'} font-medium hover:text-blue-600`}
            >
              About
            </a>
            <a 
              href="#blog" 
              className={`${isScrolled ? 'text-gray-700' : 'text-gray-700'} font-medium hover:text-blue-600`}
            >
              Blog
            </a>
            <a 
              href="#reviews" 
              className={`${isScrolled ? 'text-gray-700' : 'text-gray-700'} font-medium hover:text-blue-600`}
            >
              Reviews
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;