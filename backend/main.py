from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

# --- Konfigurasi Aplikasi ---
app = FastAPI(title="API Prediksi Diabetes ML (5 Fitur)")

# 2. Konfigurasi CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Memuat Model & Scaler ---
# Path ini diambil dari kode Anda.
# Pastikan server Anda dijalankan dari direktori yang benar agar path ini ditemukan.
MODEL_PATH = "./models/diabetes_model_5_fitur.joblib"
SCALER_PATH = "./models/diabetes_scaler_5_fitur.joblib"

model = None
scaler = None

# Cek apakah file ada sebelum memuat
if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print(f"Model 5 Fitur dan Scaler berhasil dimuat dari {MODEL_PATH}.")
else:
    print(f"PERINGATAN: Tidak dapat menemukan model di '{MODEL_PATH}' atau scaler di '{SCALER_PATH}'.")
    print(f"Pastikan Anda menjalankan uvicorn dari folder yang benar dan file tersebut ada.")


# --- Model Data Input (Pydantic) ---
# Ini sudah benar, menerima 5 field
class DiabetesFeatures(BaseModel):
    pregnancies: int
    glucose: float
    bloodPressure: float
    bmi: float
    age: int

# --- API Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Selamat datang di API Prediksi Diabetes (5 Fitur)"}

@app.post("/predict")
async def predict_diabetes(features: DiabetesFeatures):
    """
    Endpoint untuk memprediksi diabetes berdasarkan 5 fitur.
    """
    if model is None or scaler is None:
        return {"error": "Model atau Scaler (5 Fitur) belum dimuat. Cek log server backend."}

    try:
        # --- BAGIAN INI DISESUAIKAN UNTUK 5 FITUR ---
        # Kita TIDAK lagi menambahkan 3 nilai default.
        
        # 1. Konversi data Pydantic ke array numpy 2D (HANYA 5 FITUR)
        # PASTIKAN URUTANNYA SAMA PERSIS seperti saat melatih model 5 fitur
        data = np.array([[
            features.pregnancies,
            features.glucose,
            features.bloodPressure,
            features.bmi,
            features.age
        ]])
        
        # ---------------------------------------------

        # 2. Lakukan Scaling pada data input (menggunakan scaler 5 fitur)
        data_scaled = scaler.transform(data)

        # 3. Lakukan Prediksi (menggunakan model 5 fitur)
        prediction = model.predict(data_scaled)
        prediction_proba = model.predict_proba(data_scaled) # Ini input yang benar

        # 4. Format Hasil
        prediction_value = int(prediction[0])
        confidence = float(np.max(prediction_proba[0])) 

        prediction_name = "Diabetes" if prediction_value == 1 else "Tidak Diabetes"

        return {
            "prediction": prediction_name,
            "prediction_value": prediction_value,
            "confidence": confidence 
        }

    except Exception as e:
        # Tambahkan detail error jika terjadi masalah saat transform/predict
        # (Misal: jumlah fitur tidak cocok)
        return {"error": f"Terjadi kesalahan saat prediksi: {str(e)}"}