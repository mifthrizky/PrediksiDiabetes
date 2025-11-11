// src/components/PredictionForm.jsx

import React, { useState } from 'react';

// Terima prop 'onPrediction'
function PredictionForm({ onPrediction }) {
  const [glucose, setGlucose] = useState('');
  const [bmi, setBmi] = useState('');
  const [age, setAge] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = {
      glucose: parseFloat(glucose),
      bmi: parseFloat(bmi),
      age: parseInt(age),
    };

    console.log("Data siap dikirim ke API:", formData);
    
    // Simulasi API Call
    setTimeout(() => {
      const dummyResult = {
        prediction: 1, // 1 = Positif, 0 = Negatif
        probability: 85.5
      };
      onPrediction(dummyResult); // Kirim hasil ke Dashboard.jsx
      setIsLoading(false);
    }, 1500);
  };

  return (
    // Section dengan background cream
    <section id="form-prediksi" className="bg-amber-50 py-20 px-4">
      <div className="container mx-auto">
        
        {/* Layout Grid 2 Kolom */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Kolom Kiri: Teks Penjelasan */}
          <div className="pt-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Bagaimana Cara Kerjanya?
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Model kami menggunakan algoritma Machine Learning yang telah dilatih
              pada ribuan data set untuk mengidentifikasi pola yang terkait
              dengan risiko diabetes.
            </p>
            <p className="text-lg text-gray-600">
              Cukup masukkan beberapa data kesehatan kunci Anda di form
              sebelah, dan sistem kami akan memberikan prediksi instan.
            </p>
          </div>

          {/* Kolom Kanan: Form Card */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Masukkan Data Anda
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* INI BAGIAN YANG HILANG (DIGANTI TITIK-TITIK) */}
                
                {/* Input Group: Glukosa */}
                <div>
                  <label htmlFor="glucose" className="block text-sm font-medium text-gray-700">
                    Kadar Glukosa (mg/dL)
                  </label>
                  <input
                    type="number"
                    id="glucose"
                    value={glucose}
                    onChange={(e) => setGlucose(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Contoh: 120"
                    required
                  />
                </div>

                {/* Input Group: BMI */}
                <div>
                  <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">
                    Indeks Massa Tubuh (BMI)
                  </label>
                  <input
                    type="number"
                    id="bmi"
                    value={bmi}
                    onChange={(e) => setBmi(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Contoh: 25.5"
                    required
                  />
                </div>

                {/* Input Group: Usia */}
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Usia (Tahun)
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Contoh: 45"
                    required
                  />
                </div>
                
                {/* ... Tambahkan field lain di sini (Tekanan Darah, dll) ... */}

                {/* Tombol Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400"
                  disabled={isLoading}
                >
                  {isLoading ? 'Memprediksi...' : 'Dapatkan Prediksi'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PredictionForm;