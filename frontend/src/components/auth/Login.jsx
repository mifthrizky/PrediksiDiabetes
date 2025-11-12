import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Impor Eye dan EyeOff
import { User, Lock, LogIn, Eye, EyeOff } from "lucide-react";

// (Opsional) Jika Anda membuat AuthContext, impor di sini
// import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  
  // (Opsional) Ambil fungsi login dari konteks Anda
  // const { login } = useAuth(); 

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  
  // 2. Tambahkan state untuk show/hide password
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setIsLoading(true);

    const API_URL = "http://localhost:8000/token";

    // Data form-urlencoded untuk endpoint /token
    const body = new URLSearchParams();
    body.append("username", formData.username);
    body.append("password", formData.password);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Terjadi kesalahan saat login.");
      }

      // --- LOGIN SUKSES ---
      localStorage.setItem("user_token", data.access_token);
      // (Opsional) panggil fungsi login global Anda dari Context
      // await login(data.access_token);
      
      navigate("/"); // Arahkan ke Dashboard

    } catch (error) {
      console.error("Login failed:", error);
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
                <LogIn className="w-6 h-6" />
              </div>
              Selamat Datang Kembali
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Input Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username Anda"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50"
              />
            </div>

            {/* 3. MODIFIKASI BLOK PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Tipe dinamis
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password Anda"
                  required
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50" // Tambah pr-12
                />
                {/* Tombol Ikon Toggle */}
                <button
                  type="button" // Wajib type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-12 text-gray-500 hover:text-blue-600"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
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
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </button>

            {/* Link ke Register */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Belum punya akun?{" "}
                <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
                  Daftar di sini
                </Link>
              </span>
            </div>

            {/* Tampilkan pesan Error API jika ada */}
            {apiError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                <strong>Gagal Login:</strong> {apiError}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;