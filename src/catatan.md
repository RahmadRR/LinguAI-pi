
# LinguAI: Pengembangan Aplikasi Kursus Bahasa Inggris Cerdas dengan Genkit dan Google Gemini

## Deskripsi Proyek

LinguAI adalah aplikasi web pembelajaran Bahasa Inggris interaktif yang berfungsi sebagai studi kasus dalam rekayasa perangkat lunak yang digerakkan oleh AI. Proyek ini mendemonstrasikan bagaimana **framework Genkit** digunakan untuk mengorkestrasi berbagai **model AI Google Gemini**, menciptakan platform pembelajaran yang personal, dinamis, dan menarik. Aplikasi ini dirancang dan dikembangkan secara otonom oleh agen AI, menunjukkan bagaimana metodologi pengembangan formal dan **pola arsitektur modern seperti Arsitektur Heksagonal** dapat diterapkan untuk menciptakan produk yang andal, modular, dan kaya fitur.

## Analisis Kebutuhan Aplikasi

Bagian ini mengurutkan kebutuhan fungsional (apa yang sistem lakukan) dan non-fungsional (bagaimana sistem melakukannya) yang perlu dipenuhi oleh aplikasi web ini.

### Kebutuhan Fungsional (Functional Requirements)

*   **Manajemen Pengguna:** Mencakup registrasi pengguna, halaman login-logout, serta manajemen profil dan password akun pengguna.
*   **Manajemen Konten Pembelajaran:** Meliputi katalog kursus (*courses catalogue*), sistem level adaptif (pemula, menengah, lanjutan), dan kumpulan kuis statis.
*   **Integrasi AI:** Terdapat pada beberapa fitur aplikasi seperti "Kuis Tantangan" dinamis yang dibuat AI dan "Asisten Chatbot" untuk rekomendasi.
*   **Pelacakan Progres:** Sistem melacak kemajuan belajar pengguna dan menyajikannya dalam bentuk visual (bar progres).

### Kebutuhan Non-Fungsional (Non-Functional Requirements)

*   **Performa:** Aplikasi harus terasa cepat dan responsif.
*   **Keamanan:** Informasi sensitif pengguna (password) di-hash dan disimpan menggunakan Firebase Authentication. Komunikasi klien-server dienkripsi dengan HTTPS.
*   **Usabilitas:** Antarmuka dirancang agar intuitif, bersih, dan mudah dinavigasi.
*   **Keandalan:** Aplikasi memiliki ketersediaan tinggi (target 99%) dan sistem mampu menangani kesalahan dengan menampilkan pesan yang informatif.
*   **Arsitektur:** Kode sumber diorganisir mengikuti pola **Arsitektur Heksagonal** untuk modularitas dan kemudahan pemeliharaan.
*   **Kompatibilitas:** Aplikasi web harus berfungsi dengan baik dan konsisten di versi terbaru dari browser web modern.

## Tujuan Penelitian

### Bentuk Akhir Produk Penelitian

Bentuk akhir dari penelitian ini adalah sebuah **produk perangkat lunak (aplikasi web) yang sepenuhnya fungsional dan siap pakai bernama "LinguAI"**. Produk ini bukan sekadar konsep atau prototipe dasar, melainkan sebuah aplikasi utuh dengan fitur-fitur yang terintegrasi secara penuh, mencakup:

*   **Platform Pembelajaran Interaktif:** Sebuah aplikasi web yang dapat diakses pengguna untuk belajar Bahasa Inggris.
*   **Sistem Pengguna yang Lengkap:** Fungsionalitas untuk registrasi, login, dan pengelolaan profil pengguna.
*   **Modul Pembelajaran Terstruktur:** Materi kursus inti (`Daily Conversation`, `Grammar`, `Vocabulary`) yang disajikan dalam level-level kesulitan (Pemula, Menengah, Lanjutan) dengan kuis statis yang terkurasi.
*   **Fitur Unggulan Berbasis AI:**
    1.  **Kuis Tantangan Dinamis:** Sebuah fitur yang memungkinkan AI untuk membuat soal-soal kuis baru secara *on-demand*, memberikan latihan yang tidak terbatas.
    2.  **Asisten Percakapan "Lingu":** Sebuah *chatbot* cerdas yang dapat berinteraksi dengan pengguna untuk memberikan rekomendasi kursus yang dipersonalisasi berdasarkan tujuan belajar mereka.
