import React, { useRef } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Clock,
  Upload,
  CheckCircle2,
  RefreshCw,
  Image as ImageIcon,
  Flame,
  RotateCcw,
  User,
  Package,
} from 'lucide-react';
import { FormInputData, GayaKonten, JenisVideo, DurasiVideo } from '../types';
import { PRESET_TEMPLATES } from '../data/presets';

interface ProductFormProps {
  formData: FormInputData;
  setFormData: React.Dispatch<React.SetStateAction<FormInputData>>;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  isLoading: boolean;
  onSelectPreset: (preset: typeof PRESET_TEMPLATES[0]) => void;
}

const GAYA_KONTEN_OPTIONS: { value: GayaKonten; label: string; desc: string; icon: string }[] = [
  { value: 'problem-solution', label: 'Problem-Solution', desc: 'Ungkap keluhan audiens, berikan produk sebagai jalan keluar', icon: '🎯' },
  { value: 'review', label: 'Review Jujur', desc: 'Ulasan personal yang jujur, transparan, dan relatable', icon: '⭐' },
  { value: 'storytelling', label: 'Storytelling', desc: 'Cerita santai sehari-hari yang mengalir dan menggugah rasa penasaran', icon: '📖' },
  { value: 'edukatif', label: 'Edukatif', desc: 'Berbagi tips, trik, atau informasi berharga seputar masalah audiens', icon: '💡' },
  { value: 'lucu', label: 'Lucu / Komedi', desc: 'Situasi jenaka dan menggelitik yang relate dengan penonton TikTok', icon: '😂' },
  { value: 'soft selling', label: 'Soft Selling', desc: 'Menyelipkan produk secara halus tanpa kesan promosi yang agresif', icon: '🌿' },
];

const JENIS_VIDEO_OPTIONS: { value: JenisVideo; label: string; desc: string }[] = [
  { value: 'voice-over', label: 'Voice-Over', desc: 'Footage visual estetik diiringi narasi suara di balik layar' },
  { value: 'presenter', label: 'Presenter / Wajah Talent', desc: 'Talent berbicara langsung di depan kamera secara interaktif' },
  { value: 'demonstrasi produk', label: 'Demonstrasi Produk', desc: 'Fokus memperlihatkan uji coba dan cara pakai produk secara nyata' },
  { value: 'tanpa wajah', label: 'Tanpa Wajah (Faceless)', desc: 'Hanya tangan dan produk, cocok bagi kreator yang enggan tampil di kamera' },
  { value: 'video AI', label: 'Video AI Sintetis', desc: 'Visual sepenuhnya dirancang untuk digenerate memakai AI seperti Google Flow/Meta AI' },
];

