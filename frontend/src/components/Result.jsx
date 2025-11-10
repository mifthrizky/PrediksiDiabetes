// src/components/Result.jsx

import React from 'react';

// Komponen ini menerima props 'result' (data) dan 'onClear' (fungsi)
function Result({ result, onClear }) {
  // Tentukan styling berdasarkan hasil prediksi
  const isPositive = result.prediction === 1;
  const cardBg = isPositive ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300';
  const title = isPositive ? 'Risiko Tinggi: Positif Diabetes' : 'Risiko Rendah: Negatif Diabetes';
  const titleColor = isPositive ? 'text-red-700' : 'text-green-700';

  return (
    <section className="bg-amber-50 py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className={`border-l-4 p-6 rounded-lg shadow-lg ${cardBg}`}>
          <h2 className={`text-3xl font-bold mb-4 ${titleColor}`}>
            {title}
          </h2>
          
          <p className="text-gray-700 text-lg mb-2">
            Model kami memprediksi hasil Anda dengan tingkat probabilitas 
            <strong className="font-bold"> {result.probability}%</strong>.
          </p>
          
          <p className="text-gray-600 mb-6">
            {isPositive
              ? 'Kami menyarankan Anda untuk segera berkonsultasi dengan profesional medis untuk konfirmasi dan penanganan lebih lanjut.'
              : 'Hasil ini menunjukkan Anda memiliki risiko rendah, namun tetap jaga pola hidup sehat dan lakukan pemeriksaan rutin.'
            }
          </p>
          
          <button
            onClick={onClear} // Panggil fungsi onClear saat diklik
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700"
          >
            Coba Prediksi Lagi
          </button>
        </div>
      </div>
    </section>
  );
}

export default Result;