*   **Dasbor Pelacakan Kemajuan:** Sebuah antarmuka visual untuk memonitor progres belajar pengguna.

### Kontribusi Baik Keilmuan Maupun Implementasi

Penelitian ini dirancang untuk memberikan kontribusi yang signifikan di dua bidang:

*   **Kontribusi Keilmuan (Scientific Contribution):** Berfokus pada penemuan pengetahuan baru dan jawaban atas tantangan fundamental.
    1.  **Studi Kasus Pengembangan Otonom:** Proyek ini secara keseluruhan adalah studi kasus yang mendemonstrasikan dan mendokumentasikan proses rekayasa perangkat lunak dari awal hingga akhir yang dilakukan secara otonom oleh agen AI. Ini menunjukkan bagaimana sebuah ide abstrak ("buat aplikasi belajar bahasa") dapat diubah menjadi produk nyata melalui serangkaian keputusan logis dan penerapan metodologi formal, tanpa intervensi manual dalam penulisan kode.
    2.  **Mitigasi Risiko Inherent pada LLM:** Mendemonstrasikan dan memvalidasi sebuah metode krusial untuk mengatasi ketidakpastian output dari *Large Language Models (LLM)*. Dengan menerapkan **"kontrak data" yang ketat menggunakan skema Zod**, penelitian ini membuktikan cara membangun aplikasi yang andal di atas teknologi yang pada dasarnya bersifat non-deterministik. Ini adalah jawaban tervalidasi untuk sebuah masalah ilmiah dalam rekayasa AI.
    3.  **Penerapan Metodologi Formal oleh AI:** Menunjukkan bahwa agen AI dapat menerapkan metodologi rekayasa perangkat lunak yang disiplin (seperti Agile dan TDD) dan **pola arsitektur (Arsitektur Heksagonal)** untuk menghasilkan kode yang berkualitas tinggi, teruji, dan mudah dipelihara.

*   **Kontribusi Implementasi (Implementation Contribution):** Berfokus pada artefak praktis dan "bagaimana" sesuatu dibangun, yang bisa langsung digunakan oleh pengembang.
    1.  **Cetak Biru Arsitektur (Architectural Blueprint):** Menyediakan sebuah model **arsitektur heksagonal** yang praktis dan dapat direplikasi untuk mengintegrasikan layanan AI (termasuk LLM melalui *framework* Genkit) ke dalam aplikasi web modern secara aman dan modular. Ini memisahkan logika bisnis inti dari detail implementasi seperti UI atau layanan eksternal.
    2.  **Pola Praktik Terbaik:** Menawarkan contoh nyata penggunaan tumpukan teknologi modern (Next.js dengan RSC, Genkit, ShadCN UI) secara efektif untuk membangun aplikasi yang performan dan memiliki pengalaman pengguna yang profesional.
    3.  **Kode Sumber sebagai Referensi:** Menghasilkan sebuah basis kode (codebase) yang bersih dan terstruktur yang dapat berfungsi sebagai referensi pendidikan bagi pengembang lain yang ingin mempelajari cara membangun aplikasi serupa.

## Metode Penelitian: Model Prototipe Iteratif SDLC

Metode pengembangan yang saya gunakan adalah **Model Prototipe Iteratif** dalam kerangka **Siklus Hidup Pengembangan Perangkat Lunak (SDLC)**. Model ini memungkinkan saya untuk membangun versi awal aplikasi, mengevaluasinya secara internal, lalu memperbaikinya dalam siklus-siklus terstruktur hingga produk final tercapai.

