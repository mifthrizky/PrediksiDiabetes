import React from "react";
import { Sparkles, TrendingDown, Shield } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-blue-50 via-amber-50 to-blue-100 pt-24 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 pb-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Teks */}
          <div className="text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Didukung oleh AI & Machine Learning
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Prediksi Risiko Diabetes
              <span className="block text-blue-600 mt-2">Sejak Dini</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Gunakan teknologi Machine Learning terdepan untuk menganalisis data kesehatan Anda dan dapatkan prediksi
              risiko diabetes secara instan dengan akurasi tinggi.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Akurasi Model</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Pengguna Aktif</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/prediction" // <-- 2. Ganti href menjadi "to"
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
              >
                Mulai Prediksi Sekarang
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <a
                href="#about"
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Ilustrasi dengan Card */}
          <div className="relative">
            {/* Floating Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-amber-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Hasil Instan</h3>
                  <p className="text-gray-600">Dapatkan analisis dalam hitungan detik</p>
                </div>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">Fast</div>
                  <div className="text-xs text-gray-600">Cepat</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">Safe</div>
                  <div className="text-xs text-gray-600">Aman</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <div className="text-xl font-bold text-amber-600">Free</div>
                  <div className="text-xs text-gray-600">Gratis</div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400 rounded-full animate-bounce opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-400 rounded-full animate-pulse opacity-20"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

export default Hero;
