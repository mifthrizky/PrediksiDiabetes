import React from "react";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "5 Mitos Tentang Diabetes yang Perlu Anda Ketahui",
    category: "Kesehatan",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    excerpt: "Banyak informasi keliru beredar. Mari kita luruskan fakta dan mitos seputar diabetes...",
    author: "Dr. Sarah Williams",
    date: "15 Nov 2024",
    readTime: "5 min",
    categoryColor: "blue",
  },
  {
    id: 2,
    title: "Peran AI dalam Mendeteksi Risiko Penyakit",
    category: "Teknologi",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    excerpt: "Machine Learning bukan lagi fiksi ilmiah. Lihat bagaimana teknologi ini merevolusi dunia medis...",
    author: "Michael Chen",
    date: "12 Nov 2024",
    readTime: "7 min",
    categoryColor: "purple",
  },
  {
    id: 3,
    title: "Panduan Pemula: Pola Makan Sehat untuk Mencegah Diabetes",
    category: "Gaya Hidup",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    excerpt: "Mengubah pola makan tidak harus sulit. Mulailah dari langkah-langkah kecil ini...",
    author: "Emma Rodriguez",
    date: "10 Nov 2024",
    readTime: "6 min",
    categoryColor: "green",
  },
];

function BlogSection() {
  return (
    <section id="blog" className="relative bg-gradient-to-b from-gray-50 to-white py-24 px-4">
      <div className="container mx-auto">
        {/* Judul dan Subjudul Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Artikel Terbaru
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Dari <span className="text-blue-600">Blog Kami</span>
          </h2>
          <p className="text-xl text-gray-600">
            Baca artikel terbaru kami seputar kesehatan, teknologi, dan gaya hidup untuk hidup lebih sehat.
          </p>
        </div>

        {/* Grid untuk Kartu Blog */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Gambar Artikel dengan Overlay */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category Badge */}
                <span
                  className={`absolute top-4 left-4 bg-${post.categoryColor}-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide`}
                >
                  {post.category}
                </span>
              </div>

              {/* Konten Teks Artikel */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-base mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-700 font-medium">{post.author}</span>

                  {/* Link "Baca Selengkapnya" */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all group/link"
                  >
                    Baca
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg border-2 border-blue-600"
          >
            Lihat Semua Artikel
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

export default BlogSection;
