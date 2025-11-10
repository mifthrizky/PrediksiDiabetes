// src/Dashboard.jsx

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import BlogSection from './components/BlogSection';
import ReviewsSection from './components/ReviewsSection';
import PredictionForm from './components/PredictionForm';
import Result from './components/Result';
import Footer from './components/Footer'; // 1. Import komponen baru

function Dashboard() {
  const [predictionResult, setPredictionResult] = useState(null);

  return (
    // 'bg-white' ini hanya untuk default, footer akan menimpanya
    <div className="min-h-screen bg-white"> 
      <Navbar />
      <Hero />
      <Features />
      <BlogSection />
      <ReviewsSection />
      <Footer /> {/* 2. Tambahkan di paling bawah */}
    </div>
  );
}

export default Dashboard;