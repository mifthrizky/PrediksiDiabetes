// src/main.jsx ✅ (BENAR)

import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard.jsx"; // <-- UBAH: Import Dashboard
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Dashboard /> {/* <-- UBAH: Render Dashboard */}
  </React.StrictMode>
);
