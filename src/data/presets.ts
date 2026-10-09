import { FormInputData } from '../types';

export interface PresetTemplate {
  id: string;
  badge: string;
  title: string;
  data: FormInputData;
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'tumbler-viral',
    badge: 'Perlengkapan Viral',
    title: 'Tumbler Stainless Vacuum 900ml',
    data: {
      namaProduk: 'Tumbler Stainless Vacuum Insulated 900ml',
      deskripsiDanManfaat: 'Tahan es batu hingga 24 jam tanpa mengembun, tutup anti bocor, dilengkapi sedotan stainless dan pegangan ergonomis, bahan food grade 304.',
      targetAudiens: 'Mahasiswa, pekerja kantoran, dan pengguna yang sering lupa minum air',
      gayaKonten: 'problem-solution',
      durasiVideo: '30 detik',
      jenisVideo: 'demonstrasi produk',
    },
  },
  {
    id: 'sunscreen-toneup',
    badge: 'Skincare Trending',
    title: 'Sunscreen Gel SPF 50+ PA++++',
    data: {
      namaProduk: 'Sunscreen Airy Gel SPF 50+ PA++++',
      deskripsiDanManfaat: 'Melindungi kulit dari paparan sinar UV dan blue light, tekstur seringan air, cepat meresap tanpa white cast, tidak membuat wajah berminyak atau lengket.',
      targetAudiens: 'Remaja dan perempuan usia 18-35 tahun yang aktif di luar ruangan atau depan layar gadget',
      gayaKonten: 'review',
      durasiVideo: '20 detik',
      jenisVideo: 'presenter',
    },
  },
  {
    id: 'mic-wireless',
    badge: 'Gadget Kreator',
    title: 'Mic Wireless Clip-On Noise Reduction',
    data: {
      namaProduk: 'Mic Wireless Clip-On Type-C & Lightning',
      deskripsiDanManfaat: 'Peredam bising pintar (smart noise reduction) untuk suara vokal jernih di luar ruangan, jangkauan sinyal stabil hingga 20 meter, plug and play langsung konek.',
      targetAudiens: 'Pemula kreator konten, affiliate TikTok, dan guru/pekerja online',
      gayaKonten: 'edukatif',
      durasiVideo: '30 detik',
      jenisVideo: 'voice-over',
    },
  },
  {
    id: 'pembersih-kerak',
    badge: 'Pembersih Ajaib',
    title: 'Cairan Pembersih Kerak Kamar Mandi',
    data: {
      namaProduk: 'Cairan Pembersih Kerak Kamar Mandi & Panci Gosong',
      deskripsiDanManfaat: 'Cukup dioleskan dengan kuas, kerak membandel bertahun-tahun langsung luntur tanpa perlu disikat keras, tidak berbau menyengat, aman di keramik.',
      targetAudiens: 'Ibu rumah tangga, anak kos, dan siapa saja yang lelah menyikat kamar mandi berjam-jam',
      gayaKonten: 'problem-solution',
      durasiVideo: '20 detik',
      jenisVideo: 'tanpa wajah',
    },
  },
  {
    id: 'daster-rayon',
    badge: 'Fashion Santai',
    title: 'Daster Rayon Twill Motif Kekinian Busui',
    data: {
      namaProduk: 'Daster Rayon Twill Premium Busui Friendly',
      deskripsiDanManfaat: 'Bahan rayon twill adem jatuh tidak terawang, ada resleting depan untuk menyusui, jahitan rapi, motif estetik tetap modis saat kurir atau tamu datang.',
      targetAudiens: 'Ibu muda menyusui dan wanita yang mencari pakaian rumah santai berkualitas',
      gayaKonten: 'storytelling',
      durasiVideo: '30 detik',
      jenisVideo: 'video AI',
    },
  },
];
