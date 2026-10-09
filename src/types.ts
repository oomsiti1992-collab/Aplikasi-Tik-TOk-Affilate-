export type GayaKonten =
  | 'storytelling'
  | 'edukatif'
  | 'lucu'
  | 'review'
  | 'problem-solution'
  | 'soft selling';

export type JenisVideo =
  | 'voice-over'
  | 'presenter'
  | 'demonstrasi produk'
  | 'tanpa wajah'
  | 'video AI';

export type DurasiVideo = '20 detik' | '30 detik';

export interface FormInputData {
  namaProduk: string;
  deskripsiDanManfaat: string;
  targetAudiens?: string;
  gayaKonten: GayaKonten;
  durasiVideo: DurasiVideo;
  jenisVideo: JenisVideo;
  productPhotoPreviewUrl?: string;
  talentPhotoPreviewUrl?: string;
  talentDescription?: string;
}

export interface AdeganDetail {
  nomorAdegan: number;
  rentangWaktu: string;
  tujuanAdegan: string;
  deskripsiVisualDanAksi: string;
  gerakanKamera: string;
  voiceOverDialog: string;
  teksOverlayOpsional: string;
  promptVideoAI: string;
  catatanKonsistensi?: string;
}

export interface HasilKontenAI {
  judulVideo: string;
  limaPilihanHook: string[];
  skripLengkap: string;
  adeganVideo: AdeganDetail[];
  captionDanHashtag: {
    caption: string;
    callToActionKeranjangKuning: string;
    hashtags: string[];
    teksSiapSalin: string;
  };
  panduanEditingCapCut: {
    musikLatarNonRock: string;
    efekSuaraSFX: string[];
    transisiCapCut: string;
    penempatanTeksAutoCaption: string;
    tempoDanPacing: string;
    tipsKonversiAffiliate: string;
  };
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  input: FormInputData;
  output: HasilKontenAI;
}
