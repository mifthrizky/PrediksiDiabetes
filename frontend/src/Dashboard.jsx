// src/Dashboard.jsx (KODE PERBAIKAN)

import React from "react";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import BlogSection from "./components/BlogSection.jsx";
import ReviewsSection from "./components/ReviewsSection.jsx";
import Footer from "./components/Footer.jsx";

function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <BlogSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
}

export default Dashboard;
