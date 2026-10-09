import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Clock } from 'lucide-react';
import { HasilKontenAI, DurasiVideo } from '../types';

interface TeleprompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: HasilKontenAI | null;
  durasiVideo: DurasiVideo;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  isOpen,
  onClose,
  result,
  durasiVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const totalSeconds = durasiVideo === '20 detik' ? 20 : 30;
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSeconds]);

  if (!isOpen || !result) return null;

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentSeconds(0);
  };

  const maxScenes = durasiVideo === '20 detik' ? 2 : 3;
  const filteredScenes = result.adeganVideo.slice(0, maxScenes);

  // Determine active scene based on second
  const currentSceneNumber =
    currentSeconds < 10
      ? 1
      : currentSeconds < 20
      ? 2
      : 3;

  const progressPercent = (currentSeconds / totalSeconds) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#12131e] rounded-3xl border border-[#2b2d42] shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#242638] mb-5">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#fe2c55]" />
              <span>Latihan Voice-Over & Teleprompter</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Durasi target: {durasiVideo} ({filteredScenes.length} adegan @10 detik)
            </p>
          </div>
          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timer Bar & Controls */}
        <div className="bg-[#0a0b12] rounded-2xl p-4 border border-[#222436] mb-6">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#25f4ee]" />
              Detik: {currentSeconds} / {totalSeconds}s
            </span>
            <span className="font-extrabold text-[#fe2c55]">
              Adegan Aktif: #{currentSceneNumber}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-[#1b1c2b] rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-[#fe2c55] hover:bg-[#ff3b65] text-white shadow-lg cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Jeda Latihan' : 'Mulai Latihan Suara'}</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs bg-[#1a1b28] hover:bg-[#25263a] text-neutral-300 border border-[#2d2f44] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset (0s)</span>
            </button>
          </div>
        </div>

        {/* Script Content / Highlighting per Scene */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {filteredScenes.map((scene) => {
            const isCurrent = currentSceneNumber === scene.nomorAdegan && isPlaying;
            return (
              <div
                key={scene.nomorAdegan}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-[#fe2c55]/15 border-[#fe2c55] ring-1 ring-[#fe2c55]/50 scale-[1.01]'
                    : 'bg-[#0a0b12] border-[#222436] opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${isCurrent ? 'text-[#fe2c55]' : 'text-neutral-400'}`}>
                    Adegan {scene.nomorAdegan} ({scene.rentangWaktu}) — {scene.tujuanAdegan}
                  </span>
                  {scene.teksOverlayOpsional && (
                    <span className="text-[10px] text-neutral-400 font-mono">
                      Overlay: {scene.teksOverlayOpsional}
                    </span>
                  )}
                </div>

                <p className={`text-base sm:text-lg font-bold leading-relaxed ${isCurrent ? 'text-white' : 'text-neutral-300'}`}>
                  "{scene.voiceOverDialog}"
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Notes */}
        <div className="pt-4 border-t border-[#242638] mt-4 text-xs text-neutral-400 flex items-center justify-between">
          <span>Tempo: {result.panduanEditingCapCut.tempoDanPacing}</span>
          <span>Musik CapCut: {result.panduanEditingCapCut.musikLatarNonRock}</span>
        </div>
      </div>
    </div>
  );
};
