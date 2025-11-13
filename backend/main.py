from fastapi import FastAPI, Depends, HTTPException, status, Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, Field
import joblib
import numpy as np
import os
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import sessionmaker, Session, DeclarativeBase
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import List

# --- Konfigurasi Aplikasi ---
load_dotenv()
app = FastAPI(title="API Prediksi Diabetes ML (5 Fitur) dengan Auth")
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Memuat Model & Scaler ---
MODEL_PATH = os.getenv("MODEL_PATH", "./models/diabetes_model_5_fitur.joblib")
SCALER_PATH = os.getenv("SCALER_PATH", "./models/diabetes_scaler_5_fitur.joblib")
model, scaler = None, None
if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        print(f"Model 5 Fitur dan Scaler berhasil dimuat.")
    except Exception as e:
        print(f"ERROR: Gagal memuat model atau scaler. Kesalahan: {e}")
else:
    print(f"PERINGATAN: Tidak dapat menemukan model atau scaler.")

EXPECTED_FEATURE_NAMES = ['Pregnancies', 'Glucose', 'BloodPressure', 'BMI', 'Age']

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = os.getenv("SECRET_KEY") or "default_secret_key_please_change"
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
DATABASE_URL = os.getenv("DATABASE_URL")
engine, SessionLocal = None, None

class Base(DeclarativeBase): pass
if DATABASE_URL:
    try:
        engine = create_engine(DATABASE_URL)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        print(f"Berhasil terhubung ke database.")
    except Exception as e:
        print(f"ERROR: Gagal terhubung ke database. Kesalahan: {e}")
else:
    print("PERINGATAN: Variabel DATABASE_URL tidak ditemukan.")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Model Database ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

class PredictionLog(Base):
    __tablename__ = "prediction_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    pregnancies = Column(Integer)
    glucose = Column(Float)
    bloodPressure = Column(Float)
    bmi = Column(Float)
    age = Column(Integer)
    prediction_name = Column(String(50))
    confidence = Column(Float)
    timestamp = Column(String(100), default=lambda: datetime.now(timezone.utc).isoformat())

if engine:
    try:
        Base.metadata.create_all(bind=engine)
        print("Tabel database berhasil dibuat/dicek.")
    except Exception as e:
        print(f"ERROR: Gagal membuat tabel. Kesalahan: {e}")

# --- Model Data Pydantic ---
class DiabetesFeatures(BaseModel):
    pregnancies: int
    glucose: float
    bloodPressure: float
    bmi: float
    age: int

class UserCreate(BaseModel):
    username: str
    password: str = Field(..., min_length=6, max_bytes=72)

class UserInDB(BaseModel):
    id: int
    username: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class PredictionLogResponse(BaseModel):
    id: int
    pregnancies: int
    glucose: float
    bloodPressure: float
    bmi: float
    age: int
    prediction_name: str
    confidence: float
    timestamp: str

    class Config:
        orm_mode = True

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return UserInDB.model_validate(user)

@app.get("/")
def read_root():
    model_loaded_status = (model is not None) and (scaler is not None)
    db_connected_status = (engine is not None)
    return {
        "message": "Selamat datang di API Prediksi Diabetes ",
        "model_loaded": model_loaded_status,
        "database_connected": db_connected_status
    }

@app.post("/register", response_model=UserInDB)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return UserInDB.model_validate(db_user)

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    if len(form_data.password.encode('utf-8')) > 72:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Password is too long.",
        )
    user = get_user(db, username=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/predict")
async def predict_diabetes(
    features: DiabetesFeatures,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user)
):
    if model is None or scaler is None:
        raise HTTPException(
            status_code=503,
            detail="Model atau Scaler belum dimuat. Cek log server backend."
        )
    try:
        data_array = np.array([[
            features.pregnancies,
            features.glucose,
            features.bloodPressure,
            features.bmi,
            features.age
        ]])
        data_df = pd.DataFrame(data_array, columns=EXPECTED_FEATURE_NAMES)
        data_scaled = scaler.transform(data_df)
        prediction = model.predict(data_scaled)
        prediction_proba = model.predict_proba(data_scaled)
        prediction_value = int(prediction[0])
        confidence = float(np.max(prediction_proba[0]))
        prediction_name = "Diabetes" if prediction_value == 1 else "Tidak Diabetes"
        # Simpan log ke database
        try:
            db_log = PredictionLog(
                user_id=current_user.id,
                pregnancies=features.pregnancies,
                glucose=features.glucose,
                bloodPressure=features.bloodPressure,
                bmi=features.bmi,
                age=features.age,
                prediction_name=prediction_name,
                confidence=confidence
            )
            db.add(db_log)
            db.commit()
        except Exception as e:
            print(f"Gagal menyimpan log ke DB: {e}")
            db.rollback()
        return {
            "prediction": prediction_name,
            "prediction_value": prediction_value,
            "confidence": confidence,
            "user": current_user.username
        }
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Kesalahan input data: {str(ve)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan saat prediksi: {str(e)}")

# --- ENDPOINT RIWAYAT LOG USER ---
@app.get("/users/me/prediction-logs", response_model=List[PredictionLogResponse])
async def get_my_prediction_logs(
    current_user: UserInDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    logs = db.query(PredictionLog)\
        .filter(PredictionLog.user_id == current_user.id)\
        .order_by(PredictionLog.timestamp.desc()).all()
    return logs

@app.delete("/users/me/prediction-logs/{log_id}", status_code=204)
async def delete_my_prediction_log(
    log_id: int = Path(..., ge=1),
    current_user: UserInDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    log = db.query(PredictionLog).filter(
        PredictionLog.id == log_id,
        PredictionLog.user_id == current_user.id
    ).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log tidak ditemukan")
    db.delete(log)
    db.commit()
    return

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

