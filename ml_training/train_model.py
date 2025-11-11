# ml_training/train_model.py

import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

print("Memulai proses pelatihan model diabetes...")

# Import Dataset
try:
    df = pd.read_csv('./diabetes.csv')
except FileNotFoundError:
    print("Error: File 'diabetes.csv' tidak ditemukan.")
    print("Pastikan file tersebut ada di dalam folder 'ml_training/'.")
    exit()

print("Dataset berhasil dimuat.")

# Membersihkan Data
# Ganti nilai 0 yang tidak mungkin secara biologis dengan NaN
cols_to_clean = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
df[cols_to_clean] = df[cols_to_clean].replace(0, np.nan)

# Imputasi nilai NaN (mengisi nilai yang hilang)
# Gunakan mean untuk Glucose/BP dan median untuk sisanya
df.fillna({
    'Glucose': df['Glucose'].mean(),
    'BloodPressure': df['BloodPressure'].mean(),
    'SkinThickness': df['SkinThickness'].median(),
    'Insulin': df['Insulin'].median(),
    'BMI': df['BMI'].median()
}, inplace=True)

print("Data berhasil dibersihkan dan diimputasi.")

# Fitur (X) dan Target (y)
X = df.drop('Outcome', axis=1)
y = df['Outcome']

# Bagi Data (Train/Test Split) - (test_size=0.2, random_state=0)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=0)

# Scaling Fitur
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("Data berhasil di-scaling.")

# Latih Model (RandomForest)
# (n_estimators=20, random_state=0)
classifier = RandomForestClassifier(n_estimators=20, random_state=0)
classifier.fit(X_train_scaled, y_train)

# Evaluasi Model
y_pred = classifier.predict(X_test_scaled)
score = accuracy_score(y_test, y_pred)
print(f"Model selesai dilatih.")
print(f"Akurasi model pada data test (setelah scaling & imputasi): {score * 100:.2f}%")

# Simpan Model DAN Scaler ke folder backend
model_dir = 'backend/models'
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

# Hapus model lama
if os.path.exists(os.path.join(model_dir, 'iris_model.joblib')):
    os.remove(os.path.join(model_dir, 'iris_model.joblib'))
    
model_path = os.path.join(model_dir, 'diabetes_model.joblib')
scaler_path = os.path.join(model_dir, 'diabetes_scaler.joblib')

joblib.dump(classifier, model_path)
joblib.dump(scaler, scaler_path)

print(f"Model berhasil disimpan di: {model_path}")
print(f"Scaler berhasil disimpan di: {scaler_path}")