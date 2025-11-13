// File: frontend/src/components/Navbar.jsx
// (MODIFIKASI file Anda)

import React, { useState, useEffect } from "react";
// 1. Impor User dan LogOut
import { Menu, X, User, LogOut } from "lucide-react";
// 2. Impor Link dan useNavigate
import { Link, useNavigate } from "react-router-dom";
// 3. Impor hook useAuth yang ASLI
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 4. Gunakan hook dari context
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // 5. Buat fungsi handleLogout
  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari context
    navigate("/login"); // Arahkan ke halaman login
    setIsMobileMenuOpen(false); // Tutup menu mobile jika terbuka
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo (tetap sama) */}
          <Link
            to="/"
            className={`text-2xl font-bold flex items-center gap-2 transition-colors ${
              isScrolled ? "text-blue-600" : "text-blue-600"
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🩺</span>
            </div>
            <span className="hidden sm:block">DiabetesPredict</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" /* ... */>Tentang</a>
            <a href="#blog" /* ... */>Blog</a>
            <a href="#reviews" /* ... */>Ulasan</a>
            <Link to="/prediction" /* ... */>Mulai Prediksi</Link>

            {/* 6. LOGIKA KONDISIONAL UNTUK LOGIN/PROFIL */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile" // Arahkan ke halaman profil (buat jika perlu)
                  className="p-2.5 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  title="Profile"
                >
                  <User className="w-6 h-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-full text-gray-700 hover:bg-red-100 hover:text-red-600 transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button (tetap sama) */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-xl p-6 space-y-4 border border-gray-100">
            <a href="#about" /* ... */ onClick={handleNavClick}>
              About
            </a>
            <a href="#blog" /* ... */ onClick={handleNavClick}>
              Blog
            </a>
            <a href="#reviews" /* ... */ onClick={handleNavClick}>
              Reviews
            </a>
            <a href="#form-prediksi" /* ... */ onClick={handleNavClick}>
              Mulai Prediksi
            </a>

            {/* 7. LOGIKA KONDISIONAL UNTUK MOBILE MENU */}
            <div className="border-t pt-4 space-y-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left font-medium text-red-600 hover:bg-red-50 py-2 px-3 rounded-lg transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="block bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-200 transition-all"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