export const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  onReset,
  isLoading,
  onSelectPreset,
}) => {
  const productPhotoInputRef = useRef<HTMLInputElement>(null);
  const talentPhotoInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran foto produk maksimal 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          productPhotoPreviewUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProductPhoto = () => {
    setFormData((prev) => ({
      ...prev,
      productPhotoPreviewUrl: undefined,
    }));
    if (productPhotoInputRef.current) {
      productPhotoInputRef.current.value = '';
    }
  };

  const handleTalentPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran foto talent maksimal 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          talentPhotoPreviewUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeTalentPhoto = () => {
    setFormData((prev) => ({
      ...prev,
      talentPhotoPreviewUrl: undefined,
    }));
    if (talentPhotoInputRef.current) {
      talentPhotoInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Quick Template Presets Bar */}
      <div className="bg-[#12131d] rounded-2xl p-4 sm:p-5 border border-[#232435] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#fe2c55]" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Contoh Cepat Produk Viral
            </span>
          </div>
          <span className="text-[11px] text-neutral-400">Klik untuk isi otomatis form</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_TEMPLATES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#1a1b28] hover:bg-[#25263a] text-neutral-200 border border-[#2d2f44] hover:border-[#fe2c55]/50 transition-all cursor-pointer text-left"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#fe2c55]" />
              <span className="font-semibold">{preset.title.split(' ')[0]}</span>
              <span className="text-neutral-400 truncate max-w-[140px] sm:max-w-[200px]">
                {preset.title.replace(preset.title.split(' ')[0], '')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-[#12131d] rounded-2xl p-5 sm:p-7 border border-[#232435] shadow-xl space-y-6">
        {/* Section 1: Informasi Produk */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#212232] mb-5">
            <div className="w-7 h-7 rounded-lg bg-[#fe2c55]/15 border border-[#fe2c55]/30 flex items-center justify-center text-[#fe2c55] font-bold text-xs">
              1
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Informasi Produk</h2>
              <p className="text-xs text-neutral-400">Masukkan nama produk dan manfaat asli yang ingin dipromosikan</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Nama Produk */}
            <div>
              <label className="block text-xs font-semibold text-neutral-200 mb-1.5">
                Nama Produk <span className="text-[#fe2c55]">*</span>
              </label>
              <input
                type="text"
                name="namaProduk"
                value={formData.namaProduk}
                onChange={handleInputChange}
                required
                placeholder="Contoh: Tumbler Stainless Vacuum 900ml, Sunscreen Gel SPF 50"
                className="w-full bg-[#0a0b12] border border-[#26283b] focus:border-[#fe2c55] focus:ring-1 focus:ring-[#fe2c55] rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-all outline-none"
              />
            </div>

            {/* Deskripsi dan Manfaat Produk */}
            <div>
              <label className="block text-xs font-semibold text-neutral-200 mb-1.5">
                Deskripsi dan Manfaat Produk <span className="text-[#fe2c55]">*</span>
              </label>
              <textarea
                name="deskripsiDanManfaat"
                rows={3}
                value={formData.deskripsiDanManfaat}
                onChange={handleInputChange}
                required
                placeholder="Jelaskan spesifikasi, kegunaan, dan keunggulan utama produk secara jujur (Contoh: Menjaga minuman tetap dingin hingga 24 jam tanpa mengembun, tutup anti bocor, dilengkapi sedotan stainless)."
                className="w-full bg-[#0a0b12] border border-[#26283b] focus:border-[#fe2c55] focus:ring-1 focus:ring-[#fe2c55] rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-all outline-none resize-none"
              />
            </div>

            {/* Target Audiens (Opsional) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-200">
                  Target Audiens
                </label>
                <span className="text-[11px] text-neutral-400">Opsional</span>
              </div>
              <input
                type="text"
                name="targetAudiens"
                value={formData.targetAudiens || ''}
                onChange={handleInputChange}
                placeholder="Contoh: Mahasiswa, pekerja kantoran, ibu rumah tangga, pejuang diet (boleh dikosongkan)"
                className="w-full bg-[#0a0b12] border border-[#26283b] focus:border-[#25f4ee] focus:ring-1 focus:ring-[#25f4ee] rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Format & Pengaturan Video */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#212232] mb-5">
            <div className="w-7 h-7 rounded-lg bg-[#25f4ee]/15 border border-[#25f4ee]/30 flex items-center justify-center text-[#25f4ee] font-bold text-xs">
              2
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Durasi & Gaya Konten</h2>
              <p className="text-xs text-neutral-400">Pilih durasi 20 atau 30 detik serta gaya penyampaian</p>
            </div>
          </div>

          {/* Durasi Video 20 vs 30 Detik */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-neutral-200 mb-2">
              Pilihan Durasi Video <span className="text-[#fe2c55]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(['20 detik', '30 detik'] as DurasiVideo[]).map((durasi) => {
                const isSelected = formData.durasiVideo === durasi;
                const scenesDetail =
                  durasi === '20 detik'
                    ? '2 Adegan (Adegan 1: 00–10s, Adegan 2: 10–20s)'
                    : '3 Adegan (Adegan 1: 00–10s, Adegan 2: 10–20s, Adegan 3: 20–30s)';
                return (
                  <button
                    key={durasi}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, durasiVideo: durasi }))}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#fe2c55]/15 border-[#fe2c55] ring-1 ring-[#fe2c55]/40 shadow-sm'
                        : 'bg-[#0a0b12] border-[#222436] hover:border-[#383a54]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-sm sm:text-base font-extrabold ${isSelected ? 'text-[#fe2c55]' : 'text-white'}`}>
                        Video {durasi}
                      </span>
                      <Clock className={`w-4 h-4 ${isSelected ? 'text-[#fe2c55]' : 'text-neutral-500'}`} />
                    </div>
                    <p className="text-xs text-neutral-300 font-medium">{scenesDetail}</p>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {durasi === '20 detik'
                        ? 'Tepat 2 adegan, masing-masing 10 detik. Ringkas & to-the-point.'
                        : 'Tepat 3 adegan, masing-masing 10 detik. Adegan ke-3 ditutup dengan CTA.'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gaya Konten */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-neutral-200 mb-2">
              Gaya Konten <span className="text-[#fe2c55]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {GAYA_KONTEN_OPTIONS.map((item) => {
                const isSelected = formData.gayaKonten === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, gayaKonten: item.value }))}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#fe2c55]/15 border-[#fe2c55] shadow-[0_0_15px_rgba(254,44,85,0.2)]'
                        : 'bg-[#0b0c13] border-[#222436] hover:border-[#383a54]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">{item.icon}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#fe2c55]" />}
                      </div>
                      <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                        {item.label}
                      </p>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Jenis Video */}
          <div>
            <label className="block text-xs font-semibold text-neutral-200 mb-2">
              Jenis Video <span className="text-[#fe2c55]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {JENIS_VIDEO_OPTIONS.map((opt) => {
                const isChecked = formData.jenisVideo === opt.value;
                return (
                  <label
                    key={opt.value}
                    onClick={() => setFormData((prev) => ({ ...prev, jenisVideo: opt.value }))}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#181926] border-[#fe2c55]/80 ring-1 ring-[#fe2c55]/40'
                        : 'bg-[#0a0b12] border-[#222436] hover:border-[#34374e]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="jenisVideo"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 text-[#fe2c55] focus:ring-0 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className={`text-xs font-bold ${isChecked ? 'text-white' : 'text-neutral-300'}`}>
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-0.5 leading-snug">{opt.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Upload Foto (Opsional) */}
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#212232] mb-5">
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
              3
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Upload Foto Produk & Talent (Opsional)</h2>
              <p className="text-xs text-neutral-400">Gunakan sebagai referensi visual utama pada prompt video AI</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upload Foto Produk */}
            <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#25f4ee]" />
                  Foto Produk
                </span>
                {formData.productPhotoPreviewUrl && (
                  <button
                    type="button"
                    onClick={removeProductPhoto}
                    className="text-[11px] text-red-400 hover:text-red-300 font-medium cursor-pointer"
                  >
                    Hapus Foto
                  </button>
                )}
              </div>

              {formData.productPhotoPreviewUrl ? (
                <div className="flex items-center gap-3">
                  <img
                    src={formData.productPhotoPreviewUrl}
                    alt="Foto Produk"
                    className="w-16 h-16 object-cover rounded-lg border border-[#2b2d42]"
                  />
                  <div className="text-xs text-neutral-300">
                    <p className="font-semibold text-emerald-400">✓ Foto produk terunggah</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Prompt AI akan menginstruksikan bentuk produk tetap konsisten sesuai foto.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    ref={productPhotoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProductPhotoUpload}
                    className="hidden"
                    id="product-photo-upload"
                  />
                  <label
                    htmlFor="product-photo-upload"
                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-[#2b2d42] bg-[#10111a] hover:bg-[#161724] cursor-pointer transition-colors text-center"
                  >
                    <ImageIcon className="w-5 h-5 text-neutral-400 mb-1" />
                    <span className="text-xs text-neutral-300 font-medium">Unggah Foto Produk</span>
                    <span className="text-[10px] text-neutral-400">PNG, JPG, WebP (maks 5MB)</span>
                  </label>
                </div>
              )}
            </div>

            {/* Upload Foto Talent */}
            <div className="p-4 rounded-xl bg-[#0a0b12] border border-[#222436] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#fe2c55]" />
                  Foto Talent (Jika Diperlukan)
                </span>
                {formData.talentPhotoPreviewUrl && (
                  <button
                    type="button"
                    onClick={removeTalentPhoto}
                    className="text-[11px] text-red-400 hover:text-red-300 font-medium cursor-pointer"
                  >
                    Hapus Foto
                  </button>
                )}
              </div>

              {formData.talentPhotoPreviewUrl ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={formData.talentPhotoPreviewUrl}
                      alt="Foto Talent"
                      className="w-16 h-16 object-cover rounded-lg border border-[#2b2d42]"
                    />
                    <div className="text-xs text-neutral-300">
                      <p className="font-semibold text-emerald-400">✓ Foto talent terunggah</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Identitas karakter dijaga konsisten antarscene.
                      </p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="talentDescription"
                    value={formData.talentDescription || ''}
                    onChange={handleInputChange}
                    placeholder="Deskripsi talent (misal: Perempuan 24 tahun, senyum ramah, jaket putih)"
                    className="w-full bg-[#10111a] border border-[#26283b] rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 outline-none"
                  />
                </div>
              ) : (
                <div>
                  <input
                    ref={talentPhotoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleTalentPhotoUpload}
                    className="hidden"
                    id="talent-photo-upload"
                  />
                  <label
                    htmlFor="talent-photo-upload"
                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-[#2b2d42] bg-[#10111a] hover:bg-[#161724] cursor-pointer transition-colors text-center"
                  >
                    <User className="w-5 h-5 text-neutral-400 mb-1" />
                    <span className="text-xs text-neutral-300 font-medium">Unggah Foto Talent</span>
                    <span className="text-[10px] text-neutral-400">Gunakan sebagai model referensi</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons: Buat Konten Affiliate & Reset Form */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isLoading || !formData.namaProduk.trim() || !formData.deskripsiDanManfaat.trim()}
            className="flex-1 w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-[#fe2c55] via-[#ff3b65] to-[#e61b44] hover:from-[#ff3860] hover:to-[#d0153a] text-white font-extrabold text-base py-4 px-6 shadow-[0_10px_25px_rgba(254,44,85,0.35)] transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Merancang Konten Affiliate {formData.durasiVideo}...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 transition-transform group-hover:scale-125" />
                <span>Buat Konten Affiliate</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-[#1a1b28] hover:bg-[#25263a] border border-[#2d2f44] transition-all cursor-pointer disabled:opacity-50"
            title="Kosongkan form input"
          >
            <RotateCcw className="w-4 h-4 text-neutral-400" />
            <span>Reset Form</span>
          </button>
        </div>
      </div>
    </form>
  );
};
