// src/components/Features.jsx

import React from 'react';
// Import ikon yang akan kita gunakan
import { FaSearchPlus, FaShieldAlt, FaHeartbeat, FaAppleAlt, FaPiggyBank, FaSmile } from 'react-icons/fa';

function Features() {
  return (
    // Kita gunakan background putih, bukan cream, agar ada variasi
    <section id="about" className="bg-white py-20 px-4">
      <div className="container mx-auto">
        
        {/* Judul dan Subjudul Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Dampak Kecil, Perubahan Besar
          </h2>
          <p className="text-lg text-gray-600">
            Mengetahui risiko Anda lebih awal adalah langkah pertama menuju
            gaya hidup yang lebih sehat dan tenang.
          </p>
        </div>

        {/* Grid untuk 6 Fitur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Item 1: Deteksi Dini */}
          <div className="text-center p-4">
            <FaSearchPlus className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Deteksi Dini</h3>
            <p className="text-gray-600">
              Identifikasi risiko Anda sebelum gejala muncul, memberikan
              Anda waktu untuk bertindak.
            </p>
          </div>

          {/* Item 2: Pencegahan Proaktif */}
          <div className="text-center p-4">
            <FaShieldAlt className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pencegahan Proaktif</h3>
            <p className="text-gray-600">
              Dengan data, Anda bisa mengambil langkah pencegahan yang
              terbukti secara ilmiah.
            </p>
          </div>

          {/* Item 3: Ketenangan Pikiran */}
          <div className="text-center p-4">
            <FaHeartbeat className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ketenangan Pikiran</h3>
            <p className="text-gray-600">
              Mengurangi kecemasan dengan mengetahui status risiko kesehatan
              Anda secara jelas.
            </p>
          </div>

          {/* Item 4: Perubahan Gaya Hidup */}
          <div className="text-center p-4">
            <FaAppleAlt className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gaya Hidup Terarah</h3>
            <p className="text-gray-600">
              Dapatkan motivasi untuk memperbaiki pola makan dan olahraga
              berdasarkan data.
            </p>
          </div>

          {/* Item 5: Hemat Biaya */}
          <div className="text-center p-4">
            <FaPiggyBank className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Hemat Biaya</h3>
            <p className="text-gray-600">
              Mencegah lebih murah daripada mengobati. Hindari biaya
              perawatan jangka panjang.
            </p>
          </div>

          {/* Item 6: Kualitas Hidup */}
          <div className="text-center p-4">
            <FaSmile className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Kualitas Hidup</h3>
            <p className="text-gray-600">
              Nikmati hidup yang lebih sehat dan berkualitas bersama
              orang-orang tercinta.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Features;