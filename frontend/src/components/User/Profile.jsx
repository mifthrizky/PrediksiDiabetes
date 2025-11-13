// File: frontend/src/components/Profile.jsx
// (KODE LENGKAP)

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertTriangle, List, Clock } from "lucide-react";

// Komponen utama Halaman Profil
function Profile() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, logout, user } = useAuth(); // Ambil token, logout, dan user
  const navigate = useNavigate();

  // Efek untuk mengambil data log saat komponen dimuat
  useEffect(() => {
    const fetchLogs = async () => {
      // Pastikan token ada
      if (!token) {
        setError("Anda tidak terautentikasi.");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        // Panggil endpoint
        const response = await fetch("http://localhost:8000/users/me/prediction-logs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Tangani jika token kedaluwarsa atau tidak valid
        if (response.status === 401) {
          setError("Sesi Anda telah berakhir. Silakan login kembali.");
          logout();
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Gagal mengambil data: ${response.statusText}`);
        }

        const data = await response.json();
        setLogs(data); // Simpan data log
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError(
          "Gagal memuat riwayat. Pastikan backend Anda berjalan dan endpoint /users/me/prediction-logs sudah ada."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [token, logout, navigate]); // Dependensi

  const handleDeleteLog = async (logId) => {
    if (!token) return;
    if (!window.confirm("Anda yakin ingin menghapus log ini?")) return;
    try {
      const res = await fetch(`http://localhost:8000/users/me/prediction-logs/${logId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 204) {
        setLogs((prev) => prev.filter((l) => l.id !== logId));
      } else {
        alert("Gagal menghapus log.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus log.");
    }
  };

  // 1. Tampilan saat Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <span className="text-lg text-gray-700">Memuat Riwayat Anda...</span>
        </div>
      </div>
    );
  }

  // 2. Tampilan jika ada Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-700 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // 3. Tampilan Sukses (dengan atau tanpa data)
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 p-6 py-24 pt-32">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Halo, <span className="text-blue-600">{user?.username || "Pengguna"}</span>!
          </h1>
          <p className="text-xl text-gray-600">
            Berikut adalah riwayat pengecekan risiko diabetes yang pernah Anda lakukan.
          </p>
        </div>

        {/* Cek jika tidak ada log (Empty State) */}
        {logs.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-xl shadow-md border border-gray-100">
            <List className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Riwayat Kosong</h3>
            <p className="text-gray-500 mb-6">Anda belum pernah melakukan prediksi.</p>
            <button
              onClick={() => navigate("/prediction")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Mulai Prediksi Sekarang
            </button>
          </div>
        ) : (
          // Tampilkan tabel jika ada log
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Waktu
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Hasil Prediksi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Kehamilan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Glukosa
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Tek. Darah
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      BMI
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Umur
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {/* Format tanggal agar mudah dibaca */}
                          {new Date(log.timestamp).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                        {/* --- INI ADALAH PERBAIKANNYA --- */}
                        {log.prediction_name === "Diabetes" ? (
                          <span className="px-3 py-1 rounded-full bg-red-100 text-red-800">Terdeteksi Diabetes</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">Sehat</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.pregnancies}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.glucose}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.bloodPressure}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.bmi}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDeleteLog(log.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;
