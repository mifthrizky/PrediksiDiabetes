import React from "react";
import { Search, Shield, Heart, Apple, Wallet, Smile } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Deteksi Dini",
    description: "Identifikasi risiko Anda sebelum gejala muncul, memberikan Anda waktu untuk bertindak.",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "Pencegahan Proaktif",
    description: "Dengan data, Anda bisa mengambil langkah pencegahan yang terbukti secara ilmiah.",
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Heart,
    title: "Ketenangan Pikiran",
    description: "Mengurangi kecemasan dengan mengetahui status risiko kesehatan Anda secara jelas.",
    color: "red",
    gradient: "from-red-500 to-red-600",
  },
  {
    icon: Apple,
    title: "Gaya Hidup Terarah",
    description: "Dapatkan motivasi untuk memperbaiki pola makan dan olahraga berdasarkan data.",
    color: "green",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: Wallet,
    title: "Hemat Biaya",
    description: "Mencegah lebih murah daripada mengobati. Hindari biaya perawatan jangka panjang.",
    color: "amber",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    icon: Smile,
    title: "Kualitas Hidup",
    description: "Nikmati hidup yang lebih sehat dan berkualitas bersama orang-orang tercinta.",
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
  },
];

function Features() {
  return (
    <section id="about" className="relative bg-white py-24 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Judul dan Subjudul Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Mengapa Memilih Kami
            </span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Dampak Kecil, <span className="text-blue-600">Perubahan Besar</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Mengetahui risiko Anda lebih awal adalah langkah pertama menuju gaya hidup yang lebih sehat dan tenang.
          </p>
        </div>

        {/* Grid untuk 6 Fitur */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <div className="relative">
                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="text-white w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  {/* Hover arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-blue-600 font-semibold inline-flex items-center gap-2">
                      Pelajari lebih lanjut
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#form-prediksi"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Mulai Cek Risiko Anda Sekarang
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Features;
