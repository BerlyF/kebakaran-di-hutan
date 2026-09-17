import { LevelConfig } from '../types';

export const GAME_LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'Level 1: Tepian Hutan Lindung & Sungai Brantas',
    subtitle: 'Deteksi Dini Titik Api & Penyelamatan Satwa',
    location: 'Sektor Hutan Lindung Lereng Gunung',
    environment: 'forest',
    timeLimit: 95,
    briefing: {
      story: 'Patroli hutan mendeteksi kepulan asap di tepian hutan lindung. Diduga seorang pengunjung membuang puntung rokok yang masih menyala ke tumpukan daun kering! Percikan api kini mulai membesar membakar semak belukar dan menjebak satwa liar yang panik.',
      mission: 'Padamkan 4 titik api sebelum merambat luas! Isi ulang tangki air di sungai atau posko pemukiman, dan selamatkan 3 satwa liar (Kelinci, Burung Jalak, dan Rusa Bawean) ke Area Pemukiman Warga.',
      tips: 'Dekati sungai atau posko air lalu tekan [E] untuk mengisi penuh tangki air (100L). Tekan [SPASI] di dekat api untuk menyemprotkan air hingga api padam!',
      targetFireCount: 4,
      targetAnimalCount: 3,
      causeAndPrevention: 'Penyebab: Puntung rokok dan kelalaian manusia di serasah kering. Pencegahan: Larangan keras menyalakan api sembarangan dan patroli deteksi dini titik panas.'
    },
    gridCols: 22,
    gridRows: 14,
    cellSize: 42,
    playerStart: { x: 3, y: 4 },
    safeZone: {
      x: 1,
      y: 1,
      width: 5,
      height: 5,
      name: 'Posko Evakuasi Pemukiman Warga'
    },
    settlement: {
      x: 1,
      y: 1,
      width: 5,
      height: 5,
      name: 'Desa Rimba Damai',
      housesCount: 3
    },
    maxAllowedFireSpread: 75,
    waterStations: [
      { id: 'ws1', x: 2, y: 6, width: 2, height: 2, type: 'water_pump', name: 'Posko Tangki Air Pemukiman' },
      { id: 'ws2', x: 10, y: 0, width: 2, height: 14, type: 'river', name: 'Aliran Sungai Jernih' }
    ],
    fireSpots: [
      { id: 'fire_1', x: 7, y: 3, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Titik Api Semak Kering A' },
      { id: 'fire_2', x: 6, y: 10, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Titik Api Ranting Pinus' },
      { id: 'fire_3', x: 14, y: 4, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Titik Api Dekat Sarang Burung' },
      { id: 'fire_4', x: 17, y: 9, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Titik Api Rerimbunan Rusa' }
    ],
    animals: [
      {
        id: 'rabbit_1',
        name: 'Kelinci Hutan Liar',
        type: 'rabbit',
        x: 8,
        y: 4,
        dangerType: 'smoke_trap',
        trapHp: 100,
        maxTrapHp: 100,
        isRescued: false,
        followingPlayer: false,
        isInSanctuary: false,
        info: {
          scientificName: 'Nesolagus netscheri',
          habitat: 'Lantai hutan hujan tropis lebat yang teduh',
          conservationStatus: 'Rentan (Vulnerable)',
          ecologicalRole: 'Herbivora penggali liang yang membantu aerasi tanah dan menjaga vegetasi semak.',
          threats: 'Terperangkap asap kebakaran hutan dan kehilangan liang tempat tinggal.',
          diet: 'Lumut, pucuk pakis hutan, jamur, dan dedaunan muda.',
          funFact: 'Memiliki pendengaran tajam dan sangat peka terhadap bau asap kebakaran dari jarak 2 kilometer!'
        }
      },
      {
        id: 'bird_1',
        name: 'Burung Jalak Rimba',
        type: 'bird',
        x: 15,
        y: 3,
        dangerType: 'burning_bush',
        trapHp: 100,
        maxTrapHp: 100,
        isRescued: false,
        followingPlayer: false,
        isInSanctuary: false,
        info: {
          scientificName: 'Leucopsar rothschildi',
          habitat: 'Tajuk pepohonan hutan dataran rendah',
          conservationStatus: 'Kritis (Critically Endangered)',
          ecologicalRole: 'Penyebar biji buah-buahan hutan dan pengendali alami hama serangga ulat.',
          threats: 'Pohon sarang terbakar dan keracunan gas karbon monoksida dari asap pekat.',
          diet: 'Buah ara liar, nektar bunga hutan, dan serangga kanopi.',
          funFact: 'Mampu menirukan berbagai suara alam dan memiliki bulu putih bersih dengan jambul memikat!'
        }
      },
      {
        id: 'deer_1',
        name: 'Rusa Bawean',
        type: 'deer',
        x: 18,
        y: 10,
        dangerType: 'fallen_fire_log',
        trapHp: 100,
        maxTrapHp: 100,
        isRescued: false,
        followingPlayer: false,
        isInSanctuary: false,
        info: {
          scientificName: 'Axis kuhlii',
          habitat: 'Padang rumput hutan sekunder dan perbukitan',
          conservationStatus: 'Kritis (Critically Endangered)',
          ecologicalRole: 'Pemakan tunas semak kering yang secara alami membantu mengurangi bahan bakar api hutan.',
          threats: 'Terkepung kobaran api dan kehilangan sumber pakan alami.',
          diet: 'Rumput gajah hutan, pucuk perdu, dan daun muda.',
          funFact: 'Satwa endemik langka Indonesia yang menjadi kebanggaan maskot konservasi nasional!'
        }
      }
    ],
    obstacles: [
      { id: 'ob1', x: 10, y: 0, width: 2, height: 6, type: 'river', passable: false },
      { id: 'ob2', x: 10, y: 8, width: 2, height: 6, type: 'river', passable: false },
      { id: 'ob3', x: 10, y: 6, width: 2, height: 2, type: 'rock', passable: true }, // jembatan batu penyeberangan
      { id: 'ob4', x: 13, y: 7, width: 2, height: 2, type: 'tree', passable: false },
      { id: 'ob5', x: 17, y: 2, width: 2, height: 2, type: 'tree', passable: false },
      { id: 'ob6', x: 5, y: 8, width: 2, height: 2, type: 'dense_bush', passable: false }
    ]
  },
  {
    id: 2,
    title: 'Level 2: Hutan Gambut Kering & Lembah Angin',
    subtitle: 'Bahaya Kebakaran Lahan Basah & Asap Tebal',
    location: 'Kawasan Konservasi Kubah Gambut Tropis',
    environment: 'peatland',
    timeLimit: 110,
    briefing: {
      story: 'Kemarau berkepanjangan akibat anomali iklim membuat kubah gambut menyusut dan mengering. Api liar membakar semak pakis gambut dan mulai merayap di bawah lapisan tanah! Asap tebal mengepung kawanan monyet bekantan, burung rangkong, dan trenggiling.',
      mission: 'Padamkan 5 titik api gambut sebelum api menembus lapisan bawah tanah! Manfaatkan sungai gambut dan pompa air sumur bor untuk mengisi tangki air, lalu evakuasi 3 satwa ke posko perlindungan.',
      tips: 'Di lahan gambut, api menyebar lebih cepat karena ditiup angin lembah. Segera semprot api hingga tuntas (sizzling steam) dan isi ulang air secara teratur di sungai!',
      targetFireCount: 5,
      targetAnimalCount: 3,
      causeAndPrevention: 'Penyebab: Pengeringan gambut melalui drainase kanal tak terkontrol. Pencegahan: Pembuatan sekat kanal (canal blocking) untuk menjaga air tanah tetap tinggi.'
    },
    gridCols: 24,
    gridRows: 14,
    cellSize: 42,
    playerStart: { x: 3, y: 5 },
    safeZone: {
      x: 1,
      y: 1,
      width: 5,
      height: 5,
      name: 'Posko Restorasi Gambut'
    },
    settlement: {
      x: 1,
      y: 1,
      width: 5,
      height: 5,
      name: 'Pos Pengamatan Satgas',
      housesCount: 2
    },
    maxAllowedFireSpread: 68,
    waterStations: [
      { id: 'ws1', x: 3, y: 7, width: 2, height: 2, type: 'water_pump', name: 'Sumur Bor Air Gambut' },
      { id: 'ws2', x: 11, y: 0, width: 2, height: 14, type: 'river', name: 'Sungai Gambut Alami' },
      { id: 'ws3', x: 19, y: 7, width: 2, height: 2, type: 'hydrant', name: 'Posko Hidran Cadangan' }
    ],
    fireSpots: [
      { id: 'fire_2_1', x: 7, y: 3, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Pakis Gambut Barat' },
      { id: 'fire_2_2', x: 8, y: 10, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Ranting Akasia' },
      { id: 'fire_2_3', x: 14, y: 3, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Dekat Pohon Resak' },
      { id: 'fire_2_4', x: 16, y: 10, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Semak Tepian Kanal' },
      { id: 'fire_2_5', x: 21, y: 4, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Perbatasan Hutan Primer' }
    ],
    animals: [
      {
        id: 'monkey_1',
        name: 'Monyet Bekantan',
        type: 'monkey',
        x: 9,
        y: 3,
        dangerType: 'burning_bush',
        trapHp: 100,
        maxTrapHp: 100,
        isRescued: false,
        followingPlayer: false,
        isInSanctuary: false,
        info: {
          scientificName: 'Nasalis larvatus',
          habitat: 'Hutan riparian dan mangrove tepi perairan gambut',
          conservationStatus: 'Terancam Punah (Endangered)',
          ecologicalRole: 'Pemencar biji tanaman riparian dan indikator kesehatan ekosistem perairan.',
          threats: 'Kebakaran kanopi pohon tidur dan hilangnya sumber buah-buahan hutan mentah.',
          diet: 'Dedaunan muda pohon bakau, pucuk bunga, dan buah hutan mentah.',
          funFact: 'Hidung panjang uniknya berfungsi memperkeras suara panggilan peringatan saat ada bahaya kebakaran!'
        }
      },
      {
        id: 'pangolin_1',
        name: 'Trenggiling Jawa',
        type: 'pangolin',
        x: 15,
        y: 11,
        dangerType: 'smoke_trap',
        trapHp: 100,
        maxTrapHp: 100,
        isRescued: false,
        followingPlayer: false,
        isInSanctuary: false,
        info: {
          scientificName: 'Manis javanica',
          habitat: 'Lantai hutan gambut sekunder berongga',
          conservationStatus: 'Kritis (Critically Endangered)',
          ecologicalRole: 'Pengendali biologis hama serangga rayap dan semut yang menjaga kekuatan batang pohon rimba.',
          threats: 'Pergerakannya lambat sehingga mudah terjebak bara api tanah gambut yang membakar sisiknya.',
          diet: 'Semut hutan liar, telur rayap, dan larva serangga tanah.',
          funFact: 'Saat terancam, trenggiling menggulung tubuhnya seperti bola baja bersisik keras yang tahan banting!'
        }
      },
      {
        id: 'bird_2',
        name: 'Burung Rangkong Badak',
        type: 'bird',
        x: 20,
        y: 3,
        dangerType: 'fallen_fire_log',
        trapHp: 100,
        maxTrapHp: 100,
        isRescued: false,
        followingPlayer: false,
        isInSanctuary: false,
        info: {
          scientificName: 'Buceros rhinoceros',
          habitat: 'Pohon berlubang tinggi di hutan hujan dataran rendah',
          conservationStatus: 'Rentan (Vulnerable)',
          ecologicalRole: 'Sang Petani Rimba: menebarkan ribuan biji pohon keras hutan setiap musim, meregenerasi hutan rimba.',
          threats: 'Pohon sarang yang tinggi tumbang dilalap api dan kepulan asap mengaburkan rute terbang.',
          diet: 'Buah pohon beringin hutan (Ficus), kadal kecil, dan buah ara.',
          funFact: 'Memiliki tanduk di atas paruh (casque) berwarna oranye keemasan yang megah dan kepakan sayap bersuara deru helikopter!'
        }
      }
    ],
    obstacles: [
      { id: 'ob1', x: 11, y: 0, width: 2, height: 5, type: 'river', passable: false },
      { id: 'ob2', x: 11, y: 8, width: 2, height: 6, type: 'river', passable: false },
      { id: 'ob3', x: 11, y: 5, width: 2, height: 3, type: 'rock', passable: true }, // jembatan kayu penghubung
      { id: 'ob4', x: 6, y: 8, width: 2, height: 2, type: 'tree', passable: false },
      { id: 'ob5', x: 15, y: 6, width: 2, height: 2, type: 'tree', passable: false },
      { id: 'ob6', x: 18, y: 2, width: 2, height: 2, type: 'dense_bush', passable: false }
    ]
  },
  {
    id: 3,
    title: 'Level 3: Perbatasan Rimba & Pemukiman Desa Lestari',
    subtitle: 'Pertahanan Garis Depan Menyelamatkan Desa & Rimba',
    location: 'Garis Batas Hutan & Perkampungan Penduduk',
    environment: 'settlement_border',
    timeLimit: 125,
    briefing: {
      story: 'Peringatan Siaga 1! Praktik pembukaan lahan kebun dengan membakar yang tak bertanggung jawab lepas kendali diterjang badai angin kencang. Kebakaran hutan hebat kini berkobar tepat di garis perbatasan pemukiman warga Desa Lestari! Rumah-rumah penduduk dan satwa liar langka terancam dilalap api!',
      mission: 'Pertahankan pemukiman warga! Padamkan 6 titik api berkobar di garis perbatasan hutan, semprotkan air untuk membentuk benteng basah, dan evakuasi Beruang Madu, Burung Hantu, serta Kancil ke Posko Pengungsian Desa!',
      tips: 'Isi air secepatnya di hidran desa atau sungai. Jika api menyebar terlalu jauh mendekati rumah penduduk, misi akan gagal. Gerak cepat dan prioritaskan api yang paling dekat dengan pemukiman!',
      targetFireCount: 6,
      targetAnimalCount: 3,
      causeAndPrevention: 'Penyebab: Pembukaan kebun liar dengan cara membakar (slash & burn) tanpa pengawasan. Pencegahan: Penegakan hukum tegas terhadap pembakar lahan dan pembuatan sekat bakar (firebreak) permanen selebar 5 meter di sekeliling desa.'
    },
    gridCols: 26,
    gridRows: 15,
    cellSize: 42,
    playerStart: { x: 3, y: 6 },
    safeZone: {
      x: 1,
      y: 2,
      width: 6,
      height: 7,
      name: 'Posko Pengungsian Warga & Satwa'
    },
    settlement: {
      x: 1,
      y: 2,
      width: 6,
      height: 7,
      name: 'Desa Lestari Perbatasan',
      housesCount: 4
    },
    maxAllowedFireSpread: 60,
    waterStations: [
      { id: 'ws1', x: 2, y: 10, width: 2, height: 2, type: 'hydrant', name: 'Hidran Pemadam Desa' },
      { id: 'ws2', x: 12, y: 0, width: 2, height: 15, type: 'river', name: 'Sungai Pembatas Hutan' },
      { id: 'ws3', x: 20, y: 11, width: 2, height: 2, type: 'water_pump', name: 'Pos Air Satgas Hutan' }
    ],
    fireSpots: [
      { id: 'fire_3_1', x: 9, y: 4, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Mengancam Rumah Warga Barat' },
      { id: 'fire_3_2', x: 9, y: 11, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Semak Bambu Selatan' },
      { id: 'fire_3_3', x: 15, y: 3, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Dekat Pohon Sarang Beruang' },
      { id: 'fire_3_4', x: 16, y: 9, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Belukar Kancil' },
      { id: 'fire_3_5', x: 21, y: 4, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Pohon Beringin Hantu' },
      { id: 'fire_3_6', x: 23, y: 10, intensity: 100, maxIntensity: 100, isExtinguished: false, spreadTimer: 0, name: 'Api Garis Belakang Rimba' }
    ],
    animals: [
      {
        id: 'bear_1',
        name: 'Beruang Madu Malaya',
        type: 'bear',
        x: 16,
        y: 4,
        dangerType: 'fallen_fire_log',
        trapHp: 100,
        maxTrapHp: 100,
        isRescued: false,
        followingPlayer: false,
        isInSanctuary: false,
        info: {
          scientificName: 'Helarctos malayanus',
          habitat: 'Pohon berongga di kawasan hutan lebat perbukitan',
          conservationStatus: 'Rentan (Vulnerable)',
          ecologicalRole: 'Insinyur pembersih kayu lapuk dan penebar biji tanaman pohon ara liar berukuran besar.',
          threats: 'Sarang pohon madunya habis terbakar api dan asap tebal membutakan matanya.',
          diet: 'Madu lebah hutan liar, rayap, buah ara, dan pucuk kelapa.',
          funFact: 'Jenis beruang terkecil di bumi dengan lidah elastis panjang hingga 25 cm untuk menjilat madu di celah pohon!'
        }
      },
      {
        id: 'bird_3',
        name: 'Burung Hantu Rimba',
        type: 'bird',
        x: 22,
        y: 3,
        dangerType: 'burning_bush',
        trapHp: 100,
        maxTrapHp: 100,
        isRescued: false,
        followingPlayer: false,
        isInSanctuary: false,
        info: {
          scientificName: 'Strix leptogrammica',
          habitat: 'Celah pohon tua dan gua perbatasan hutan',
          conservationStatus: 'Dilindungi UU RI',
          ecologicalRole: 'Predator nokturnal pengendali hama tikus ladang warga desa sekitar hutan.',
          threats: 'Asap panas tebal merusak indra penglihatan malamnya dan membakar bulu sayap.',
          diet: 'Tikus hutan, katak pohon, dan serangga malam.',
          funFact: 'Sayapnya bertepi halus sehingga terbang tanpa suara sama sekali di kesunyian malam rimba!'
        }
      },
      {
        id: 'deer_2',
        name: 'Kancil / Pelanduk Rimba',
        type: 'deer',
        x: 17,
        y: 10,
        dangerType: 'smoke_trap',
        trapHp: 100,
        maxTrapHp: 100,
        isRescued: false,
        followingPlayer: false,
        isInSanctuary: false,
        info: {
          scientificName: 'Tragulus javanicus',
          habitat: 'Lantai semak lebat dan bebatuan tepi sungai hutan',
          conservationStatus: 'Rentan (Vulnerable)',
          ecologicalRole: 'Penyebar biji buah-buahan kecil lantai hutan dan mata rantai pangan penting.',
          threats: 'Terkepung kepulan asap di celah semak dan kehabisan oksigen bersih.',
          diet: 'Buah jatuh, jamur hutan, pucuk daun herba segar.',
          funFact: 'Hewan berkuku terkecil di dunia yang terkenal cerdik, lincah berkelit menembus semak belukar!'
        }
      }
    ],
    obstacles: [
      { id: 'ob1', x: 12, y: 0, width: 2, height: 6, type: 'river', passable: false },
      { id: 'ob2', x: 12, y: 9, width: 2, height: 6, type: 'river', passable: false },
      { id: 'ob3', x: 12, y: 6, width: 2, height: 3, type: 'rock', passable: true }, // jembatan penghubung desa-rimba
      { id: 'ob4', x: 8, y: 8, width: 2, height: 2, type: 'house', passable: false }, // rumah warga
      { id: 'ob5', x: 18, y: 6, width: 2, height: 2, type: 'tree', passable: false },
      { id: 'ob6', x: 22, y: 7, width: 2, height: 2, type: 'dense_bush', passable: false }
    ]
  }
];
