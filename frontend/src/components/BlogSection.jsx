// src/components/BlogSection.jsx

import React from 'react';

// Data blog palsu (dummy)
const blogPosts = [
  {
    id: 1,
    title: '5 Mitos Tentang Diabetes yang Perlu Anda Ketahui',
    category: 'Kesehatan',
    imageUrl: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=Blog+1',
    excerpt: 'Banyak informasi keliru beredar. Mari kita luruskan fakta dan mitos seputar diabetes...',
  },
  {
    id: 2,
    title: 'Peran AI dalam Mendeteksi Risiko Penyakit',
    category: 'Teknologi',
    imageUrl: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=Blog+2',
    excerpt: 'Machine Learning bukan lagi fiksi ilmiah. Lihat bagaimana teknologi ini merevolusi dunia medis...',
  },
  {
    id: 3,
    title: 'Panduan Pemula: Pola Makan Sehat untuk Mencegah Diabetes',
    category: 'Gaya Hidup',
    imageUrl: 'https://placehold.co/600x400/10B981/FFFFFF?text=Blog+3',
    excerpt: 'Mengubah pola makan tidak harus sulit. Mulailah dari langkah-langkah kecil ini...',
  },
];

function BlogSection() {
  return (
    // Kita gunakan background cream (amber-50) agar seragam
    <section id="blog" className="bg-amber-50 py-20 px-4">
      <div className="container mx-auto">
        
        {/* Judul dan Subjudul Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Dari Blog Kami
          </h2>
          <p className="text-lg text-gray-600">
            Baca artikel terbaru kami seputar kesehatan, teknologi, dan
            gaya hidup.
          </p>
        </div>

        {/* Grid untuk Kartu Blog */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kita akan 'map' (looping) data blog palsu kita */}
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              {/* Gambar Artikel */}
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-48 object-cover" 
              />
              
              {/* Konten Teks Artikel */}
              <div className="p-6 flex-grow">
                <span className="text-blue-600 text-sm font-semibold">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold my-2 text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-base">
                  {post.excerpt}
                </p>
              </div>
              
              {/* Link "Baca Selengkapnya" */}
              <div className="p-6 pt-0">
                <a 
                  href="#" 
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Baca Selengkapnya &rarr;
                </a>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default BlogSection;