// src/App.jsx

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./Dashboard.jsx";
import Footer from "./components/Footer.jsx";
import PredictionForm from "./components/PredictionForm.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/prediction" element={<PredictionForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