Berikut adalah langkah-langkah kronologis dan sistematis yang saya lakukan:

### **Tahap 1: Perencanaan (Planning)**

*   **Garis Besar Kegiatan:** Fase awal untuk mengumpulkan ide, mendefinisikan kelayakan, dan membuat rencana tingkat tinggi untuk proyek. Tujuannya adalah untuk memahami apa yang akan dibangun dan mengapa.
*   **Peralatan:**
    *   **Perangkat Keras:** Server komputasi awan untuk pemrosesan data.
    *   **Perangkat Lunak:** *Web Scraper* internal, *library* analisis teks (NLP).
*   **Bahan:**
    *   Data mentah dari deskripsi dan ulasan aplikasi belajar bahasa yang ada.
    *   Dokumentasi teknis dari *framework* yang dipertimbangkan (Next.js, Firebase, Genkit).
*   **Langkah-langkah:**
    1.  Saya melakukan studi kelayakan teknis dan operasional untuk memastikan ide aplikasi ini dapat dibangun dengan tumpukan teknologi yang ada.
    2.  Saya menganalisis data pasar untuk mengidentifikasi kebutuhan inti pengguna dalam aplikasi belajar bahasa.
    3.  Hasilnya saya tuangkan ke dalam dokumen perencanaan awal yang menguraikan visi produk, target pengguna (berdasarkan persona yang saya buat), dan daftar fitur prioritas.

### **Tahap 2: Analisis Kebutuhan (Requirement Analysis)**

*   **Garis Besar Kegiatan:** Mendefinisikan secara detail dan spesifik semua kebutuhan fungsional dan non-fungsional dari aplikasi.
*   **Peralatan:**
    *   **Perangkat Lunak:** Alat pemodelan data internal, pustaka Zod untuk definisi skema.
*   **Bahan:**
    *   Dokumen perencanaan dari Tahap 1.
*   **Langkah-langkah:**
    1.  Saya menerjemahkan fitur-fitur prioritas menjadi kebutuhan fungsional yang konkret (misalnya, sistem login, kuis interaktif, fitur AI).
    2.  Saya mendefinisikan kebutuhan non-fungsional seperti performa, keamanan, dan usabilitas.
    3.  Semua kebutuhan ini didokumentasikan dalam **Product Requirements Document (PRD)** yang menjadi acuan tunggal selama pengembangan.

### **Tahap 3: Desain Sistem (System Design)**

*   **Garis Besar Kegiatan:** Membuat cetak biru arsitektur dan teknis untuk aplikasi berdasarkan dokumen kebutuhan (PRD).
*   **Peralatan:**
    *   **Perangkat Lunak:** Alat pemodelan arsitektur internal, alat desain antarmuka berbasis logika.
*   **Bahan:**
    *   Dokumen PRD dari Tahap 2.
    *   Pola-pola desain arsitektur (**Arsitektur Heksagonal**) dan praktik terbaik UI/UX.
*   **Langkah-langkah:**
    1.  **Desain Arsitektur:** Saya memilih **Arsitektur Heksagonal** untuk memisahkan logika bisnis inti (seperti *flow* AI) dari detail implementasi seperti UI atau layanan eksternal (Firebase).
    2.  **Desain Database/Model Data:** Saya merancang skema data untuk setiap entitas (`User`, `Course`) menggunakan Zod.
    3.  **Desain Antarmuka (UI):** Saya merancang alur navigasi dan tata letak, memutuskan untuk menggunakan **ShadCN UI** sebagai pustaka komponen.

### **Tahap 4: Implementasi & Pembuatan Prototipe (Implementation & Prototyping)**

