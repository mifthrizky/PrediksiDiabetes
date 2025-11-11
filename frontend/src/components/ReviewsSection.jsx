import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Budi Santoso",
    title: "Pekerja Kantoran, 45",
    imageUrl: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    comment:
      "Aplikasi ini membuka mata saya. Saya tidak tahu saya berisiko tinggi. Sekarang saya bisa mengambil langkah pencegahan. Terima kasih!",
    verified: true,
  },
  {
    id: 2,
    name: "Citra Lestari",
    title: "Ibu Rumah Tangga, 38",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    comment:
      "Tampilannya sederhana dan mudah digunakan. Saya langsung mendapat hasil dalam hitungan detik. Sangat membantu untuk cek kesehatan keluarga.",
    verified: true,
  },
  {
    id: 3,
    name: "Agus Wijaya",
    title: "Mahasiswa, 22",
    imageUrl: "https://i.pravatar.cc/150?img=33",
    rating: 4,
    comment:
      "Saya menggunakan ini untuk proyek kuliah, tapi akhirnya saya jadi lebih sadar akan gaya hidup saya sendiri. Keren banget ada teknologi seperti ini.",
    verified: true,
  },
];

function ReviewsSection() {
  return (
    <section id="reviews" className="relative bg-white py-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Judul Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-current" />
            Testimoni Pengguna
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Apa Kata <span className="text-blue-600">Mereka?</span>
          </h2>
          <p className="text-xl text-gray-600">
            Lihat bagaimana aplikasi kami telah membantu ribuan pengguna memahami risiko kesehatan mereka.
          </p>
        </div>

        {/* Grid untuk Kartu Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-blue-600" />
              </div>

              {/* Bintang Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    } transition-all group-hover:scale-110`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
                {review.verified && (
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                    ✓ Verified
                  </span>
                )}
              </div>

              {/* Teks Komentar */}
              <p className="text-gray-700 text-base leading-relaxed mb-6 relative z-10">"{review.comment}"</p>

              {/* Info Pengguna */}
              <div className="flex items-center pt-4 border-t border-gray-200">
                <div className="relative">
                  <img
                    src={review.imageUrl}
                    alt={review.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-blue-200 group-hover:border-blue-400 transition-colors"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                  <p className="text-gray-600 text-sm">{review.title}</p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-200 rounded-tl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Pengguna Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Rating Rata-rata</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Tingkat Kepuasan</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Dukungan Tersedia</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Bergabunglah dengan ribuan pengguna yang telah merasakan manfaatnya</p>
          <a
            href="#form-prediksi"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Coba Sekarang Gratis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
