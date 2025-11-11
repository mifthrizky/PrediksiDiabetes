import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ArrowUp, Heart } from "lucide-react";

function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Decorative wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="md:col-span-1">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-4 hover:text-blue-400 transition-colors"
              onClick={scrollToTop}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🩺</span>
              </div>
              DiabetesPredict
            </a>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Membantu Anda memahami risiko kesehatan dengan kekuatan data dan AI untuk hidup yang lebih sehat.
            </p>

            {/* Sosial Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
              >
                <Facebook className="w-5 h-5 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-all duration-300 hover:scale-110 group"
              >
                <Twitter className="w-5 h-5 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 group"
              >
                <Instagram className="w-5 h-5 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-5 h-5 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h5 className="font-bold text-white mb-6 text-lg relative inline-block">
              Navigasi
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600 rounded"></span>
            </h5>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  About
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-blue-400 transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-blue-400 transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#form-prediksi"
                  className="hover:text-blue-400 transition-colors inline-flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Mulai Prediksi
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Legal */}
          <div>
            <h5 className="font-bold text-white mb-6 text-lg relative inline-block">
              Legal
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600 rounded"></span>
            </h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all mr-0 group-hover:mr-2"></span>
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h5 className="font-bold text-white mb-6 text-lg relative inline-block">
              Kontak Kami
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-600 rounded"></span>
            </h5>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@diabetespredict.com"
                  className="hover:text-blue-400 transition-colors flex items-start gap-3 group"
                >
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>info@diabetespredict.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-blue-400" />
                <span>Jl. Teknologi No. 1, Bandung, Indonesia</span>
              </li>
              <li>
                <a
                  href="tel:+621234567890"
                  className="hover:text-blue-400 transition-colors flex items-start gap-3 group"
                >
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+62 123 4567 890</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} DiabetesPredict. All rights reserved. Made with{" "}
              <Heart className="w-4 h-4 inline text-red-500 fill-current" /> in Indonesia
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-sm font-medium">Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
