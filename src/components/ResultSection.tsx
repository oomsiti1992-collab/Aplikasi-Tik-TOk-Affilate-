import React, { useState } from 'react';
import {
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Film,
  Video,
  Mic,
  Hash,
  Sliders,
  Play,
  Download,
  Eye,
  Layers,
  Sparkle,
  ShoppingBag,
  Camera,
  Scissors,
} from 'lucide-react';
import { HasilKontenAI, DurasiVideo } from '../types';

interface ResultSectionProps {
  result: HasilKontenAI;
  durasiVideo: DurasiVideo;
  onRegenerate: () => void;
  isLoading: boolean;
  onOpenPreview: () => void;
  onOpenTeleprompter: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  result,
  durasiVideo,
  onRegenerate,
  isLoading,
  onOpenPreview,
  onOpenTeleprompter,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedHookIndex, setSelectedHookIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'semua' | 'hook' | 'skrip' | 'prompt' | 'caption' | 'capcut'>('semua');

  // Filter scenes strictly: 2 scenes for 20s, 3 for 30s
  const maxScenes = durasiVideo === '20 detik' ? 2 : 3;
  const filteredScenes = result.adeganVideo.slice(0, maxScenes);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2200);
  };

  // Compile full hooks text for "Salin Hook"
  const getFullHooksText = () => {
    let text = `🎯 5 PILIHAN HOOK TIKTOK (1-3 DETIK PERTAMA)\n`;
    text += `Produk: ${result.judulVideo}\n\n`;
    result.limaPilihanHook.forEach((h, idx) => {
      text += `${idx + 1}. "${h}"\n`;
    });
    return text;
  };

  // Compile full script text for "Salin Skrip"
  const getFullScriptText = () => {
    let text = `🎬 SKRIP LENGKAP VIDEO TIKTOK AFFILIATE (${durasiVideo.toUpperCase()})\n`;
    text += `Judul: ${result.judulVideo}\n`;
    text += `Hook Terpilih: "${result.limaPilihanHook[selectedHookIndex] || result.limaPilihanHook[0]}"\n\n`;
    text += `=== NASKAH PER ADEGAN ===\n\n`;

    filteredScenes.forEach((scene) => {
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `ADEGAN ${scene.nomorAdegan} (${scene.rentangWaktu})\n`;
      text += `• Tujuan: ${scene.tujuanAdegan}\n`;
      text += `• Visual & Aksi: ${scene.deskripsiVisualDanAksi}\n`;
      text += `• Kamera: ${scene.gerakanKamera}\n`;
      text += `• Voice-Over / Dialog: "${scene.voiceOverDialog}"\n`;
      if (scene.teksOverlayOpsional) {
        text += `• Teks Overlay: [${scene.teksOverlayOpsional}]\n`;
      }
      text += `\n`;
    });

    text += `=== SKRIP UTUH VOICE-OVER ===\n`;
    text += `"${result.skripLengkap}"\n`;
    return text;
  };

  const downloadAsTxt = () => {
    let content = `TIKTOK AFFILIATE ASSISTANT — BY YAYAN\n`;
    content += `Judul: ${result.judulVideo}\n`;
    content += `Durasi: ${durasiVideo} (${filteredScenes.length} Adegan)\n`;
    content += `Tanggal Dibuat: ${new Date().toLocaleDateString('id-ID')}\n\n`;

    content += `========================================\n`;
    content += `A. 5 PILIHAN HOOK 1-3 DETIK PERTAMA\n`;
    result.limaPilihanHook.forEach((h, idx) => {
      content += `${idx + 1}. ${h}\n`;
    });

    content += `\n========================================\n`;
    content += `B. SKRIP VIDEO LENGKAP\n`;
    content += `${result.skripLengkap}\n\n`;

    content += `========================================\n`;
    content += `C. PEMBAGIAN ADEGAN & PROMPT VIDEO AI (9:16 VERTICAL)\n\n`;
    filteredScenes.forEach((scene) => {
      content += `[Adegan ${scene.nomorAdegan} - ${scene.rentangWaktu}]\n`;
      content += `Tujuan: ${scene.tujuanAdegan}\n`;
      content += `Visual & Aksi: ${scene.deskripsiVisualDanAksi}\n`;
      content += `Gerakan Kamera: ${scene.gerakanKamera}\n`;
      content += `Voice-Over: "${scene.voiceOverDialog}"\n`;
      content += `Teks Overlay: ${scene.teksOverlayOpsional}\n`;
      content += `PROMPT AI: ${scene.promptVideoAI}\n\n`;
    });

    content += `========================================\n`;
    content += `D. CAPTION & HASHTAG TIKTOK\n`;
    content += `${result.captionDanHashtag.teksSiapSalin}\n\n`;

    content += `========================================\n`;
    content += `E. PANDUAN EDITING CAPCUT\n`;
    content += `Musik Non-Rock: ${result.panduanEditingCapCut.musikLatarNonRock}\n`;
    content += `SFX: ${result.panduanEditingCapCut.efekSuaraSFX.join(', ')}\n`;
    content += `Transisi: ${result.panduanEditingCapCut.transisiCapCut}\n`;
    content += `Safe Zone Auto-Caption: ${result.panduanEditingCapCut.penempatanTeksAutoCaption}\n`;
    content += `Tempo Pacing: ${result.panduanEditingCapCut.tempoDanPacing}\n`;
    content += `Tips Konversi: ${result.panduanEditingCapCut.tipsKonversiAffiliate}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Konten-${durasiVideo.replace(' ', '_')}-${result.judulVideo.slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card & Action Bar */}
      <div className="bg-[#12131d] rounded-2xl p-5 sm:p-6 border border-[#232435] shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#212232]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#fe2c55]/20 text-[#fe2c55] border border-[#fe2c55]/40">
                <Sparkles className="w-3.5 h-3.5" />
                Konten Affiliate {durasiVideo} Berhasil Dibuat
              </span>
              <span className="text-xs text-neutral-400">
                • {filteredScenes.length} Adegan @10 detik
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              {result.judulVideo}
            </h2>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Salin Hook */}
            <button
              onClick={() => copyToClipboard(getFullHooksText(), 'copy-all-hooks')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1a1b28] hover:bg-[#25263a] text-neutral-200 border border-[#2d2f44] transition-all cursor-pointer"
              title="Salin 5 pilihan hook"
            >
              {copiedKey === 'copy-all-hooks' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Hook Disalin!</span>
                </>
              ) : (
                <>
                  <Sparkle className="w-4 h-4 text-[#25f4ee]" />
                  <span>Salin Hook</span>
                </>
              )}
            </button>

            {/* Salin Skrip */}
            <button
              onClick={() => copyToClipboard(getFullScriptText(), 'full-script')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#fe2c55] hover:bg-[#ff3b65] text-white shadow-md transition-all cursor-pointer"
            >
              {copiedKey === 'full-script' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Skrip Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Skrip</span>
                </>
              )}
            </button>

            {/* Salin Caption dan Hashtag */}
            <button
              onClick={() => copyToClipboard(result.captionDanHashtag.teksSiapSalin, 'caption-hashtag')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1a1b28] hover:bg-[#25263a] text-neutral-200 border border-[#2d2f44] transition-all cursor-pointer"
            >
              {copiedKey === 'caption-hashtag' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Caption Disalin!</span>
                </>
              ) : (
                <>
                  <Hash className="w-4 h-4 text-[#fe2c55]" />
                  <span>Salin Caption & Hashtag</span>
                </>
              )}
            </button>

            {/* Buat Ulang Konten */}
            <button
              onClick={onRegenerate}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1a1b28] hover:bg-[#25263a] text-neutral-200 border border-[#2d2f44] transition-all cursor-pointer disabled:opacity-50"
              title="Buat ulang konten dengan sudut pandang baru"
            >
              <RefreshCw className={`w-4 h-4 text-[#fe2c55] ${isLoading ? 'animate-spin' : ''}`} />
              <span>Buat Ulang Konten</span>
            </button>

            {/* Preview Simulation Button */}
            <button
              onClick={onOpenPreview}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#161722] hover:bg-[#1f2030] text-neutral-300 border border-[#2b2c3d] transition-all cursor-pointer"
              title="Lihat simulasi vertikal HP TikTok"
            >
              <Eye className="w-4 h-4 text-[#25f4ee]" />
              <span>Simulasi TikTok</span>
            </button>

            {/* Download TXT */}
            <button
              onClick={downloadAsTxt}
              className="inline-flex items-center gap-1.5 p-2 rounded-xl text-xs font-semibold bg-[#161722] hover:bg-[#1f2030] text-neutral-300 border border-[#2b2c3d] transition-all cursor-pointer"
              title="Unduh seluruh konten dalam format .txt"
            >
              <Download className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Scene Prompt Quick Copy Buttons Bar (Adegan 1, 2, dan 3 jika 30s) */}
        <div className="pt-4 border-b border-[#1c1d2c] pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 mr-1">Tombol Cepat Prompt:</span>
            {filteredScenes.map((scene) => {
              const promptKey = `prompt-btn-${scene.nomorAdegan}`;
              const isCopied = copiedKey === promptKey;
              return (
                <button
                  key={scene.nomorAdegan}
                  onClick={() => copyToClipboard(scene.promptVideoAI, promptKey)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1a1b28] hover:bg-[#25263a] text-purple-300 border border-purple-500/40 hover:border-purple-400 transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Prompt Adegan {scene.nomorAdegan} Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-purple-400" />
                      <span>Salin Prompt Adegan {scene.nomorAdegan}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 pt-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'semua', label: 'Semua Hasil', icon: Layers },
            { id: 'hook', label: '5 Pilihan Hook', icon: Sparkle },
            { id: 'skrip', label: 'Skrip & Adegan', icon: Film },
            { id: 'prompt', label: 'Prompt Video AI', icon: Video },
            { id: 'caption', label: 'Caption & Hashtag', icon: Hash },
            { id: 'capcut', label: 'Panduan Editing CapCut', icon: Scissors },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#fe2c55]/20 text-[#fe2c55] border border-[#fe2c55]/50'
                    : 'text-neutral-400 hover:text-white bg-[#0a0b12] border border-[#212232]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION A: LIMA PILIHAN HOOK (1–3 DETIK PERTAMA) */}
      {(activeTab === 'semua' || activeTab === 'hook') && (
        <div className="bg-[#12131d] rounded-2xl p-5 sm:p-6 border border-[#232435] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#212232]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#fe2c55]/15 border border-[#fe2c55]/30 flex items-center justify-center text-[#fe2c55] font-bold text-xs">
                A
              </div>
              <div>
                <h3 className="text-base font-bold text-white">5 Pilihan Hook Menarik (1–3 Detik Pertama)</h3>
                <p className="text-xs text-neutral-400">Kalimat pembuka penahan scroll penonton TikTok</p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(getFullHooksText(), 'copy-all-hooks-sec')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1a1b28] hover:bg-[#25263a] text-neutral-200 border border-[#2d2f44] cursor-pointer"
            >
              {copiedKey === 'copy-all-hooks-sec' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin Semua Hook</span>
            </button>
          </div>

          <div className="space-y-3">
            {result.limaPilihanHook.map((hookText, idx) => {
              const isSelected = selectedHookIndex === idx;
              const hookCopyKey = `hook-${idx}`;
              const isCopied = copiedKey === hookCopyKey;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedHookIndex(idx)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#fe2c55]/15 via-[#181926] to-[#0a0b12] border-[#fe2c55] shadow-md'
                      : 'bg-[#0a0b12] border-[#222436] hover:border-[#383a54]'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#fe2c55] text-white' : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className={`text-sm sm:text-base font-bold leading-relaxed ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                        "{hookText}"
                      </p>
                      <span className="text-[11px] text-neutral-400 mt-1 block">
                        {idx === 0 && '🔥 Hook Rasa Penasaran / Frustrasi Masalah'}
                        {idx === 1 && '💡 Hook Pertanyaan Relatable'}
                        {idx === 2 && '⚡ Hook Solusi Cepat & Tidak Terduga'}
                        {idx === 3 && '👀 Hook Peringatan / Tips Edukatif'}
                        {idx === 4 && '✨ Hook Spill Rekomendasi Jujur'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {isSelected && (
                      <span className="text-[10px] font-bold text-[#fe2c55] bg-[#fe2c55]/15 px-2 py-0.5 rounded border border-[#fe2c55]/30">
                        Aktif di Simulasi
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(hookText, hookCopyKey);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#161724] hover:bg-[#202235] text-neutral-300 border border-[#2a2c40] cursor-pointer"
                      title="Salin hook ini"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION B: SKRIP VIDEO LENGKAP */}
      {(activeTab === 'semua' || activeTab === 'skrip') && (
        <div className="bg-[#12131d] rounded-2xl p-5 sm:p-6 border border-[#232435] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#212232]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#25f4ee]/15 border border-[#25f4ee]/30 flex items-center justify-center text-[#25f4ee] font-bold text-xs">
                B
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Skrip Video Lengkap ({durasiVideo})</h3>
                <p className="text-xs text-neutral-400">Naskah voice-over utuh yang siap dibaca dengan intonasi natural</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenTeleprompter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1a1b28] hover:bg-[#25263a] text-neutral-200 border border-[#2d2f44] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#25f4ee]" />
                <span>Latihan Teleprompter</span>
              </button>

              <button
                onClick={() => copyToClipboard(result.skripLengkap, 'copy-full-script-text')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#fe2c55]/20 hover:bg-[#fe2c55]/30 text-[#fe2c55] border border-[#fe2c55]/40 cursor-pointer"
              >
                {copiedKey === 'copy-full-script-text' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin Skrip</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#0a0b12] border border-[#222436] space-y-2">
            <p className="text-sm sm:text-base text-neutral-100 font-medium leading-relaxed whitespace-pre-line">
              "{result.skripLengkap}"
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              💡 Bicaralah dengan tempo luwes dan nada bersahabat layaknya merekomendasikan produk ke teman akrab.
            </div>
          </div>
        </div>
      )}

      {/* SECTION C & D: PEMBAGIAN ADEGAN & PROMPT VIDEO AI */}
      {(activeTab === 'semua' || activeTab === 'skrip' || activeTab === 'prompt') && (
        <div className="bg-[#12131d] rounded-2xl p-5 sm:p-6 border border-[#232435] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-[#212232]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
                C & D
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Pembagian Adegan & Prompt Video AI</h3>
                <p className="text-xs text-neutral-400">
                  {durasiVideo === '20 detik'
                    ? 'Durasi 20 detik: Tepat 2 adegan (00–10s & 10–20s)'
                    : 'Durasi 30 detik: Tepat 3 adegan (00–10s, 10–20s, & 20–30s)'}
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#0a0b12] border border-[#222436] text-neutral-300">
              Vertikal 9:16 • 10 Detik/Adegan
            </span>
          </div>

          <div className="space-y-5">
            {filteredScenes.map((adegan) => {
              const copyPromptKey = `prompt-scene-${adegan.nomorAdegan}`;
              const isPromptCopied = copiedKey === copyPromptKey;

              return (
                <div
                  key={adegan.nomorAdegan}
                  className="rounded-xl bg-[#0a0b12] border border-[#222436] p-4 sm:p-5 relative space-y-4"
                >
                  {/* Adegan Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1c1d2c]">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#fe2c55] text-white">
                        Adegan {adegan.nomorAdegan}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#161724] text-[#25f4ee] border border-[#2b2c40]">
                        {adegan.rentangWaktu}
                      </span>
                      <span className="text-xs text-neutral-300 font-semibold">
                        — {adegan.tujuanAdegan}
                      </span>
                    </div>

                    {/* Tombol Salin Prompt Adegan X */}
                    <button
                      onClick={() => copyToClipboard(adegan.promptVideoAI, copyPromptKey)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#fe2c55] hover:bg-[#ff3b65] text-white transition-all cursor-pointer shadow-sm"
                    >
                      {isPromptCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Prompt Adegan {adegan.nomorAdegan} Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Prompt Adegan {adegan.nomorAdegan}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Naskah & Visual Adegan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                    {/* Visual & Aksi */}
                    <div className="p-3.5 rounded-lg bg-[#11121d] border border-[#1e1f30] space-y-2">
                      <div>
                        <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px] block mb-0.5">
                          👁️ Deskripsi Visual & Aksi Konkret
                        </span>
                        <p className="text-neutral-200 leading-relaxed">{adegan.deskripsiVisualDanAksi}</p>
                      </div>
                      <div>
                        <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px] flex items-center gap-1 mb-0.5">
                          <Camera className="w-3 h-3 text-[#25f4ee]" /> Gerakan Kamera
                        </span>
                        <p className="text-neutral-300">{adegan.gerakanKamera}</p>
                      </div>
                    </div>

                    {/* Voice-Over & Teks Overlay */}
                    <div className="p-3.5 rounded-lg bg-[#161725] border border-[#2a2c42] space-y-2">
                      <div>
                        <span className="font-bold text-[#25f4ee] uppercase tracking-wider text-[10px] flex items-center gap-1 mb-0.5">
                          <Mic className="w-3 h-3" /> Naskah Voice-Over / Dialog
                        </span>
                        <p className="text-white font-medium text-sm leading-relaxed">
                          "{adegan.voiceOverDialog}"
                        </p>
                      </div>

                      {adegan.teksOverlayOpsional && (
                        <div>
                          <span className="font-bold text-[#fe2c55] uppercase tracking-wider text-[10px] block mb-0.5">
                            📱 Teks Overlay Layar (Opsional)
                          </span>
                          <span className="inline-block bg-[#fe2c55]/20 text-[#fe2c55] px-2 py-0.5 rounded text-xs font-bold border border-[#fe2c55]/30">
                            {adegan.teksOverlayOpsional}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prompt Video AI Siap Salin untuk Google Flow / Meta AI */}
                  <div className="p-3.5 rounded-lg bg-[#131422] border border-[#26283d] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1">
                        <Video className="w-3.5 h-3.5 text-purple-400" />
                        Prompt Video AI (Google Flow / Meta AI) • 9:16 Vertikal • 10 Detik
                      </span>
                      <button
                        onClick={() => copyToClipboard(adegan.promptVideoAI, copyPromptKey)}
                        className="text-[10px] text-purple-300 hover:text-white cursor-pointer"
                      >
                        {isPromptCopied ? '✓ Disalin' : 'Salin Prompt'}
                      </button>
                    </div>
                    <p className="text-xs font-mono text-purple-100 select-all leading-relaxed bg-[#0b0c14] p-3 rounded-lg border border-[#1b1c2a]">
                      {adegan.promptVideoAI}
                    </p>
                    {adegan.catatanKonsistensi && (
                      <p className="text-[11px] text-neutral-400 italic">
                        Konsistensi: {adegan.catatanKonsistensi}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION E: CAPTION TIKTOK, HASHTAG & PANDUAN EDITING CAPCUT */}
      {(activeTab === 'semua' || activeTab === 'caption') && (
        <div className="bg-[#12131d] rounded-2xl p-5 sm:p-6 border border-[#232435] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#212232]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#25f4ee]/15 border border-[#25f4ee]/30 flex items-center justify-center text-[#25f4ee] font-bold text-xs">
                E1
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Caption TikTok & Hashtag Relevan</h3>
                <p className="text-xs text-neutral-400">Siap disalin langsung ke kolom postingan TikTok</p>
              </div>
            </div>

            {/* Salin Caption dan Hashtag */}
            <button
              onClick={() => copyToClipboard(result.captionDanHashtag.teksSiapSalin, 'caption-hashtag-sec')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#fe2c55] hover:bg-[#ff3b65] text-white transition-all cursor-pointer shadow-md"
            >
              {copiedKey === 'caption-hashtag-sec' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Caption & Hashtag Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Caption dan Hashtag</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {/* Box Siap Salin */}
            <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436] space-y-2">
              <span className="text-[11px] text-neutral-400 font-semibold uppercase block">
                Format Siap Tempel ke TikTok:
              </span>
              <div className="p-3.5 rounded-lg bg-[#11121d] border border-[#1e1f30] text-sm text-neutral-100 whitespace-pre-line leading-relaxed font-sans">
                {result.captionDanHashtag.teksSiapSalin}
              </div>
            </div>

            {/* Detail CTA & Hashtag */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0a0b12] border border-[#222436]">
                <span className="font-bold text-[#fe2c55] uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1">
                  <ShoppingBag className="w-3 h-3" /> Ajakan CTA Keranjang Kuning
                </span>
                <p className="text-neutral-200 font-medium">
                  {result.captionDanHashtag.callToActionKeranjangKuning}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0a0b12] border border-[#222436]">
                <span className="font-bold text-[#25f4ee] uppercase tracking-wider text-[10px] block mb-1">
                  Daftar Hashtag (5–10 Relevan)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.captionDanHashtag.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#161725] text-neutral-300 text-[11px] border border-[#2b2c40]"
                    >
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION E2: PANDUAN EDITING CAPCUT */}
      {(activeTab === 'semua' || activeTab === 'capcut') && (
        <div className="bg-[#12131d] rounded-2xl p-5 sm:p-6 border border-[#232435] shadow-lg">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#212232]">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
              E2
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Panduan Editing CapCut</h3>
              <p className="text-xs text-neutral-400">Rekomendasi musik non-rock, efek suara, dan penempatan teks auto-caption</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Musik Latar Non-Rock */}
            <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436]">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block mb-1">
                🎵 Musik Latar CapCut (Non-Rock)
              </span>
              <p className="text-neutral-200 leading-relaxed font-medium">
                {result.panduanEditingCapCut.musikLatarNonRock}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">
                Atur volume musik latar 10%–15% agar vokal voice-over tetap terdengar jelas dan dominan.
              </p>
            </div>

            {/* Efek Suara SFX */}
            <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436]">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block mb-1">
                🔊 Efek Suara (SFX CapCut)
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {result.panduanEditingCapCut.efekSuaraSFX.map((sfx, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#161724] text-neutral-200 text-xs border border-[#2b2c40]"
                  >
                    {sfx}
                  </span>
                ))}
              </div>
            </div>

            {/* Transisi & Tempo */}
            <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436]">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block mb-1">
                ⚡ Transisi CapCut & Tempo Pacing
              </span>
              <p className="text-neutral-200 leading-relaxed mb-1">
                <strong>Transisi:</strong> {result.panduanEditingCapCut.transisiCapCut}
              </p>
              <p className="text-neutral-300 leading-relaxed">
                <strong>Tempo:</strong> {result.panduanEditingCapCut.tempoDanPacing}
              </p>
            </div>

            {/* Safe Zone Auto-Caption CapCut */}
            <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436]">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block mb-1">
                📏 Safe Zone Auto-Caption CapCut
              </span>
              <p className="text-neutral-200 leading-relaxed">
                {result.panduanEditingCapCut.penempatanTeksAutoCaption}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">
                Gunakan template teks 'Bouncing' atau 'Bold Yellow' CapCut di area tengah vertikal (40%–60%).
              </p>
            </div>

            {/* Tips Konversi Affiliate */}
            <div className="md:col-span-2 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-[#181926] to-[#0a0b12] border border-amber-500/30">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block mb-1">
                🛒 Kunci Sukses Konversi TikTok Affiliate
              </span>
              <p className="text-neutral-100 text-sm font-medium leading-relaxed">
                {result.panduanEditingCapCut.tipsKonversiAffiliate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