*   **Garis Besar Kegiatan:** Menulis kode program untuk membangun versi fungsional pertama dari aplikasi (Prototipe 1).
*   **Peralatan:**
    *   **Perangkat Keras:** Lingkungan pengembangan berbasis *cloud*.
    *   **Perangkat Lunak:** Visual Studio Code, Next.js, React, Node.js, Firebase SDK, Genkit SDK.
*   **Bahan:**
    *   Dokumen desain arsitektur dan UI dari Tahap 3.
*   **Langkah-langkah:**
    1.  Saya mengatur struktur proyek dan menginstal semua dependensi yang diperlukan.
    2.  Saya mengkodekan fitur-fitur inti terlebih dahulu: sistem otentikasi dan katalog kursus statis.
    3.  Hasil dari tahap ini adalah **Prototipe 1**: sebuah aplikasi yang berfungsi, di mana pengguna dapat login dan menyelesaikan kuis statis.

### **Tahap 5: Evaluasi Prototipe & Pengujian (Prototype Evaluation & Testing)**

*   **Garis Besar Kegiatan:** Memverifikasi fungsionalitas aplikasi secara sistematis untuk menemukan *bug*, memvalidasi logika bisnis, dan memastikan keandalan fitur AI.
*   **Peralatan:**
    *   **Perangkat Lunak:** Prototipe aplikasi, *framework* pengujian otomatis (internal), *script* pengujian *End-to-End* (E2E), pustaka Zod.
*   **Bahan:**
    *   Daftar kebutuhan dari PRD dan skema data yang telah didefinisikan.
*   **Langkah-langkah:**
    1.  **Pengujian Unit & Komponen:** Saya menjalankan pengujian terisolasi untuk setiap fungsi atau komponen penting. Contohnya, saya memvalidasi *hook* `useSavedCourses` untuk memastikan logika perhitungan progres kursus berjalan dengan benar di berbagai skenario.
    2.  **Validasi Kontrak Data AI:** Ini adalah langkah pengujian krusial. Setiap kali *flow* Genkit dipicu (misalnya, `generateQuiz`), saya secara otomatis memvalidasi bahwa output dari LLM **sesuai dengan skema Zod** yang telah ditetapkan. Jika output tidak valid (misalnya, menghasilkan 4 pertanyaan, bukan 5), tes ini akan gagal dan mencegah data yang salah masuk ke aplikasi.
    3.  **Pengujian Alur Pengguna (End-to-End):** Saya menjalankan *script* otomatis yang mensimulasikan alur pengguna secara lengkap, seperti proses registrasi, login, memulai kuis statis, menyelesaikan kuis, dan memeriksa apakah progresnya tersimpan dengan benar.
    4.  **Umpan Balik untuk Iterasi:** Hasil dari pengujian ini saya gunakan sebagai umpan balik. Pada evaluasi Prototipe 1, saya mengidentifikasi bahwa aplikasi sudah berfungsi tetapi kurang dalam hal keterlibatan jangka panjang, yang menjadi dasar untuk memprioritaskan pengembangan fitur AI pada iterasi berikutnya.

### **Tahap 6: Perbaikan dan Iterasi (Refinement & Iteration)**

*   **Giris Besar Kegiatan:** Mengulangi siklus pengembangan untuk menambahkan fitur baru dan memperbaiki kekurangan berdasarkan hasil evaluasi.
*   **Peralatan dan Bahan:** Sama seperti Tahap 3, 4, dan 5.
*   **Langkah-langkah:**
    1.  **Iterasi 2:** Berdasarkan evaluasi, saya mengimplementasikan fitur berbasis AI (Kuis Dinamis dan Asisten Chat) menggunakan Genkit.
    2.  Setelah implementasi, saya kembali melakukan evaluasi dan pengujian pada **Prototipe 2**.
    3.  Proses ini berlanjut hingga semua fitur dalam PRD telah diimplementasikan dan aplikasi mencapai standar kualitas yang ditetapkan.

### **Tahap 7: Penerapan (Deployment)**

