import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Anda bisa styling nanti

function App() {
  // State untuk menyimpan nilai input form
  const [features, setFeatures] = useState({
    sepal_length: 5.1,
    sepal_width: 3.5,
    petal_length: 1.4,
    petal_width: 0.2,
  });

  // State untuk menyimpan hasil prediksi
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // URL API FastAPI (pastikan backend Anda berjalan di port 8000)
  const API_URL = "http://127.0.0.1:8000/predict";

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures({
      ...features,
      [name]: parseFloat(value), // Konversi nilai ke float
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setPrediction(null); // Reset prediksi sebelumnya
    setError(null); // Reset error

    try {
      // Kirim request POST ke FastAPI dengan data features
      const response = await axios.post(API_URL, features);

      // Simpan hasil prediksi ke state
      setPrediction(response.data);
    } catch (err) {
      console.error("Terjadi error saat prediksi:", err);
      setError("Tidak dapat terhubung ke server. Pastikan backend berjalan.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prediktor Spesies Iris 🌸</h1>
        <form onSubmit={handleSubmit} className="iris-form">
          <div className="form-group">
            <label>Sepal Length (cm)</label>
            <input type="number" step="0.1" name="sepal_length" value={features.sepal_length} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Sepal Width (cm)</label>
            <input type="number" step="0.1" name="sepal_width" value={features.sepal_width} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Petal Length (cm)</label>
            <input type="number" step="0.1" name="petal_length" value={features.petal_length} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Petal Width (cm)</label>
            <input type="number" step="0.1" name="petal_width" value={features.petal_width} onChange={handleChange} />
          </div>
          <button type="submit">Prediksi</button>
        </form>

        {/* Tampilkan hasil prediksi */}
        {prediction && (
          <div className="result">
            <h2>Hasil Prediksi:</h2>
            <p>
              Spesies: <strong>{prediction.prediction}</strong>
            </p>
            <p>
              Keyakinan (Confidence):
              <strong> {(prediction.confidence * 100).toFixed(2)}%</strong>
            </p>
          </div>
        )}

        {/* Tampilkan error jika ada */}
        {error && <div className="error">{error}</div>}
      </header>
    </div>
  );
}

export default App;
