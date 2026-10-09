/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ProductForm } from './components/ProductForm';
import { ResultSection } from './components/ResultSection';
import { TikTokPreviewModal } from './components/TikTokPreviewModal';
import { TeleprompterModal } from './components/TeleprompterModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { GuideModal } from './components/GuideModal';
import { FormInputData, HasilKontenAI, HistoryItem } from './types';
import { PRESET_TEMPLATES } from './data/presets';
import { Sparkles, AlertTriangle, Film } from 'lucide-react';

const LOCAL_STORAGE_HISTORY_KEY = 'tiktok_affiliate_history_v2';

const EMPTY_FORM_DATA: FormInputData = {
  namaProduk: '',
  deskripsiDanManfaat: '',
  targetAudiens: '',
  gayaKonten: 'problem-solution',
  durasiVideo: '30 detik',
  jenisVideo: 'demonstrasi produk',
};

export default function App() {
  const [formData, setFormData] = useState<FormInputData>(PRESET_TEMPLATES[0].data);
  const [result, setResult] = useState<HasilKontenAI | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // History state
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history to localStorage', e);
    }
  }, [history]);

  const handleGenerate = async (e?: React.FormEvent, customVariation?: string) => {
    if (e) e.preventDefault();
    if (!formData.namaProduk.trim() || !formData.deskripsiDanManfaat.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namaProduk: formData.namaProduk,
          deskripsiDanManfaat: formData.deskripsiDanManfaat,
          targetAudiens: formData.targetAudiens,
          gayaKonten: formData.gayaKonten,
          durasiVideo: formData.durasiVideo,
          jenisVideo: formData.jenisVideo,
          hasProductPhoto: !!formData.productPhotoPreviewUrl,
          hasTalentPhoto: !!formData.talentPhotoPreviewUrl,
          talentDescription: formData.talentDescription,
          variationSeed: customVariation || Math.random().toString(36).substring(7),
        }),
      });

      const resJson = await response.json();

      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || 'Terjadi kesalahan saat memproses konten.');
      }

      const generatedData: HasilKontenAI = resJson.data;
      setResult(generatedData);

      // Save to history
      const newItem: HistoryItem = {
        id: 'hist_' + Date.now(),
        timestamp: Date.now(),
        input: { ...formData },
        output: generatedData,
      };

      setHistory((prev) => [newItem, ...prev.slice(0, 24)]);

      // Auto scroll to results smoothly
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (error: any) {
      console.error('Error generating:', error);
      setErrorMessage(error?.message || 'Gagal menghasilkan konten. Pastikan koneksi lancar dan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    const randomAngleSeed = `Variasi baru sudut pandang ${Date.now()}`;
    handleGenerate(undefined, randomAngleSeed);
  };

  const handleResetForm = () => {
    if (formData.namaProduk && !window.confirm('Kosongkan semua data pada form input?')) {
      return;
    }
    setFormData(EMPTY_FORM_DATA);
    setErrorMessage(null);
  };

  const handleSelectPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setFormData(preset.data);
    setErrorMessage(null);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setFormData(item.input);
    setResult(item.output);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleClearHistory = () => {
    if (window.confirm('Yakin ingin menghapus semua riwayat tersimpan?')) {
      setHistory([]);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#08090e] text-neutral-100 flex flex-col font-sans selection:bg-[#fe2c55] selection:text-white">
      {/* Navbar */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        historyCount={history.length}
      />

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden border-b border-[#1c1d2c] bg-gradient-to-b from-[#11121d] via-[#0b0c14] to-[#08090e] py-8 sm:py-12">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#fe2c55]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#25f4ee]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161725] border border-[#26283c] text-xs font-semibold text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#fe2c55] animate-ping" />
            <span>Pembuat Konten TikTok Affiliate 20 & 30 Detik</span>
            <span className="text-neutral-600">•</span>
            <span className="text-[#25f4ee]">Created by Yayan</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            TikTok Affiliate <span className="text-[#fe2c55]">Assistant</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed">
            Asisten AI untuk membuat konten affiliate yang kreatif dan menarik. Dapatkan 5 pilihan hook 1–3 detik, skrip video lengkap 20s (2 adegan) atau 30s (3 adegan), prompt video AI 9:16 untuk Google Flow & Meta AI, caption TikTok, dan panduan editing CapCut.
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-200 text-sm flex items-start gap-3 animate-fadeIn">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Gagal Membuat Konten</p>
              <p className="text-xs text-red-300 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Input Form */}
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleGenerate}
          onReset={handleResetForm}
          isLoading={isLoading}
          onSelectPreset={handleSelectPreset}
        />

        {/* Results Area */}
        <div ref={resultsRef} className="pt-2">
          {result ? (
            <ResultSection
              result={result}
              durasiVideo={formData.durasiVideo}
              onRegenerate={handleRegenerate}
              isLoading={isLoading}
              onOpenPreview={() => setIsPreviewOpen(true)}
              onOpenTeleprompter={() => setIsTeleprompterOpen(true)}
            />
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl bg-[#0f1019]/60 border border-dashed border-[#222436] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#161726] border border-[#2b2d42] flex items-center justify-center mx-auto text-[#fe2c55]">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-200">
                Belum ada konten yang dibuat
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Isi nama produk dan manfaat di atas atau gunakan contoh cepat, pilih durasi 20s atau 30s, lalu klik{' '}
                <strong className="text-white">"Buat Konten Affiliate"</strong>.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#1a1b29] bg-[#090a10] py-8 text-center text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-neutral-400">
            TikTok Affiliate Assistant — Created by Yayan
          </p>
          <p className="text-[11px] text-neutral-400">
            Pembuat konsep konten video promosi TikTok Affiliate 20 & 30 detik yang kreatif, natural, dan berpotensi meningkatkan penjualan.
          </p>
          <p className="text-[10px] text-neutral-500 pt-2">
            © {new Date().getFullYear()} TikTok Affiliate Assistant. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <TikTokPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        result={result}
        durasiVideo={formData.durasiVideo}
        productPhotoUrl={formData.productPhotoPreviewUrl}
        talentPhotoUrl={formData.talentPhotoPreviewUrl}
        namaProduk={formData.namaProduk}
      />

      <TeleprompterModal
        isOpen={isTeleprompterOpen}
        onClose={() => setIsTeleprompterOpen(false)}
        result={result}
        durasiVideo={formData.durasiVideo}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistory={handleSelectHistoryItem}
        onClearHistory={handleClearHistory}
        onDeleteItem={handleDeleteHistoryItem}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