*   **Garis Besar Kegiatan:** Merilis produk akhir ke lingkungan produksi yang dapat diakses secara publik menggunakan platform terkelola.
*   **Peralatan:**
    *   **Perangkat Lunak:** Firebase App Hosting, Firebase CLI, Git.
*   **Bahan:**
    *   Versi final aplikasi yang telah stabil dan teruji dari direktori proyek lokal pengembang.
*   **Langkah-langkah Rinci:**
    1.  **Konfigurasi Infrastruktur**: File `apphosting.yaml` di direktori utama proyek dikonfigurasi. File ini mendefinisikan spesifikasi server seperti alokasi `cpu` dan jumlah `maxInstances` untuk skalabilitas. Yang terpenting, file ini mendeklarasikan *secret* `GOOGLE_API_KEY` yang akan diambil secara aman dari Google Secret Manager dan disuntikkan sebagai variabel lingkungan saat *runtime*.
    2.  **Konfigurasi Framework**: File `firebase.json` dikonfigurasi untuk mengarahkan Firebase agar menggunakan *pipeline deployment* modern (`frameworksBackend`) yang dirancang khusus untuk Next.js.
    3.  **Eksekusi Perintah Deployment**: Proses penerapan dieksekusi dengan satu perintah dari terminal: `firebase deploy`. Perintah ini memicu serangkaian tindakan otomatis di *cloud*:
        *   Kode sumber dari direktori proyek lokal diunggah dengan aman.
        *   Firebase membangun aplikasi Next.js dalam lingkungan yang bersih, menginstal dependensi dari `package.json`, dan menjalankan `next build`.
        *   Hasil *build* dibungkus ke dalam sebuah *container image* yang siap dijalankan.
        *   *Container* tersebut diterapkan ke infrastruktur App Hosting yang terukur, yang secara otomatis terhubung dengan layanan lain seperti Firebase Authentication dan memiliki akses aman ke *secrets*.
    4.  **Akses Publik**: Setelah proses selesai, Firebase menyediakan sebuah URL publik yang stabil. Aplikasi LinguAI kini aktif, berjalan secara penuh, dan siap diakses oleh pengguna dari seluruh dunia.

### Penjelasan Rinci Proses Deployment
Tahap implementasi deployment untuk aplikasi LinguAI adalah proses yang sepenuhnya terotomatisasi yang mengubah kode sumber menjadi aplikasi web live yang dapat diakses secara global, difasilitasi oleh platform Firebase App Hosting. Proses ini dimulai dengan konfigurasi dua file kunci di direktori utama. Pertama, `apphosting.yaml` mendefinisikan spesifikasi infrastruktur backend, termasuk alokasi CPU, kebijakan skalabilitas, dan yang terpenting, deklarasi untuk mengambil `GOOGLE_API_KEY` secara aman dari Google Secret Manager. Ini memastikan bahwa kunci API tidak pernah terekspos dalam kode. Kedua, file `firebase.json` mengarahkan Firebase untuk menggunakan pipeline `frameworksBackend`, sebuah alur kerja modern yang dioptimalkan khusus untuk aplikasi Next.js. Setelah konfigurasi ini siap, seluruh proses deployment dipicu oleh satu perintah tunggal: `firebase deploy` dari direktori proyek lokal pengembang. Perintah ini memulai serangkaian langkah di cloud: Firebase secara otomatis mengambil kode sumber dari direktori lokal pengembang, membangun aplikasi dengan menjalankan `next build`, membungkus hasilnya ke dalam container image yang efisien, dan menerapkannya ke server yang terkelola. Setelah selesai, aplikasi LinguAI langsung aktif di URL publik yang disediakan oleh Firebase, siap digunakan oleh pengguna di seluruh dunia.


## Perancangan dan Implementasi Aplikasi

Bagian ini menjelaskan secara rinci bagaimana aplikasi LinguAI dirancang dan diimplementasikan secara teknis, sesuai dengan tahapan SDLC.

