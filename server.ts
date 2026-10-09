import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/generate-content', async (req, res) => {
  try {
    const {
      namaProduk,
      deskripsiDanManfaat,
      targetAudiens,
      gayaKonten,
      durasiVideo, // "20 detik" or "30 detik"
      jenisVideo, // "voice-over" | "presenter" | "demonstrasi produk" | "tanpa wajah" | "video AI"
      hasProductPhoto,
      hasTalentPhoto,
      talentDescription,
      variationSeed,
    } = req.body;

    if (!namaProduk) {
      return res.status(400).json({ error: 'Nama produk wajib diisi.' });
    }

    const durationSeconds = durasiVideo === '20 detik' ? 20 : 30;
    const sceneCount = durationSeconds === 20 ? 2 : 3;

    const systemInstruction = `Kamu adalah Asisten AI Spesialis TikTok Affiliate profesional ("TikTok Affiliate Assistant — by Yayan").
Tugasmu adalah menghasilkan konsep dan skrip video promosi TikTok Affiliate berdurasi tepat ${durationSeconds} detik yang natural, menarik, kreatif, dan berbasis kejujuran konten.

Prinsip Kejujuran Konten:
- HANYA gunakan informasi, spesifikasi, dan manfaat yang diberikan pengguna.
- JANGAN mengarang harga, diskon, sertifikasi, hasil uji klinis, atau testimoni palsu yang tidak disebutkan.
- JANGAN menjanjikan klaim berlebihan seperti "pasti viral" atau "dijamin langsung kaya/laku".
- Bahasa Indonesia santai, komunikatif, bersahabat, luwes, dan tidak terkesan memaksa penonton membeli.

Aturan Durasi & Adegan:
- Jika durasi 20 detik: HANYA ada 2 adegan (Adegan 1: 00–10 detik, Adegan 2: 10–20 detik). DILARANG membuat adegan ke-3.
- Jika durasi 30 detik: HANYA ada 3 adegan (Adegan 1: 00–10 detik, Adegan 2: 10–20 detik, Adegan 3: 20–30 detik).
- Setiap adegan berdurasi tepat 10 detik.
- Cerita menyambung utuh:
  * Adegan 1: Menarik perhatian (hook masalah/curiosity) dalam 1–3 detik awal.
  * Adegan 2: Memperlihatkan produk, cara pakai, atau manfaat utamanya secara konkret.
  ${sceneCount === 3 ? '* Adegan 3: Menutup dengan kesimpulan kuat dan Call To Action (CTA) ramah ke keranjang kuning.' : '* Pada video 20 detik, ajakan keranjang kuning diselipkan di akhir Adegan 2.'}

Aturan Prompt Video AI:
- Setiap adegan memiliki prompt video AI tersendiri yang siap disalin ke Google Flow atau Meta AI.
- Wajib menyertakan spesifikasi: durasi 10 detik, rasio vertikal 9:16, visual commercial photorealism realistis.
- Jelaskan gerakan kamera dan aksi talent/produk secara konkret.
- Jaga konsistensi produk, pakaian talent, wajah, dan latar antarscene.
- Hindari perubahan bentuk produk, teks acak/gibberish, watermark, atau logo yang tidak diminta.
${hasProductPhoto ? '- Catatan: Pengguna mengunggah foto produk asli. Prompt harus menginstruksikan generator AI untuk menggunakan foto produk sebagai referensi visual utama tanpa mengubah bentuk aslinya.' : ''}
${hasTalentPhoto ? '- Catatan: Pengguna mengunggah foto talent asli. Prompt harus menginstruksikan generator AI untuk menggunakan foto talent sebagai referensi visual karakter tanpa mengubah proporsi wajah secara berlebihan.' : ''}

Panduan Editing CapCut:
- Berikan arahan musik latar non-rock (Lo-Fi, acoustic pop, upbeat cheerful instrumental).
- Efek suara (SFX) yang pas di CapCut (whoosh, pop, ding).
- Safe zone penempatan teks overlay auto-caption CapCut agar tidak tertutup ikon like/komen TikTok dan tombol keranjang kuning.`;

    const promptUser = `Buat konten TikTok Affiliate lengkap untuk produk berikut:
- Nama Produk: ${namaProduk}
- Deskripsi & Manfaat: ${deskripsiDanManfaat || 'Sesuai fungsi produk'}
- Target Audiens: ${targetAudiens || 'Pengguna umum TikTok'}
- Gaya Konten: ${gayaKonten || 'problem-solution'}
- Durasi Video: ${durasiVideo || '30 detik'} (WAJIB tepat ${sceneCount} adegan)
- Jenis Video: ${jenisVideo || 'voice-over'}
${hasProductPhoto ? '- Foto Produk: Telah diunggah oleh pengguna sebagai referensi' : ''}
${hasTalentPhoto ? `- Foto Talent: Telah diunggah oleh pengguna sebagai referensi (${talentDescription || 'talent ramah gaya casual'})` : ''}
${variationSeed ? `- Variasi Sudut Pandang Kreatif: ${variationSeed}` : ''}

Hasilkan output JSON terstruktur sesuai response schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptUser,
      config: {
        systemInstruction,
        temperature: 0.85,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            judulVideo: {
              type: Type.STRING,
              description: 'Judul video TikTok yang menarik dan relevan',
            },
            limaPilihanHook: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Tepat 5 pilihan hook kalimat pembuka 1-3 detik pertama yang menarik perhatian',
            },
            skripLengkap: {
              type: Type.STRING,
              description: `Skrip video lengkap dari awal sampai akhir sesuai durasi ${durasiVideo}`,
            },
            adeganVideo: {
              type: Type.ARRAY,
              description: `Daftar adegan video. Harus ada tepat ${sceneCount} adegan (masing-masing 10 detik).`,
              items: {
                type: Type.OBJECT,
                properties: {
                  nomorAdegan: { type: Type.INTEGER, description: 'Nomor adegan (1, 2, atau 3)' },
                  rentangWaktu: { type: Type.STRING, description: 'Rentang waktu persis, contoh "00–10 detik", "10–20 detik"' },
                  tujuanAdegan: { type: Type.STRING, description: 'Tujuan utama adegan (misal: Hook penahan scroll, Demonstrasi solusi produk, CTA keranjang kuning)' },
                  deskripsiVisualDanAksi: { type: Type.STRING, description: 'Deskripsi visual dan aksi konkret talent/objek' },
                  gerakanKamera: { type: Type.STRING, description: 'Pergerakan kamera (misal: Close-up zoom in, whip pan, smooth tracking shot)' },
                  voiceOverDialog: { type: Type.STRING, description: 'Naskah voice-over atau dialog bahasa Indonesia santai' },
                  teksOverlayOpsional: { type: Type.STRING, description: 'Teks overlay opsional di layar' },
                  promptVideoAI: { type: Type.STRING, description: 'Prompt video AI siap salin untuk Google Flow atau Meta AI (durasi 10 detik, rasio 9:16 vertikal)' },
                  catatanKonsistensi: { type: Type.STRING, description: 'Catatan menjaga konsistensi visual antarscene' },
                },
                required: [
                  'nomorAdegan',
                  'rentangWaktu',
                  'tujuanAdegan',
                  'deskripsiVisualDanAksi',
                  'gerakanKamera',
                  'voiceOverDialog',
                  'teksOverlayOpsional',
                  'promptVideoAI',
                ],
              },
            },
            captionDanHashtag: {
              type: Type.OBJECT,
              properties: {
                caption: { type: Type.STRING, description: 'Caption TikTok yang persuasif dan engaging' },
                callToActionKeranjangKuning: { type: Type.STRING, description: 'Ajakan ramah untuk mengecek keranjang kuning di kiri bawah' },
                hashtags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Daftar 5-10 hashtag relevan',
                },
                teksSiapSalin: { type: Type.STRING, description: 'Gabungan caption, CTA keranjang kuning, dan hashtag siap langsung salin' },
              },
              required: ['caption', 'callToActionKeranjangKuning', 'hashtags', 'teksSiapSalin'],
            },
            panduanEditingCapCut: {
              type: Type.OBJECT,
              properties: {
                musikLatarNonRock: { type: Type.STRING, description: 'Rekomendasi musik latar non-rock (Lo-Fi, acoustic, cheerful pop)' },
                efekSuaraSFX: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Daftar efek suara yang direkomendasikan di CapCut',
                },
                transisiCapCut: { type: Type.STRING, description: 'Saran transisi di CapCut antarscene' },
                penempatanTeksAutoCaption: { type: Type.STRING, description: 'Panduan safe zone auto-caption CapCut agar tidak tertutup antarmuka TikTok' },
                tempoDanPacing: { type: Type.STRING, description: 'Tempo pemotongan video (cut) dan pacing voice-over' },
                tipsKonversiAffiliate: { type: Type.STRING, description: 'Tips praktis CapCut & TikTok Affiliate untuk meningkatkan konversi checkout' },
              },
              required: [
                'musikLatarNonRock',
                'efekSuaraSFX',
                'transisiCapCut',
                'penempatanTeksAutoCaption',
                'tempoDanPacing',
                'tipsKonversiAffiliate',
              ],
            },
          },
          required: [
            'judulVideo',
            'limaPilihanHook',
            'skripLengkap',
            'adeganVideo',
            'captionDanHashtag',
            'panduanEditingCapCut',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating content:', error);
    return res.status(500).json({
      error: error?.message || 'Gagal menghasilkan konten dengan AI. Silakan coba lagi.',
    });
  }
});

// Dev vs Prod Vite mounting
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server ready on port ${port}`);
});
