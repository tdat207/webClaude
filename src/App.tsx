import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { ToastContainer } from './components/common/Toast';
import { FittingPage } from './pages/FittingPage';
import { StyleGalleryPage } from './pages/StyleGalleryPage';
import { WardrobeScanPage } from './pages/WardrobeScanPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SavedOutfitsPage } from './pages/SavedOutfitsPage';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0b0d13] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 pb-12">
          <Routes>
            <Route path="/" element={<FittingPage />} />
            <Route path="/styles" element={<StyleGalleryPage />} />
            <Route path="/wardrobe-scan" element={<WardrobeScanPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/saved" element={<SavedOutfitsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Toast Notifications */}
        <ToastContainer />

        {/* Footer */}
        <footer className="border-t border-studio-border/50 py-6 text-center text-xs text-slate-500 bg-[#07080c]">
          <p>© 2026 Style3D AI — Nền Tảng Phối Đồ 3D & Affiliate Thời Trang</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
