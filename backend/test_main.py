from fastapi.testclient import TestClient
import os
import sys

# Tambahkan direktori backend ke sys.path agar bisa import main
# Ini diperlukan karena kita menjalankan pytest dari folder root
# Logika ini berasumsi 'test_main.py' ada di folder yang sama dengan 'main.py'
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

try:
    from main import app
except ImportError:
    print("Error: Gagal mengimpor 'app' dari main.py.")
    print(f"Current sys.path: {sys.path}")
    print(f"Pastikan test_main.py berada di direktori yang sama dengan main.py (ml_training/backend/)'")
    sys.exit(1)


client = TestClient(app)

def test_health_check():
    """
    Tes Kriteria 5: Smoke test untuk endpoint /.
    """
    response = client.get("/")
    assert response.status_code == 200
    json_response = response.json()
    assert "message" in json_response
    assert "model_loaded" in json_response
    
    # Asumsi model berhasil di-load saat testing. 
    # Jika tidak, ini akan gagal, yang merupakan perilaku tes yang benar.
    assert json_response["model_loaded"] == True 

def test_predict_valid_no_diabetes():
    """
    Tes Kriteria 5: Unit test untuk endpoint inti (/predict) - Kasus Valid (Tidak Diabetes).
    """
    # Data input yang valid (kemungkinan tidak diabetes)
    input_data = {
        "pregnancies": 1,
        "glucose": 89,
        "bloodPressure": 66,
        "bmi": 28.1,
        "age": 21
    }
    response = client.post("/predict", json=input_data)
    assert response.status_code == 200
    json_response = response.json()
    assert "prediction" in json_response
    assert "prediction_value" in json_response
    assert "confidence" in json_response
    assert json_response["prediction_value"] == 0 # Ekspektasi tidak diabetes
    assert json_response["prediction"] == "Tidak Diabetes"

def test_predict_valid_diabetes():
    """
    Tes Kriteria 5: Unit test untuk endpoint inti (/predict) - Kasus Valid (Diabetes).
    """
    # Data input yang valid (kemungkinan diabetes)
    input_data = {
        "pregnancies": 6,
        "glucose": 148,
        "bloodPressure": 72,
        "bmi": 33.6,
        "age": 50
    }
    response = client.post("/predict", json=input_data)
    assert response.status_code == 200
    json_response = response.json()
    assert "prediction" in json_response
    assert json_response["prediction_value"] == 1 # Ekspektasi diabetes
    assert json_response["prediction"] == "Diabetes"

def test_predict_invalid_missing_field():
    """
    Tes Kriteria 5: Unit test untuk endpoint inti (/predict) - Kasus Invalid (Field Hilang).
    """
    # Data input yang tidak valid (kekurangan 'age')
    input_data = {
        "pregnancies": 1,
        "glucose": 89,
        "bloodPressure": 66,
        "bmi": 28.1
        # "age": 21 -> sengaja dihilangkan
    }
    response = client.post("/predict", json=input_data)
    # FastAPI/Pydantic akan mengembalikan 422 Unprocessable Entity
    assert response.status_code == 422