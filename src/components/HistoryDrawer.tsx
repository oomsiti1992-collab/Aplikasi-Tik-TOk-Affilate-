import React from 'react';
import { X, Trash2, Clock, Sparkles, ArrowRight, Film } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
  onDeleteItem: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistory,
  onClearHistory,
  onDeleteItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12131e] border-l border-[#242638] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#242638] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-[#fe2c55]" />
              <h3 className="text-base font-bold text-white">Riwayat Konten Tersimpan</h3>
            </div>
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 rounded hover:bg-red-500/10 cursor-pointer"
                  title="Hapus Semua Riwayat"
                >
                  Hapus Semua
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-900 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List of items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-full bg-neutral-900 text-neutral-500 mx-auto flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-neutral-300">Belum ada riwayat</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Konten yang kamu buat akan otomatis tersimpan di sini agar tidak hilang.
                </p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#0a0b12] border border-[#222436] hover:border-[#fe2c55]/50 transition-all group relative"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#fe2c55]/15 text-[#fe2c55] border border-[#fe2c55]/30">
                      {item.input.durasiVideo} • {item.input.gayaKonten}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                      }}
                      className="text-neutral-500 hover:text-red-400 p-1 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                      title="Hapus item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 mb-1">
                    {item.output.judulVideo || item.input.namaProduk}
                  </h4>

                  <p className="text-[11px] text-neutral-400 line-clamp-2 italic mb-2.5">
                    "{item.output.limaPilihanHook?.[0] || ''}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1a1b29] text-[10px] text-neutral-500">
                    <span>{new Date(item.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                    <button
                      onClick={() => {
                        onSelectHistory(item);
                        onClose();
                      }}
                      className="text-[#fe2c55] group-hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Buka Konten</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
