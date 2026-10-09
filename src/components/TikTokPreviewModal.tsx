import React, { useState } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { HasilKontenAI, DurasiVideo } from '../types';

interface TikTokPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: HasilKontenAI | null;
  durasiVideo: DurasiVideo;
  productPhotoUrl?: string;
  talentPhotoUrl?: string;
  namaProduk: string;
}

export const TikTokPreviewModal: React.FC<TikTokPreviewModalProps> = ({
  isOpen,
  onClose,
  result,
  durasiVideo,
  productPhotoUrl,
  talentPhotoUrl,
  namaProduk,
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  if (!isOpen || !result) return null;

  const maxScenes = durasiVideo === '20 detik' ? 2 : 3;
  const filteredScenes = result.adeganVideo.slice(0, maxScenes);
  const currentScene = filteredScenes[activeSceneIndex] || filteredScenes[0];
  const totalScenes = filteredScenes.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#12131e] rounded-3xl border border-[#2b2d42] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Realistic TikTok Mobile Phone Frame (9:16) */}
        <div className="flex-1 bg-black p-4 flex items-center justify-center overflow-y-auto">
          <div className="relative w-[280px] sm:w-[310px] h-[550px] sm:h-[600px] bg-neutral-950 rounded-[38px] border-[5px] border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between text-white select-none">
            {/* Top Status Bar & For You Tabs */}
            <div className="relative z-10 pt-3 px-4 flex items-center justify-center gap-4 text-xs font-bold text-neutral-400">
              <span>Mengikuti</span>
              <span className="text-white border-b-2 border-white pb-0.5">Untuk Anda</span>
            </div>

            {/* Video Background Mockup */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#181a27] via-[#0d0e17] to-black flex items-center justify-center">
              {talentPhotoUrl || productPhotoUrl ? (
                <img
                  src={talentPhotoUrl || productPhotoUrl}
                  alt="Visual Mockup"
                  className="w-full h-full object-cover opacity-60"
                />
              ) : (
                <div className="text-center px-4 space-y-2 opacity-60">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#fe2c55] to-[#25f4ee] mx-auto flex items-center justify-center shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-300">
                    Adegan {currentScene.nomorAdegan}: {currentScene.rentangWaktu}
                  </p>
                  <p className="text-[11px] text-neutral-400 line-clamp-3">
                    {currentScene.deskripsiVisualDanAksi}
                  </p>
                </div>
              )}

              {/* Dynamic Overlay Text Box (Safe Zone Area) */}
              <div className="absolute top-[34%] left-4 right-16 z-10 text-center animate-bounce">
                <span className="inline-block px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-[#fe2c55] text-[#fe2c55] font-extrabold text-xs sm:text-sm shadow-xl">
                  {currentScene.teksOverlayOpsional || result.limaPilihanHook[0] || 'Promo Spesial'}
                </span>
              </div>
            </div>

            {/* Right Action Icons Column */}
            <div className="absolute right-2 bottom-20 z-10 flex flex-col items-center gap-4 text-white">
              {/* Creator Avatar with follow badge */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#fe2c55] to-orange-500 border-2 border-white flex items-center justify-center text-xs font-black">
                  YY
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#fe2c55] text-white flex items-center justify-center text-[10px] font-bold">
                  +
                </div>
              </div>

              {/* Like */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
                <span className="text-[10px] font-bold">48.2K</span>
              </div>

              {/* Comment */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold">1,248</span>
              </div>

              {/* Bookmark */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <span className="text-[10px] font-bold">8.6K</span>
              </div>

              {/* Share */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold">3.1K</span>
              </div>

              {/* Rotating Vinyl */}
              <div className="w-9 h-9 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center animate-spin">
                <Music className="w-4 h-4 text-neutral-400" />
              </div>
            </div>

            {/* Bottom Section: Keranjang Kuning, Caption, Sound */}
            <div className="relative z-10 p-3 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2 pr-14">
              {/* Keranjang Kuning */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#fecb00] text-black font-extrabold text-[11px] shadow-lg max-w-fit">
                <ShoppingBag className="w-3.5 h-3.5 fill-black" />
                <span className="truncate max-w-[170px]">{namaProduk || 'Cek Keranjang'}</span>
                <span className="text-[10px] font-bold bg-black/10 px-1 rounded">Beli</span>
              </div>

              {/* Caption */}
              <div className="space-y-1">
                <p className="text-xs font-bold flex items-center gap-1">
                  @affiliate_yayan
                  <span className="text-[9px] bg-neutral-700 px-1 rounded text-neutral-300">Creator</span>
                </p>
                <p className="text-[11px] text-neutral-200 line-clamp-2 leading-snug">
                  {result.captionDanHashtag.caption}
                </p>
                <div className="text-[10px] text-neutral-400 line-clamp-1">
                  {result.captionDanHashtag.hashtags.join(' ')}
                </div>
              </div>

              {/* Sound title */}
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-300">
                <Music className="w-3 h-3 text-[#25f4ee]" />
                <span className="truncate">{result.panduanEditingCapCut.musikLatarNonRock}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="w-full md:w-80 p-5 bg-[#12131e] border-t md:border-t-0 md:border-l border-[#242638] flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Simulasi Layar TikTok</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#fe2c55]/20 text-[#fe2c55] font-bold">
                  {durasiVideo}
                </span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {durasiVideo === '20 detik' ? '2 Adegan aktif' : '3 Adegan aktif'} — Cek penempatan overlay dan tombol Keranjang Kuning.
              </p>
            </div>

            {/* Scene Selector */}
            <div className="flex items-center gap-1.5 bg-[#0a0b12] p-1 rounded-xl border border-[#222436]">
              {filteredScenes.map((scene, idx) => (
                <button
                  key={scene.nomorAdegan}
                  onClick={() => setActiveSceneIndex(idx)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeSceneIndex === idx
                      ? 'bg-[#fe2c55] text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Adegan {scene.nomorAdegan}
                </button>
              ))}
            </div>

            {/* Active Scene Breakdown */}
            <div className="p-3.5 rounded-xl bg-[#0a0b12] border border-[#222436] space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-[#1c1d2c]">
                <span className="font-bold text-white">Adegan {currentScene.nomorAdegan}</span>
                <span className="text-[#25f4ee] font-semibold">{currentScene.rentangWaktu}</span>
              </div>

              <div>
                <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Tujuan:</span>
                <p className="text-neutral-300 text-xs leading-relaxed font-medium">{currentScene.tujuanAdegan}</p>
              </div>

              <div>
                <span className="text-[10px] text-neutral-400 font-semibold uppercase block">Voice-Over:</span>
                <p className="text-white font-medium text-xs leading-relaxed italic">
                  "{currentScene.voiceOverDialog}"
                </p>
              </div>

              {currentScene.teksOverlayOpsional && (
                <div>
                  <span className="text-[10px] text-[#fe2c55] font-semibold uppercase block">Teks Overlay:</span>
                  <p className="text-[#fe2c55] font-bold text-xs">{currentScene.teksOverlayOpsional}</p>
                </div>
              )}
            </div>

            {/* Safe zone note */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <span className="font-bold block mb-1">📏 Safe Zone CapCut:</span>
              Tempatkan teks auto-caption di tengah vertikal layar agar penonton tetap nyaman membaca tanpa tertutup tombol beli.
            </div>
          </div>

          <div className="pt-4 border-t border-[#242638] flex items-center justify-between">
            <button
              onClick={() => setActiveSceneIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeSceneIndex === 0}
              className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Adegan Sebelumnya
            </button>
            <button
              onClick={() => setActiveSceneIndex((prev) => Math.min(totalScenes - 1, prev + 1))}
              disabled={activeSceneIndex === totalScenes - 1}
              className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white disabled:opacity-40 cursor-pointer"
            >
              Adegan Selanjutnya <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
