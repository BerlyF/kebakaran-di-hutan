import { EducationTopic } from '../types';

export const EDUCATION_TOPICS: EducationTopic[] = [
  {
    id: 'menghasilkan-oksigen',
    title: '1. Menghasilkan Oksigen (Paru-Paru Dunia)',
    icon: 'Wind',
    summary: 'Melalui proses fotosintesis, dedaunan pohon di hutan menyerap energi matahari untuk mengubah air dan karbon dioksida menjadi glukosa dan melepaskan gas oksigen (O2) murni ke atmosfer bumi.',
    points: [
      'Fotosintesis Masif: Kanopi hutan tropis lebat menghasilkan miliaran ton gas oksigen setiap harinya yang dihirup oleh manusia dan seluruh makhluk hidup bernapas.',
      'Siklus Udara Segar: Hutan bertindak sebagai filter raksasa yang menyaring debu, polutan aerosol, dan partikel berbahaya dari atmosfer bumi.',
      'Kepadatan Kanopi Tropis: Hutan hujan tropis seperti di Kalimantan dan Sumatera memiliki kerapatan biomassa pohon yang sangat tinggi, menjadikannya salah satu penyumbang oksigen terbesar di planet bumi.'
    ],
    scientificFact: 'Satu batang pohon rindang berukuran dewasa mampu memproduksi oksigen yang cukup untuk kebutuhan bernapas 2 hingga 4 orang manusia setiap harinya!',
    actionGuide: 'Dukung gerakan reboisasi dan penanaman pohon di pekarangan sekolah serta lingkungan rumah untuk memperkaya pasokan oksigen lokal.'
  },
  {
    id: 'menyerap-karbon',
    title: '2. Menyerap Karbon Dioksida (Carbon Sink)',
    icon: 'CloudRain',
    summary: 'Hutan adalah penyerap karbon alami (carbon sink) terpenting di daratan yang mengikat gas rumah kaca (CO2) ke dalam batang kayu, dedaunan, akar, dan lapisan tanah gambut.',
    points: [
      'Pengendali Pemanasan Global: Dengan menyerap karbon dioksida dari udara, hutan mencegah efek rumah kaca berlebih yang memicu kenaikan suhu bumi secara ekstrem.',
      'Hutan Gambut Super-Kaya Karbon: Lahan gambut Indonesia menyimpan simpanan karbon bawah tanah hingga 10–20 kali lebih padat dibandingkan hutan tanah mineral biasa.',
      'Bahaya Pelepasan Karbon saat Terbakar: Ketika hutan terbakar, seluruh karbon yang tersimpan selama ratusan tahun dilepaskan seketika ke atmosfer dalam bentuk emisi gas CO2 raksasa.'
    ],
    scientificFact: 'Hutan tropis bumi menyerap sekitar 2,4 miliar metrik ton karbon dioksida per tahun, menjadikannya benteng utama dunia dalam mencegah krisis iklim!',
    actionGuide: 'Cegah kebakaran hutan karena kebakaran hutan tropis dapat mengubah Indonesia dari penyerap karbon menjadi salah satu emitor karbon terbesar di dunia dalam sekejap.'
  },
  {
    id: 'habitat-satwa',
    title: '3. Menjadi Habitat Berbagai Hewan dan Tumbuhan',
    icon: 'Trees',
    summary: 'Hutan merupakan rumah tinggal alami bagi lebih dari 80% keanekaragaman hayati darat di bumi, menyediakan makanan, tempat bersarang, dan perlindungan bagi satwa liar.',
    points: [
      'Rumah Satwa Endemik: Hutan Indonesia adalah satu-satunya rumah bagi spesies langka dunia seperti Orangutan, Harimau Sumatera, Beruang Madu, Burung Rangkong, dan Trenggiling.',
      'Kerusakan Ekosistem akibat Api: Kebakaran hutan menghancurkan sarang satwa, membakar pohon pakan, dan memaksa satwa liar panik mengungsi mendekati pemukiman manusia.',
      'Rantai Makanan Rimba: Hilangnya vegetasi hutan merusak rantai trofik dari serangga penyerbuk hingga predator puncak, memicu ancaman kepunahan lokal.'
    ],
    scientificFact: 'Hutan hujan tropis Indonesia hanya mencakup 1,3% luas bumi, namun menampung 10% spesies tanaman berbunga, 12% spesies mamalia, dan 17% spesies burung dunia!',
    actionGuide: 'Lindungi kawasan hutan lindung dan taman nasional dari bahaya api agar satwa liar tidak kehilangan tempat tinggal dan punah selamanya.'
  },
  {
    id: 'menjaga-air',
    title: '4. Membantu Menjaga Sumber Daya Air',
    icon: 'Droplets',
    summary: 'Sistem perakaran pohon hutan berfungsi seperti spons raksasa alami yang menangkap air hujan, menyaringnya ke dalam akuifer bawah tanah, dan mengalirkannya ke mata air jernih.',
    points: [
      'Penyedia Air Bersih: Sungai-sungai besar yang mengairi persawahan, waduk PLTA, dan air minum masyarakat berhulu di kawasan hutan lindung yang lebat.',
      'Transpirasi Hujan: Hutan melepaskan uap air melalui proses transpirasi yang membentuk awan dan memicu siklus hujan berkala di daratan sekitarnya.',
      'Dampak Kebakaran pada Air: Hutan yang musnah terbakar kehilangan kapasitas menahan air, menyebabkan mata air mengering saat kemarau dan sungai tercemar abu jelaga.'
    ],
    scientificFact: 'Satu hektar hutan tropis yang sehat mampu menyimpan dan menginfiltrasi ribuan meter kubik air hujan ke dalam lapisan tanah setiap tahunnya!',
    actionGuide: 'Jaga kebersihan dan kelestarian daerah aliran sungai (DAS) serta hutan pegunungan yang menjadi hulu sumber air bersih kehidupan kita.'
  },
  {
    id: 'mencegah-banjir-erosi',
    title: '5. Mengurangi Risiko Erosi dan Banjir Bandang',
    icon: 'Shield',
    summary: 'Akar pepohonan mengikat butiran tanah dengan kuat, sementara tajuk daun memecah kecepatan tetesan hujan lebat agar tidak langsung mengikis permukaan tanah miring.',
    points: [
      'Pencegah Longsor Tebing: Akar pohon yang dalam dan bercabang berfungsi seperti jangkar alami yang menahan lereng gunung agar tidak runtuh menjadi tanah longsor.',
      'Menahan Laju Limpasan Air (Runoff): Serasah daun di lantai hutan memperlambat aliran air hujan ke sungai, mencegah sungai meluap secara mendadak menjadi banjir bandang.',
      'Mencegah Sedimentasi: Tanpa pepohonan penahan, jutaan ton lumpur akan terbawa erosi ke sungai dan danau, mendangkalkan saluran air irigasi.'
    ],
    scientificFact: 'Daerah tangkapan air dengan tutupan hutan lebat memiliki risiko banjir bandang hingga 70% lebih rendah dibandingkan lereng perbukitan yang gundul atau bekas terbakar!',
    actionGuide: 'Jangan membuka lahan perkebunan di lereng bukit curam dengan cara membakar semak belukar karena akan langsung memicu tanah longsor saat musim hujan.'
  },
  {
    id: 'mendukung-masyarakat',
    title: '6. Mendukung Kehidupan & Kesejahteraan Masyarakat',
    icon: 'Users',
    summary: 'Hutan menopang kehidupan jutaan masyarakat adat, petani, dan penduduk desa melalui penyediaan hasil hutan bukan kayu (madu, getah, rotan, tanaman obat) dan stabilitas iklim.',
    points: [
      'Hasil Hutan Bukan Kayu (HHBK): Masyarakat lokal memanen madu lebah hutan liar, buah-buahan hutan, rotan, dan tanaman rempah obat herbal berharga tinggi.',
      'Keseimbangan Pertanian: Hutan menjaga suhu udara mikro tetap sejuk dan menyediakan serangga penyerbuk alami yang meningkatkan hasil panen perkebunan warga.',
      'Bahaya bagi Pemukiman Tepi Hutan: Kebakaran hutan yang meluas dapat merembet dan membakar rumah-rumah warga desa, menghentikan aktivitas sekolah, dan memicu bencana sosial.'
    ],
    scientificFact: 'Lebih dari 1,6 miliar penduduk dunia menggantungkan mata pencaharian langsung atau tidak langsung pada hasil ekosistem hutan yang sehat!',
    actionGuide: 'Hormati kearifan lokal masyarakat adat dalam mengelola hutan secara lestari tanpa pembakaran api.'
  },
  {
    id: 'penyebab-kebakaran',
    title: '7. Penyebab Kebakaran Hutan (Manusia vs Alami)',
    icon: 'Flame',
    summary: 'Lebih dari 99% kebakaran hutan dan lahan (karhutla) di Indonesia dipicu oleh aktivitas kecerobohan atau kesengajaan manusia, bukan murni peristiwa alam.',
    points: [
      'Pembukaan Lahan dengan Membakar (Slash & Burn): Praktik membakar semak belukar untuk membuka kebun secara murah seringkali lepas kendali saat ditiup angin kencang.',
      'Puntung Rokok & Api Unggun Sembarangan: Membuang puntung rokok menyala di serasah kering atau meninggalkan sisa bara perkemahan tanpa dipadamkan sempurna.',
      'Faktor Pemicu Iklim (El Niño): Kemarau panjang ekstrem akibat fenomena El Niño mengeringkan biomassa hutan sehingga percikan api sekecil apa pun cepat membesar.',
      'Kebakaran Bawah Permukaan di Lahan Gambut: Lahan gambut yang dikeringkan lewat saluran kanal menjadi sangat mudah terbakar dan apinya menjalar di bawah tanah.'
    ],
    scientificFact: 'Di lahan gambut kering, api dapat merayap di kedalaman 2–5 meter di bawah permukaan tanah tanpa terlihat asap tebal, lalu tiba-tiba berkobar di titik lain!',
    actionGuide: 'Tolak pembukaan lahan dengan cara membakar (Zero Burning Policy) dan pastikan tidak menyalakan api sembarangan di dekat vegetasi kering.'
  },
  {
    id: 'dampak-kebakaran',
    title: '8. Dampak Kebakaran Hutan terhadap Lingkungan & Manusia',
    icon: 'AlertTriangle',
    summary: 'Kebakaran hutan memicu bencana multidimensi: krisis kesehatan kabut asap, musnahnya flora fauna endemik, polusi udara beracun, dan kerugian ekonomi miliaran rupiah.',
    points: [
      'Bahaya Kabut Asap & ISPA: Asap pekat mengandung gas beracun (CO, NOx, SO2) dan partikel debu halus PM2.5 yang masuk ke alveolus paru-paru, memicu penyakit pernapasan akut.',
      'Langit Kuning & Merah (Indeks ISPU Berbahaya): Sinar matahari terhalang kabut tebal, bandara dan penerbangan ditutup, serta sekolah-sekolah terpaksa diliburkan berminggu-minggu.',
      'Kematian Satwa Liar: Hewan lambat seperti trenggiling, kura-kura, anak burung, dan kera seringkali terjebak kepungan api dan mati terpanggang asap panas.',
      'Kerusakan Struktur Tanah: Suhu panas api membakar mikroorganisme humus penyubur tanah, menjadikan lahan tandus dan rentan hanyut terbawa erosi.'
    ],
    scientificFact: 'Partikel debu PM2.5 dari asap kebakaran hutan berukuran 30 kali lebih kecil dari sehelai rambut manusia, sehingga masker kain biasa tidak cukup menyaringnya!',
    actionGuide: 'Gunakan masker standar N95/respirator jika terjadi bencana kabut asap dan batasi aktivitas di luar ruangan demi melindungi paru-paru.'
  },
  {
    id: 'pencegahan-penanganan',
    title: '9. Cara Mencegah & Menangani Kebakaran Hutan',
    icon: 'ShieldCheck',
    summary: 'Pencegahan adalah strategi terbaik dalam pengendalian karhutla, didukung oleh kesiapsiagaan patroli, pemadaman cepat titik panas (hotspot), dan penegakan hukum.',
    points: [
      'Pembuatan Sekat Bakar (Firebreak): Membersihkan jalur selebar 3–5 meter bebas vegetasi untuk memutus suplai bahan bakar api agar api tidak menyeberang ke hutan primer atau pemukiman.',
      'Patroli Terpadu & Satgas Manggala Agni: Tim brigade pemadam kebakaran hutan KLHK berpatroli memantau citra satelit titik panas (hotspot) dan memadamkan api sebelum membesar.',
      'Restorasi & Pembasahan Gambut (Rewetting): Membangun sekat kanal air di lahan gambut agar permukaan air tanah tetap tinggi dan gambut tidak kering terbakar.',
      'Apa yang Harus Dilakukan Jika Melihat Api: Segera laporkan ke nomor darurat pemadam kebakaran / BPBD / posko Manggala Agni terdekat, jangan mendekat tanpa alat pelindung diri, dan evakuasi warga serta satwa ke zona aman!'
    ],
    scientificFact: 'Membendung saluran kanal gambut terbukti mampu mengembalikan kelembapan alami lahan gambut hingga 85%, secara signifikan mencegah kebakaran berulang.',
    actionGuide: 'Catat nomor darurat pemadam kebakaran lokal, ikuti pelatihan simulasi penanganan bencana di sekolah, dan jadilah agen muda pelindung hutan nusantara!'
  }
];
