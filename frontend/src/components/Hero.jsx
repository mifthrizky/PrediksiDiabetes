// src/components/Hero.jsx

import React from 'react';
// Pastikan path gambar Anda sudah benar
import heroImage from '../assets/diabetes-image.png'; 

function Hero() {
  return (
    // 1. TAMBAHKAN 'pt-24' di sini untuk memberi ruang bagi Navbar
    <section id="home" className="bg-amber-50 pt-24">
      {/* 2. UBAH 'py-20' menjadi 'pb-20' di sini */}
      <div className="container mx-auto px-4 pb-20">
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri: Teks */}
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Prediksi Risiko Diabetes Sejak Dini
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Gunakan model Machine Learning kami untuk menganalisis data
              kesehatan Anda dan dapatkan prediksi risiko secara instan.
            </p>
            <a 
              href="#form-prediksi" 
              className="bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-500"
            >
              Mulai Prediksi
            </a>
          </div>

          {/* Kolom Kanan: Gambar */}
          <div className="flex justify-center">
            <img 
              src={heroImage} 
              alt="Ilustrasi Aplikasi Prediksi Diabetes" 
              className="rounded-lg  max-w-full h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;