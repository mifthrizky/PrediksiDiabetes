# Gunakan base image Python
FROM python:3.10-slim

# Set folder kerja di dalam container
WORKDIR /app

# Copy file requirements dan install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy semua sisa kode di folder backend
COPY . .

# Perintah untuk menjalankan aplikasi
# (Asumsi pakai uvicorn, ganti jika perlu)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]