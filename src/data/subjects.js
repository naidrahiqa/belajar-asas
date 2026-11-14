export const SUBJECTS = [
  {
    id: 'kik',
    name: 'Kreativitas, Inovasi, & Kewirausahaan (KIK)',
    shortName: 'KIK / PKK',
    grade: 'Kelas XII SMK (Gasal)',
    durationMinutes: 90,
    totalQuestions: 35,
    icon: 'Briefcase',
    color: 'amber',
    bgGradient: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Perencanaan produksi massal, Line Balancing & Bottleneck, Poka-Yoke, BEP, DFA, QC/QA, dan studi kasus sentra industri lokal Jepara (Mebel Tahunan, Monel Kriyan, Tenun Troso, Resin Senenan).',
    topics: [
      'Alur Produksi Massal (Routing, Scheduling, Dispatching, Expediting)',
      'Perhitungan BEP & Target Laba',
      'Penyetimbangan Lini & Poka-Yoke',
      'Uji Mutu: Destructive vs Non-Destructive Test',
      'Studi Kasus Sentra Industri Kreatif Jepara'
    ]
  },
  {
    id: 'matematika',
    name: 'Matematika',
    shortName: 'Matematika',
    grade: 'Kelas XII SMK (Semua Jurusan)',
    durationMinutes: 90,
    totalQuestions: 25,
    icon: 'Calculator',
    color: 'blue',
    bgGradient: 'from-blue-600 to-indigo-700',
    lightBg: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Kaidah Pencacahan, Permutasi (n objek, unsur sama, siklis, bersyarat), Kombinasi C(n,r), Peluang Kejadian Sederhana & Majemuk, serta Frekuensi Harapan.',
    topics: [
      'Permutasi n Objek, Unsur Sama & Bersyarat',
      'Permutasi Siklis Meja Bundar',
      'Kombinasi Pengambilan Objek & Pemilihan Soal',
      'Peluang Saling Lepas & Tidak Saling Lepas',
      'Peluang Saling Bebas & Frekuensi Harapan Produksi'
    ]
  },
  {
    id: 'indonesia',
    name: 'Bahasa Indonesia',
    shortName: 'B. Indonesia',
    grade: 'Kelas XII SMK (Fase F)',
    durationMinutes: 90,
    totalQuestions: 40,
    icon: 'BookOpen',
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-teal-700',
    lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Teks ilmiah informatif (AI & Mikroplastik), cerpen integritas moral, kritik media/opini, apresiasi puisi kontemporer, dan kaidah kebahasaan EYD Edisi V.',
    topics: [
      'Teks Ilmiah & Istilah Teknis Akademis',
      'Cerpen Integritas & Evaluasi Karakter Tokoh',
      'Teks Opini & Etika Digital / Media Pers',
      'Apresiasi Puisi Simbolis & Diksi Kontemporer',
      'Kaidah EYD V: Pleonasme, Tanda Baca & Kapitalisasi'
    ]
  },
  {
    id: 'inggris',
    name: 'Bahasa Inggris',
    shortName: 'B. Inggris',
    grade: 'Kelas XII SMK',
    durationMinutes: 90,
    totalQuestions: 40,
    icon: 'Languages',
    color: 'violet',
    bgGradient: 'from-violet-600 to-purple-700',
    lightBg: 'bg-violet-50 text-violet-700 border-violet-200',
    description: 'Offering Help & Services, Job Application Letter, Job Interview, Simple Present Tense, dan Simple Past Tense standar dunia kerja SMK.',
    topics: [
      'Offering Help & Workplace Customer Service (10 Soal)',
      'Job Application Letter & Curriculum Vitae (10 Soal)',
      'Job Interview & STAR Method (10 Soal)',
      'Grammar: Simple Present Tense (5 Soal)',
      'Grammar: Simple Past Tense (5 Soal)'
    ]
  },
  {
    id: 'pancasila',
    name: 'Pendidikan Pancasila',
    shortName: 'Pancasila',
    grade: 'Kelas XII SMK (Fase F)',
    durationMinutes: 90,
    totalQuestions: 40,
    icon: 'ShieldCheck',
    color: 'red',
    bgGradient: 'from-rose-600 to-red-700',
    lightBg: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Kearifan tradisi gotong royong, internalisasi nilai Sila 1 s.d. 5, serta penegakan hak dan kewajiban warga negara berlandaskan UUD NRI 1945.',
    topics: [
      'Asal-usul Tradisi Gotong Royong Nusantara',
      'Penerapan Nilai Sila 1 sampai Sila 5',
      'Landasan Hukum Hak & Kewajiban (UUD 1945)',
      'Analisis Kasus Pelanggaran Hak & Pengingkaran Kewajiban',
      'Solusi Preventif & Represif Penegakan Hukum'
    ]
  },
  {
    id: 'pai',
    name: 'Pendidikan Agama Islam & Budi Pekerti',
    shortName: 'PAI & BP',
    grade: 'Kelas XII SMK (Fase F)',
    durationMinutes: 90,
    totalQuestions: 40,
    icon: 'Sparkles',
    color: 'teal',
    bgGradient: 'from-teal-600 to-cyan-700',
    lightBg: 'bg-teal-50 text-teal-700 border-teal-200',
    description: 'Q.S. Al-Ma’idah/5: 32 (Hifz An-Nafs), Q.S. Al-Baqarah/2: 143 (Wasathiyyah), Integrasi Iman-Islam-Ihsan (Hadits Jibril), Ketaatan Ulil Amri, dan Akhlak Bermasyarakat.',
    topics: [
      'Q.S. Al-Ma’idah/5: 32 (Tajwid & Penjagaan Jiwa)',
      'Q.S. Al-Baqarah/2: 143 (Moderasi Beragama)',
      'Akidah: Integrasi Tiga Pilar Iman, Islam, Ihsan',
      'Akhlak: Ulil Amri, Amar Ma’ruf, & Ta’awun',
      'Adab Sosial, Silaturahmi, & Hak Tetangga'
    ]
  },
  {
    id: 'jawa',
    name: 'Bahasa Jawa',
    shortName: 'B. Jawa',
    grade: 'Kelas XII SMK (Fase F)',
    durationMinutes: 90,
    totalQuestions: 40,
    icon: 'Scroll',
    color: 'orange',
    bgGradient: 'from-amber-600 to-yellow-700',
    lightBg: 'bg-orange-50 text-orange-700 border-orange-200',
    description: 'Sandiwara Tradhisi & Modheren, Analisis Teks Artikel, Teknik & Tata Wicara Panatacara, lan Panulisan Aksara Jawa (Sandhangan, Rekan, Angka).',
    topics: [
      'Sandiwara Tradhisi vs Modheren & Struktur Lakon',
      'Struktur & Jinising Artikel Basa Jawa',
      'Panatacara: Struktur Teks, Basa Rinengga, lan 4W',
      'Aksara Jawa: Sandhangan, Angka, lan Aksara Khusus'
    ]
  }
];

