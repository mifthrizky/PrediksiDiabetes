from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os
import pandas as pd
from dotenv import load_dotenv 

# --- Konfigurasi Aplikasi ---

# 2. Muat environment variables dari file .env
# Panggil ini SEBELUM Anda mencoba mengakses variabelnya
load_dotenv()

app = FastAPI(title="API Prediksi Diabetes ML (5 Fitur)")

# 3. Konfigurasi CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    # Anda mungkin ingin menambahkan domain frontend Anda yang sudah di-deploy di sini
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Memuat Model & Scaler ---
MODEL_PATH = os.getenv("MODEL_PATH", "./backend/models/diabetes_model_5_fitur.joblib")
SCALER_PATH = os.getenv("SCALER_PATH", "./backend/models/diabetes_scaler_5_fitur.joblib")

model = None
scaler = None

# ... (Sisa file main.py tidak berubah) ...
if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        print(f"Model 5 Fitur dan Scaler berhasil dimuat dari {MODEL_PATH} dan {SCALER_PATH}.")
    except Exception as e:
        print(f"ERROR: Gagal memuat model atau scaler. Kesalahan: {e}")
else:
    print(f"PERINGATAN: Tidak dapat menemukan model di '{MODEL_PATH}' atau scaler di '{SCALER_PATH}'.")
    print(f"Pastikan Anda menjalankan uvicorn dari direktori root proyek yang benar.")
    print(f"Cek juga apakah path di variabel MODEL_PATH dan SCALER_PATH sudah benar.")


# 2. Tentukan nama fitur SAMA PERSIS seperti saat melatih scaler
# (dari notebook). Urutan ini SANGAT PENTING.
EXPECTED_FEATURE_NAMES = ['Pregnancies', 'Glucose', 'BloodPressure', 'BMI', 'Age']


# --- Model Data Input (Pydantic) ---
# Menerima 5 field
class DiabetesFeatures(BaseModel):
    pregnancies: int
    glucose: float
    bloodPressure: float
    bmi: float
    age: int

# --- API Endpoints ---

@app.get("/")
def read_root():
    """
    Endpoint root untuk mengecek apakah API berjalan dan status model.
    """
    # Cek apakah variabel model dan scaler sudah berhasil diisi
    model_loaded_status = (model is not None) and (scaler is not None)
    
    return {
        "message": "Selamat datang di API Prediksi Diabetes ",
        "model_loaded": model_loaded_status
    }

@app.post("/predict")
async def predict_diabetes(features: DiabetesFeatures):
    """
    Endpoint untuk memprediksi diabetes berdasarkan 5 fitur.
    """
    if model is None or scaler is None:
        # Mengembalikan status error 503 Service Unavailable jika model tidak siap
        return {"error": "Model atau Scaler (5 Fitur) belum dimuat. Cek log server backend."}

    try:
        # --- BAGIAN INI DISESUAIKAN UNTUK 5 FITUR ---
        
        # 1. Konversi data Pydantic ke array numpy 2D
        data_array = np.array([[
            features.pregnancies,
            features.glucose,
            features.bloodPressure,
            features.bmi,
            features.age
        ]])
        
        # 2. Konversi ke DataFrame DENGAN NAMA FITUR YANG BENAR
        # Ini akan menghilangkan UserWarning dari Scikit-learn
        data_df = pd.DataFrame(data_array, columns=EXPECTED_FEATURE_NAMES)
        
        # ---------------------------------------------

        # 3. Lakukan Scaling pada data input (DataFrame)
        data_scaled = scaler.transform(data_df)

        # 4. Lakukan Prediksi (menggunakan model 5 fitur)
        prediction = model.predict(data_scaled)
        prediction_proba = model.predict_proba(data_scaled) # Probabilitas untuk [kelas_0, kelas_1]

        # 4. Format Hasil
        prediction_value = int(prediction[0])
        # Ambil probabilitas maksimum sebagai tingkat kepercayaan
        confidence = float(np.max(prediction_proba[0])) 

        # Tentukan label berdasarkan nilai prediksi
        prediction_name = "Diabetes" if prediction_value == 1 else "Tidak Diabetes"

        return {
            "prediction": prediction_name,
            "prediction_value": prediction_value,
            "confidence": confidence 
        }

    except ValueError as ve:
        # Error jika jumlah fitur tidak cocok dengan yang diharapkan oleh scaler/model
        return {"error": f"Kesalahan input data: {str(ve)}"}
    except Exception as e:
        # Error umum lainnya
        return {"error": f"Terjadi kesalahan saat prediksi: {str(e)}"}

# --- Menjalankan Server (jika file ini dijalankan langsung) ---
if __name__ == "__main__":
    import uvicorn
    # Menjalankan server di port 8000 dan membuatnya bisa diakses dari luar
    uvicorn.run(app, host="0.0.0.0", port=8000)