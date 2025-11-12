import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
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
            <a
              href="#about"
              className={`font-medium transition-all hover:text-blue-600 relative group ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Tentang
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#blog"
              className={`font-medium transition-all hover:text-blue-600 relative group ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#reviews"
              className={`font-medium transition-all hover:text-blue-600 relative group ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Ulasan
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <Link
              to="/prediction"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Mulai Prediksi
            </Link>
          </div>

          {/* Mobile Menu Button */}
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
            <a
              href="#about"
              className="block font-medium text-gray-700 hover:text-blue-600 py-2 transition-colors"
              onClick={handleNavClick}
            >
              About
            </a>
            <a
              href="#blog"
              className="block font-medium text-gray-700 hover:text-blue-600 py-2 transition-colors"
              onClick={handleNavClick}
            >
              Blog
            </a>
            <a
              href="#reviews"
              className="block font-medium text-gray-700 hover:text-blue-600 py-2 transition-colors"
              onClick={handleNavClick}
            >
              Reviews
            </a>
            <a
              href="#form-prediksi"
              className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md"
              onClick={handleNavClick}
            >
              Mulai Prediksi
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
