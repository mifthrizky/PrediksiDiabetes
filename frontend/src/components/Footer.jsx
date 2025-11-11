// src/components/Footer.jsx

import React from 'react';
// Import ikon sosial media
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Kolom 1: Logo & Sosial Media */}
          <div className="md:col-span-1">
            <a 
              href="#" 
              className="text-2xl font-bold text-white"
              onClick={(e) => { // Fungsi scroll ke atas
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              🩺 DiabetesPredict
            </a>
            <p className="mt-4 text-sm">
              Membantu Anda memahami risiko kesehatan dengan kekuatan data dan AI.
            </p>
            {/* Ikon Sosial Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-white"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-white"><FaLinkedin size={20} /></a>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h5 className="font-bold text-white mb-4">Navigasi</h5>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#blog" className="hover:text-white">Blog</a></li>
              <li><a href="#reviews" className="hover:text-white">Reviews</a></li>
              <li><a href="#form-prediksi" className="hover:text-white">Mulai Prediksi</a></li>
            </ul>
          </div>

          {/* Kolom 3: Legal */}
          <div>
            <h5 className="font-bold text-white mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h5 className="font-bold text-white mb-4">Kontak Kami</h5>
            <ul className="space-y-2">
              <li><a href="mailto:info@diabetespredict.com" className="hover:text-white">info@diabetespredict.com</a></li>
              <li><p>Jl. Teknologi No. 1, Bandung</p></li>
              <li><p>+62 123 4567 890</p></li>
            </ul>
          </div>

        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} DiabetesPredict. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;