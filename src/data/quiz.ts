import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Penyebab Kebakaran Hutan',
    question: 'Apa penyebab utama terjadinya sebagian besar kebakaran hutan dan lahan (karhutla) di Indonesia?',
    options: [
      'Aktivitas manusia seperti pembukaan lahan dengan cara membakar (slash and burn) serta puntung rokok sembarangan',
      'Gesekan antara daun pohon bambu yang terjadi saat musim hujan',
      'Cahaya bulan purnama yang terlalu terang menyinari permukaan daun',
      'Hewan hutan yang berlari terlalu cepat sehingga menimbulkan percikan api'
    ],
    correctIndex: 0,
    explanation: 'Data KLHK mencatat lebih dari 99% kebakaran hutan dan lahan di Indonesia disebabkan oleh ulah manusia, terutama pembukaan kebun secara membakar karena murah dan cepat, serta kelalaian membuang puntung rokok atau meninggalkan api unggun.',
    points: 150
  },
  {
    id: 2,
    topic: 'Cara Mencegah Kebakaran Hutan',
    question: 'Bagaimana cara yang paling tepat dan efektif untuk mencegah kebakaran hutan agar tidak meluas ke kawasan pemukiman warga?',
    options: [
      'Menyiram seluruh hutan dengan minyak tanah agar daun cepat basah',
      'Membuat sekat bakar (firebreak), melakukan patroli rutin terpadu, dan menerapkan kebijakan pembukaan lahan tanpa bakar (zero burning)',
      'Menebang semua pohon rindang di sekitar desa sampai gundul',
      'Membiarkan api menyala sampai padam dengan sendirinya'
    ],
    correctIndex: 1,
    explanation: 'Sekat bakar (jalur bebas tanaman seluas beberapa meter) memutus suplai bahan bakar api. Bersama dengan patroli rutin satgas pemadam (seperti Manggala Agni) dan larangan membakar lahan, api dapat dicegah merembet ke pemukiman warga.',
    points: 150
  },
  {
    id: 3,
    topic: 'Pentingnya Hutan bagi Kehidupan',
    question: 'Mengapa hutan memiliki peran yang sangat vital bagi kelangsungan hidup manusia dan seluruh makhluk hidup di bumi?',
    options: [
      'Hutan hanya berfungsi sebagai tempat mengambil kayu bakar sebanyak-banyaknya tanpa batas',
      'Hutan menghasilkan oksigen (O2), menyerap karbon dioksida (CO2), menjaga sumber mata air, serta mencegah bencana erosi dan banjir bandang',
      'Hutan menghalangi jalannya angin segar agar tidak masuk ke kota',
      'Hutan membuat suhu bumi menjadi semakin panas'
    ],
    correctIndex: 1,
    explanation: 'Hutan sering disebut sebagai paru-paru dunia karena fotosintesisnya menghasilkan pasokan oksigen masif, mengikat emisi gas rumah kaca, menjadi tandon penyimpan air bersih, dan akarnya menahan tanah lereng dari bahaya longsor dan banjir.',
    points: 150
  },
  {
    id: 4,
    topic: 'Tindakan Saat Melihat Kebakaran Hutan',
    question: 'Apa langkah pertama yang harus dilakukan oleh seorang siswa atau warga masyarakat ketika melihat titik api atau kebakaran di tepi hutan?',
    options: [
      'Mendekati api tanpa perlengkapan untuk membuat konten foto selfie',
      'Menyiramkan bensin ke arah titik api',
      'Segera menjauh ke tempat aman, selamatkan diri, dan laporkan lokasi kebakaran ke pemadam kebakaran (Damkar), aparat desa, atau posko Manggala Agni',
      'Membakar semak belukar lain di dekatnya'
    ],
    correctIndex: 2,
    explanation: 'Keselamatan jiwa adalah prioritas utama. Asap beracun dan jilatan api dapat bergerak sangat cepat mengikuti arah angin. Segera evakuasi ke tempat aman dan hubungi petugas pemadam kebakaran atau aparat berwenang.',
    points: 150
  },
  {
    id: 5,
    topic: 'Dampak Kebakaran Hutan (Kesehatan & Lingkungan)',
    question: 'Apa dampak paling berbahaya dari kabut asap pekat akibat kebakaran hutan terhadap kesehatan masyarakat?',
    options: [
      'Membuat gigi menjadi lebih putih bersih',
      'Menimbulkan penyakit infeksi saluran pernapasan akut (ISPA), iritasi mata parah, dan menurunkan fungsi paru-paru akibat partikel berbahaya PM2.5',
      'Meningkatkan daya tahan tubuh terhadap segala penyakit',
      'Membuat tidur menjadi jauh lebih nyenyak di luar ruangan'
    ],
    correctIndex: 1,
    explanation: 'Asap karhutla mengandung partikel mikro PM2.5, karbon monoksida, dan gas beracun yang dapat menembus sistem pernapasan terdalam hingga ke pembuluh darah, memicu sesak napas berat, asma, bronkitis, dan ISPA.',
    points: 150
  },
  {
    id: 6,
    topic: 'Karakteristik Lahan Gambut',
    question: 'Mengapa kebakaran pada lahan gambut jauh lebih berbahaya dan sangat sulit dipadamkan dibandingkan hutan tanah biasa?',
    options: [
      'Karena lahan gambut terbuat dari batu granit yang keras',
      'Karena api di lahan gambut membakar lapisan bahan organik kaya karbon di bawah permukaan tanah (smoldering fire) dan dapat merambat tanpa terlihat dari atas',
      'Karena di lahan gambut tidak ada udara sama sekali',
      'Karena hewan gambut menyalakan api kembali saat malam hari'
    ],
    correctIndex: 1,
    explanation: 'Lahan gambut terbentuk dari tumpukan sisa tumbuhan mati setebal bermeter-meter yang kaya bahan bakar karbon. Api merayap di bawah tanah (smoldering fire), mengeluarkan asap pekat tanpa api berkobar di atas, dan butuh jutaan liter air hingga dasar gambut terendam.',
    points: 150
  },
  {
    id: 7,
    topic: 'Peran Satwa dalam Ekosistem Hutan',
    question: 'Bagaimana peran satwa liar (seperti burung pemakan buah dan mamalia herbivora) dalam membantu regenerasi hutan pasca kebakaran?',
    options: [
      'Satwa liar menghabiskan sisa pohon yang masih hidup agar hutan punah',
      'Satwa menyebarkan biji-bijian pohon hutan melalui kotorannya ke area bekas terbakar, membantu tumbuhnya vegetasi baru secara alami',
      'Satwa mengeringkan mata air sungai di dalam hutan',
      'Satwa membuat lubang agar api menyala kembali'
    ],
    correctIndex: 1,
    explanation: 'Satwa liar adalah agen pemencar biji (seed dispersers) alami. Burung, kelelawar, rusa, dan kera membawa biji pohon dari hutan primer ke area bekas terbakar, mempercepat proses suksesi ekologis dan reboisasi alami.',
    points: 150
  }
];
