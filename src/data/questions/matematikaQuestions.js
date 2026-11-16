export const MATEMATIKA_QUESTIONS = [
  {
    id: 'mat-1',
    subjectId: 'matematika',
    topic: 'Permutasi n Objek Berbeda',
    indicator: 'Menentukan banyak susunan jajaran n objek yang berbeda (P(n) = n!).',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Di sebuah bengkel pemesinan SMK, terdapat 5 panel alat ukur presisi berbeda (Micrometer sekrup, Vernier caliper, Dial indicator, Bevel protractor, dan Height gauge) yang akan disusun berjajar pada satu rak display alat. Banyaknya susunan jajaran panel alat ukur yang dapat dibentuk adalah...',
    options: [
      '24 susunan',
      '60 susunan',
      '120 susunan',
      '720 susunan',
      '15 susunan'
    ],
    correctAnswer: 2,
    explanation: {
      summary: 'Jawaban yang tepat adalah 120 susunan.',
      concept: 'Banyaknya permutasi dari n objek berbeda yang disusun dalam satu baris ditentukan oleh rumus P(n) = n! = n × (n - 1) × ... × 1.',
      analysis: 'Karena terdapat n = 5 panel alat berbeda, maka P(5) = 5! = 5 × 4 × 3 × 2 × 1 = 120 susunan.',
      whyWrong: '24 adalah 4!. 60 adalah 5! / 2. 720 adalah 6!. 15 adalah 5 + 4 + 3 + 2 + 1.'
    }
  },
  {
    id: 'mat-2',
    subjectId: 'matematika',
    topic: 'Permutasi Unsur Sama',
    indicator: 'Menentukan banyak susunan kata/kode dari kata yang memuat huruf sama.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Sebuah workshop kriya ukir di Jawa Tengah ingin membuat variasi susunan kode ukiran huruf dari kata "JEPARA". Banyaknya susunan kata atau kode berbeda yang dapat dibentuk dari seluruh huruf pembentuk kata tersebut adalah...',
    options: [
      '360 susunan',
      '180 susunan',
      '720 susunan',
      '120 susunan',
      '240 susunan'
    ],
    correctAnswer: 0,
    explanation: {
      summary: 'Jawaban yang tepat adalah 360 susunan.',
      concept: 'Rumus permutasi dengan unsur sama: P = n! / (k1! × k2! × ... × km!), di mana n adalah total huruf, dan k adalah frekuensi huruf yang berulang.',
      analysis: 'Kata "JEPARA" terdiri dari n = 6 huruf: J (1), E (1), P (1), A (2), R (1).\nHuruf yang berulang hanya A sebanyak k = 2.\nMaka P = 6! / 2! = (720) / (2) = 360 susunan.',
      whyWrong: '720 adalah 6! tanpa membagi huruf A yang kembar. 180 adalah 360 / 2 (pembagian berlebih). 120 adalah 5!.'
    }
  },
  {
    id: 'mat-3',
    subjectId: 'matematika',
    topic: 'Permutasi Siklis',
    indicator: 'Menentukan banyak susunan duduk melingkar n orang ((n - 1)!).',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Enam orang pengurus bengkel konsorsium kejuruan duduk mengitari meja bundar untuk mendiskusikan jadwal pemeliharaan mesin bubut CNC. Banyaknya cara susunan duduk melingkar keenam orang tersebut adalah...',
    options: [
      '24 cara',
      '720 cara',
      '36 cara',
      '6 cara',
      '120 cara'
    ],
    correctAnswer: 4,
    explanation: {
      summary: 'Jawaban yang tepat adalah 120 cara.',
      concept: 'Banyaknya permutasi siklis (melingkar) dari n objek dirumuskan dengan: P_siklis = (n - 1)!.',
      analysis: 'Diketahui n = 6 orang.\nP_siklis = (6 - 1)! = 5! = 5 × 4 × 3 × 2 × 1 = 120 cara.',
      whyWrong: '720 adalah 6! (permutasi linier, bukan melingkar). 24 adalah 4!. 36 adalah 6^2.'
    }
  },
  {
    id: 'mat-4',
    subjectId: 'matematika',
    topic: 'Permutasi Bersyarat Berdampingan',
    indicator: 'Menentukan susunan jajaran objek dengan syarat unsur tertentu harus berdampingan.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Lima orang siswa (3 siswa laki-laki dan 2 siswi perempuan) berfoto berjajar dalam satu baris lurus setelah memenangkan lomba inovasi teknologi tepat guna. Jika kedua siswi perempuan disyaratkan harus selalu berdiri berdampingan, banyaknya variasi susunan posisi foto yang mungkin terjadi adalah...',
    options: [
      '24 susunan',
      '48 susunan',
      '72 susunan',
      '120 susunan',
      '12 susunan'
    ],
    correctAnswer: 1,
    explanation: {
      summary: 'Jawaban yang tepat adalah 48 susunan.',
      concept: 'Metode Pengikatan (Grouping / Block Method): Unsur yang harus selalu berdampingan dianggap sebagai 1 kesatuan elemen super. Banyak susunan total = (permutasi antar-elemen) × (permutasi internal di dalam ikatan).',
      analysis: '1. Anggap 2 siswi perempuan sebagai 1 blok: [P1, P2].\n2. Sekarang terdapat: 3 siswa laki-laki + 1 blok perempuan = 4 elemen yang dipermutasikan: 4! = 24 cara.\n3. Di dalam blok perempuan, kedua siswi dapat bertukar posisi: 2! = 2 cara.\nTotal susunan = 4! × 2! = 24 × 2 = 48 susunan.',
      whyWrong: '24 hanya memperhitungkan 4! tanpa mengalikan susunan internal kedua perempuan. 120 adalah 5! tanpa syarat berdampingan.'
    }
  },
  {
    id: 'mat-5',
    subjectId: 'matematika',
    topic: 'Permutasi Siklis Bersyarat',
    indicator: 'Menentukan susunan duduk melingkar dengan syarat unsur tertentu berdampingan.',
    level: 'Sukar / C4',
    type: 'single',
    question: 'Tujuh orang tim pengembang software SMK mengadakan rapat koordinasi mengelilingi meja bundar. Di antara mereka terdapat Ketua Tim dan Manajer Proyek yang harus selalu duduk berdampingan agar koordinasi komunikasi teknis tidak terputus. Banyaknya susunan duduk melingkar yang memenuhi syarat tersebut adalah...',
    options: [
      '120 cara',
      '720 cara',
      '1.440 cara',
      '240 cara',
      '5.040 cara'
    ],
    correctAnswer: 3,
    explanation: {
      summary: 'Jawaban yang tepat adalah 240 cara.',
      concept: 'Untuk n objek pada permutasi siklis di mana k unsur harus berdampingan: k unsur diikat menjadi 1 elemen tunggal. Jumlah elemen melingkar menjadi N = (n - k + 1). Rumus: (N - 1)! × k!.',
      analysis: '1. Total n = 7 orang. Ketua dan Manajer diikat jadi 1 entitas.\n2. Jumlah entitas melingkar N = 5 orang lain + 1 entitas ikatan = 6 entitas.\n3. Permutasi siklis 6 entitas = (6 - 1)! = 5! = 120 cara.\n4. Di dalam ikatan, Ketua dan Manajer dapat bertukar posisi = 2! = 2 cara.\nTotal cara = 120 × 2 = 240 cara.',
      whyWrong: '120 lupa mengalikan permutasi internal 2!. 720 adalah (7-1)! tanpa syarat ikatan. 1.440 adalah 6! × 2.'
    }
  },
  {
    id: 'mat-6',
    subjectId: 'matematika',
    topic: 'Konsep Kombinasi C(n,r)',
    indicator: 'Menganalisis perbedaan konsep kombinasi dan permutasi dalam pemilihan delegasi kejuruan.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Dari 7 orang teknisi terbaik di bengkel otomotif SMK, akan dipilih 3 orang sebagai satu tim delegasi untuk mewakili sekolah dalam festival uji emisi kendaraan tingkat provinsi. Berapakah banyaknya variasi tim delegasi yang dapat dibentuk?',
    options: [
      '35 variasi',
      '21 variasi',
      '70 variasi',
      '210 variasi',
      '42 variasi'
    ],
    correctAnswer: 0,
    explanation: {
      summary: 'Jawaban yang tepat adalah 35 variasi.',
      concept: 'Karena pemilihan delegasi tim tidak memperhatikan jabatan/urutan (memilih A, B, C sama saja dengan B, C, A), masalah ini diselesaikan menggunakan Kombinasi C(n, r) = n! / (r! × (n - r)!).',
      analysis: 'C(7, 3) = 7! / (3! × 4!) = (7 × 6 × 5) / (3 × 2 × 1) = 210 / 6 = 35 variasi.',
      whyWrong: '210 adalah Permutasi P(7, 3) yang memperhatikan urutan jabatan. 21 adalah C(7, 2). 70 adalah 35 × 2.'
    }
  },
  {
    id: 'mat-7',
    subjectId: 'matematika',
    topic: 'Sifat-Sifat Kombinasi',
    indicator: 'Menganalisis sifat C(n, r) = C(n, n-r) dan kalkulasi dasar kombinasi.',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Berdasarkan sifat simetri kombinasi matematika, nilai dari C(10, 8) identik dengan nilai C(10, 2). Nilai numerik hasil perhitungan kombinasi tersebut adalah...',
    options: [
      '90',
      '80',
      '20',
      '45',
      '10'
    ],
    correctAnswer: 3,
    explanation: {
      summary: 'Jawaban yang tepat adalah 45.',
      concept: 'Sifat simetri kombinasi menyatakan bahwa C(n, r) = C(n, n - r). Maka C(10, 8) = C(10, 10 - 8) = C(10, 2).',
      analysis: 'C(10, 2) = (10 × 9) / (2 × 1) = 90 / 2 = 45.',
      whyWrong: '90 adalah 10 × 9 tanpa dibagi 2!. 20 adalah 10 × 2. 80 adalah 10 × 8.'
    }
  },
  {
    id: 'mat-8',
    subjectId: 'matematika',
    topic: 'Pengambilan Objek Beda Warna',
    indicator: 'Menghitung cara pengambilan beberapa objek berwarna berbeda dari kantong.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Di dalam sebuah wadah penyimpanan suku cadang bengkel kelistrikan, terdapat 6 lampu indikator warna merah dan 5 lampu indikator warna hijau. Seorang instruktur praktik mengambil secara acak 2 lampu merah dan 2 lampu hijau sekaligus. Banyak cara pengambilan lampu indikator tersebut adalah...',
    options: [
      '25 cara',
      '75 cara',
      '150 cara',
      '300 cara',
      '120 cara'
    ],
    correctAnswer: 2,
    explanation: {
      summary: 'Jawaban yang tepat adalah 150 cara.',
      concept: 'Aturan perkalian kombinasi independen: Memilih r1 dari n1 DAN r2 dari n2 dihitung dengan C(n1, r1) × C(n2, r2).',
      analysis: '1. Mengambil 2 lampu merah dari 6: C(6, 2) = (6 × 5) / (2 × 1) = 15 cara.\n2. Mengambil 2 lampu hijau dari 5: C(5, 2) = (5 × 4) / (2 × 1) = 10 cara.\nBanyak cara total = 15 × 10 = 150 cara.',
      whyWrong: '25 adalah 15 + 10 (menggunakan aturan penjumlahan padahal kedua peristiwa terjadi bersamaan). 300 adalah 150 × 2.'
    }
  },
  {
    id: 'mat-9',
    subjectId: 'matematika',
    topic: 'Pemilihan Soal Wajib',
    indicator: 'Menghitung banyak pilihan soal ujian jika beberapa nomor tertentu wajib dikerjakan.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Pada asesmen teori kejuruan teknik pendingin, siswa diwajibkan menjawab 8 soal dari 10 soal uraian yang disediakan penguji. Jika soal nomor 1, 2, dan 3 adalah soal materi K3 yang wajib dikerjakan oleh seluruh siswa, banyaknya variasi pilihan komposisi soal yang dapat diambil siswa adalah...',
    options: [
      '15 variasi',
      '35 variasi',
      '45 variasi',
      '28 variasi',
      '21 variasi'
    ],
    correctAnswer: 4,
    explanation: {
      summary: 'Jawaban yang tepat adalah 21 variasi.',
      concept: 'Jika ada soal wajib, kurangkan jumlah soal yang wajib dikerjakan dari total soal yang tersedia (n) dan total soal yang harus dijawab (r).',
      analysis: 'Total soal tersedia = 10. Soal wajib = 3 (nomor 1, 2, 3).\nSisa soal yang dapat dipilih = 10 - 3 = 7 soal.\nTotal soal yang harus dijawab = 8. Karena 3 soal sudah pasti dikerjakan, siswa tinggal memilih = 8 - 3 = 5 soal lagi.\nBanyak cara = C(7, 5) = C(7, 2) = (7 × 6) / (2 × 1) = 21 variasi.',
      whyWrong: '35 adalah C(7, 3). 45 adalah C(10, 8) tanpa memperhitungkan syarat soal wajib.'
    }
  },
  {
    id: 'mat-10',
    subjectId: 'matematika',
    topic: 'Geometri Titik Kombinasi',
    indicator: 'Menganalisis pembentukan segitiga dari sekumpulan titik pada bidang datar.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Pada sebuah pelat PCB rangkaian kontrol elektronika, terdapat 8 titik solder pengujian yang tersebar di bidang datar. Dipastikan tidak ada 3 titik solder yang berada pada satu garis lurus (kolinier). Banyaknya bidang segitiga uji yang dapat dibentuk dengan menghubungkan tiga titik solder tersebut adalah...',
    options: [
      '24 segitiga',
      '56 segitiga',
      '28 segitiga',
      '336 segitiga',
      '112 segitiga'
    ],
    correctAnswer: 1,
    explanation: {
      summary: 'Jawaban yang tepat adalah 56 segitiga.',
      concept: 'Satu segitiga dibentuk oleh tepat 3 titik yang tidak segaris. Urutan titik pembentuk segitiga (misal segitiga ABC sama dengan BCA) tidak berpengaruh, sehingga menggunakan Kombinasi C(n, 3).',
      analysis: 'C(8, 3) = 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56 segitiga.',
      whyWrong: '336 adalah Permutasi P(8, 3). 28 adalah C(8, 2) yang merupakan jumlah garis lurus, bukan segitiga.'
    }
  },
  {
    id: 'mat-11',
    subjectId: 'matematika',
    topic: 'Peluang Dadu Sederhana',
    indicator: 'Menentukan peluang kejadian sederhana pada pelemparan sebuah dadu.',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Sebuah dadu bermata 6 seimbang dilempar satu kali. Peluang munculnya mata dadu yang merupakan bilangan prima ganjil adalah...',
    options: [
      '1/6',
      '1/3',
      '1/2',
      '2/3',
      '5/6'
    ],
    correctAnswer: 1,
    explanation: {
      summary: 'Jawaban yang tepat adalah 1/3.',
      concept: 'Peluang kejadian A dirumuskan P(A) = n(A) / n(S), dengan n(S) adalah ruang sampel.',
      analysis: 'Ruang sampel lemparan sebuah dadu: S = {1, 2, 3, 4, 5, 6}, sehingga n(S) = 6.\nBilangan prima pada dadu adalah {2, 3, 5}.\nYang disyaratkan adalah prima GANJIL, yaitu A = {3, 5}, sehingga n(A) = 2.\nMaka P(A) = 2/6 = 1/3.',
      whyWrong: '1/2 adalah peluang jika angka 2 ikut dihitung (seluruh bilangan prima {2, 3, 5}). 1/6 hanya untuk 1 angka.'
    }
  },
  {
    id: 'mat-12',
    subjectId: 'matematika',
    topic: 'Peluang Pengambilan Bola',
    indicator: 'Menentukan peluang pengambilan satu bola/baut dari sebuah kotak.',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Sebuah laci peralatan bengkel mekanik berisi 7 mur baja dan 5 mur kuningan yang berdimensi sama persis. Seorang siswa mengambil 1 buah mur secara acak tanpa melihat. Peluang terambilnya mur berbahan kuningan adalah...',
    options: [
      '7/12',
      '5/7',
      '1/5',
      '1/12',
      '5/12'
    ],
    correctAnswer: 4,
    explanation: {
      summary: 'Jawaban yang tepat adalah 5/12.',
      concept: 'P(Kuningan) = n(Kuningan) / Total mur di laci.',
      analysis: 'Jumlah mur kuningan = 5.\nTotal seluruh mur = 7 + 5 = 12 buah.\nMaka peluang terambil mur kuningan = 5/12.',
      whyWrong: '7/12 adalah peluang terambil mur baja. 5/7 adalah rasio kuningan terhadap baja, bukan peluang terhadap populasi total.'
    }
  },
  {
    id: 'mat-13',
    subjectId: 'matematika',
    topic: 'Frekuensi Harapan Koin',
    indicator: 'Menentukan frekuensi harapan suatu kejadian pada pelemparan koin berulang.',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Tiga keping uang logam dilemparkan bersama-sama secara berulang sebanyak 120 kali. Frekuensi harapan munculnya tepat dua sisi Gambar (G) dan satu sisi Angka (A) adalah...',
    options: [
      '45 kali',
      '30 kali',
      '60 kali',
      '75 kali',
      '90 kali'
    ],
    correctAnswer: 0,
    explanation: {
      summary: 'Jawaban yang tepat adalah 45 kali.',
      concept: 'Frekuensi Harapan Fh(A) = N × P(A), di mana N adalah frekuensi percobaan dan P(A) adalah peluang kejadian A.',
      analysis: '1. Ruang sampel 3 koin: n(S) = 2^3 = 8 titik sampel.\n2. Kejadian muncul tepat dua Gambar: A = {GGA, GAG, AGG} → n(A) = 3.\n3. Peluang P(A) = 3/8.\n4. Frekuensi harapan = 120 × (3/8) = 15 × 3 = 45 kali.',
      whyWrong: '60 kali adalah 120 × 1/2. 30 kali adalah 120 × 2/8.'
    }
  },
  {
    id: 'mat-14',
    subjectId: 'matematika',
    topic: 'Frekuensi Harapan Kontekstual',
    indicator: 'Menentukan frekuensi harapan suatu kejadian kontekstual (kehadiran kerja bengkel).',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Berdasarkan catatan disiplin bengkel permesinan selama 3 tahun terakhir, probabilitas seorang teknisi hadir tepat waktu dan mematuhi briefing K3 pada pagi hari adalah 0,92. Jika dalam satu semester efektif terdapat 125 hari kerja operasional bengkel, frekuensi harapan teknisi tersebut hadir tepat waktu mematuhi briefing K3 adalah...',
    options: [
      '110 hari',
      '120 hari',
      '115 hari',
      '105 hari',
      '92 hari'
    ],
    correctAnswer: 2,
    explanation: {
      summary: 'Jawaban yang tepat adalah 115 hari.',
      concept: 'Frekuensi Harapan Fh = n × P(A).',
      analysis: 'Diketahui n = 125 hari, P = 0,92.\nFh = 125 × 0,92 = 125 × (92 / 100) = (5 / 4) × 92 = 5 × 23 = 115 hari.',
      whyWrong: '110 dan 120 adalah kesalahan pembulatan aritmetika. 92 adalah persentase tanpa dikalikan 125 hari.'
    }
  },
  {
    id: 'mat-15',
    subjectId: 'matematika',
    topic: 'Kejadian Saling Lepas',
    indicator: 'Memahami konsep teoritis dan syarat dua kejadian saling lepas.',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Dua buah kejadian A dan B dalam suatu ruang sampel S dikatakan sebagai dua kejadian yang "Saling Lepas" (Mutually Exclusive) apabila...',
    options: [
      'Peluang terjadinya kejadian A tidak dipengaruhi sama sekali oleh terjadinya kejadian B',
      'Peluang irisan kedua kejadian sama dengan hasil kali peluang masing-masing P(A) × P(B)',
      'Gabungan kejadian A dan B selalu menghasilkan seluruh ruang sampel S secara utuh',
      'Kejadian A dan B tidak mungkin dapat terjadi secara bersama-sama pada saat yang sama (A ∩ B = ∅)',
      'Peluang terjadinya kejadian A bernilai sama besar dengan peluang kejadian B'
    ],
    correctAnswer: 3,
    explanation: {
      summary: 'Jawaban yang tepat adalah Kejadian A dan B tidak mungkin dapat terjadi secara bersamaan (A ∩ B = ∅).',
      concept: 'Definisi Saling Lepas (Mutually Exclusive): Dua kejadian tidak memiliki elemen persekutuan (irisan kosong, P(A ∩ B) = 0). Rumus penjumlahan menjadi P(A ∪ B) = P(A) + P(B).',
      analysis: 'Karakteristik utama saling lepas adalah irisan kosong (A ∩ B = ∅). Opsi A dan B adalah definisi dua kejadian Saling Bebas (Independen), bukan saling lepas.',
      whyWrong: 'Opsi A dan B mendefinisikan kejadian saling bebas (independent). C mendefinisikan mutually exhaustive. E mendefinisikan equiprobable events.'
    }
  },
  {
    id: 'mat-16',
    subjectId: 'matematika',
    topic: 'Identifikasi Hubungan Kejadian',
    indicator: 'Mengidentifikasi hubungan antara dua kejadian (genap dan ganjil) pada pengambilan nomor.',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Dari kotak undian doorprize HUT SMK yang berisi 30 kupon bernomor urut 1 sampai dengan 30, diambil satu kupon secara acak. Didefinisikan:\n- Kejadian A = Terambil kupon bernomor ganjil\n- Kejadian B = Terambil kupon bernomor genap\nHubungan matematis yang paling tepat antara Kejadian A dan Kejadian B adalah...',
    options: [
      'Dua kejadian saling bebas bersyarat dalam satu ruang sampel',
      'Kejadian A merupakan bagian himpunan (subset) dari Kejadian B',
      'Dua kejadian tidak saling lepas karena sama-sama bilangan bulat',
      'Dua kejadian saling lepas dan saling komplementer',
      'Peluang terjadinya irisan P(A ∩ B) bernilai 0,5'
    ],
    correctAnswer: 3,
    explanation: {
      summary: 'Jawaban yang tepat adalah Dua kejadian saling lepas dan saling komplementer.',
      concept: 'Bilangan asli hanya memiliki 2 sifat paritas: genap atau ganjil. Tidak ada satu pun angka yang sekaligus genap dan ganjil (A ∩ B = ∅ → saling lepas). Selain itu, seluruh angka 1-30 pasti kalau bukan genap adalah ganjil (A ∪ B = S → komplementer).',
      analysis: 'Karena A ∩ B = ∅ dan A ∪ B = S, maka A dan B saling lepas sekaligus saling komplemen (B = A\').',
      whyWrong: 'Pilihan C salah karena irisan keduanya tidak ada. Pilihan B salah karena anggota ganjil bukan anggota genap. Pilihan E salah karena P(A ∩ B) = 0.'
    }
  },
  {
    id: 'mat-17',
    subjectId: 'matematika',
    topic: 'Peluang Dua Dadu',
    indicator: 'Menentukan peluang jumlah mata dadu tertentu pada pelemparan dua dadu.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Dua buah dadu bersisi enam dilempar undi secara bersamaan sebanyak satu kali. Peluang munculnya jumlah kedua mata dadu sama dengan 7 atau sama dengan 10 adalah...',
    options: [
      '1/6',
      '1/4',
      '5/36',
      '7/36',
      '1/3'
    ],
    correctAnswer: 1,
    explanation: {
      summary: 'Jawaban yang tepat adalah 1/4.',
      concept: 'Ruang sampel 2 dadu n(S) = 6 × 6 = 36. Dua kejadian saling lepas (jumlah 7 tidak mungkin sekaligus jumlah 10): P(7 ∪ 10) = P(7) + P(10).',
      analysis: '1. Pasangan berjumlah 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6 pasangan.\n2. Pasangan berjumlah 10: (4,6), (5,5), (6,4) → 3 pasangan.\nTotal pasangan = 6 + 3 = 9 pasangan.\nPeluang = 9/36 = 1/4.',
      whyWrong: '1/6 adalah 6/36 (hanya yang berjumlah 7). 5/36 hanya berjumlah 8 atau 6. 7/36 adalah kesalahan hitung.'
    }
  },
  {
    id: 'mat-18',
    subjectId: 'matematika',
    topic: 'Frekuensi Harapan Barang Cacat',
    indicator: 'Menentukan frekuensi harapan barang cacat dari suatu proses produksi massal.',
    level: 'Mudah / C2',
    type: 'single',
    question: 'Sebuah pabrik perakitan komponen steker listrik mencatat bahwa rata-rata peluang satu unit steker mengalami cacat cetakan plastik isolator adalah 0,015. Jika dalam satu shift kerja hari ini lini pabrik berhasil memproduksi 4.000 unit steker, frekuensi harapan steker cacat yang diperkirakan terjaring oleh tim QC adalah...',
    options: [
      '40 unit',
      '75 unit',
      '15 unit',
      '150 unit',
      '60 unit'
    ],
    correctAnswer: 4,
    explanation: {
      summary: 'Jawaban yang tepat adalah 60 unit.',
      concept: 'Fh = Total Produksi × Peluang Cacat = n × P(cacat).',
      analysis: 'Fh = 4.000 × 0,015 = 4.000 × (15 / 1.000) = 4 × 15 = 60 unit.',
      whyWrong: '40 unit adalah 4.000 × 0,010. 150 unit kelebihan faktor sepuluh. 15 unit adalah 1.000 unit.'
    }
  },
  {
    id: 'mat-19',
    subjectId: 'matematika',
    topic: 'Peluang Tidak Saling Lepas',
    indicator: 'Menentukan peluang gabungan dua kejadian tidak saling lepas pada kartu bridge.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Dari satu set kartu remi lengkap (bridge deck berisi 52 kartu standar tanpa joker), diambil satu lembar kartu secara acak. Peluang terambilnya kartu bergambar Raja (King) ATAU kartu berdaun Hati Merah (Heart) adalah...',
    options: [
      '4/13',
      '17/52',
      '5/26',
      '7/52',
      '1/26'
    ],
    correctAnswer: 0,
    explanation: {
      summary: 'Jawaban yang tepat adalah 4/13 (atau 16/52).',
      concept: 'Aturan Penjumlahan Peluang Tidak Saling Lepas: P(A ∪ B) = P(A) + P(B) - P(A ∩ B).',
      analysis: 'Ruang sampel n(S) = 52.\n- Jumlah kartu King: n(K) = 4 buah → P(K) = 4/52.\n- Jumlah kartu Hati: n(H) = 13 buah → P(H) = 13/52.\n- Kartu yang merupakan King sekaligus Hati (King of Hearts): n(K ∩ H) = 1 buah → P(K ∩ H) = 1/52.\nMaka P(K ∪ H) = 4/52 + 13/52 - 1/52 = 16/52 = 4/13.',
      whyWrong: '17/52 terjadi jika lupa mengurangkan kartu King Hati yang terhitung dobel. 13/52 hanya kartu hati saja.'
    }
  },
  {
    id: 'mat-20',
    subjectId: 'matematika',
    topic: 'Peluang Saling Bebas',
    indicator: 'Menentukan peluang terjadinya dua kejadian saling bebas (Aturan Perkalian Peluang).',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Di laboratorium komputer SMK terdapat dua printer terpisah, Printer A dan Printer B. Peluang Printer A mengalami kendala paper-jam saat mencetak adalah 0,05, sedangkan peluang Printer B mengalami paper-jam adalah 0,08. Jika kedua printer beroperasi secara independen (saling bebas), peluang kedua printer tersebut sama-sama mengalami paper-jam secara bersamaan pada suatu waktu cetak adalah...',
    options: [
      '0,130',
      '0,040',
      '0,004',
      '0,008',
      '0,400'
    ],
    correctAnswer: 2,
    explanation: {
      summary: 'Jawaban yang tepat adalah 0,004.',
      concept: 'Dua kejadian A dan B saling bebas (independen) jika dan hanya jika P(A ∩ B) = P(A) × P(B).',
      analysis: 'P(A ∩ B) = 0,05 × 0,08 = 5/100 × 8/100 = 40/10.000 = 0,004.',
      whyWrong: '0,130 adalah hasil penjumlahan 0,05 + 0,08 (salah rumus). 0,040 adalah kesalahan penempatan desimal.'
    }
  },
  {
    id: 'mat-21',
    subjectId: 'matematika',
    topic: 'Peluang Kartu Remi Bilangan Prima',
    indicator: 'Menentukan peluang pengambilan satu kartu remi bernomor prima.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Dari satu set kartu remi standar (52 kartu, terdiri atas 4 jenis corak: Spade, Heart, Diamond, Club; bernomor As, 2 s.d. 10, Jack, Queen, King), diambil 1 kartu acak. Jika kartu bernomor dianggap 2 sampai 10 (As dihitung 1), peluang terambil kartu bernomor bilangan prima adalah...',
    options: [
      '2/13',
      '3/13',
      '5/13',
      '1/4',
      '4/13'
    ],
    correctAnswer: 4,
    explanation: {
      summary: 'Jawaban yang tepat adalah 4/13.',
      concept: 'Bilangan prima di antara angka 2 sampai 10 adalah: {2, 3, 5, 7} (ada 4 angka prima).',
      analysis: 'Setiap angka prima muncul pada 4 corak kembang (Spade, Heart, Diamond, Club).\nJumlah kartu prima = 4 angka × 4 corak = 16 kartu.\nPeluang terambil kartu prima = 16/52 = 4/13.',
      whyWrong: '5/13 jika menganggap angka 9 atau As adalah prima (padahal 9 komposit dan 1 bukan prima). 3/13 jika angka 2 terlewat.'
    }
  },
  {
    id: 'mat-22',
    subjectId: 'matematika',
    topic: 'Kejadian Majemuk Dadu & Koin',
    indicator: 'Menentukan peluang kejadian majemuk pada pelemparan dadu dan koin secara bersamaan.',
    level: 'Sedang / C3',
    type: 'single',
    question: 'Sebuah koin mata uang logam dan sebuah dadu bersisi enam dilempar bersamaan sebanyak satu kali. Peluang munculnya sisi Gambar pada koin DAN mata dadu faktor dari 6 adalah...',
    options: [
      '1/6',
      '1/4',
      '1/3',
      '1/2',
      '2/3'
    ],
    correctAnswer: 2,
    explanation: {
      summary: 'Jawaban yang tepat adalah 1/3.',
      concept: 'Pelemparan koin dan dadu adalah dua kejadian saling bebas: P(Koin Gambar ∩ Dadu Faktor 6) = P(Gambar) × P(Faktor 6).',
      analysis: '1. Peluang koin sisi Gambar: P(G) = 1/2.\n2. Faktor dari 6 pada dadu adalah {1, 2, 3, 6} → ada 4 angka dari 6.\nPeluang faktor 6: P(F) = 4/6 = 2/3.\n3. Peluang gabungan = (1/2) × (2/3) = 2/6 = 1/3.',
      whyWrong: '1/6 didapat jika faktor 6 hanya dihitung 2 angka. 1/4 didapat jika faktor 6 dihitung 3 angka.'
    }
  },
  {
    id: 'mat-23',
    subjectId: 'matematika',
    topic: 'Analisis Peluang Ujian Independen',
    indicator: 'Menganalisis kebenaran beberapa pernyataan peluang majemuk independen (ujian dua siswa).',
    level: 'Sukar / C4 (HOTS)',
    type: 'single',
    question: 'Dua siswa SMK jurusan Teknik Komputer, Fajar dan Galih, mengikuti uji sertifikasi internasional Mikrotik (MTCNA). Peluang Fajar lulus adalah 0,80 dan peluang Galih lulus adalah 0,70. Hasil ujian keduanya bersifat independen (saling bebas). Perhatikan tiga pernyataan berikut:\n(1) Peluang kedua siswa lulus bersama-sama adalah 0,56.\n(2) Peluang HANYA Fajar yang lulus (Galih tidak lulus) adalah 0,24.\n(3) Peluang setidaknya salah satu dari mereka lulus adalah 0,94.\nPernyataan yang bernilai BENAR adalah...',
    options: [
      'Hanya pernyataan (1) dan (2) yang bernilai benar',
      'Pernyataan (1), (2), dan (3) semuanya bernilai benar',
      'Hanya pernyataan (1) dan (3) yang bernilai benar',
      'Hanya pernyataan (2) dan (3) yang bernilai benar',
      'Hanya pernyataan (1) saja yang bernilai benar'
    ],
    correctAnswer: 1,
    explanation: {
      summary: 'Jawaban yang tepat adalah Pernyataan (1), (2), dan (3) semuanya benar.',
      concept: 'P(Fajar Lulus) = 0,80 → P(Fajar Gagal) = 0,20.\nP(Galih Lulus) = 0,70 → P(Galih Gagal) = 0,30.',
      analysis: 'Evaluasi tiap pernyataan:\n(1) Keduanya lulus: 0,80 × 0,70 = 0,56 (BENAR).\n(2) Hanya Fajar lulus: P(Fajar Lulus) × P(Galih Gagal) = 0,80 × 0,30 = 0,24 (BENAR).\n(3) Setidaknya satu lulus: 1 - P(Keduanya Gagal) = 1 - (0,20 × 0,30) = 1 - 0,06 = 0,94 (BENAR).\nJadi ketiga pernyataan terbukti benar secara matematis.',
      whyWrong: 'Pilihan lain salah karena mengeliminasi salah satu pernyataan yang secara matematis terbukti valid.'
    }
  },
  {
    id: 'mat-24',
    subjectId: 'matematika',
    topic: 'Analisis Sifat Peluang Dua Dadu',
    indicator: 'Menganalisis sifat saling lepas, saling bebas, dan peluang gabungan pada dua dadu.',
    level: 'Sukar / C4 (HOTS)',
    type: 'single',
    question: 'Pada pelemparan dua dadu secara bersamaan, didefinisikan:\n- Kejadian X = Muncul jumlah mata dadu sama dengan 7.\n- Kejadian Y = Muncul jumlah mata dadu berupa bilangan genap.\nManakah kesimpulan analisis yang paling tepat mengenai sifat hubungan antara Kejadian X dan Kejadian Y?',
    options: [
      'X dan Y adalah dua kejadian saling bebas karena dadu pertama tidak mempengaruhi dadu kedua',
      'Peluang terjadinya Kejadian X lebih besar daripada peluang terjadinya Kejadian Y dalam ruang sampel',
      'Peluang gabungan P(X ∪ Y) bernilai sama dengan 1 karena mencakup seluruh bilangan bulat',
      'X dan Y adalah dua kejadian saling lepas karena jumlah 7 ganjil sehingga irisannya kosong (X ∩ Y = ∅)',
      'Peluang terjadinya irisan kedua kejadian P(X ∩ Y) bernilai 6/36 pada satu kali percobaan'
    ],
    correctAnswer: 3,
    explanation: {
      summary: 'Jawaban yang tepat adalah X dan Y saling lepas karena 7 adalah bilangan ganjil sehingga irisannya kosong (X ∩ Y = ∅).',
      concept: 'Dua kejadian saling lepas jika tidak ada titik sampel yang memenuhi kedua kriteria sekaligus. Angka 7 adalah bilangan ganjil mutlak, sehingga tidak ada kombinasi dadu yang jumlahnya 7 sekaligus genap.',
      analysis: 'Ruang sampel dadu jumlah genap adalah {2, 4, 6, 8, 10, 12} (18 titik). Ruang sampel dadu jumlah 7 adalah { (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) } (6 titik). Irisan kedua himpunan adalah himpunan kosong. Maka X dan Y saling lepas.',
      whyWrong: 'Opsi A salah karena ini bukan definisi saling bebas. B salah karena P(Genap) = 18/36 jauh lebih besar dari P(7) = 6/36. C salah karena P(X ∪ Y) = 6/36 + 18/36 = 24/36 = 2/3 (bukan 1).'
    }
  },
  {
    id: 'mat-25',
    subjectId: 'matematika',
    topic: 'Peluang Mesin Produksi QC',
    indicator: 'Menganalisis peluang kualitas produk dari dua mesin independen (produk baik & cacat).',
    level: 'Sukar / C4 (HOTS)',
    type: 'single',
    question: 'Sebuah lini produksi perakitan sepeda motor memasok suku cadang dari dua mesin cetak injeksi otomatis, Mesin 1 dan Mesin 2:\n- Mesin 1 memproduksi 60% dari total suku cadang harian dengan persentase produk cacat sebesar 2% (0,02).\n- Mesin 2 memproduksi 40% dari total suku cadang harian dengan persentase produk cacat sebesar 5% (0,05).\nJika satu buah suku cadang diambil secara acak dari total kontainer hasil gabungan produksi kedua mesin tersebut, berapakah probabilitas suku cadang yang terambil tersebut mengalami CACAT?',
    options: [
      '0,032 (3,2%)',
      '0,070 (7,0%)',
      '0,035 (3,5%)',
      '0,020 (2,0%)',
      '0,025 (2,5%)'
    ],
    correctAnswer: 0,
    explanation: {
      summary: 'Jawaban yang tepat adalah 0,032 (3,2%).',
      concept: 'Hukum Probabilitas Total (Law of Total Probability): P(Cacat) = P(Mesin 1) × P(Cacat | Mesin 1) + P(Mesin 2) × P(Cacat | Mesin 2).',
      analysis: 'P(Cacat) = (0,60 × 0,02) + (0,40 × 0,05)\n= 0,012 + 0,020\n= 0,032 atau 3,2%.',
      whyWrong: '0,070 adalah penjumlahan langsung 0,02 + 0,05 (mengabaikan bobot volume mesin). 0,035 adalah rata-rata tanpa bobot (2 + 5)/2.'
    }
  }
];