### **1. Analisis Kebutuhan Teknis**

Berdasarkan PRD, kebutuhan teknis utama diidentifikasi:
*   **Frontend:** Membutuhkan *framework* modern yang mendukung *Server-Side Rendering* (SSR) untuk performa dan SEO. Harus mampu menangani *state* yang kompleks secara efisien.
*   **Backend & Otentikasi:** Membutuhkan solusi yang aman dan terkelola untuk otentikasi pengguna dan hosting aplikasi.
*   **Integrasi AI:** Membutuhkan *framework* yang dapat mengorkestrasi panggilan ke LLM, mengelola *prompt*, dan memastikan output yang terstruktur.
*   **UI/UX:** Membutuhkan sistem desain yang konsisten, profesional, dan mudah diimplementasikan.

### **2. Persiapan dan Pemilihan Teknologi**

Berdasarkan analisis kebutuhan teknis, saya memilih tumpukan teknologi (tech stack) berikut:
*   **Framework Aplikasi:** **Next.js**, dengan **React.js** sebagai *library* untuk membangun antarmuka pengguna. Kombinasi ini dipilih karena dukungan kuat untuk App Router dan React Server Components (RSC) yang memaksimalkan performa.
*   **Platform Backend:** **Firebase**. Dipilih untuk layanan **Authentication** yang aman dan **App Hosting** yang terintegrasi penuh.
*   **Framework AI:** **Genkit**. Dipilih karena integrasinya yang mudah dengan ekosistem Google dan kemampuannya untuk mendefinisikan alur kerja AI (*flows*) yang terstruktur.
*   **Pustaka UI:** **ShadCN UI** di atas **Tailwind CSS**. Dipilih untuk kecepatan pengembangan, konsistensi visual, dan komponen yang sangat aksesibel.
*   **Validasi Skema:** **Zod**. Dipilih karena kemampuannya mendefinisikan skema data yang ketat, penting untuk validasi formulir dan "kontrak data" dengan AI.

### **3. Bahasa Pemrograman dan Lingkungan**

Aplikasi ini dibangun menggunakan bahasa pemrograman **TypeScript**, sebuah *superset* dari JavaScript yang menambahkan sistem tipe statis untuk meningkatkan kualitas dan mengurangi *bug*. Kode TypeScript ini pada akhirnya dikompilasi menjadi JavaScript standar agar dapat dijalankan oleh **Node.js** di sisi server dan oleh browser di sisi klien. JSX digunakan untuk mendefinisikan struktur komponen UI, dan Tailwind CSS digunakan untuk styling.

### **4. Perancangan Arsitektur Aplikasi: Arsitektur Heksagonal**

Mengadaptasi konsep arsitektur tiga lapis (*three-tier*), arsitektur aplikasi LinguAI dirancang mengikuti pola **Arsitektur Heksagonal** (*Ports and Adapters*). Pola ini memisahkan secara tegas antara logika bisnis inti (*processing engine*), antarmuka pengguna (*frontend*), dan layanan eksternal (*backend*), sehingga mampu menangani alur kerja aplikasi dengan sangat baik. Tujuannya adalah untuk menciptakan sistem yang modular, mudah diuji, dan fleksibel.

1.  **Inti Aplikasi / *Processing Engine* (Logika Bisnis):**
    *   **Di mana:** `src/ai/flows` dan `src/lib`.
    *   **Tanggung Jawab:** Ini adalah jantung aplikasi yang berisi semua "aturan main": bagaimana kuis dibuat, bagaimana kursus direkomendasikan, dan struktur data pembelajaran. Lapisan ini beroperasi secara independen dan tidak memiliki pengetahuan tentang *framework* UI (Next.js/React) atau layanan *backend* (Firebase).

