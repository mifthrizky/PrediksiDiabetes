# Proyek Prediksi Diabetes (Scikit-learn + FastAPI + React)

Ini adalah proyek full-stack untuk memprediksi diabetes menggunakan model ML.

## Cara Menjalankan

### 1. Backend (FastAPI)

Pastikan model sudah dilatih dengan menjalankan skrip di `ml_training/`.

```bash
cd backend
# Buat/aktifkan venv
pip install -r requirements.txt
uvicorn main:app --reload
```

```
cd frontend
npm install
npm run dev
```
