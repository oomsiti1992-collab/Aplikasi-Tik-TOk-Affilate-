import React from 'react';
import { X, CheckCircle, Sparkles, Video, ShoppingBag, ShieldCheck } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#12131e] rounded-3xl border border-[#2b2d42] shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#242638] mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#fe2c55]/20 flex items-center justify-center text-[#fe2c55]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Panduan TikTok Affiliate AI</h3>
              <p className="text-xs text-neutral-400">Created by Yayan — Panduan praktis untuk pemula</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436] space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#fe2c55] text-white flex items-center justify-center text-xs">1</span>
              Isi Data Produk & Tentukan Hook
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Kunci utama video TikTok adalah 1–3 detik pertama (Hook). Pastikan masalah audiens dan keunggulan produk kamu isi dengan jelas agar AI bisa menghasilkan kalimat pembuka yang bikin penonton berhenti scroll.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436] space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#25f4ee] text-black flex items-center justify-center text-xs">2</span>
              Cara Pakai Prompt Video AI (Google Flow / Meta AI)
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Klik tombol <strong>"Salin Prompt Adegan 1, 2, atau 3"</strong>, lalu paste ke AI video generator seperti Google Flow atau Meta AI. Setiap adegan berdurasi 10 detik, rasio vertikal 9:16, aksi konkret, dan menjaga konsistensi karakter serta bentuk asli produk.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436] space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">3</span>
              Editing Mudah di CapCut & Teleprompter
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Gunakan mode <strong>Teleprompter</strong> untuk melatih tempo bicara agar pas 20 detik (2 adegan) atau 30 detik (3 adegan). Di CapCut, ikuti panduan musik non-rock, efek suara (SFX), dan tempatkan auto-caption di safe zone tengah.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436] space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-xs">4</span>
              Pentingnya Ajakan Keranjang Kuning (CTA)
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Di adegan terakhir, selalu ingatkan penonton: <em>"Cek keranjang kuning di kiri bawah sebelum kehabisan!"</em>. Salin caption dan hashtag yang sudah disiapkan untuk meningkatkan jangkauan algoritma TikTok.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[#242638] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#fe2c55] hover:bg-[#ff3b65] text-white cursor-pointer"
          >
            Saya Mengerti, Mulai Buat Konten
          </button>
        </div>
      </div>
    </div>
  );
};
