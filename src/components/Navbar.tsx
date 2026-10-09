import React from 'react';
import { Sparkles, History, HelpCircle, Film, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenHistory: () => void;
  onOpenGuide: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  onOpenGuide,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0d14]/90 backdrop-blur-md border-b border-[#232433]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1b1c26] to-[#0c0d14] border border-[#2b2c3d] shadow-lg group">
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#fe2c55] rounded-full animate-pulse" />
              <div className="relative flex items-center justify-center">
                <Film className="w-5 h-5 text-[#fe2c55] transition-transform group-hover:scale-110" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  TikTok Affiliate Assistant
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#fe2c55]/15 text-[#fe2c55] border border-[#fe2c55]/30">
                  AI Pro
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 mt-0.5">
                <p className="line-clamp-1">
                  Asisten AI untuk membuat konten affiliate yang kreatif dan menarik
                </p>
                <span className="text-neutral-600 hidden md:inline">•</span>
                <span className="hidden md:inline-flex items-center font-medium text-neutral-300 bg-neutral-800/80 px-2 py-0.5 rounded-md text-xs border border-neutral-700/60">
                  Created by Yayan
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="sm:hidden inline-flex items-center font-medium text-neutral-300 bg-neutral-800/80 px-2 py-1 rounded-md text-[11px] border border-neutral-700/60">
              by Yayan
            </div>

            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-[#161722] hover:bg-[#1f2030] border border-[#2b2c3d] transition-all cursor-pointer"
              title="Panduan Penggunaan"
            >
              <HelpCircle className="w-4 h-4 text-[#25f4ee]" />
              <span className="hidden sm:inline">Panduan</span>
            </button>

            <button
              onClick={onOpenHistory}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-[#161722] hover:bg-[#1f2030] border border-[#2b2c3d] transition-all cursor-pointer"
              title="Riwayat Konten Tersimpan"
            >
              <History className="w-4 h-4 text-[#fe2c55]" />
              <span className="hidden sm:inline">Riwayat</span>
              {historyCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#fe2c55] text-white">
                  {historyCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
