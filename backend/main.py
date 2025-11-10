from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import CORS
from pydantic import BaseModel
import joblib
import numpy as np

# 1. Inisialisasi aplikasi FastAPI
app = FastAPI(title="API Prediksi Iris ML")

# 2. Konfigurasi CORS (Cross-Origin Resource Sharing)
# Ini PENTING agar React (yang berjalan di port berbeda) bisa mengakses API ini
origins = [
    "http://localhost",
    "http://localhost:3000", # Port default Create React App
    "http://localhost:5173", # Port default Vite (React)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Izinkan semua method (GET, POST, dll)
    allow_headers=["*"], # Izinkan semua header
)

# 3. Muat model yang sudah dilatih
# Pastikan path-nya benar dari lokasi main.py
model = joblib.load("models/iris_model.joblib")

# Nama target untuk output yang lebih mudah dibaca
target_names = ['setosa', 'versicolor', 'virginica']

# 4. Definisikan model data input menggunakan Pydantic
# Ini akan memvalidasi tipe data request secara otomatis
class IrisFeatures(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float

# 5. Buat endpoint untuk prediksi
@app.post("/predict")
async def predict(features: IrisFeatures):
    """
    Endpoint untuk memprediksi spesies Iris.
    """
    # Konversi data Pydantic ke array numpy 2D
    data = np.array([[
        features.sepal_length,
        features.sepal_width,
        features.petal_length,
        features.petal_width
    ]])

    # Lakukan prediksi
    prediction = model.predict(data)
    prediction_proba = model.predict_proba(data)

    # Dapatkan nama prediksi
    prediction_name = target_names[prediction[0]]
    confidence = np.max(prediction_proba[0])

    return {
        "prediction": prediction_name,
        "confidence": float(confidence)
    }

# Endpoint root sederhana
@app.get("/")
def read_root():
    return {"message": "Selamat datang di API Prediksi Iris"}