// src/components/ReviewsSection.jsx

import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import ikon bintang

// Data testimoni palsu (dummy)
const reviews = [
  {
    id: 1,
    name: 'Budi Santoso',
    title: 'Pekerja Kantoran, 45',
    imageUrl: 'https://placehold.co/100x100/EBF4FF/3B82F6?text=BS', // Placeholder foto profil
    rating: 5,
    comment:
      '"Aplikasi ini membuka mata saya. Saya tidak tahu saya berisiko tinggi. Sekarang saya bisa mengambil langkah pencegahan. Terima kasih!"',
  },
  {
    id: 2,
    name: 'Citra Lestari',
    title: 'Ibu Rumah Tangga, 38',
    imageUrl: 'https://placehold.co/100x100/FFFBEB/F59E0B?text=CL',
    rating: 5,
    comment:
      '"Tampilannya sederhana dan mudah digunakan. Saya langsung mendapat hasil dalam hitungan detik. Sangat membantu untuk cek kesehatan keluarga."',
  },
  {
    id: 3,
    name: 'Agus Wijaya',
    title: 'Mahasiswa, 22',
    imageUrl: 'https://placehold.co/100x100/F0FFF4/10B981?text=AW',
    rating: 4,
    comment:
      '"Saya menggunakan ini untuk proyek kuliah, tapi akhirnya saya jadi lebih sadar akan gaya hidup saya sendiri. Keren banget ada teknologi seperti ini."',
  },
];

function ReviewsSection() {
  return (
    // Kita gunakan background putih untuk variasi
    <section id="reviews" className="bg-white py-20 px-4">
      <div className="container mx-auto">
        
        {/* Judul Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-lg text-gray-600">
            Lihat bagaimana aplikasi kami telah membantu pengguna lain.
          </p>
        </div>

        {/* Grid untuk Kartu Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-100"
            >
              {/* Bintang Rating */}
              <div className="flex items-center mb-4">
                {/* Buat 5 bintang */}
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              
              {/* Teks Komentar */}
              <p className="text-gray-600 text-lg italic mb-6">
                {review.comment}
              </p>
              
              {/* Info Pengguna */}
              <div className="flex items-center">
                <img 
                  src={review.imageUrl} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{review.name}</h4>
                  <p className="text-gray-500 text-sm">{review.title}</p>
                </div>
              </div>
            </div>
          ))}
          
        </div>

      </div>
    </section>
  );
}

export default ReviewsSection;