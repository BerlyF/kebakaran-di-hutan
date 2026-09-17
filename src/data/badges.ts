import { Badge } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'penjaga-hutan',
    title: 'Penjaga Hutan',
    subtitle: 'Misi Patroli Pertama Selesai',
    description: 'Diberikan kepada relawan yang berhasil mengendalikan titik api pertama di kawasan hutan lindung dan melindungi pepohonan dari kobaran api.',
    iconName: 'Shield',
    unlocked: false,
    category: 'fire'
  },
  {
    id: 'penyelamat-satwa',
    title: 'Penyelamat Satwa',
    subtitle: 'Evakuasi Hewan dari Kepungan Asap',
    description: 'Diberikan karena berhasil mengevakuasi satwa liar yang terjebak di sekitar kobaran api dan membawanya dengan selamat ke Posko Pemukiman.',
    iconName: 'Heart',
    unlocked: false,
    category: 'rescue'
  },
  {
    id: 'pahlawan-lingkungan',
    title: 'Pahlawan Lingkungan',
    subtitle: 'Gelar Kehormatan Konservasi Tertinggi',
    description: 'Penghargaan tertinggi atas keberhasilan menuntaskan seluruh misi pemadaman di ketiga level hutan, menjaga batas pemukiman, dan melestarikan rimba nusantara.',
    iconName: 'Award',
    unlocked: false,
    category: 'master'
  },
  {
    id: 'pemadam-tangguh',
    title: 'Pemadam Tangguh',
    subtitle: 'Semprotan Air Presisi Tinggi',
    description: 'Mengisi ulang tangki air di sungai atau posko hidran dan memadamkan lebih dari 10 titik api berbahaya dengan cepat dan efisien.',
    iconName: 'Flame',
    unlocked: false,
    category: 'fire'
  },
  {
    id: 'pelindung-pemukiman',
    title: 'Pelindung Pemukiman',
    subtitle: 'Benteng Desa Tepi Hutan',
    description: 'Berhasil mempertahankan rumah-rumah warga desa di perbatasan hutan dari jilatan api dan menjaga tingkat kebakaran tetap di bawah batas aman.',
    iconName: 'Home',
    unlocked: false,
    category: 'master'
  },
  {
    id: 'cendekia-konservasi',
    title: 'Cendekia Konservasi',
    subtitle: 'Nilai Kuis Kebakaran Hutan Sempurna',
    description: 'Diberikan atas pemahaman mendalam mengenai penyebab, dampak ekologis, serta strategi pencegahan kebakaran hutan pada kuis edukasi.',
    iconName: 'BookOpen',
    unlocked: false,
    category: 'quiz'
  }
];
