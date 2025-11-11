# 1. Gunakan base image Python yang ringan
FROM python:3.10-slim

# 2. Tentukan direktori kerja di dalam kontainer
WORKDIR /app

# 3. Salin file requirements.txt terlebih dahulu
#    Ini memanfaatkan Docker cache. Jika file ini tidak berubah,
#    langkah 'pip install' tidak akan diulang saat build.
COPY requirements.txt .

# 4. Instal semua dependensi Python
RUN pip install --no-cache-dir -r requirements.txt

# 5. Salin sisa kode aplikasi Anda (main.py, folder models/, dll)
#    dari komputer Anda ke dalam kontainer di direktori /app
COPY . .

# 6. Beri tahu Docker bahwa kontainer akan mengekspos port 8000
EXPOSE 8000

# 7. Perintah untuk menjalankan aplikasi saat kontainer dimulai
#    --host 0.0.0.0 penting agar bisa diakses dari luar kontainer
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]