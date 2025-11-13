// File: frontend/src/context/AuthContext.jsx
// (Ini adalah FILE BARU, buat di folder 'src/context/')

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Menyimpan info user (cth: username)

  // Saat aplikasi dimuat, cek local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user_details");
    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Fungsi untuk login
  const login = (userData) => {
    // e.g., { username: "mifth", token: "abc..." }
    setToken(userData.token);
    setUser({ username: userData.username }); // Simpan data non-sensitif

    // Simpan ke local storage agar login bertahan
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user_details", JSON.stringify({ username: userData.username }));
  };

  // Fungsi untuk logout
  const logout = () => {
    setToken(null);
    setUser(null);

    // Hapus dari local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user_details");
  };

  // Tentukan status login
  const isLoggedIn = !!token;

  const value = {
    token,
    user,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook kustom untuk memudahkan penggunaan context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