2.  **Porta / *Ports* (Antarmuka Kontrak):**
    *   **Di mana:** Didefinisikan secara implisit melalui skema input/output (menggunakan Zod) dan tanda tangan fungsi di dalam *flow* AI.
    *   **Tanggung Jawab:** Setiap *port* berfungsi sebagai "kontrak" atau gerbang yang mendefinisikan cara berkomunikasi dengan inti aplikasi. Contoh: *port* untuk `generateQuiz` menyatakan, "Saya membutuhkan `courseName` sebagai input dan akan memberikan objek `Quiz` sebagai output."

3.  **Adaptor / *Adapters* (Jembatan ke Dunia Luar):**
    *   **Di mana:** `src/app`, `src/components`, dan `src/hooks`.
    *   **Tanggung Jawab:** Adaptor adalah jembatan yang menghubungkan dunia luar ke *port* inti.
        *   **Adaptor Frontend (`/app`, `/components`):** Komponen React berfungsi sebagai adaptor yang menerjemahkan interaksi pengguna (seperti klik tombol) menjadi panggilan fungsi ke *port* logika bisnis.
        *   **Adaptor Backend/Data (`/hooks`):** *Hooks* seperti `useAuth` dan `useSavedCourses` berfungsi sebagai adaptor yang menghubungkan aplikasi ke layanan eksternal (seperti Firebase Authentication untuk login) atau penyimpanan data (`localStorage`).

Pola arsitektur ini menjadikan aplikasi sangat modular, di mana setiap lapisan dapat dikembangkan dan diuji secara terpisah, serta mudah untuk diganti atau ditingkatkan di masa depan tanpa mengganggu logika bisnis inti.

### **5. Implementasi (Proses Coding)**

Proses implementasi mengikuti arsitektur yang telah dirancang:
1.  **Struktur Proyek:** Saya membuat struktur folder yang sesuai dengan lapisan arsitektur.
2.  **Implementasi Fitur Inti:** Saya mulai dengan fitur non-AI. Saya membangun sistem otentikasi menggunakan Firebase, halaman login/registrasi, dan *AuthGuard* untuk melindungi rute. Selanjutnya, saya membangun UI untuk katalog kursus, halaman level, dan halaman kuis statis.
3.  **Implementasi Fitur AI:** Setelah fondasi aplikasi kuat, saya mengimplementasikan *flows* Genkit. Untuk setiap *flow*, saya:
    *   Mendefinisikan skema input dan output dengan Zod.
    *   Menulis *prompt* yang jelas dan efektif.
    *   Membuat fungsi *wrapper* yang akan dipanggil dari lapisan UI.
    *   Mengintegrasikan panggilan ke fungsi ini di komponen UI yang relevan (misalnya, tombol "New Challenge" memanggil `generateQuiz`).
4.  **Manajemen State:** Saya menggunakan kombinasi *React Context* (untuk state global seperti otentikasi dan progres) dan `useState` (untuk state lokal di komponen interaktif) untuk manajemen state yang efisien.
5.  **Implementasi Penyimpanan Progres Belajar Sisi Klien**: Tahap ini bertujuan agar pengguna dapat melihat capaian belajar mereka pada fitur *progress bar*. Penyimpanan data progres belajar aplikasi LinguAI diimplementasikan menggunakan **Web Storage API (`localStorage`)**, sebuah teknologi standar yang tertanam di dalam browser. Hal ini memungkinkan aplikasi untuk menyimpan data progres belajar pengguna langsung di perangkat mereka. Data ini akan tetap ada meskipun browser ditutup, namun dapat terhapus jika pengguna secara manual membersihkan *data situs* (site data) dari browser mereka. Logika untuk manajemen penyimpanan ini terpusat pada file `src/hooks/use-saved-courses.tsx`. Program di dalamnya memastikan data dimuat saat pengguna login dan disimpan secara otomatis setiap kali ada progres baru, serta hanya berjalan di lingkungan browser untuk kompatibilitas dengan *Server-Side Rendering* (SSR).
