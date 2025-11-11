import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Activity, Heart, TrendingUp, AlertCircle, CheckCircle, ArrowLeft, Home } from "lucide-react";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;
  const confidence = location.state?.confidence;
  const formData = location.state?.formData;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50 p-6">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tidak Ada Data Prediksi</h2>
          <p className="text-gray-600 mb-6">Silakan lakukan prediksi terlebih dahulu</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const isDiabetes = result === "Diabetes";

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header dengan tombol kembali */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </button>
        </div>

        {/* Card Hasil Prediksi */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 animate-fadeIn">
          {/* Header */}
          <div
            className={`p-6 ${
              isDiabetes ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-green-500 to-green-600"
            }`}
          >
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
                {isDiabetes ? <AlertCircle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
              </div>
              <h1 className="text-2xl font-bold mb-1">Hasil Prediksi</h1>
              <p className="text-white/90 text-sm">Analisis selesai dilakukan</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Result Badge */}
            <div className="text-center mb-6">
              <div className="items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                ✓ Prediksi Selesai
              </div>

              <div
                className={`inline-block px-8 py-4 rounded-xl mb-4 ${
                  isDiabetes
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                }`}
              >
                <p className="text-3xl font-bold">{result}</p>
              </div>

              {/* Confidence Score */}
              <div className="space-y-2">
                <p className="text-gray-700 font-medium text-sm">Tingkat Keyakinan Model:</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex-1 max-w-xs bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isDiabetes ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-2xl font-bold text-gray-800 min-w-[80px]">{confidence}%</span>
                </div>
              </div>
            </div>

            {/* Data Input yang Digunakan */}
            {formData && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Data Input Anda:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Pregnancies</p>
                    <p className="font-semibold text-gray-800 text-sm">{formData.pregnancies}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Glucose</p>
                    <p className="font-semibold text-gray-800 text-sm">{formData.glucose} mg/dL</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Blood Pressure</p>
                    <p className="font-semibold text-gray-800 text-sm">{formData.bloodPressure} mm Hg</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">BMI</p>
                    <p className="font-semibold text-gray-800 text-sm">{formData.bmi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Age</p>
                    <p className="font-semibold text-gray-800 text-sm">{formData.age} tahun</p>
                  </div>
                </div>
              </div>
            )}

            {/* Rekomendasi */}
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                <span className="text-lg">💡</span>
                Rekomendasi:
              </h4>
              {isDiabetes ? (
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-500 font-bold text-sm mt-0.5">•</span>
                    <span className="flex-1 text-sm">Segera konsultasikan hasil ini dengan dokter spesialis</span>
                  </li>
                  <li className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-500 font-bold text-sm mt-0.5">•</span>
                    <span className="flex-1 text-sm">
                      Lakukan pemeriksaan medis lebih lanjut (HbA1c, gula darah puasa)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                    <span className="text-red-500 font-bold text-sm mt-0.5">•</span>
                    <span className="flex-1 text-sm">Mulai perhatikan pola makan dan olahraga teratur</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-500 font-bold text-sm mt-0.5">•</span>
                    <span className="flex-1 text-sm">Pertahankan gaya hidup sehat Anda</span>
                  </li>
                  <li className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-500 font-bold text-sm mt-0.5">•</span>
                    <span className="flex-1 text-sm">
                      Lakukan pemeriksaan rutin secara berkala (minimal 1 tahun sekali)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-500 font-bold text-sm mt-0.5">•</span>
                    <span className="flex-1 text-sm">Tetap jaga pola makan seimbang dan aktivitas fisik</span>
                  </li>
                </ul>
              )}
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Catatan:</strong> Hasil ini hanya prediksi AI dan bukan diagnosis medis. Selalu konsultasikan
                  dengan dokter.
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/prediction")}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                <Activity className="w-4 h-4" />
                Prediksi Lagi
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                <Home className="w-4 h-4" />
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards - Compact Version */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1 text-xs">Akurat</h3>
            <p className="text-gray-600 text-xs">95% akurasi</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <Heart className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1 text-xs">Aman</h3>
            <p className="text-gray-600 text-xs">Data terjaga</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 text-center">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1 text-xs">Cepat</h3>
            <p className="text-gray-600 text-xs">Hasil instan</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

export default Result;
