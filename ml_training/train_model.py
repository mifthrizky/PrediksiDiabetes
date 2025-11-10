import joblib
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression

print("Memulai pelatihan model...")

# 1. Muat Dataset
X, y = load_iris(return_X_y=True)

# Target names untuk referensi nanti
# 0 = setosa, 1 = versicolor, 2 = virginica
target_names = load_iris().target_names
print(f"Nama Target: {list(target_names)}")

# 2. Inisialisasi & Latih Model
# Kita gunakan max_iter=1000 agar konvergen
model = LogisticRegression(max_iter=1000)
model.fit(X, y)

print("Pelatihan model selesai.")

# 3. Buat folder 'models' di dalam 'backend' jika belum ada
# (Pastikan Anda sudah membuat folder 'backend' di root)
import os
model_dir = '../backend/models'
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

# 4. Simpan model ke folder backend
model_path = os.path.join(model_dir, 'iris_model.joblib')
joblib.dump(model, model_path)

print(f"Model berhasil disimpan di: {model_path}")