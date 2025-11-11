import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    insulin: "",
    bmi: "",
    dpf: "",
    age: "",
  });
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi hasil prediksi
    const random = Math.random();
    const prediction = random > 0.5 ? "Diabetes" : "Tidak Diabetes";
    const conf = (random * 100).toFixed(2);
    setResult(prediction);
    setConfidence(conf);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-white p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-teal-100">
        <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          🩺 Prediksi Risiko Diabetes
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input: Insulin */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Insulin
            </label>
            <input
              type="number"
              name="insulin"
              value={form.insulin}
              onChange={handleChange}
              placeholder="Contoh: 85"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 focus:outline-none text-gray-800 bg-white"
            />
          </div>

          {/* Input: BMI */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              BMI
            </label>
            <input
              type="number"
              name="bmi"
              value={form.bmi}
              onChange={handleChange}
              placeholder="Contoh: 28.5"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 focus:outline-none text-gray-800 bg-white"
            />
          </div>

          {/* Input: Diabetes Pedigree Function */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Diabetes Pedigree Function
            </label>
            <input
              type="number"
              step="0.001"
              name="dpf"
              value={form.dpf}
              onChange={handleChange}
              placeholder="Contoh: 0.372"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 focus:outline-none text-gray-800 bg-white"
            />
          </div>

          {/* Input: Umur */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Umur (Age)
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Contoh: 45"
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 focus:outline-none text-gray-800 bg-white"
            />
          </div>

          {/* Tombol Prediksi */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-sm"
          >
            Prediksi
          </button>
        </form>

        {/* Hasil Prediksi */}
        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Hasil Prediksi:
            </h2>
            <p
              className={`text-2xl font-bold mt-2 ${
                result === "Diabetes" ? "text-red-500" : "text-green-600"
              }`}
            >
              {result}
            </p>
            <p className="text-gray-600 mt-1">
              Keyakinan Model:{" "}
              <span className="font-semibold">{confidence}%</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
