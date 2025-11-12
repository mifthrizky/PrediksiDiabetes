import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. IMPORT DIPERBAIKI (UserPlus & Mail ditambahkan)
import { User, Lock, UserPlus, Mail, Eye, EyeOff } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    full_name: "", 
    password: "",
    confirmPassword: "",
  });
  
  // 2. TAMBAHKAN STATE KEDUA UNTUK SHOW/HIDE
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // <-- INI BARU

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiError(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    // --- Validasi Sisi Klien ---
    if (formData.password !== formData.confirmPassword) {
      setApiError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }
    if (formData.password.length < 6) {
      setApiError("Password minimal harus 6 karakter.");
      return;
    }

    setIsLoading(true);

    const API_URL = "http://localhost:8000/register";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          full_name: formData.full_name,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Terjadi kesalahan saat registrasi.");
      }

      setSuccessMessage(
        "Akun berhasil dibuat! Anda akan diarahkan ke halaman Login."
      );
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Signup failed:", error);
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50 p-6 py-24">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6" /> {/* <-- Sekarang ini akan tampil */}
              </div>
              Buat Akun Baru
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Input Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Nama Lengkap
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50"
              />
            </div>

            {/* Input Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" /> {/* <-- Ikon Mail */}
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Contoh: budi"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50"
              />
            </div>
            
            {/* Input Password (Sudah Benar) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 6 karakter"
                  required
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50"
                />
                <button
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-12 text-gray-500 hover:text-blue-600"
                  aria-label="Tampilkan password"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 3. PERBAIKI INPUT KONFIRMASI PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                Konfirmasi Password
              </label>
              <div className="relative"> {/* <-- Tambahkan wrapper relative */}
                <input
                  type={showConfirmPassword ? "text" : "password"} // <-- Gunakan state baru
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password Anda"
                  required
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50" // <-- Tambah pr-12
                />
                {/* <-- Tambahkan tombol ikon */}
                <button
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // <-- Gunakan setter baru
                  className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-12 text-gray-500 hover:text-blue-600"
                  aria-label="Tampilkan konfirmasi password"
                >
                  {showConfirmPassword ? ( // <-- Gunakan state baru
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading || successMessage}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Mendaftarkan...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Daftar
                </>
              )}
            </button>

            {/* Link ke Login */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                  Login di sini
                </Link>
              </span>
            </div>

            {/* Tampilkan pesan Error API jika ada */}
            {apiError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                <strong>Gagal Mendaftar:</strong> {apiError}
              </div>
            )}
            
            {/* Tampilkan pesan Sukses jika ada */}
            {successMessage && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
                <strong>Sukses!</strong> {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;