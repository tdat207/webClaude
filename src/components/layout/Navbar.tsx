import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Shirt,
  Compass,
  ScanLine,
  Bookmark,
  Sliders,
  Menu,
  X,
} from 'lucide-react';
import { useOutfitStore } from '../../store/outfitStore';
import { getAffiliateClicks } from '../../services/affiliateTracking';
import { ApiKeyModal } from '../common/ApiKeyModal';
import { classNames } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const equippedItems = useOutfitStore((s) => s.equippedItems);
  const equippedCount = Object.values(equippedItems).filter(Boolean).length;
  const affiliateClicksCount = getAffiliateClicks().length;

  const navLinks = [
    {
      to: '/',
      label: 'Phòng Thử Đồ 3D',
      icon: Shirt,
      badge: equippedCount > 0 ? `${equippedCount}` : undefined,
    },
    {
      to: '/styles',
      label: 'Khám Phá Phong Cách',
      icon: Compass,
    },
    {
      to: '/wardrobe-scan',
      label: 'Gợi Ý Tủ Đồ AI',
      icon: ScanLine,
    },
    {
      to: '/saved',
      label: 'Tủ Đồ Của Tôi',
      icon: Bookmark,
      badge: affiliateClicksCount > 0 ? `${affiliateClicksCount} click` : undefined,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0d0f17]/90 backdrop-blur-md border-b border-studio-border/80 transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* LOGO (BASIC NHƯNG HIỆN ĐẠI) */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white text-black font-black flex items-center justify-center text-sm shadow-sm transition">
              3D
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">
                STYLE3D
              </span>
              <p className="text-[10px] text-slate-400 -mt-1 font-medium">Fitting & Shopping</p>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon, badge }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  classNames(
                    'relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition',
                    isActive
                      ? 'bg-white/10 text-white font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>

                {badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ACTIONS: API KEY & MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-studio-surface hover:bg-studio-card border border-studio-border text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium"
              title="Cài đặt Google Gemini API"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span>Cài đặt AI</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-studio-surface border border-studio-border text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-studio-border bg-studio-surface px-4 py-3 space-y-1 animate-fadeIn">
            {navLinks.map(({ to, label, icon: Icon, badge }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  classNames(
                    'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition',
                    isActive
                      ? 'bg-white/10 text-white font-bold'
                      : 'text-slate-300 hover:bg-white/5'
                  )
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
                {badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* GEMINI API KEY MODAL */}
      <ApiKeyModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} />
    </>
  );
};
