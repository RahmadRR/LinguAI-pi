import { z } from 'zod';

export type VocabularyItem = {
    word: string;
    translation: string;
};

export type ConversationLine = {
    speaker: string;
    dialogue: string;
};

export const QuizQuestionSchema = z.object({
  question: z.string().describe("The quiz question. This should be a full sentence, often requiring the user to fill in a blank represented by '{blank}'."),
  options: z.array(z.string()).length(3).describe("An array of exactly 3 possible answers for the question."),
  correctAnswer: z.string().describe("The correct answer from the provided options."),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export type LessonContent = {
  courseId: string;
  levelId: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  quiz: QuizQuestion[];
};

export type StaticLessonPage = {
  subtitle: string;
  content: string;
  tableHtml?: string;
};

export type StaticLessonContent = {
  courseId: string;
  levelId: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
  title: string;
  pages: StaticLessonPage[];
};

export const STATIC_LESSONS_CONTENT: StaticLessonContent[] = [
    {
        courseId: 'module-basic',
        levelId: 'beginner',
        title: 'VERB, NOUNS, DAN PRONOUNS',
        pages: [
          {
            subtitle: "Verb (kata kerja).",
            content: `Verb (kata kerja) adalah kata yang digunakan untuk menyatakan tindakan, keadaan, atau situasi yang dilakukan oleh subjek dalam suatu kalimat. 
            Verb sangat penting karena menjadi inti (predikat) dalam setiap kalimat Bahasa Inggris.
Contoh:
•	run (berlari), eat (memakan), feel (merasa)
• Rudi runs every morning. 
    Rudi (Rudi) runs (berlari) every morning (setiap pagi). 
    Rudi sebagai (subyek), runs sebagai (verb), every morning sebagai keterangan waktu (Keterangan). `
        },
          {
            subtitle: "Macam-Macam Verb",
            content: `Verb dalam bahasa Inggris dapat dikelompokkan sebagai berikut:
            1. Berdasarkan Fungsinya:
            •	Action Verb (Tindakan) Menyatakan tindakan atau aktivitas.
            Contoh : Jump (melompat), eat (memakan), write (menulis).
            •	State Verb (Keadaan): Menyatakan keadaan, perasaan, atau situasi.
            Contoh : know (mengetahui), love (mencintai), believe (mempercayai)

            2. Berdasarkan Kebutuhan Objek: 
            •	Transitive Verb :	Verb yang memerlukan objek agar maknanya lengkap 
            Contoh : 
            >	She reads a book. - Dia (perempuan)  membaca buku.
            >	They plow that field. - Mereka membajak ladang itu.
            •	Intransitive Verb : Verb yang tidak memerlukan objek dan bermakna lengkap
            Contoh : 
            > She sleeps. - Dia tertidur.
            > Bird chirps. - Burung berkicau.`
        },
        {
          subtitle: "Macam-Macam Verb",
          content: `3. Berdasarkan Perubahan Bentuk (Reguler dan Irregular)
            •	Regular Verb : Kata kerja yang bentuk lampau (V2) dan past participle-nya (V3) hanya dengan menambahkan -ed atau -d.
            lihat contohnya di bawah ini
            Contoh :
            Irene talked to Mr.Budi about this yesterday. - Irene membicarakan hal ini dengan pak Budi kemarin.`,
            tableHtml: `
              <style>
                table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
                th { background-color: hsl(var(--secondary)); font-weight: bold; }
              </style>
              <table>
                <thead>
                  <tr>
                    <th>Verb Base</th>
                    <th>Verb 2</th>
                    <th>Verb 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Talk (Berbicara)</td>
                    <td>Talked</td>
                    <td>Talked</td>
                  </tr>
                  <tr>
                    <td>Play (Bermain)</td>
                    <td>Played</td>
                    <td>Played</td>
                  </tr>
                  <tr>
                    <td>Punch (Memukul)</td>
                    <td>Punched</td>
                    <td>Punched</td>
                  </tr>
                </tbody>
              </table>
            `
      },
        {
          subtitle: "Macam-Macam Verb",
          content: `• Irregular Verb (Tidak Beraturan) Kata kerja yang perubahan bentuk lampau dan past participle-nya
           tergantung pada kata itu sendiri
            lihat contohnya di bawah ini
            Contoh :
            I saw a bird flew above that dome yesterday!. - Aku melihat burung terbang di atas kubah itu kemarin!.`,
            tableHtml: `
              <style>
                table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
                th { background-color: hsl(var(--secondary)); font-weight: bold; }
              </style>
              <table>
                <thead>
                  <tr>
                    <th>Verb Base</th>
                    <th>Verb 2</th>
                    <th>Verb 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fly (Terbang)</td>
                    <td>Flew</td>
                    <td>Flown</td>
                  </tr>
                  <tr>
                    <td>Go (Pergi)</td>
                    <td>Went</td>
                    <td>Gone</td>
                  </tr>
                  <tr>
                    <td>Blow (Terpental)</td>
                    <td>Blew</td>
                    <td>Blown</td>
                  </tr>
                </tbody>
              </table>
            `
      },
        {
          subtitle: "Macam-Macam Verb",
          content: `4. Linking Verb (Penghubung) adalah kata kerja yang menghubungkan subjek dengan kata keterangan pelengkap (complement) 
          yang menerangkan atau menggambarkan subjek, bukan tindakan.
          Biasanya menggunakan: am, is, are, was, were,
          atau kata lain seperti seem, feel, taste, dll. 
          Contoh :
          • I am the President. (Aku-lah sang Presiden.)
          • She seems happy. (Dia terlihat senang.)
          • The soup tastes delicious. (Sup ini terasa lezat.)`
      },
        {
          subtitle: "Macam-Macam Verb",
          content: `5. Auxiliary Verb (Helping Verb) Auxiliary Verb atau “Helping Verb” digunakan untuk membantu verb utama membentuk tense, kalimat negatif atau tanya.
          Contoh: 
          • She is eating lunch. (Dia sedang makan siang.)
          • They have finished their homework. (Mereka telah menyelesaikan PR mereka.)
          • Did you go to school yesterday? (Kemarin kamu datang ke Sekolah?.)
          • I can swim. (Aku bisa berenang.) \n
          Catatan Penting :
          Satu kalimat hanya perlu satu verb utama, namun dapat didahului auxiliary/modal verb.
          Linking verb tidak menggambarkan aksi, berbeda dengan action verb.
          Tidak semua verb bisa digunakan sebagai linking ataupun auxiliary verb.
          Disarankan untuk kamu menghafal daftar irregular verb yang paling sering kamu gunakan.
          Berikut adalah contoh umum Auxiliary Verb: `,
          tableHtml: `
          <style>
            table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
            th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
            th { background-color: hsl(var(--secondary)); font-weight: bold; }
          </style>
          <table>
            <thead>
              <tr>
                <th>be (Kata hubung)</th>
                <th>do (Kata hubung)</th>
                <th>Have</th>
                <th>Modal Verbs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Is, Am, Are, Was, Were.</td>
                <td>Do, Does, Did.</td>
                <td>Have, Has, Had.</td>
                <td>Can, Could, Will, Would, Must, May, Might, Should, Shall.</td>
              </tr>
            </tbody>
          </table>
        `,
      },
      {
        subtitle: "Small practice",
        content: `Buatlah catatan dan artikan kalimat berikut ke Bahasa Indonesia!
1.	Transitive:
The student writes a letter.
2.	Intransitive:
She arrives early.
3.	Regular:
Yesterday, they played football.
4.	Irregular:
He went to the market this morning.
5.	Linking:
The flowers smell nice.
6.	Auxiliary: 
We have finished the project.`
      },
      {
        subtitle: "Lanjut yuk!",
        content: `Dihalaman berikutnya kita akan belajar tentang NOUN (Kata Benda) \n SEMANGAT!`
      },
            {
                subtitle: "Noun (kata benda).",
                content: `Noun (kata benda) adalah kata yang digunakan untuk menyebutkan nama orang, tempat, hewan, benda, hari, tumbuhan, atau sesuatu yang dapat dirasakan panca indrea.
Contohnya:
Jeremy (nama orang), teacher (guru), Yogyakarta (nama tempat), children (anak-anak), Saturday (hari Sabtu).

Jenis Noun berdasarkan wujud:
1.	Concrete Nouns (Kata benda berwujud) adalah kata benda yang dapat dirasakan oleh panca indera.
Contoh: village (desa), chair (kursi), flower (bunga), water (air).

2.	Abstract Nouns (Kata benda tak berwujud) adalah kata benda yang tidak berwujud dan tidak dapat dirasakan oleh panca indera, biasanya berupa perasaan atau ungkapan.
Contoh: love (cinta), knowledge (pengetahuan), happiness (kebahagiaan).`
            },
            {
                subtitle: "Kata Benda Yang Dapat Dihitung dan Tidak",
                content: `Jenis Noun berdasarkan bisa dihitung atau tidak:
1.	Countable Nouns (kata benda yang dapat dihitung)
Adalah kata benda yang dapat dihitung satu per satu. Banyaknya bisa diukur dengan angka dan tidak membuthkan kata bantu seperti wadah untuk menunjukkan jumlahnya.
Contoh: bottle (botol), book (buku), cat (kucing).

2.	Uncountable Nouns (kata benda yang tidak dapat dihitung)
Adalah kata benda yang tidak bisa dihitung satu per satu menggunakan angka, biasanya berupa cairan, atau membutuhkan wadah untuk menunjukkan jumlahnya .
Contoh: water (air), oil (minyak), money (uang), flour (tepung).`
            },
            {
                subtitle: "Kata Benda Tunggal dan Jamak",
                content: `Jenis Noun berdasarkan jumlah:
1.	Singular Nouns (kata benda tunggal)
Menunjukkan satu benda atau orang.
Contoh: door (pintu), cat (kucing).

2.	Plural Nouns (kata benda jamak)
Menunjukkan lebih dari satu benda atau orang, biasanya diberi akhiran "-s" atau "-es", kecuali beberapa kata benda berbentuk jamak tidak beraturan seperti children dan mice.
Contoh: doors (pintu-pintu), books (buku-buku), children (anak-anak), busses (Bis).`
            },
            {
                subtitle: "Catatan Penting tentang Subject dan Verb:",
                content: `Catatan Penting:
•	Subjek berupa Singular Pronouns (she, he, it) memerlukan tambahan "-s" pada verb.
•	Subjek berupa Plural Pronouns (I, you, we, they) tidak memerlukan tambahan "-s" pada verb.
Contoh kalimat:
•	We love flower beds. – Kami suka hamparan bunga.
 ("flower beds" adalah objek jamak) dengan format Subject (We) + Verb (love) + Object (flower beds).
•	She loves flowers. – Dia suka bunga-bunga 
(subjek singular → verb mendapat akhiran -s)
•	We drink water. – Kita meminum air
 ("water" adalah uncountable noun sehingga tidak diberi akhiran -s).`
            },
            {
              subtitle: "Small practice",
              content: `Buatlah catatan dan artikan kalimat berikut ke Bahasa Indonesia dan sebaliknya!
1.	Concrete Noun:
Kucing itu tidur di sofa.
2.	Abstract Noun:
Honesty is the foundation of every strong relationship.
3.	Uncountable Noun :
Nenek itu suka menghitung beras.
5.	Singular Noun:
This book is interesting.
6.	Plural Noun: 
Kaki-kaki ku terasa pegal.`
          },
          {
            subtitle: "Lanjut yuk!",
            content: `Dihalaman berikutnya kita akan belajar tentang PRONOUN (Kata Ganti) \n SEMANGAT!`
          },
          {
            subtitle: "Macam-macam Pronoun",
            content: `Pronoun adalah kata yang digunakan untuk menggantikan noun (kata benda) di dalam kalimat agar tidak terjadi pengulangan kata yang sama.
             Dalam bahasa Inggris, ada beberapa jenis pronoun yang memiliki fungsi berbeda-beda dalam sebuah kalimat.
             1. Personal Pronoun
             Personal pronoun adalah kata ganti orang yang menggantikan nama orang atau benda sebagai subjek atau objek dalam kalimat.
             Contoh :
             •	She is my friend. - Dia (perempuan) adalah teman-ku.
             •	I see them at school. - Aku lihat mereka di sekolah.
             Berikut tabel untuk contoh lain: `,
             tableHtml: `
             <style>
               table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
               th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
               th { background-color: hsl(var(--secondary)); font-weight: bold; }
             </style>
             <table>
               <thead>
                 <tr>
                   <th>Bentuk Subjek</th>
                   <th>Bentuk Objek</th>
                   <th>Arti</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>I</td>
                   <td>Me</td>
                   <td>Aku</td>
                 </tr>
                 <tr>
                   <td>You</td>
                   <td>You</td>
                   <td>Kamu</td>
                 </tr>
                 <tr>
                   <td>He</td>
                   <td>Him</td>
                   <td>Dia (laki-laki)</td>
                 </tr>
                 <tr>
                   <td>She</td>
                   <td>Her</td>
                   <td>Dia (perempuan)</td>
                 </tr>
                 <tr>
                   <td>It</td>
                   <td>It</td>
                   <td>Itu (benda/hewan)</td>
                 </tr>
                 <tr>
                   <td>We</td>
                   <td>Us</td>
                   <td>Kami/kita</td>
                 </tr>
                 <tr>
                   <td>They</td>
                   <td>Them</td>
                   <td>Mereka</td>
                 </tr>
               </tbody>
             </table>
           `,
         },
         {
          subtitle: "Macam-macam Pronoun",
          content: `2. Possessive Pronoun (Kepemilikan) \n adalah kata ganti yang menunjukkan kepemilikan dan menggantikan noun yang sudah disebutkan di kalimat sebelumnya.
          Contoh : 
          •	This pen is mine. - Ini Pulpen-ku
          •	The house is theirs. - Ini rumah mereka.
          Berikut tabel untuk contoh lain: `,
          tableHtml: `<style>
               table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
               th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
               th { background-color: hsl(var(--secondary)); font-weight: bold; }
             </style>
             <table>
               <thead>
                 <tr>
                   <th>Possessive Adjective</th>
                   <th>Possessive Pronoun</th>
                   <th>Arti</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>My</td>
                   <td>Mine</td>
                   <td>Milik/Punya-ku</td>
                 </tr>
                 <tr>
                   <td>Your</td>
                   <td>Yours</td>
                   <td>Milik/Punya-mu</td>
                 </tr>
                 <tr>
                   <td>His</td>
                   <td>His</td>
                   <td>Miliknya (laki-laki)</td>
                 </tr>
                 <tr>
                   <td>Her</td>
                   <td>Hers</td>
                   <td>Miliknya (perempuan)</td>
                 </tr>
                 <tr>
                   <td>Its</td>
                   <td>Its</td>
                   <td>Miliknya (benda/hewan)</td>
                 </tr>
                 <tr>
                   <td>Our</td>
                   <td>Ours</td>
                   <td>Milik (Kami/kita)</td>
                 </tr>
                 <tr>
                   <td>Their</td>
                   <td>Theirs</td>
                   <td>Milik Mereka</td>
                 </tr>
               </tbody>
             </table>`
        },
         {
          subtitle: "Macam-macam Pronoun",
          content: `3. Reflexive Pronoun 
          Reflexive pronoun digunakan ketika subjek dan objek dalam kalimat merujuk pada orang yang sama.
          Contoh : 
          •	She made it herself. - Dia membuatnya itu sendiri.
          •	We should do it ourselves. - Kita harus melakukan itu sendiri. 
          Berikut tabel untuk contoh lain: `,
          tableHtml: `<style>
               table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
               th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
               th { background-color: hsl(var(--secondary)); font-weight: bold; }
             </style>
             <table>
               <thead>
                 <tr>
                   <th>Subjek</th>
                   <th>Reflexive Pronoun</th>
                   <th>Arti</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>I</td>
                   <td>Myself</td>
                   <td>Diriku sendiri</td>
                 </tr>
                 <tr>
                   <td>You</td>
                   <td>Yourself</td>
                   <td>Dirimu sendiri</td>
                 </tr>
                 <tr>
                   <td>He</td>
                   <td>Himself</td>
                   <td>Dirinya sendiri (laki-laki)</td>
                 </tr>
                 <tr>
                   <td>She</td>
                   <td>Herself</td>
                   <td>Dirinya sendiri (perempuan)</td>
                 </tr>
                 <tr>
                   <td>It</td>
                   <td>Itself</td>
                   <td>Dirinya sendiri (benda/hewan)</td>
                 </tr>
                 <tr>
                   <td>We</td>
                   <td>Ourselves</td>
                   <td>Kami sendiri</td>
                 </tr>
                 <tr>
                   <td>They</td>
                   <td>Themselves</td>
                   <td>Mereka sendiri</td>
                 </tr>
               </tbody>
             </table>`
        },
         {
          subtitle: "Macam-macam Pronoun",
          content: `4. Demonstrative Pronoun 
          Demonstrative pronoun adalah kata ganti yang digunakan untuk menunjukkan sesuatu secara spesifik
          Contoh : 
          •	This is my book. - Ini adalah buku-ku.
          •	Those are my shoes. - Ini adalah sepatu-ku.
 
          Berikut tabel untuk contoh lain: `,
          tableHtml: `<style>
               table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
               th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
               th { background-color: hsl(var(--secondary)); font-weight: bold; }
             </style>
             <table>
               <thead>
                 <tr>
                   <th>Bentuk subjek</th>
                   <th>Arti</th>
                   <th>Konteks</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>This</td>
                   <td>Ini</td>
                   <td>Benda tunggal (Dekat)</td>
                 </tr>
                 <tr>
                   <td>That</td>
                   <td>Ini</td>
                   <td>Benda tunggal (Jauh)</td>
                 </tr>
                 <tr>
                   <td>These</td>
                   <td>Ini</td>
                   <td>Benda jamak (Dekat)</td>
                 </tr>
                 <tr>
                   <td>Those</td>
                   <td>Ini</td>
                   <td>Benda jamak (Jauh)</td>
                 </tr>`
        },
         {
          subtitle: "Macam-macam Pronoun",
          content: `5. Relative/Conjunctive Pronoun 
          Relative pronoun (kadang juga disebut conjunctive pronoun) menghubungkan klausa
          biasanya memperkenalkan relative clause (anak kalimat).
          Contoh : 
          •	The boy who is wearing a hat is my brother.
          - Anak kecil (laki laki) yang memakai topi adalah adik-ku. 
          •	This is the book that I told you about.
          - Ini adalah buku yang pernah aku bilang padamu.

          Berikut tabel untuk contoh lain: `,
          tableHtml: `<style>
               table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
               th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
               th { background-color: hsl(var(--secondary)); font-weight: bold; }
             </style>
             <table>
               <thead>
                 <tr>
                   <th>Base</th>
                   <th>Fungsi</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>Who</td>
                   <td>Orang sebagai subjek</td>
                 </tr>
                 <tr>
                   <td>Whom</td>
                   <td>Orang sebagai objek</td>
                 </tr>
                 <tr>
                   <td>Whose</td>
                   <td>Menyatakan kepemilikan</td>
                 </tr>
                 <tr>
                   <td>Which</td>
                   <td>Untuk benda atau hewan</td>
                 </tr>
                 <tr>
                   <td>This/That</td>
                   <td>Sebagai subjek (umum)</td>
                 </tr>`
        },
         {
          subtitle: "Macam-macam Pronoun",
          content: `6. Indefinite Pronoun 
          Indefinite pronoun adalah kata ganti yang merujuk pada orang atau benda yang tidak spesifik.
          Contoh : 
         •	Someone is calling you.
         -  Seseorang sedang memanggilmu.
         •	Is there anything in the bag?
         -  Apakah ada sesuatu di dalam tas ini?

          Berikut tabel untuk contoh lain: `,
          tableHtml: `<style>
               table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
               th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
               th { background-color: hsl(var(--secondary)); font-weight: bold; }
             </style>
             <table>
               <thead>
                 <tr>
                   <th>Base</th>
                   <th>Arti</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>Someone</td>
                   <td>Seseorang</td>
                 </tr>
                 <tr>
                   <td>Anyone</td>
                   <td>Siapa saja</td>
                 </tr>
                 <tr>
                   <td>Everyone</td>
                   <td>Semua orang</td>
                 </tr>
                 <tr>
                   <td>Nobody</td>
                   <td>Tak seorangpun</td>
                 </tr>
                 <tr>
                   <td>Something</td>
                   <td>Sesuatu</td>
                 </tr>
                 <tr>
                   <td>Anything</td>
                   <td>Apa saja/Apapun</td>
                 </tr>
                 <tr>
                   <td>Nothing</td>
                   <td>Bukan apapun/apa saja</td>
                 </tr>
                 <tr>
                   <td>Everything</td>
                   <td>Semuanya</td>
                 </tr>
                 <tr>
                   <td>Each</td>
                   <td>Masing-masing</td>
                 </tr>
                 <tr>
                   <td>Both</td>
                   <td>Keduanya</td>
                 </tr>
                 <tr>
                   <td>Few</td>
                   <td>Beberapa/Sedikit</td>
                 </tr>
                 <tr>
                   <td>Many</td>
                   <td>Banyak</td>
                 </tr>`
        },
         {
          subtitle: "Macam-macam Pronoun",
          content: `7. Interrogative Pronoun 
          Interrogative pronoun digunakan untuk menanyakan orang atau benda dalam kalimat tanya.
          Contoh : 
         •	Who are you talking to?
         -  Kamu bicara dengan siapa?
         •	What is your name?
         -  Siapa namamu?
         •	Which of these is yours?
         -  Yang mana milik-mu dari ini (jamak)?

          Berikut tabel untuk contoh lain: `,
          tableHtml: `<style>
               table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
               th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
               th { background-color: hsl(var(--secondary)); font-weight: bold; }
             </style>
             <table>
               <thead>
                 <tr>
                   <th>Base</th>
                   <th>Arti</th>
                   <th>Fungsi</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>Who</td>
                   <td>Siapa</td>
                   <td>Orang sebagai subjek/objek</td>
                 </tr>
                 <tr>
                   <td>Whom</td>
                   <td>Siapa</td>
                   <td>Orang sebagai objek</td>
                 </tr>
                 <tr>
                   <td>Whose</td>
                   <td>Milik siapa</td>
                   <td>Menanyakan kepemilikan</td>
                 </tr>
                 <tr>
                   <td>What</td>
                   <td>Apa</td>
                   <td>Menanyakan benda/pilihan</td>
                 </tr>
                 <tr>
                   <td>Which</td>
                   <td>Yang mana</td>
                   <td>Menanyakan pilihan khusus</td>
                 </tr>`
        },
        ]
    },
     {
        courseId: 'module-basic',
        levelId: 'elementary',
        title: 'Tenses Dasar',
        pages: [
            {
                subtitle: "Simple Present Tense, Simple Past Tense, Simple Future Tense",
                content: `Simple Present Tense, Simple Past Tense, dan Simple Future Tense adalah materi yang akan kita pelajari di bagian ini.
SingkatnyaSimple Present Tense Digunakan untuk kalimat present (saat ini).
Simple Past Tense Digunakan untuk kalimat lampau (Past)
Simple Future Tense Digunakan untuk kalimat yang akan dilakukan di masa depan (future)\n
Biar gak bingung lanjut halaman selanjutnya ya!
            `},
            {
                subtitle: "Simple Present Tense",
                content: `Simple Present Tense digunakan untuk menyatakan kebiasaan, kebenaran umum, atau fakta.

Rumus: Subject + Verb 1 (+ s/es)

Contoh:
- I walk to school every day. (Saya berjalan ke sekolah setiap hari) - Kebiasaan
- The sun rises in the east. (Matahari terbit dari timur) - Kebenaran Umum
- She works in a hospital. (Dia bekerja di rumah sakit) - Fakta

Ingat: Tambahkan '-s' atau '-es' pada kata kerja untuk subjek He, She, dan It.`
            },
            {
                subtitle: "Giving Instructions: Memberi Perintah",
                content: `Untuk memberi perintah atau instruksi (kalimat imperatif), kita cukup menggunakan kata kerja bentuk pertama (Verb 1).

Contoh:
- Open the door. (Buka pintunya)
- Please sit down. (Silakan duduk)
- Be quiet. (Harap tenang)

Untuk larangan, tambahkan "Don't" di depan kata kerja.
- Don't touch that. (Jangan sentuh itu)
- Don't be late. (Jangan terlambat)`
            },
            {
                subtitle: "Small practice",
                content: `Buatlah catatan dan artikan kalimat berikut ke Bahasa Indonesia atau sebaliknya!
1.	Concrete Noun:
Kucing itu tidur di sofa.
2.	Abstract Noun:
Honesty is the foundation of every strong relationship.
3.	Uncountable Noun :
Nenek itu suka menghitung beras.
5.	Singular Noun:
This book is interesting.
6.	Plural Noun: 
Kaki-kaki ku terasa pegal.`
            },
            {
              subtitle: "Lanjut yuk!",
              content: `Dihalaman berikutnya kita akan belajar tentang Simple Past tense \n SEMANGAT!`
            },{
              subtitle: "Simple Past Tense",
              content: `Simple Past Tense digunakan untuk menyatakan sesuatu kejadian atau yang telah dilakukan di masa lampau.
1. Struktur Kalimat Simple Past
Kalimat Positif
Subject + Verb 2 (bentuk kedua dari kata kerja) + (object)
Contoh:
•	She visited her friend yesterday.
•	They played football last weekend. \n
Kalimat Negatif 
Subject + did not (didn’t) + base verb + (object)
Contoh:
•	I did not go to school yesterday.
•	He didn’t eat breakfast this morning.\n
Kalimat Tanya
Did + subject + base verb + (object)?
Contoh:
•	Did you watch a movie last night?
•	Did they study English yesterday?
`
          },
            {
              subtitle: "Kosakata Simple Past Tense",
              content: `2. Kosakata Dasar dalam Simple Past\n
Berikut contoh beberapa kosakata dasar kata kerja dan bentuk lampau yang sering digunakan dalam kalimat Simple Past:
`, tableHtml: `<style>
               table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
               th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
               th { background-color: hsl(var(--secondary)); font-weight: bold; }
             </style>
             <table>
               <thead>
                 <tr>
                   <th>Base</th>
                   <th>Past form (Verb 2)</th>
                   <th>Contoh kalimat</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>Go</td>
                   <td>Went</td>
                   <td>I went to school yesterday.</td>
                 </tr>
                 <tr>
                   <td>Watch</td>
                   <td>Watched</td>
                   <td>She watched TV last night.</td>
                 </tr>
                 <tr>
                   <td>Play</td>
                   <td>Played</td>
                   <td>They played football on Sunday.</td>
                 </tr>
                 <tr>
                   <td>Visist</td>
                   <td>Visited</td>
                   <td>We visited grandma last week.</td>
                 </tr>
                 <tr>
                   <td>Study</td>
                   <td>Studied</td>
                   <td>He studied English yesterday.</td>
                 </tr>
                 <tr>
                   <td>Eat</td>
                   <td>Ate</td>
                   <td>I ate breakfast this morning.</td>
                 </tr>
                 <tr>
                   <td>See</td>
                   <td>Saw</td>
                   <td>She saw a movie yesterday.</td>
                 </tr>
                 <tr>
                   <td>Have</td>
                   <td>Had</td>
                   <td>They had lunch at noon.</td>
                 </tr>`
          },{
            subtitle: "Situasi tertentu",
            content: `3. Contoh Kalimat dalam Situasi Tertentu
•	Kalimat Transitive (dengan objek):
The student wrote a letter.
(Ada objek: a letter)
•	Kalimat Intransitive (tanpa objek):
She arrived early.
•	Regular Verb:
Yesterday, they played football.
•	Irregular Verb:
He went to the market this morning.
•	Dengan Auxiliary Verb:
We did not finish the project.
\n Catatan Penting
•	Pada Simple Past, verb 2 dipakai untuk kalimat positif, sedangkan kalimat negatif dan tanya memakai auxiliary verb did + base verb.
•	Did selalu membantu membuat kalimat negatif dan tanya di Simple Past.
•	Hafalkan beberapa irregular verbs paling sering digunakan.
•	Dalam percakapan, kosakata dasar sehari-hari sangat penting untuk membentuk kalimat dalam Simple Past.
`
        },{
          subtitle: "Small practice",
          content: `Buatlah catatan untuk melengkapi kalimat berikut!
            1. We ...  Andrew fell off the cliff!
            2. The event ... was fabulous!
            3. ... you get hurt?
            4. Tita and Titi ... puffy dresses to the party yesterday.
            5. I ... an invitation to a museum grand opening this weekend.
`
      },{
        subtitle: "Lanjut yuk!",
        content: `Dihalaman berikutnya kita akan belajar tentang Simple Future tense \n SEMANGAT!`
      },{
        subtitle: "Simple Future Tense",
        content: `Simple Future Tense adalah tense yang digunakan untuk menyatakan rencana atau kejadian yang akan terjadi di masa depan. \n 
        1. Struktur Kalimat Simple Future
Kalimat Positif
Subject + will + base verb + (object)
Contoh:
•	She will visit her friend tomorrow.
•	They will play football next weekend.
Kalimat Negatif
Subject + will not (won’t) + base verb + (object)
Contoh:
•	I will not (won’t) go to school tomorrow.
•	He won’t eat lunch later.
Kalimat Tanya
Will + subject + base verb + (object)?
Contoh:
•	Will you watch a movie tonight?
•	Will they study English tomorrow?
`
      },
      {
        subtitle: "Auxiliary Verb Simple Future Tense",
        content: `
        2. Auxiliary Verb (Helping Verb) dalam Simple Future
Auxiliary verb yang digunakan sebagai penanda future adalah will.
•	Contoh kalimat positif:
  She will travel to Bali next week.
•	Contoh kalimat negatif:
 	We will not (won’t) finish the project on time.
•	Contoh kalimat tanya:
	Will you help me tomorrow?
Catatan:
Setelah will, kata kerja selalu dalam bentuk dasar (base form).`
      },
      {
        subtitle: "Auxiliary Verb Simple Future Tense",
        content: `
        3. Kosakata Dasar dalam Simple Future
Berikut contoh beberapa kosakata dasar kata kerja yang sering digunakan dalam kalimat Simple Future:
`,tableHtml: `<style>
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
th { background-color: hsl(var(--secondary)); font-weight: bold; }
</style>
<table>
<thead>
  <tr>
    <th>Base</th>
    <th>Contoh kalimat</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Go</td>
    <td>I will go to school Tomorrow.</td>
  </tr>
  <tr>
    <td>Watch</td>
    <td>She will watch TV tonight.</td>
  </tr>
  <tr>
    <td>Play</td>
    <td>They will play football nextweek.</td>
  </tr>
  <tr>
    <td>Eat</td>
    <td>I will eat breakfast later.</td>
  </tr>
  <tr>
    <td>See</td>
    <td>You will see a beautiful sunset over there.</td>
  </tr>`
      },
      {
        subtitle: "Contoh percakapan Simple Future Tense",
        content: `
        4. Contoh Percakapan Sederhana Menggunakan Simple Future
A: What will you do tomorrow?
B: I will visit my uncle.\n
A: Will you play football?
B: Yes, I will play football with my friends.\n
A: Will you watch this movie?
B: No, I won’t watch them anymore.

Catatan Penting
•	Simple Future selalu menggunakan will + base verb untuk semua subjek.
•	Dalam kalimat negatif, will not atau won’t digunakan.
•	Dalam kalimat tanya, will diletakkan di depan subjek.
•	Will di sini berfungsi sebagai auxiliary verb yang menandakan masa depan.
•	Hafalkan kosakata dasar dan latih kalimat simple future dalam konteks sehari-hari.
`
      },{
        subtitle: "Small practice",
        content: `Buatlah catatan untuk menyelesaikan latihan berikut!
1.	Buat kalimat positif menggunakan kata kerja dalam kurung:
(visit) / she / her grandparents / tomorrow
2.	Buat kalimat negatif dari kalimat berikut:
They will watch a movie tonight.
3.	Buat kalimat tanya dari kalimat berikut:
He will play football next week.
4.	Lengkapi kalimat dengan bentuk Simple Future:
I _______ (go) to school next Monday.
5.	Ubah kalimat berikut menjadi kalimat negatif:
We will have lunch at 12 o’clock.
6.	Buat kalimat tanya dengan menggunakan kata-kata ini:
Will / you / study / English / tomorrow?
7.	Buat kalimat positif dengan kata kerja dalam tanda kurung:
(eat) / they / dinner / at 7 p.m.
8.	Lengkapi kalimat berikut:
She _______ (not/will) come to the party.
9.	Buat kalimat tanya dari kalimat berikut:
They will visit the museum next month.
10.	Buat kalimat positif menggunakan kata-kata berikut:
I / will / see / my friend / on Sunday.
`
    },{
      subtitle: "Simple Continous Tenses",
      content: `Kita udah belajar tentang basic tenses sebelumnya, Next kita belajar Continous Tenses yuk!\n
      Simple Continuous Tenses (Present, Past, Future Continuous)
      digunakan untuk menyatakan suatu kegiatan atau kejadian yang sedang berlangsung pada waktu tertentu, baik di masa sekarang, masa lalu, maupun masa depan.
`
    },{
      subtitle: "Present Continous Tenses",
      content: `1. Present Continuous Tense
•	Fungsi: Menyatakan kegiatan yang sedang berlangsung saat ini atau rencana masa depan yang sudah pasti.
•	Struktur Kalimat:
Subject + am/is/are + verb-ing + (object)
	Contoh:
•	She is reading a book now.
•	I am meeting my friend at 5 p.m.`
    },{
      subtitle: "Past Continous Tenses",
      content: `2. Past Continuous Tense
•	Fungsi: Menyatakan kegiatan yang sedang berlangsung di waktu tertentu di masa lalu, atau kegiatan yang terganggu oleh kejadian lain.
•	Struktur Kalimat:
Subject + was/were + verb-ing + (object)
	Contoh:
•	They were playing football yesterday afternoon.
•	I was cooking when the phone rang.`
    },{
      subtitle: "Future Continous Tenses",
      content: `3. Future Continuous Tense
•	Fungsi: Menyatakan kegiatan yang akan sedang berlangsung pada waktu tertentu di masa depan.
•	Struktur Kalimat:
Subject + will be + verb-ing + (object)
	Contoh:
•	She will be traveling at this time tomorrow.
•	We will be studying for exams next week.`
    },{
      subtitle: "Verb-ing",
      content: `4. Bentuk Verb + -ing (Present Participle)
•	Tambahkan -ing ke kata kerja dasar.
	Contoh: play → playing, read → reading, eat → eating
•	Catatan pengecualian: jika kata kerja berakhiran huruf konsonan-vokal-konsonan, konsonan terakhir digandakan sebelum ditambah -ing (run → running, sit → sitting).`
    },{
      subtitle: "Contoh Percakapan Singkat",
      content: `5. Contoh Percakapan Singkat Menggunakan Simple Continuous
A: What are you doing now?
B: I am studying English.\n
A: Was she working yesterday at 3 p.m.?
B: Yes, she was working on her project.\n
A: Will you be coming to the party tomorrow?
B: Yes, I will be coming after work.

Catatan Penting
•	Simple Continuous menjabarkan aktivitas yang sedang berlangsung pada waktu tertentu.
•	Dalam pertanyaan dan kalimat negatif, gunakan auxiliary verbs sesuai tense + not (bentuk contracted bisa dipakai, contoh: isn’t, aren’t, wasn’t, weren’t, won’t be).
•	Berbeda dengan Present Simple yang menyatakan kebiasaan, Present Continuous menyatakan aktivitas yang sedang berlangsung.
•	Latih penggunaan dengan kegiatan sehari-hari dan mendeskripsikan keadaan.
`
    },{
      subtitle: "Self Practice",
      content: `Buat catatan dan lengkapi kalimat berikut dengan bentuk Simple Continuous Tense yang tepat dari kata kerja dalam yang ditentukan.  
1.	She __________ (read) a book right now.
2.	We __________ (watch) TV when the phone rang yesterday.
3.	Tomorrow at 7 p.m., I __________ (have) dinner with my family.
4.	They __________ (play) football now.
5.	He __________ (not/sleep) when I came home last night.
6.	__________ you __________ (study) for the exam this evening?
7.	At 9 a.m. yesterday, she __________ (drive) to work.
8.	I __________ (work) on a project next week at this time.
9.	The children __________ (not/listen) to the teacher right now.
10.	What __________ you __________ (do) tomorrow at 3 p.m.?
`
    }
        ]
    },
    {
      courseId: 'module-basic',
      levelId: 'intermediate',
      title: 'Perfect Tenses (Present, Past, Future)',
      pages: [
          {
              subtitle: "Perfect Tenses (Present, Past, Future)",
              content: `
Perfect tense digunakan untuk menyatakan hubungan waktu yang spesifik antara dua peristiwa. 
Biasanya hasil atau kejadian yang sudah selesai berkaitan dengan waktu sekarang, masa lalu, atau masa depan.

Pada Materi ini kita akan belajar tentang: 
1. Present Perfect Tense 
2. Past Perfect Tense 
3. Future Perfect Tense \n Lanjut yuk!
          `},
          {
              subtitle: "Present Perfect Tense",
              content: `
1. Present Perfect Tense
•	Fungsi: Menyatakan kejadian yang sudah selesai dengan hasil yang masih relevan di masa sekarang, atau pengalaman yang pernah dialami.
•	Struktur Kalimat:
Subject + has/have + past participle (verb 3) + (object)
	Contoh:
•	She has visited Bali several times.
•	I have finished my homework.

          `},{
            subtitle: "Past Perfect Tense",
            content: `
2. Past Perfect Tense
•	Fungsi: Menyatakan suatu kejadian yang sudah selesai sebelum kejadian lain di masa lalu.
•	Struktur Kalimat:
Subject + had + past participle (verb 3) + (object)
	Contoh:
•	They had left before we arrived.
•	He had studied English before moving abroad.
        `},
          {
            subtitle: "Future Perfect Tense",
            content: `
3. Future Perfect Tense
•	Fungsi: Menyatakan suatu kejadian yang sudah atau akan selesai pada waktu tertentu di masa depan.
•	Struktur Kalimat:
Subject + will have + past participle (verb 3) + (object)
	Contoh:
•	By next year, I will have graduated.
•	She will have finished the project by Friday.
        `},
          {
            subtitle: "Auxiliary Verb Perfect Tenses",
            content: `
4. Auxiliary Verb (Helping Verb) dalam Perfect Tenses
•	Present Perfect menggunakan has (untuk he, she, it) dan have (untuk I, you, we, they).
•	Past Perfect selalu menggunakan had.
•	Future Perfect menggunakan will have.
•	Setelah auxiliary verb, kata kerja selalu dalam bentuk past participle (verb 3).
        `},
          {
            subtitle: "Situasi tertentu untuk Perfect Tenses",
            content: `
5. Contoh Kalimat dalam Situasi Tertentu
        `,tableHtml: `<style>
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
        th { background-color: hsl(var(--secondary)); font-weight: bold; }
        </style>
        <table>
        <thead>
          <tr>
            <th>Tenses</th>
            <th>Contoh kalimat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Present Perfect</td>
            <td>I have lived in Jakarta for five years. (sampai sekarang)</td>
          </tr>
          <tr>
            <td>Past Perfect</td>
            <td>She had left before the meeting started. (sebelum kejadian masa lalu lain)</td>
          </tr>
          <tr>
            <td>Future Perfect</td>
            <td>By 2026, they will have built the new school. (di masa depan sebelum waktu tertentu)</td>
          </tr>`
        },{
          subtitle: "Contoh Percakapan Perfect Tenses",
          content: `
6. Contoh Percakapan Sederhana Menggunakan Perfect Tenses
A: Have you ever visited Japan?
B: Yes, I have visited Tokyo twice.\n
A: Had they finished the report before the deadline?
B: Yes, they had completed it on time.\n
A: Will you have finished your project by next week?
B: Yes, I will have finished it by then.

 Catatan Penting
•	Perfect tenses menyatakan hasil atau waktu yang sudah selesai dengan hubungan ke waktu lain (sekarang, masa lalu, masa depan).
•	Selalu gunakan past participle (verb 3) setelah auxiliary verb.
•	Hafalkan past participle dari irregular verbs yang umum digunakan.
•	Perhatikan perbedaan penggunaan has/have pada Present Perfect sesuai subjek.

      `},
        {
          subtitle: "Self Practice",
          content: `
Buat catatan dan lengkapi kalimat berikut dengan bentuk Perfect Tense yang tepat dengan kata kerja yang diberikan.

1.	She __________ (finish) her homework before dinner yesterday.
2.	I __________ (visit) London three times so far.
3.	By next month, they __________ (complete) the new building.
4.	We __________ (not/see) that movie yet.
5.	He __________ (already/eat) when I arrived.
6.	Will you __________ (finish) the report by tomorrow?
7.	They __________ (live) in this city since 2015.
8.	She __________ (not/receive) the package before she moved.
9.	By the time you come, I __________ (prepare) everything.
10.	Have you ever __________ (meet) a famous person?     `
         },{
          subtitle: "Perfect Continous Tenses",
          content: `Tadi kita udah belajar Simple Perfect Tenses, Next kita pelajarin Perfect Continous\n
          SEMANGAT!
      `},{
          subtitle: "Present Perfect Continous Tense ",
          content: `Present Perfect Continuous Tense digunakan untuk menyatakan suatu kegiatan atau kejadian yang telah dimulai di masa lalu, berlangsung terus sampai sekarang,
          biasanya menyatakan durasi atau lamanya kegiatan tersebut.
          \n1.	Struktur Kalimat Present Perfect Continuous	
Kalimat Positif
Subject + have/has + been + verb-ing + (object)
Contoh:
•	She has been studying English for three hours.
•	They have been working on the project since morning.
Kalimat Negatif
Subject + have/has + not + been + verb-ing + (object)
Contoh:
•	I have not been sleeping well lately.
•	He hasn’t been feeling well these days.
Kalimat Tanya
Have/Has + subject + been + verb-ing + (object)?
Contoh:
•	Have you been waiting long?
•	Has she been practicing the piano?

      `},{
          subtitle: "Present Perfect Continous Tense ",
          content: `2. Penjelasan Kata Kunci
•	have/has:
•	have untuk subjek I, you, we, they.
•	has untuk subjek he, she, it.
•	been: bentuk past participle dari be, selalu digunakan dalam tense ini setelah have/has.
•	verb-ing: bentuk present participle, menyatakan kegiatan yang sedang berlangsung atau berkelanjutan.
      `},{
        subtitle: "Present Perfect Continous Tense",
        content: `
3. Perbedaan Present Perfect dan Present Perfect Continuous
    `,tableHtml: `<style>
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
    th { background-color: hsl(var(--secondary)); font-weight: bold; }
    </style>
    <table>
    <thead>
      <tr>
        <th>Present Perfect</th>
        <th>Present Perfect Continuous</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Menyatakan hasil atau fakta</td>
        <td>Menyatakan durasi atau proses yang berlangsung.</td>
      </tr>
      <tr>
        <td>Contoh: I have read the book. </td>
        <td>Contoh: I have been reading the book for 2 hours.</td>
      </tr>`
    },{
      subtitle: "Present Perfect Continous Tense",
      content: `4. Percakapan Singkat Menggunakan Present Perfect Continuous
A: How long have you been working here?
B: I have been working here for five years.\n
A: Has she been feeling better lately?
B: Yes, she has been feeling much better these days.\n
Catatan Penting
•	Present Perfect Continuous sering dipakai untuk aktivitas yang baru saja selesai dengan hasil yang jelas terlihat.
•	Tense ini cocok untuk menjawab pertanyaan “How long…?”
•	Perhatikan penggunaan have/has sesuai dengan subjek kalimat.
`},{
      subtitle: "Past Perfect Continous Tense",
      content: `Next kita akan belajar Past Perfect Continous Tense YUK!\n
      digunakan untuk menyatakan suatu kegiatan atau kejadian yang telah berlangsung selama waktu tertentu sebelum kejadian lain terjadi di masa lalu.
      Tense ini menyatakan durasi atau lamanya aktivitas tersebut sebelum titik waktu di masa lalu.`
    },
    {
      subtitle: "Past Perfect Continous Tense ",
      content: `
1. Struktur Kalimat Past Perfect Continuous
Kalimat Positif
Subject + had + been + verb-ing + (object)
Contoh:
•	She had been studying for three hours before dinner.
•	They had been working on the project all morning.
Kalimat Negatif
Subject + had + not + been + verb-ing + (object)
Contoh:
•	I had not been sleeping well before the trip.
•	He hadn’t been feeling well that week.
Kalimat Tanya
Had + subject + been + verb-ing + (object)?
Contoh:
•	Had you been waiting long before I arrived?
•	Had she been practicing before the concert?
      `
    },
    {
      subtitle: "Past Perfect Continous Tense ",
      content: `2. Penjelasan Kata Kunci
•	had: auxiliary verb untuk semua subjek dalam Past Perfect Continuous.
•	been: past participle dari be, selalu digunakan setelah had.
•	verb-ing: bentuk present participle, menunjukkan aktivitas yang sedang berlangsung dalam rentang waktu tertentu sebelum kejadian lain di masa lalu.
      `
    },
    {
      subtitle: "Past Perfect Continous Tense ",
      content: `3. Perbedaan Past Perfect dan Past Perfect Continuous
    `,tableHtml: `<style>
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
    th { background-color: hsl(var(--secondary)); font-weight: bold; }
    </style>
    <table>
    <thead>
      <tr>
        <th>Past Perfect</th>
        <th>Past Perfect Continuous</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Menyatakan suatu aksi yang sudah selesai sebelum aksi lain di masa lalu.</td>
        <td>Menyatakan durasi suatu aksi yang sedang berlangsung sebelum aksi lain di masa lalu.</td>
      </tr>
      <tr>
        <td>Contoh: She had finished her work. </td>
        <td>Contoh: She had been working for two hours before she finished.</td>
      </tr>`
    },
    {
      subtitle: "Past Perfect Continous Tense ",
      content: `4. Percakapan Singkat Menggunakan Past Perfect Continuous
A: Had you been working for long before you took a break?
B: Yes, I had been working for three hours before I rested.\n
A: Had she been feeling tired before the meeting?
B: Yes, she had been feeling very tired all morning.\n
 Catatan Penting
•	Past Perfect Continuous sangat berguna untuk menyatakan lamanya suatu aktivitas sebelum kejadian masa lalu lain terjadi.
•	Bentuk semua subjek memakai had + been + verb-ing.
•	Tense ini sering digunakan bersama kata keterangan durasi seperti for, since, dan before.
`
    },
    {
      subtitle: "Past Perfect Continous Tense ",
      content: `Kita udah belajar Past Perfect Continous, Next kita pelajarin Future Perfect Continous YUK!\n
      Digunakan untuk menyatakan suatu kegiatan atau aksi yang akan sedang berlangsung selama periode waktu tertentu di masa depan. 
      Tense ini Menyatakan durasi suatu aktivitas yang akan sedang berlangsung sampai waktu tertentu di masa depan.
`
    },
    {
      subtitle: "Past Perfect Continous Tense ",
      content: `
1. Struktur Kalimat Future Perfect Continuous
Kalimat Positif
Subject + will have been + verb-ing + (object)
Contoh:
•	She will have been studying for two hours by 7 p.m.
•	They will have been working here for five years next month.
Kalimat Negatif
Subject + will not have been (won’t have been) + verb-ing + (object)
Contoh:
•	I won’t have been sleeping long by the time you arrive.
•	He will not have been working on the project for a full day.
Kalimat Tanya
Will + subject + have been + verb-ing + (object)?
Contoh:
•	Will you have been waiting for more than an hour?
•	Will she have been practicing for long before the concert?
`
    },
    {
      subtitle: "Past Perfect Continous Tense ",
      content: `
2. Penjelasan Kata Kunci
•	will have been: auxiliary verbs untuk semua subjek yang menunjukkan tense future perfect continuous.
•	verb-ing: bentuk present participle yang menyatakan kegiatan yang sedang berlangsung.
`
    },
    {
      subtitle: "Past Perfect Continous Tense ",
      content: `3. Perbedaan Future Perfect dan Future Perfect Continuous
`,tableHtml: `<style>
table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
th { background-color: hsl(var(--secondary)); font-weight: bold; }
</style>
<table>
<thead>
  <tr>
    <th>Future Perfect</th>
    <th>Future Perfect Continuous</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Menyatakan bahwa suatu aksi sudah selesai pada waktu tertentu di masa depan.</td>
    <td>Menyatakan durasi dan berlangsungnya suatu aksi hingga waktu tertentu di masa depan.</td>
  </tr>
  <tr>
    <td>Contoh: I will have finished my work by 5 p.m. </td>
    <td>Contoh: I will have been working for three hours by 5 p.m.</td>
  </tr>`
    },
    {
      subtitle: "Past Perfect Continous Tense ",
      content: `
4. Percakapan Singkat Menggunakan Future Perfect Continuous
A: Will you have been working here for five years next month?
B: Yes, I will have been working here for five years by then.\n
A: Will she have been practicing the piano for long before the recital?
B: Yes, she will have been practicing for several hours.\n
Catatan Penting
•	Future Perfect Continuous sering menjawab pertanyaan “How long…” untuk masa depan.
•	Selalu gunakan will have been + verb-ing untuk semua subjek.
•	Tense ini cocok untuk menggambarkan durasi aktivitas yang akan berjalan sampai titik waktu di masa depan.
`
    },
    {
      subtitle: "Self Practice ",
      content: `Buat catatan dan Lengkapi kalimat berikut dengan bentuk Future Perfect Continuous Tense yang tepat dari kata kerja dalam kurung, dan perhatikan penggunaan kata keterangan waktu dan konteks kalimat.

1.	By the time the conference starts, the speakers __________ (prepare) their presentations for over a week.
2.	In two months, she __________ (manage) the project team for exactly three years.
3.	By the end of this semester, the students __________ (conduct) their research for nearly six months.
4.	At 10 a.m. tomorrow, I __________ (work) on the new software update for eight hours straight.
5.	When you return from your trip, we __________ (renovate) the office for more than a month.
6.	By the time the CEO arrives, the staff __________ (discuss) the merger terms for several hours.
7.	Next year, they __________ (expand) their business operations internationally for a decade.
8.	By the time the project deadline comes, the engineers __________ (test) the system components continuously for weeks.
9.	Will you __________ (prepare) the financial report for the board meeting for over a week by Tuesday?
10.	The athletes __________ (train) for the championship for six months by the time it begins.

`
    },
          ]
        },
        {
          courseId: 'module-basic',
          levelId: 'advanced',
          title: 'Active-Passive voice & English Comprehension',
          pages: [
            {
              subtitle: "Active-Passive Voice ",
              content: `Pada bagian ini kita akan belajar tentang Active dan Passive voice\nSEMANGAT!
        `
            },
            {
              subtitle: "Active-Passive Voice ",
              content: `
1.Active Voice dan Passive Voice
Active Voice adalah bentuk kalimat di mana subjek melakukan suatu aksi atau kegiatan langsung pada objek.
Contoh:
•	She writes a letter.
•	The chef cooks the meal.
Passive Voice adalah bentuk kalimat di mana subjek menerima aksi atau kegiatan yang dilakukan oleh pelaku (agent). Fokus kalimat adalah pada aksi atau objek yang dikenai aksi.
Contoh:
•	A letter is written by her.
•	The meal is cooked by the chef.
        `
            },
            {
              subtitle: "Active-Passive Voice ",
              content: `2. Contoh Kalimat Tanya dan Negatif dalam Passive Voice
Tanya:
•	Is the report written by the student?
•	Was the meeting held yesterday?
Negatif:
•	The work is not (isn’t) finished yet.
•	The documents were not (weren’t) signed.

        `
            },
            {
              subtitle: "Active-Passive Voice ",
              content: `
3. Struktur Kalimat
        `, tableHtml: `<style>
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
        th { background-color: hsl(var(--secondary)); font-weight: bold; }
        </style>
        <table>
        <thead>
          <tr>
            <th>Bentuk</th>
            <th>Struktur Active Voice</th>
            <th>Struktur Passive Voice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Present Simple</td>
            <td>Subject + verb (s/es) + object</td>
            <td>Object + am/is/are + past participle (+ by agent)</td>
          </tr>
          <tr>
            <td>Past Simple.</td>
            <td>Subject + verb 2 + object</td>
            <td>Object + was/were + past participle (+ by agent)</td>
          </tr>
          <tr>
            <td>Present Perfect</td>
            <td>Subject + has/have + past participle + object</td>
            <td>Object + has/have been + past participle (+ by agent)</td>
          </tr>
          <tr>
            <td>Past Perfect</td>
            <td>Subject + had + past participle + object</td>
            <td>Object + had been + past participle (+ by agent)</td>
          </tr>
          <tr>
            <td>Future Simple</td>
            <td>Subject + will + base verb + object</td>
            <td>Object + will be + past participle (+ by agent)</td>
          </tr>`
            },
            {
              subtitle: "Active-Passive Voice ",
              content: `
4. Contoh Perubahan Kalimat dari Active ke Passive Voice
        `, tableHtml: `<style>
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { border: 1px solid hsl(var(--border)); padding: 0.75rem; text-align: left; }
        th { background-color: hsl(var(--secondary)); font-weight: bold; }
        </style>
        <table>
        <thead>
          <tr>
            <th>Active Voice</th>
            <th>Passive Voice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>She writes a letter.</td>
            <td>A letter is written by her.</td>
          </tr>
          <tr>
            <td>They built the house.</td>
            <td>The house was built by them.</td>
          </tr>
          <tr>
            <td>He has completed the work.</td>
            <td>The work has been completed by him.</td>
          </tr>
          <tr>
            <td>We had closed the shop.</td>
            <td>The shop had been closed by us.</td>
          </tr>
          <tr>
            <td>They will finish the project.</td>
            <td>The project will be finished by them.</td>
          </tr>`
            },
            {
              subtitle: "Active-Passive Voice ",
              content: `
5. Kapan Menggunakan Passive Voice?
•	Ketika fokusnya pada aksi atau keadaan, bukan pada pelaku aksi.
•	Ketika pelaku aksi tidak diketahui atau tidak penting untuk disebutkan.
•	Dalam laporan, berita, atau kalimat formal untuk menghindari menyebut pelaku secara langsung.\n

 Catatan Penting
•	Dalam Passive Voice, kata kerja utama selalu dalam bentuk past participle (verb 3).
•	Auxiliary verb yang digunakan sesuai dengan tense kalimat aktif.
•	Pelaku (agent) dalam kalimat pasif biasanya ditempatkan setelah kata by dan bisa dihilangkan jika tidak penting atau diketahui.
•	Tidak semua kalimat aktif dapat diubah menjadi pasif, khususnya yang menggunakan kata kerja intransitif (tanpa objek).
        `
            },
            {
              subtitle: "Self Practice",
              content: `Buat catatan dan Kerjakan soal berikut untuk berlatih!.
1.	Ubah kalimat aktif ke pasif:
The company will launch the new product next month.
2.	Tentukan active atau passive, lalu ubah ke lawan jenisnya:
The results have been analyzed by the research team.
3.	Lengkapi kalimat pasif dengan kata kerja bentuk past participle:
The documents __________ (sign) before the meeting started.
4.	Ubah kalimat pasif ke aktif:
A comprehensive report was prepared by the marketing department last week.
5.	Buat kalimat tanya pasif dari kalimat aktif:
Did the manager approve the budget?
6.	Lengkapi kalimat negatif pasif dari kalimat aktif:
They did not complete the project on time.
→ The project __________ not __________ on time.
7.	Gabungkan kalimat jadi kalimat pasif efektif:
•	Scientists discovered a new element in 2023.
•	This discovery changed the field of chemistry.
8.	Pilih dan ubah kata kerja ke passive voice:
The teacher __________ (correct) all the exams by tomorrow.
9.	Jelaskan perubahan makna jika kalimat ini berubah dari aktif ke pasif:
The committee rejected the proposal.
10.	Buat kalimat pasif Present Perfect dari kata-kata ini:
They / complete / the survey / recently.
        `
            },
            {
              subtitle: "Advanced Comperhension",
              content: `Tadi kita sudah belajar tentang Active & Passive Voice, Next kita akan mendalami lagi pemahaman kamu dalam Bahasa Inggris ya! 
        `
            },
            {
              subtitle: "Modal Verbs",
              content: `
1. Modal Verbs 
	Modal Perfect (Have + past participle): digunakan untuk mengekspresikan spekulasi, penyesalan, dan deduksi di masa lalu.
Contoh:
•	She must have forgotten the meeting. (Spekulasi kuat di masa lalu)
•	You should have told me earlier. (Penyesalan/kritik)
	Modal untuk Deduksi & Spekulasi:
•	He might have been waiting for hours.
•	They can't have finished already.
	Modal untuk Kewajiban & Larangan di Masa Lalu:
•	They ought to have finished by now.
•	You must not have taken that route.
        `
            },
            {
              subtitle: "Mixed Conditional Sentence",
              content: `
2. Mixed Conditionals 
	Mixed Conditionals: menggabungkan waktu nyata dan hipotetis untuk efek yang lebih tepat.
•	If I had studied medicine, I would be a doctor now. (Masa lalu + masa sekarang)
•	If she were more confident, she would have accepted the job. (Masa sekarang + masa lalu)
	Variasi Conditional:
•	Conditional tipe 0 sampai 3 dan variasi dengan wish untuk mengekspresikan penyesalan dan harapan berbeda.
•	Penggunaan unless, provided that, as long as sebagai pengganti if untuk variasi gaya.
        `
            },
            {
              subtitle: "Reported Speech dan Subjunctive Mood",
              content: `
3.	Reported Speech dan Subjunctive Mood 
Reported Speech: Perubahan kompleks tense dalam kalimat langsung ke tidak langsung, termasuk modal verbs dan pertanyaan ganda.
	Contoh:
•	Direct: “You must do it now,” she said.
•	Reported: She said that I had to do it immediately.
•	Subjunctive Mood: digunakan dalam kalimat formal, tuntutan, saran, dan keharusan.
Contoh:
•	It is essential that he be present at the meeting.
•	I suggest that she study more for the exam.
        `
            },
            {
              subtitle: "Relative Clauses & nomina",
              content: `
4. Relative Clauses Kompleks dan Nominalisasi
	Relative Clause: Penggunaan klausa relatif embedded (tertanam) untuk menghubungkan informasi yang kompleks, dengan atau tanpa penggunaan relative pronouns.
	Contoh:
•	The book, which was written by an acclaimed author, has won several awards.
•	People who prefer outdoors activities often have better fitness levels.
	Reduced Relative Clauses: Menghilangkan relative pronoun dan to be untuk membuat kalimat lebih ringkas.
	Contoh: 
• The man standing over there is my uncle.
	Nominalisation: Konversi kata kerja atau kata sifat menjadi noun untuk formalitas dan konsistensi.
	Contoh:
•	"Analyse" → "Analysis"
•	"Decide" → "Decision"
        `
            },
            {
              subtitle: "Comparison, Emphasis, & Inversion",
              content: `
5. Penggunaan Comparison, Emphasis, dan Inversion
	Comparison Tingkat Lanjut: Alternatif ungkapan untuk perbandingan (far, by far, much, a great deal)
	Contoh: 
• She is by far the best candidate.
	Emphasis dengan Inversion: Untuk fokus dan efek dramatis, inversi dapat digunakan.
	Contoh:
•	Never have I seen such determination.
•	Rarely does he arrive late.
	Emphatic Structures:
•	It is/was + that/who …
•	Do/does/did + base verb (untuk penegasan.)
        `
            },
            {
              subtitle: "Idioms, Collocations, dan Phrasal Verbs ",
              content: `
6. Idioms, Collocations, dan Phrasal Verbs Tingkat Lanjut
	Idioms: menguasai idiom tingkat lanjut dan ungkapan idiomatik yang sering digunakan dalam konteks formal dan informal.
Contoh:
•	To throw someone under the bus
•	To beat around the bush
Collocations: penggabungan kata yang natural dan sering digunakan.
Contoh:
•	Make a decision, take a risk, deliver a speech
•	Phrasal Verbs: termasuk phrasal verbs yang lebih kompleks dan situasional.
Contoh:
•	To call off, to set up, to carry out
        `
            },
            {
              subtitle: "Argumentative and Discursive Writing ",
              content: `
7. Argumentative and Discursive Writing
	Struktur Teks Argumentatif:
•	Introduction dengan tesis jelas.
•	Body paragraphs dengan argumen kuat dan bukti valid.
•	Counter-arguments dan refutations sebagai strategi retoris.
•	Conclusion yang menyimpulkan dan mempertegas opini.
	Bahasa Persuasif:
•	Penggunaan modal verbs untuk hedging (might, could, may).
•	Bahasa formal dan kompleks dengan kalimat majemuk dan kompleks.
	Contoh Kalimat:
•	It could be argued that...
•	There is substantial evidence to suggest...
•	Despite some claims, it is clear that...
        `
            },
            {
              subtitle: "Self Practice ",
              content: `Buatlah catatan dan berikan jawaban sesuai yang diminta soal untuk kamu berlatih!\n
1. Ubah kalimat ini menjadi modal perfect untuk deduksi masa lalu:
"He left the office early."

2. Buat kalimat mixed conditional dari ide ini:
"I didn’t attend the workshop" dan "I am less confident now."

3. Ubah kalimat berikut ke reported speech dengan subjunctive:
"It is essential that she complete the report by Friday," the manager said.

4. Gabungkan kalimat ini dengan relative clause dan nominalisation:
"The company launched a new policy."
"The policy aims to improve workplace safety."

5. Ubah kalimat berikut dengan inversion untuk penekanan:
"I have rarely seen such dedication in an employee."

6. Jelaskan arti idiom “throw someone under the bus” dan buat kalimat contoh.

7. Tulis paragraf singkat (50-70 kata) pakai bahasa persuasif dan hedging tentang pro dan kontra teknologi AI di pendidikan.

8. Buat kalimat dengan modal verbs menunjukkan kewajiban masa lalu yang tak terpenuhi:
"You / submit / the assignment / yesterday."

9. Lengkapi kalimat conditional kompleks:
"If she __________ (know) about the risks earlier, she __________ (make) a different decision."

10. Ubah kalimat berikut jadi reported speech dengan perubahan modal:
"You must finish the project by Monday," the director said.

11. Ubah kalimat aktif menjadi formal dengan nominalisation:
"The government decided to increase taxes."

12. Buat kalimat kompleks dengan phrasal verb "carry out" dalam konteks riset ilmiah.
        `
            },
          ]
        },
];


export const LESSONS_CONTENT: LessonContent[] = [
  {
    courseId: 'daily-conversation',
    levelId: 'beginner',
    title: 'Latihan: Salam & Perkenalan',
    quiz: [
      {
        question: "Pada bagian ini kita akan berlatih melakukan ucapan salam dan perkenalan.\nUcapan salam yang umum untuk orang baru bertemu adalah 'Hello' atau 'Hi!'\nPada situasi tertentu kamu mungkin saja memerlukan kosakata yang lain. \nContoh 1:\n'A : Hello, How's the weather?'\nB : It's nice! \nContoh 2:\n A: Good day sir!\nB :Good day to you as well!\nSekarang pilih jawaban yang tepat!\nSiska : {blank}, mom.\nMrs. Sita : You too, Sweet heart.",
        options: [
          "Good bye",
          "Good night",
          "Good morning",
        ],
        correctAnswer: 'Good morning',
      },
      {
        question: "Andy: Hello Rudi, nice to meet you!\nRudi: {blank}, Andy!",
        options: [
          "What's your name?",
          'Good bye',
          'Nice to meet you too',
        ],
        correctAnswer: 'Nice to meet you too',
      },
      {
        question: "Sarah: Good morning, sir.\nMr. Budi: Good morning, Sarah. {blank}?",
        options: [
            'My name is Sarah',
            'How are you?',
            'I am fine',
        ],
        correctAnswer: 'How are you?',
      },
      {
        question: "Risa: I'm Risa, {blank}\nAlex: My name is Alex.",
        options: [
            'Nice to meet you.',
            'How are you?',
            "What's your name?",
        ],
        correctAnswer: "What's your name?",
      },
       {
        question: "A common way to say goodbye at the end of the day is: '{blank}'",
        options: [
            'Hello!',
            'Good night!',
            "What's up?",
        ],
        correctAnswer: "Good night!",
      },
      {
        question: "Someone asks you 'How are you?'. A positive response is: '{blank}'",
        options: [
            "I am sad.",
            "I'm fine, thank you.",
            "My name is John.",
        ],
        correctAnswer: "I'm fine, thank you.",
      },
      {
        question: "You want to know where someone is from. You ask: '{blank}'",
        options: [
            "How old are you?",
            "What do you do?",
            "Where are you from?",
        ],
        correctAnswer: "Where are you from?",
      },
    ],
  },
  {
    courseId: 'daily-conversation',
    levelId: 'intermediate',
    title: 'Latihan: Percakapan di Tempat Umum',
    quiz: [
      {
        question: "You want to get someone's attention politely. You say: '{blank}'",
        options: [
          'Hey you!',
          'Excuse me',
          'What is this?',
        ],
        correctAnswer: 'Excuse me',
      },
      {
        question: "You want to ask for the price of an item. You say: '{blank}'",
        options: [
            'How much is this?',
            'Where is the toilet?',
            'Can you help me?',
        ],
        correctAnswer: 'How much is this?',
      },
      {
        question: "Shopkeeper: It’s $20.\nYou: {blank}",
        options: [
            'Okay. Thank you!',
            "I'll take it.",
            'I need to go to the washroom.',
        ],
        correctAnswer: "I'll take it.",
      },
      {
        question: "You are in a restaurant and you are ready to order. You tell the waiter: '{blank}'",
        options: [
            "I want food.",
            "Can I have the bill?",
            "I'm ready to order now.",
        ],
        correctAnswer: "I'm ready to order now.",
      },
      {
        question: "You need to ask for directions to the nearest bank. You say: '{blank}'",
        options: [
            "Where is the bank?",
            "Is there a bank here?",
            "Excuse me, could you tell me how to get to the nearest bank?",
        ],
        correctAnswer: "Excuse me, could you tell me how to get to the nearest bank?",
      },
      {
        question: "Someone asks you for the time. You say: 'It's {blank}'",
        options: [
            "ten o'clock half",
            "half past ten",
            "thirty minutes ten",
        ],
        correctAnswer: "half past ten",
      },
      {
        question: "You are at a ticket counter. You say: 'One ticket to London, {blank}.'",
        options: [
            "now",
            "please",
            "give me",
        ],
        correctAnswer: "please",
      },
    ],
  },
  {
    courseId: 'daily-conversation',
    levelId: 'advanced',
    title: 'Latihan: Situasi Tak Terduga',
    quiz: [
      {
        question: "You accidentally bump into someone. What's the best thing to say?\nStranger: Ouch! Watch where you're going!\nYou: {blank}",
        options: [
          "It wasn't my fault.",
          "I'm so sorry, are you okay?",
          "You should watch out.",
        ],
        correctAnswer: "I'm so sorry, are you okay?",
      },
      {
        question: "You realize you've been given the wrong change at a store. You say to the cashier: '{blank}'",
        options: [
          'You gave me the wrong money!',
          'Excuse me, I think there might be a mistake with the change.',
          'I want more money.',
        ],
        correctAnswer: 'Excuse me, I think there might be a mistake with the change.',
      },
      {
        question: "Your friend seems upset. How do you ask what's wrong?\nYou: You seem a bit down. {blank}",
        options: [
            "What's your problem?",
            "Why are you sad?",
            "Is everything alright?",
        ],
        correctAnswer: "Is everything alright?",
      },
       {
        question: "You are late for a meeting. What do you say upon arriving?\nYou: {blank} I got held up in traffic.",
        options: [
            "Sorry for being late,",
            "I am here now.",
            "The traffic was terrible.",
        ],
        correctAnswer: "Sorry for being late,",
      },
      {
        question: "A colleague compliments your presentation. What's a humble but appreciative response?\nColleague: That was a fantastic presentation, great job!\nYou: {blank}",
        options: [
            "Thanks, it was nothing.",
            "Thank you, I'm glad you enjoyed it.",
            "I know, right?",
        ],
        correctAnswer: "Thank you, I'm glad you enjoyed it.",
      },
      {
        question: "You're in a quiet library and your phone rings loudly. What's the immediate action and phrase?\nYou: {blank}",
        options: [
            "Answer it and whisper.",
            "Immediately silence it and whisper, 'My apologies.'",
            "Ignore it and let it ring.",
        ],
        correctAnswer: "Immediately silence it and whisper, 'My apologies.'",
      },
      {
        question: "Someone asks for your opinion on a movie you disliked, but they loved it. How do you respond diplomatically?\nFriend: I loved that movie! What did you think?\nYou: {blank}",
        options: [
            "I thought it was terrible.",
            "It wasn't really my cup of tea, but I can see why you liked it.",
            "Your taste in movies is strange.",
        ],
        correctAnswer: "It wasn't really my cup of tea, but I can see why you liked it.",
      },
      {
        question: "You don't understand a word someone just used. You say: '{blank}'",
        options: [
            "What?",
            "Speak clearly.",
            "Sorry, could you explain what '{word}' means?",
        ],
        correctAnswer: "Sorry, could you explain what '{word}' means?",
      },
      {
        question: "You need to politely interrupt a conversation. You should start by saying: '{blank}'",
        options: [
            "I need to talk.",
            "Excuse me for interrupting, but...",
            "Can I jump in here?",
        ],
        correctAnswer: "Excuse me for interrupting, but...",
      },
      {
        question: "You've received a gift you don't like. How do you respond politely?\n'Thank you so much! This is very {blank}.'",
        options: [
          "interesting",
          "thoughtful",
          "unique",
        ],
        correctAnswer: "thoughtful",
      },
    ],
  },
  {
    courseId: 'grammar',
    levelId: 'beginner',
    title: 'Latihan: Tenses Dasar',
    quiz: [
      {
        question: "This sentence describes an action that happened in the past.\nI {blank} breakfast at 7 a.m. this morning.",
        options: [
          "eat",
          "ate",
          "eaten",
        ],
        correctAnswer: "ate",
      },
      {
        question: "This sentence describes a plan for the future.\nWe {blank} to the park tomorrow.",
        options: [
          "go",
          "went",
          "are going",
        ],
        correctAnswer: "are going",
      },
      {
        question: "This sentence describes something happening right now.\nLook! Toni {blank} for the bus.",
        options: [
            "waits",
            "is waiting",
            "waited",
        ],
        correctAnswer: "is waiting",
      },
       {
        question: "This sentence describes a completed action in the past.\nSiska {blank} by the news last night.",
        options: [
            "was shocked",
            "is shocked",
            "will be shocked",
        ],
        correctAnswer: "was shocked",
      },
    ],
  },
  {
    courseId: 'grammar',
    levelId: 'intermediate',
    title: 'Latihan: There is/are & Preposisi',
    quiz: [
      {
        question: "There {blank} a beautiful park near my house.",
        options: [
          "is",
          "are",
          "am",
        ],
        correctAnswer: "is",
      },
      {
        question: "Look! There {blank} two birds on that tree.",
        options: [
          "is",
          "are",
          "were",
        ],
        correctAnswer: "are",
      },
      {
        question: "My keys are {blank} the kitchen counter.",
        options: [
            "on",
            "in",
            "at",
        ],
        correctAnswer: "on",
      },
       {
        question: "He keeps his old photos {blank} a wooden box.",
        options: [
            "in",
            "on",
            "under",
        ],
        correctAnswer: "in",
      },
      {
        question: "Excuse me, {blank} any good restaurants around here?",
        options: [
            "is there",
            "are there",
            "there is",
        ],
        correctAnswer: "are there",
      },
      {
        question: "The cat is hiding {blank} the bed.",
        options: [
            "on",
            "in",
            "under",
        ],
        correctAnswer: "under",
      },
      {
        question: "I'm sorry, {blank} any milk left in the fridge.",
        options: [
            "there isn't",
            "there aren't",
            "is there",
        ],
        correctAnswer: "there isn't",
      },
    ],
  },
  {
    courseId: 'grammar',
    levelId: 'advanced',
    title: 'Latihan: Kalimat Kompleks & Lanjutan',
    quiz: [
      {
        question: "Complete the sentence: {blank} it was raining heavily, we still decided to go for our hike.",
        options: [
          "Because",
          "Although",
          "Therefore",
        ],
        correctAnswer: "Although",
      },
      {
        question: "Choose the correct passive voice form: The new novel {blank} by the author next year.",
        options: [
          "will write",
          "is written",
          "will be written",
        ],
        correctAnswer: "will be written",
      },
      {
        question: "Complete the conditional sentence: If I had known you were coming, I {blank} a cake.",
        options: [
          "would bake",
          "will bake",
          "would have baked",
        ],
        correctAnswer: "would have baked",
      },
       {
        question: "He was late for the meeting {blank} he missed the bus.",
        options: [
            "although",
            "because",
            "while",
        ],
        correctAnswer: "because",
      },
       {
        question: "This beautiful song {blank} by a famous artist in 1980.",
        options: [
            "was written",
            "wrote",
            "is writing",
        ],
        correctAnswer: "was written",
      },
       {
        question: "If I {blank} you, I would take that job offer.",
        options: [
            "was",
            "am",
            "were",
        ],
        correctAnswer: "were",
      },
      {
        question: "The project will be canceled {blank} we secure more funding.",
        options: [
          "if",
          "unless",
          "because",
        ],
        correctAnswer: "unless",
      },
      {
        question: "My wallet, {blank} I left on the table, has disappeared.",
        options: [
          "that",
          "who",
          "which",
        ],
        correctAnswer: "which",
      },
      {
        question: "Not only {blank} the exam, but she also got the highest score.",
        options: [
          "she passed",
          "did she pass",
          "she did pass",
        ],
        correctAnswer: "did she pass",
      },
      {
        question: "Never before {blank} such a beautiful sunset.",
        options: [
          "I have seen",
          "I saw",
          "have I seen",
        ],
        correctAnswer: "have I seen",
      },
    ],
  },
  {
    courseId: 'vocabulary',
    levelId: 'beginner',
    title: 'Latihan: Kosakata Umum',
    quiz: [
      {
        question: "A sweet, red fruit that grows on trees is called an {blank}.",
        options: ["Apple", "Banana", "Orange"],
        correctAnswer: "Apple",
      },
      {
        question: "The action of moving quickly on your feet is to {blank}.",
        options: ["Sit", "Eat", "Run"],
        correctAnswer: "Run",
      },
      {
        question: "The color of the sky on a clear day is {blank}.",
        options: ["Green", "Blue", "Red"],
        correctAnswer: "Blue",
      },
      {
        question: "A domestic animal that says 'meow' is a {blank}.",
        options: ["Dog", "Bird", "Cat"],
        correctAnswer: "Cat",
      },
    ],
  },
  {
    courseId: 'vocabulary',
    levelId: 'intermediate',
    title: 'Latihan: Kosakata Akademik',
    quiz: [
      {
        question: "Choose the word that means: to give information or make something clear {blank}.",
        options: ["Analyze", "Explain", "Conclude"],
        correctAnswer: "Explain",
      },
      {
        question: "Select the best synonym for the word 'Significant' in an academic context {blank}.",
        options: ["Trivial", "Important", "Optional"],
        correctAnswer: "Important",
      },
      {
        question: "Which word best fit here? \n 'The Scientist will {blank} a series of experiment next week'",
        options: ["Guess", "Conduct", "Refuse"],
        correctAnswer: "Conduct",
      },
      {
        question: "The word that means 'the final part of result of something.' is {blank} ",
        options: ["Intro", "Method", "Conclusion"],
        correctAnswer: "Conclusion",
      },
      {
        question: "The word that means 'to carefully examine something in detail.' is {blank} ",
        options: ["Interrupt", "Ignore", "Evaluate"],
        correctAnswer: "Evaluate",
      },
      {
        question: "The academic term that refers to 'a brief summary of a research paper or article.' is {blank} ",
        options: ["Appendix", "Abstract", "Hypothesis"],
        correctAnswer: "Abstract",
      },
      {
        question: "Chose the word which means 'a proposed explanation made on the basis of limited evidence.'{blank} ",
        options: ["Fact", "Theory", "Hypothesis"],
        correctAnswer: "Hypothesis",
      },
    ],
  },
  {
    courseId: 'vocabulary',
    levelId: 'advanced',
    title: 'Latihan: Kosakata Arkais',
    quiz: [
      {
        question: "The beauty of the cherry blossoms is {blank}; it lasts only for a few weeks each spring.",
        options: ["Eternal", "Ephemeral", "Enduring"],
        correctAnswer: "Ephemeral",
      },
      {
        question: "In today's world, smartphones have become {blank}, found in the hands of people almost everywhere.",
        options: ["Scarce", "Ubiquitous", "Optional"],
        correctAnswer: "Ubiquitous",
      },
      {
        question: "The watchmaker was known for his {blank} attention to detail, ensuring every gear was perfectly placed.",
        options: ["Careless", "Hasty", "Meticulous"],
        correctAnswer: "Meticulous",
      },
      {
        question: "Finding a rare book in that old shop was a moment of pure {blank}.",
        options: ["Serendipity", "Catastrophe", "Planning"],
        correctAnswer: "Serendipity",
      },
      {
        question: "The poet described the sunset over the ocean as a truly {blank} sight.",
        options: ["Ugly", "Mundane", "Pulchritudinous"],
        correctAnswer: "Pulchritudinous",
      },
      {
        question: "His speech was full of {blank}, making it difficult for the audience to follow his argument.",
        options: ["Clarity", "Simplicity", "Obfuscation"],
        correctAnswer: "Obfuscation",
      },
      {
        question: "The old man was a {blank} figure in the village, always complaining and hard to please.",
        options: ["Jovial", "Friendly", "Cantankerous"],
        correctAnswer: "Cantankerous",
      },
      {
        question: "She had a {blank} for expensive shoes, owning over a hundred pairs.",
        options: ["Dislike", "Aversion", "Penchant"],
        correctAnswer: "Penchant",
      },
      {
        question: "The politician's speech was dismissed as mere {blank}, lacking any real substance.",
        options: ["Wisdom", "Veracity", "Bombast"],
        correctAnswer: "Bombast",
      },
      {
        question: "After the long hike, he felt completely {blank} and needed to rest.",
        options: ["Energized", "Enervated", "Excited"],
        correctAnswer: "Enervated",
      },
    ],
  },
];

