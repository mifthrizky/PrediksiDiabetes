import { useState } from "react";
import { Activity, Droplet, Heart, User, Calculator, Calendar, Scale, Ruler } from "lucide-react";

// Komponen utama form prediksi
function PredictionForm() {
  // State untuk menyimpan data form
  const [form, setForm] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    weight: "", // Diubah dari bmi
    height: "", // Input baru
    age: "",
  });

  // State untuk hasil prediksi
  const [result, setResult] = useState(null); // "Diabetes" atau "Tidak Diabetes"
  const [confidence, setConfidence] = useState(null); // Nilai persentase
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null); // State untuk error API

  // Menangani perubahan input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null); // Selalu reset error di awal
    setResult(null); // Reset hasil sebelumnya

    // --- VALIDASI TAMBAHAN ---
    // Cek apakah ada field yang masih kosong
    const isFormIncomplete = Object.values(form).some(value => value === "");
    if (isFormIncomplete) {
      // PERBAIKAN: Ganti 'alert' dengan 'setApiError'
      setApiError("Harap isi semua field sebelum melakukan prediksi.");
      return; // Hentikan eksekusi jika form tidak lengkap
    }
    // --- AKHIR VALIDASI ---

    setIsLoading(true);

    // --- PERHITUNGAN BMI ---
    const weightKg = parseFloat(form.weight);
    const heightCm = parseFloat(form.height);
    let calculatedBmi;

    if (heightCm <= 0 || weightKg <= 0) {
        setApiError("Tinggi (cm) dan Berat Badan (kg) harus diisi dengan nilai positif.");
        setIsLoading(false);
        return;
    }

    const heightM = heightCm / 100;
    calculatedBmi = weightKg / (heightM * heightM);

    if (!isFinite(calculatedBmi)) {
        setApiError("Gagal menghitung BMI. Periksa kembali input Tinggi dan Berat Badan.");
        setIsLoading(false);
        return;
    }
    // --- AKHIR PERHITUNGAN BMI ---

    // URL Backend FastAPI Anda (pastikan port-nya benar, default uvicorn 8000)
    const API_URL = "http://localhost:8000/predict";

    // Konversi nilai form dari string ke angka
    const formData = {
        pregnancies: parseInt(form.pregnancies),
        glucose: parseFloat(form.glucose),
        bloodPressure: parseFloat(form.bloodPressure),
        bmi: parseFloat(calculatedBmi.toFixed(2)), // Menggunakan BMI yang dihitung
        age: parseInt(form.age)
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Tangani jika respons server tidak OK (misal: error 500)
        const errorData = await response.json().catch(() => ({})); // Coba parse error
        throw new Error(`Gagal menghubungi server: ${response.statusText} (Status: ${response.status}) - ${errorData.detail || 'No details'}`);
      }

      const data = await response.json();

      if (data.error) {
        // Tangani jika API mengembalikan pesan error (misal: model tidak terload)
        throw new Error(data.error);
      }

      // Set state dengan hasil prediksi dari backend
      setResult(data.prediction); // "Diabetes" atau "Tidak Diabetes"
      // Konversi confidence (misal: 0.95) menjadi persentase (95.00)
      setConfidence((data.confidence * 100).toFixed(2));

    } catch (error) {
      // Tangani error jaringan atau error dari throw di atas
      console.error("Terjadi kesalahan saat prediksi:", error);
      setApiError(error.message);
    } finally {
      // Pastikan loading dimatikan apapun yang terjadi
      setIsLoading(false);
    }
  };

  // Menangani reset form
  const handleReset = () => {
    setForm({
      pregnancies: "",
      glucose: "",
      bloodPressure: "",
      weight: "", // Diubah dari bmi
      height: "", // Input baru
      age: "",
    });
    setResult(null);
    setConfidence(null);
    setApiError(null);
    setIsLoading(false);
  };

  // Konfigurasi untuk input fields
  const inputFields = [
    {
      name: "pregnancies",
      label: "Pregnancies",
      placeholder: "Contoh: 2",
      type: "number",
      icon: User,
      tooltip: "Jumlah kehamilan yang pernah dialami",
    },
    {
      name: "glucose",
      label: "Glucose",
      placeholder: "Contoh: 120",
      type: "number",
      icon: Droplet,
      tooltip: "Konsentrasi glukosa plasma (mg/dL)",
    },
    {
      name: "bloodPressure",
      label: "Blood Pressure",
      placeholder: "Contoh: 80",
      type: "number",
      icon: Heart,
      tooltip: "Tekanan darah diastolik (mm Hg)",
    },
    {
      name: "weight", // BARU: Menggantikan BMI
      label: "Body weight (kg)",
      placeholder: "Contoh: 70",
      type: "number",
      step: "0.1",
      icon: Scale, // Icon baru (pastikan diimpor)
      tooltip: "Berat badan Anda dalam kilogram (kg)",
    },
    {
      name: "height", // BARU: Input kedua
      label: "Body Height (cm)",
      placeholder: "Contoh: 165",
      type: "number",
      step: "1",
      icon: Ruler, // Icon baru (pastikan diimpor)
      tooltip: "Tinggi badan Anda dalam sentimeter (cm)",
    },
    {
      name: "age",
      label: "Age (Umur)",
      placeholder: "Contoh: 45",
      type: "number",
      icon: Calendar,
      tooltip: "Umur dalam tahun",
    },
  ];

  return (
    <section
      id="form-prediksi"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50 p-6 py-24"
    >
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Activity className="w-4 h-4" />
            Teknologi AI & Machine Learning
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Cek Risiko <span className="text-blue-600">Diabetes Anda</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Isi data kesehatan Anda di bawah ini untuk mendapatkan prediksi risiko diabetes secara instan
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">🩺</div>
              Form Prediksi
            </h2>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              {/* Grid untuk Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inputFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.name} className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-blue-600" />
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          step={field.step}
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50 hover:bg-white transition-all duration-200"
                        />
                        {/* Tooltip */}
                        <div className="absolute left-0 -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-gray-500 italic">
                          {field.tooltip}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tombol Actions */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      Prediksi Sekarang
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </div>
            
            {/* Tampilkan pesan Error API jika ada */}
            {apiError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                <strong>Gagal Prediksi:</strong> {apiError}
              </div>
            )}

            {/* Hasil Prediksi */}
            {result && (
              <div className="mt-8 p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-blue-100 animate-fadeIn">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    ✓ Prediksi Selesai
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Hasil Prediksi:</h3>

                  {/* Result Badge */}
                  <div
                    className={`inline-block px-8 py-4 rounded-2xl mb-4 ${
                      result === "Diabetes"
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                        : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                    }`}
                  >
                    <p className="text-3xl font-bold">{result}</p>
                  </div>

                  {/* Confidence Score */}
                  <div className="mt-6 space-y-3">
                    <p className="text-gray-700 font-medium">Tingkat Keyakinan Model:</p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex-1 max-w-md bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            result === "Diabetes" ? "bg-red-500" : "bg-green-500"
                          }`}
                          style={{ width: `${confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-2xl font-bold text-gray-800 min-w-[80px]">{confidence}%</span>
                    </div>
                  </div>

                  {/* Rekomendasi */}
                  <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 text-left">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-xl">💡</span>
                      Rekomendasi:
                    </h4>
                    {result === "Diabetes" ? (
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Segera konsultasikan hasil ini dengan dokter</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Lakukan pemeriksaan medis lebih lanjut</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Mulai perhatikan pola makan dan olahraga teratur</span>
                        </li>
                      </ul>
                    ) : (
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">•</span>
                          <span>Pertahankan gaya hidup sehat Anda</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">•</span>
                          <span>Lakukan pemeriksaan rutin secara berkala</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">•</span>
                          <span>Tetap jaga pola makan dan aktivitas fisik</span>
                        </li>
                      </ul>
                    )}
                  </div>

                  {/* Disclaimer */}
                  <p className="mt-6 text-sm text-gray-500 italic">
                    ⚠️ Catatan: Hasil ini hanya prediksi dan bukan diagnosis medis. Selalu konsultasikan dengan
                    profesional kesehatan.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Akurat</h3>
            <p className="text-gray-600 text-sm">Model dengan akurasi 95% untuk prediksi risiko diabetes</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Cepat</h3>
            <p className="text-gray-600 text-sm">Hasil prediksi dalam hitungan detik</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Gratis</h3>
            <p className="text-gray-600 text-sm">100% gratis tanpa biaya tersembunyi</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

export default PredictionForm;