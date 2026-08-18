const { Telegraf } = require('telegraf');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const bot = new Telegraf(process.env.BOT_TOKEN);
const JSON_FILE = path.join(__dirname, 'hashtags.json');

function loadHashtags() {
  if (!fs.existsSync(JSON_FILE)) return [];
  const data = fs.readFileSync(JSON_FILE, 'utf8');
  return JSON.parse(data);
}

function saveHashtags(hashtags) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(hashtags, null, 2), 'utf8');
}

// Database Hashtag
const responses = {
  '#cancelwddone': 'proses pembatalan withdraw telah selesai kak, dan saldo sudah kami kembalikan ke dompet utama ya kakak. Silakan dicek kembali kak^^',
  
  '#ajukanulangwd': 'withdraw kakak sudah kami cancel ya, silakan ajukan ulang withdrawnya kak :)',
  
  '#reklimit': 'Mohon maaf atas kendala yang terjadi ya kak, kami tidak dapat memproses withdraw ke nomor rekening kakak yang terdaftar dikarenakan rekening kakak terindikasi mengalami limit bulanan ya kak',

  '#rekinvalid': `withdraw kakak tidak dapat kami proses karena data rekening terdaftarnya itu INVALID/SALAH/SUDAH TIDAK AKTIF ya kak. Silakan dicek data rekeningya di bagian Detail Bank kak.
  
  Letak "Detail Bank" ada di sini ya kak: https://prnt.sc/yCEvPr5tNW2p`,

  '#depobedabank': 'bisa ya kak, silahkan transfer sesuai nominal yang tertera pada form deposit ^^ ',

  '#depomasihproses': 'untuk bukti transfer yang masih dalam keterangan "Pembayaran Diproses / Transaksi sedang diproses / Pembayaran Tertunda" mohon ditunggu dan dicek secara berkala pada M-Banking/Ewallet yang kakak gunakan hingga transaksi tersebut berhasil ya kak',

  '#depotanpabukti': 'baik kakak, silakan ditunggu saja saldonya hingga masuk ke akun, jika kakak tidak dapat mengirimkan bukti transfernya ya^^',

  '#depowd': 'Mohon maaf kakak, setelah kami cek kakak belum melakukan permainan dan langsung mengajukan withdraw, silahkan lanjut bermain ya kakak, untuk ketetapan di situs kami wajib bermain 1x TO deposit = sesuai nominal deposit Anda terlebih dahulu kak 🙂 ',

  '#bukti': 'bisa dibantu kirimkan bukti transfernya kak? ^^  ',

  '#buktidetail': 'dibantu kirimkan screenshoot bukti transfernya dan perlihatkan detail transaksi nya secara full yang menunjukkan waktu, tanggal, status transaksi, dan RRN/REF ya kakak ^^ ',

  '#buktidetailbni': `Bukti detail BNI
-Riwayat
-Bukti transaksi
-Pilih jenis (semua atau trasnfer)
-Pilih tanggal awal hingga terakhir
-Klik selanjutnya 
lalu cari mutasi yang di tujukan ke kami ya kakak `,

  '#buktiqrisbca': `cara lihat bukti transfer via QRIS pada M-Banking BCA:

-klik icon QRIS pada M-Banking BCA
-pergi ke INBOX
-lalu cari riwayat transaksi QRIS yang kakak lakukan di website kami

silahkan dicoba dan kami tunggu bukti transfer detailnya kak ^^ `,

  '#buktiqrisbri': `Melalui Aplikasi BRImo 

-Buka aplikasi BRImo: dan lakukan login menggunakan username/password atau fingerprint. 

-Pilih menu "Aktivitas" atau "Mutasi" (tergantung versi aplikasi BRImo) untuk melihat  daftar transaksi.
 
-Pilih bukti transfer: yang ingin Anda lihat dan lakukan tangkapan layar (screenshot) untuk menyimpannya. `,

  '#buktiqrismandiri': `Berikut langkah-langkah lengkapnya:

-Buka aplikasi Livin' by Mandiri: Login dengan username dan PIN Anda. 
-Pilih "QR Terima Transfer": Anda akan menemukan fitur ini di halaman beranda aplikasi. 
-Pilih "Riwayat": Klik tombol "Riwayat" yang terletak di pojok kanan atas. 
-Pilih tab "Diterima": Ini akan menampilkan daftar semua transaksi QRIS yang Anda terima. 
-Lihat detail transaksi: Klik transaksi yang ingin Anda lihat detailnya, termasuk nominal, waktu, dan status. 
-Unduh laporan (opsional): Anda juga bisa mengunduh laporan riwayat transaksi QRIS dalam bentuk PDF untuk periode hingga 31 hari terakhir. 

ATAU DENGAN CARA BERIKUT

CARA LIHAT BUKTI TRANSFER QRIS MANDIRI:

-klik icon PESAN di bagian pojok kanan atas
-lalu klik RESI
-dan cari bukti transfer QRIS yang dilakukan di website/situs kami kak `, 

  '#cek': 'mohon ditunggu ya kaka agar dapat kami cek terlebih dahulu ya kak 🙂 ',

  '#cek2': 'baik kak, ditunggu proses pengecekannya ya kak ^^ ', 

  '#cek3': 'silakan ditunggu proses pengecekan yang sedang kami lakukan ya kak 🙂 ',

  '#cek4': 'baik kakak permintaan kakak akan kami bantu cek terlebih dahulu ya ^^ ',

  '#cekTO': 'untuk TO/TurnOver sudah terhitung otomatis oleh sistem ya kak^^ kami tidak dapat membantu mengecek TO karena tidak memiliki akses untuk hal tesebut🙏 ',

  '#unlockpromo': 'untuk TO/TurnOver sudah terhitung otomatis oleh sistem ya kak^^ kami tidak dapat membantu mengecek TO karena tidak memiliki akses untuk hal tesebut🙏 ',

  '#unlocktidakbisa': 'mohon maaf kakak, kami memang tidak memiliki akses untuk unlock promo yang kakak claim ya kakak. Karena TO/TurnOvernya sudah terhitung otomatis ya kakak, dan akan ter-unlock secara otomatis juga ya kakak ^^ ',

  '#sskendala': 'bisa dibantu untuk mengirimkan screenshot/rekam layar kendala yang kakak alami saat ini kak? ^^ ',

  '#ssrekening': 'silakan kirimkan screenshot yang menampilkan nama & nomor rekening BANK/Ewallet pada apikasi BANK/Ewallet-nya kak ', 

  '#ssriwayatpermainan': 'dibantu kirimkan screenshoot riwayat permainan/bettingannya yang ada di dalam game ya kak ',

  '#riwayatcosmo': `Cara melihat riwayat/history permainan terakhir :

Untuk Cosmo Play :

- Masuk ke dalam game yang terakhir dimainkan 

- Klik ikon garis 3 di pojok kanan atas

- Pilih "Riwayat" `,

  '#riwayatnlc': `Cara melihat riwayat/history permainan terakhir :

Untuk No Limit City :

- Masuk ke dalam game yang terakhir dimainkan 

- Klik ikon garis 3 di pojok kanan Bawah

- Pilih riwayat permainan `,

  '#riwayatpg': `Cara melihat riwayat/history permainan terakhir :

Untuk PG Soft :

- Masuk ke dalam game yang terakhir dimainkan 

- Klik ikon garis 3 di pojok kanan Bawah

- Pilih "Riwayat"`,

  '#riwayatpp': `Cara melihat riwayat/history permainan terakhir :

Untuk Pragmatic Play / PragmaticPlayPOP :

- Masuk ke dalam game yang terakhir dimainkan 

- Klik ikon garis 3 di pojok kanan Bawah

- Klik ikon pengaturan 

- Pilih "RIWAYAT PERMAINAN" `,

  '#riwayattogel':`Berikut langkah-langkah cek riwayat taruhan TOGEL :

- KLIK menu Togel
- Pilih salah satu NEGARA, Misalkan Sidney
- Klik ikon garis tiga di bagian kiri atas
- Lalu pilih menu Riwayat Taruhan
- Setalah itu pilih waktu riwayat yang ingin di lihat, hari ini/seminggu terakhir/sebulan terakhir

Setelah mengikuti langkah-langkah di atas otomatis akan menampilkan riwayat taruhan
yang sebelumnya sudah di pasang `,

  '#resetbedanama': 'mohon maaf kak, kami tidak dapat membantu reset data rekening jika nama terupdate/terbarunya itu berbeda dengan nama yang terdaftar ya, kak ',

  '#resetbedatujuan': 'mohon maaf kak, kami tidak dapat membantu reset data rekening jika tujuan BANK terupdate/terbarunya itu berbeda dengan tujuan BANK yang terdaftar ya, kak ',

  '#resetditolak': `reset ditolak, nomor __ sudah terdaftar pada ID __
Saldo pada ID __ tidak dapat kami proses withdrawnya, akun sudah tidak dapat kami reset data rekeningnya, dan saldo hanya bisa dimainkan saja kak `,

  '#resetditolak2': 'reset ditolak, karena nomor rekening terdaftarnya masih aktif ya kak. Withdraw akan tetap kami proses ke data rekening terdaftar kak 🙂 ',

  '#resetditolak3': 'tidak ada saldo pada ID tersebut ya kak, tidak bisa kami reset data rekeningnya. Silakan membuat akun baru saja kak, menggunakan data rekening yang benar  🙂 ',

  '#resetlimit': 'untuk kendala rekening ewallet limit, tidak bisa direset rekening ya, kak. Jadi, silahkan ditunggu hingga pergantian bulan agar limitnya tereset otomatis oleh pihak ewallet yang kakak gunakan ya kak 🙂 ',

  '#cancelwdgabisa': 'mohon maaf ya kak, tidak bisa untuk membatalkan withdrawnya 🙂 Silakan ditunggu saja proses withdrawnya selesai, dan saldonya masuk ke rekening yang sudah kakak daftarkan di situs kami ^^ ',

  '#cancelwdproses': 'baik kakak, mohon untuk ditunggu proses pembatalan/cancel withdrawnya ya 🙂 ',

  '#kendala': 'hallo kakak, selamat datang di website kami^^ bisa dibantu jelaskan kendalanya? Agar dapat kami bantu ^^',
  
  '#detail': 'hallo kakak, bisa dijelaskan dengan detail terkait kendala yang terjadi kak? Agar kami bisa cek dan bantu kendalanya kak^^',

  '#isiformat': 'silakan disalin dan diisi formatnya dengan benar dan sesuai dengan yang kami kirimkan ya kak',

  '#hubungipusatreset': 'silakan hubungi Pusat Reset Password melalui link yang kami berikan di atas ya kak. Akan dibantu oleh tim kami untuk kendala lupa password yang kakak alami. Terima kasih kakak :)',

  '#pusatresetpw': `Halo Kakak,

Terkait kendala lupa password, silakan gunakan fitur Lupa Password yang tersedia di beranda situs kami.

Namun, apabila email yang terhubung dengan ID akun sudah tidak aktif atau Anda juga lupa email yang terdaftar, kakak dapat mengajukan reset password dengan menghubungi tim kami melalui tautan berikut:

Link Pusat Reset Password:
https://customer.customersupportdesk.ai/chat?workspaceId=019bfd25-bb3c-71b1-83d6-3989be2dda33`,

  '#humasMAHAGROUP': `silahkan hubungi humas kami bila ada kendala perihal deposit, whithdraw, reset rekening, atau seputar website kami ya kak ^^ kami siap melayani anda 1x24 jam.

Whatsapp: https://wa.me/+94762388938
Telegram: https://t.me/MAHAGRUP`,

  '#formatreset': `WEB : 
User ID : 
Nama Yang Terdaftar : 
Nama Yang Terupdate : 
Nomor Rekening Terdaftar : 
Nomor Rekening Terupdate : 
BANK Terdaftar : 
BANK Terupdate : 
SALDO : 
ALASAN : `,

  '#caraisiformatreset': `WEB : diisi nama web/situs kami
User ID : diisi ID/username untuk login
Nama Yang Terdaftar : diisi nama rekening terdaftar di web/situs kami
Nama Yang Terupdate : diisi nama rekening yang benar sesuai KTP Anda
Nomor Rekening Terdaftar : diisi nomor rekening terdaftar di web/situs kami
Nomor Rekening Terupdate : diisi nomor rekening terbaru / yang benar
BANK Terdaftar : diisi tujuan BANK WD terdaftar di web/situs kami
BANK Terupdate : diisi tujuan BANK WD yang benar
SALDO : diisi dengan saldo di akun game
ALASAN : biarkan kami yang isi kak`,

  '#formatqrispending': `FORMAT QRIS PENDING

WEB : 
USER NAME : 
NAMA LENGKAP : 
NOMOR REK YG DIGUNAKAN : 
NOMOR REFF / RRN : 
RRN QRIS : 
TUJUAN TRANSAKSI : 
STATUS : Dalam pengecekan`,
  '#donedepo': `Permintaan deposit kakak sudah kami bantu proseskan ya. Silahkan di cek kembali saldo di dompet utamanya.

Mohon selalu check terlebih dahulu untuk nomor tujuan rekening deposit kami yang aktif sebelum melakukan transfer saldo ya kak, dikarnakan nomor tujuan rekening deposit bisa berubah sewaktu waktu^^ 

Selamat bermain dan kami doakan jackpot 🙏🏻❤️ `,
  '#doneqris': `untuk deposit QRIS kakak sudah berhasil diproses ya kak, silahkan dicek dan di-refresh kembali dompet utama ya kak 🙂

selamat bermain & semoga jackpot^^ `,
  '#doneresetbank': `Hallo kaka, pengajuan RESET AKUN sudah kita bantu reset ya

Silahkan kaka bisa isi data kembali dengan benar di menu Withdraw / Penarikan, jika sudah mengisi data dengan benar kaka bisa mengajukan WD nya kembali

Langkah - langkah mengisi data rekening
- Login akun WEB 
- Klik tombol menu GARIS TIGA di pojok kiri atas layar
- Pilih menu penarikan/withdraw
https://prnt.sc/K-ydht-rxrMp (Tampilan Versi Handphone)
https://prnt.sc/HeeIdXsTdm4L (Tampilan Versi Dekstop / WEB)
- Silakan diisi data rekening yang benar dan sesuai format reset yang sudah diisi sebelumnya, dan pastikan tidak ada kesalahan dalam pengisian data rekening kak
- Jika sudah mengisi data rekening bisa ajukan kembali WD nya yah kaka ^^ `,
  '#doneresetpassword': `jika sudah melakukan reset password dari link Pusat Reset Password, lakukan login menggunakan password sementara yang diberikan, kemudian lakukan pergantian password pada halaman Profile Akun di bagian Ubah Kata Sandi

letaknya di sini ya kak: https://prnt.sc/fDgslRZRhLE2 `,
  '#selamatataskemenangan': `selamat atas kemenangannya ya kak🤩 kami do'akan semoga mendapat JACKPOT MAXWIN di kesempatan berikutnya kak🥳🥳🥳
jangan lupa ajak teman-temannya bermain di situs kami ya kak🥰😍 Withdraw berapapun pasti dibayar💸💸💸 `,
  '#selesaikanpromo': 'silakan diselesaikan TO/TurnOver dari promonya, agar dapat berpindah permainan ke provider lain/melakukan withdraw ya, kak ^^ ',
  '#rollingan': `Bonus Cashback/rollingan akan di bagikan otomatis hari Selasa dan paling lambat hari Rabu maksimal pukul 23:00.
Waktu reset perhitungan Turnover mulai dari hari MINGGU 03.00AM - SABTU 03.00AM.
Syarat minimal Turnover mencapai 500.000,-
Semakin besar total taruhan yang di mainkan, semakin besar pula total bonus yang di dapatkan.

untuk bonus rollingan silahkan ditunggu saja sesuai informasi yang telah kami berikan ya kak, jika sudah memenuhi persyaratan mencapai TO/TurnOver minimal 500.000 pasti cashback/rollingan akan masuk secara otomatis ke akun kakak ^^ `,
  '#rollingan2': 'untuk bonus rollingan silahkan ditunggu saja ya, karena sudah terhitung secara otomatis kak. Jika kakak sudah memenuhi syarat TO/TurnOver mingguan sebesar 500.000 yang sudah ditentukan, pasti untuk bonus rollingan akan masuk secara otomati ke dompet utama ya kak 🙂 ', 
  '#rollingandelay':  'Mohon maaf kakak atas kendala yang terjadi saat ini, pembagian bonus rollingan/cashback mengalami keterlambatan karena gangguan langsung dari sistem. Kakak tenang saja, bonus rollingan/cashback akan tetap dibagikan kepada member yang sudah mencapai TO/TurnOver sesuai dengan yang sudah ditentukan oleh sistem, dan akan dibagikan otomatis setelah sistem kami normal kembali ya kakak 🙏🏻 Untuk rollingan TO/TurnOver-nya minimal 500.000 ya kak. Jika kakak sudah melebihi TO/TurnOver yang sudah ditentukan, maka otomatis akan mendapatkan bonus rollingannya ya kakak, dan TO/TurnOver tersebut direset setiap minggunya ya kakak, bukan dihitung dari awal bermain ^^ ',
  '#rollingandelay2': 'kami informasikan untuk pembagian bonus Rollingan/Cashback akan diundur ke hari Rabu paling lambat pukul 23:00 ya, kak 🙂 mohon maaf atas keterlambatan pembagian Rollingan/Cashback yang seharusnya hari ini namun belum dibagikan sampai saat ini ya, kak🙏 ',
  '#rollingangadapet': 'jika kakak tidak mendapatkan bonus rollingan hingga hari ini, berarti kakak belum memenuhi persyaratan minimal TO/TurnOver mingguan sebesar 500.000 ya kakak ^^ ',
  '#rollingangadapet2': 'Rollingan/Cashback sudah terhitung otomatis oleh sistem ya kak, dan akan masuk secara otomatis di dompet utama kakak. Apabila kakak tidak mendapatkan bonus rollingan/cashback, berarti kakak tidak mencapai syarat minimal TO/TurnOver sebesar 500.000 pada minggu kemarin ya^^ ',
  '#rollinganrules': 'baik kakak, untuk rollingan TO nya minimal 500.000 ya kaka. Jika kakak sudah melebihi TO/TurnOver yang di tentukan maka otomatis akan mendapatkan bonus rollingannya ya, kak. Dan TO/TurnOver tersebut di-reset setiap minggunya ya kakak, bukan dihitung dari awal bermain ^^ ', 
  '#rollinganrules2': 'untuk rollingan minggu ini adalah hasil perhitungan TO/TurnOver dari minggu lalu ya kak. Untuk TO/TurnOver minggu ini, akan dihitung untuk rollingan minggu depan kak 🙂 ',
  '#rollingandone': `untuk rollingan sudah dibagikan ya kak. Silakan dicek dompet utamanya ^^ 
Untuk rollingan dihitung sesuai dengan Turn Over permainan (bukan jumlah deposit), jika kakak tidak mendapatkan rollingan, maka Turn Over yang kakak mainkan belum mencapai syarat minimal Turn Over sebesar 500.000 ya kak 🙂 `,
  '#rollinganpersenan': `Cashback/Rollingan Slot 1% dari total TO/TurnOver. Akan otomatis masuk setiap hari SELASA - RABU maksimal pukul 23.00 WIB. Minimal TO/TurnOver 500.000

Cashback/Rollingan SportBook 1% dari total TO/TurnOver. Akan otomatis masuk setiap hari SELASA - RABU maksimal pukul 23.00 WIB. `,
  '#qris1x24': 'Mohon maaf atas kendala deposit AUTOBANK / QRIS yang Anda alami ya kakak. Untuk depositnya sudah kami bantu laporkan kembali ke tim terkait untuk proses pengecekan, mohon kesediannya untuk menunggu maksimal 1x24 jam. ',
  '#qrisbcagagal': 'terkait kendala deposit QRIS transaksi gagal, namun saldo sudah terpotong. Silakan ditunggu dan cek secara berkala hingga saldonya kembali ke BCA yang Anda gunakan ya kak / menghubungi pihak Customer Service dari pihak BANK BCA yang Anda gunakan untuk menanyakan perkembangan transaksi yang telah kakak lakukan ya kak, terima kasih ^^ ', 
  '#qriserror': 'Mohon maaf kakak, saat ini metode Auto BANK/QRIS sedang mengalami gangguan dan belum bisa dipastikan untuk estimasi nya 🙂 kami sarankan kakak untuk melakukan deposit melalui metode Transfer BANK yang ada di menu deposit kami ^^ ',
  '#qrispastimasuk': 'untuk depositnya pasti saldo akan masuk ke akun kakak ya^^ Jika dalam 1 x 24 jam ke depan saldo belum masuk ke akun kakak, maka silakan untuk menghubungi kami, agar kami bantu follow up kendala depositnya kak 🙂 ',
  '#qrispending1': `untuk deposit melalui QRIS itu akan masuk secara otomatis ya kak, jadi silahkan bersabar untuk menunggu dengan estimasi waktu 1-15 menit ke depan. Jika saldo belum juga masuk, maka silahkan kembali lagi untuk chat kami ya kak. 

Terima kasih ^^r `,
  '#qrispending2': `qris sedang mengalami sedikit gangguan dan delay mohon ditunggu beberapa saat dan di cek secara berkala yah kak^^
saldo yang sudah di transferkan kami pastikan akan terproses jika sudah normal kembali^^

Terima kasih atas pengertian nya kak^^ `,
  '#qriseabankgagal': `transaksi gagal/tidak ditemukan pada merchant QRIS kami kak. Silakan ajukan refund ke pihak SEBANK dengan cara:

Kakak bisa langsung mengetuk tombol "Butuh Bantuan?" yang ada di bagian bawah screenshot transaksi tersebut di aplikasi SeaBank kakak, atau hubungi lewat jalur resmi:

Call Center: 1500 130

Live Chat: Buka aplikasi SeaBank > Menu Saya > Chat dengan Customer Service `,
  '#rekamlayar': 'tolong kirimkan rekaman layar bagian riwayat transaksi/mutasi M-Banking/EWALLET Anda kak, serta bagian yang menunjukan nomor dan nama rekening Anda pada aplikasi M-Banking/EWALLET yang Anda gunakan ya kak 🙂 ',
  '#kalibrasi': `Cara untuk mengembalikan saldo ke dompet utama/kalibrasi:

- Masuk kembali ke dalam game dimana saldo terakhir berada
- Keluar / kembali ke halaman utama
- Refresh🔄
- Lalu tekan tombol kalibrasi 🔃 Letaknya ada di sini ya: https://prnt.sc/Iv0y9GAdNmDQ
- Terakhir, tunggu beberapa saat hingga saldo Anda terupdate ke dompet utama

Silahkan ikuti langkah-langkah nya sesuai yang kami arahkan ya kak 🙏 `,
  '#kalibrasiygbener': 'lakukan langkah kalibrasi dengan benar, sesuai arahan yang kami berikan kak. Tidak mungkin saldo tidak kembali jika sudah benar melakukan kalibrasinya kak. Jika saldo tidak kembali ke dompet utama, berarti kakak tidak melakukan kalibrasi dengan benar/tidak sesuai arahan kami 🙂 ',
  '#carawd': `BERIKUT LANGKAH-LANGKAH PENARIKAN / WITHDRAW :

- Klik ikon refresh di samping tampilan saldo akun
- Klik kalibrasi
- Klik garis 3 sebelah kiri di menu Home
- Klik menu Penarikan / Withdraw
- Masukkan nominal yang ingin di ajukan / withdraw
- Konfirmasi Password keamanan Withdraw
- Klik “OK / YA”

Silahkan menunggu karena withdraw akan di proses sesuai antrian, dan selamat atas kemenangannya 🙏🏻 `,
  '#caradepoqr': `CARA DEPOSIT AUTO BANK / QRIS ( DIPROSES SECARA OTOMATIS )

1. Silakan pilih metode deposit Auto Bank 
2. Masukan nominal yang ingin dideposit
3. Klik tulisan "Deposit"
4. Pada halaman berikutnya scan / Download Barcode QRIS yang muncul
5. Silakan ditunggu 1-15 menit hingga deposit sukses dan saldo berada di dompet utama `,
  '#caradepo': `CARA DEPOSIT TRANSFER BANK 

1. Silakan pilih metode deposit Transfer Bank
2. Lalu pilih tujuan BANK yang ingin ditransfer (BCA/BNI)
3. Isi nominal depositnya, kemudian klik "Deposit"
4. Setelah mengisi nominal lalu klik "Deposit" akan muncul nomor rekening tujuan kami, nominal deposit beserta 2 angka kode unik
5. Terakhir silahkan transfer deposit sesuai dengan kode unik yang tertera pada form deposit
6. Setelah melakukan transfer deposit silahkan klik deposit untuk mengajukan form deposit Anda. `,
  '#freeround': `FREEROUND Free Spin 8x bett 800
Khusus provider: Pragmatic Play, Pragmatic Play Pop, No Limit City, Cosmo Play, dan PG Soft

- Minimal deposit 20.000, Turnover minimal mencapai 16.000 (1x claim/hari)
- Minimal deposit 100.000, Turnover minimal mencapai 40.000 (dapat di claim setiap melakukan deposit Minimal 100.000)


* Setiap bonus yang telah di claim harus menyelesaikan turnover di provider game sesuai yang sudah di pilih di awal setelah bett gratis selesai dan bisa di selesaikan di bett berapapun, setelah turnover selesai baru bisa berpindah ke provider game lainnya.

Cara claim Bonus :
- Klik menu deposit
- Klik banner bonus FREE ROUND 8X yang di inginkan
- Masukkan Nominal deposit sesuai yang di inginkan (Minimal 20.000 & 100.000) lalu SUBMIT
- Di haruskan transfer nominal sesuai dengan kode unik yang tertera di formulir deposit. `,
  '#freeroundadalah': `Bonus Free Round 8x adalah bonus yang di berikan dalam bentuk GRATIS 8x bett / spin di
Bett 800 ( BUKAN FREE SPIN / SCATTER) dan hanya berlaku di provider tertentu yang
dapat diclaim dengan syarat menyelesaikan TO yang sudah ditentukan. `,
  '#tutorparlay': `Memasang taruhan parlay (Mix Parlay) adalah menggabungkan beberapa pilihan pertandingan (minimal 3 tim) ke dalam satu tiket taruhan

1. Pilih Pertandingan: Masuk ke menu "Sportsbook" (Olahraga) dan pilih cabang olahraga yang Anda inginkan (misalnya sepak bola.
2. Kumpulkan Pilihan: Pilih minimal 3 tim atau lebih. Anda bisa memilih berbagai jenis taruhan seperti Handicap, Over/Under, atau 1x2.
3. Masuk ke Slip Taruhan: Semua tim yang Anda pilih otomatis akan masuk ke menu Betslip (Slip Taruhan).
4. Pilih Opsi Parlay: Pada slip tersebut, ubah jenis taruhan menjadi Mix Parlay atau Parlay.
5. Masukkan Nominal: Tentukan jumlah taruhan (stake) Anda. Sistem secara otomatis akan mengalikan odds (perkalian kemenangan) dari semua pertandingan yang Anda pilih.
6. Konfirmasi: Periksa kembali pilihan Anda, lalu klik "Pasang Taruhan" atau "Place Bet". `,
  '#tutortogellotwin': `cara memasang togel di provider Lotwin

Lotwin:
-Pilih togel dan provider Lotwin
-Contoh provider Aquarius
-Pilih tipe 4D/3D/2D, Taruhan Cepat, Bolak-Balik, Bolak Balik Full Set, 2D Cepat, Set 4D, Colok Bebas, Colok Bebas 2D, Colok Naga, Colok Jitu, Tengah, Dasar, 50-50, 50-50 2D, Shio, Silang, Kembang, Kombinasi
-Masukan kombinasi angka pada kolom yang tersedia
-Masukan nominalnya, contoh 1 untuk bettingan 1.000, dan seterusnya kak
-Klik Submit`,
  '#tutortogelnext4d': `cara memasang togel di provider Next4D

Next4D:
-Pilih togel dan provider Next4D
-Contoh provider HKLive Draw Day
-Pilih tipe Discount, Bet Full, Bet BB
-Masukan kombinasi angka Anda pada kolom yang tersedia kak
-Masukan nominalnya, contoh 1 untuk bettingan 1.000, dan seterusnya kak
-Klik Kirim `,
  '#adalagi': 'ada lagi kendala yang bisa kami bantu kak? ^^ ',
  '#artiparlay': `-Mix Parlay adalah salah satu fitur dari permainan judi bola (sports) dengan menebak
minimal 3 tim secara langsung.
-Kemenangan terhitung SAH jika semua tim yang dipasang menang dalam 1 bill / struk
parlay yang kakak pasang. 
-Untuk mengecek taruhan yang sedang berjalan, bisa dicek di
dalam menu OUTSTANDING atau lihat di bagian kiri bawah dari tampilan layar taruhan.
-Jika terdapat salah satu pasangan kakak kalah dalam bill tersebut maka taruhan
dianggap kalah.
-Adapun taruhan yang bisa dimainkan di dalam permainan MIX PARLAY berupa: (HDP,
Over/Under, 1x2, Tebak skor, Ganjil Genap, Total Skor, Gol pertama / terakhir). 
-Berlaku untuk permainan yang sudah berjalan ataupun babak pertama saja. `,
  '#baca': 'Mohon maaf kak, jika kaka tidak membaca pesan kami terlebih dahulu, maka kakak tidak akan mengerti, Mohon di baca dan di pahami pesan di atas ya kak😊 ',
  '#baca2': 'silahkan dibaca dan dipahami yang sudah kami jelaskan ya kak^^ ',
  '#baca3': 'mohon dibaca kembali penjelasan yang telah kami berikan sebelumnya ya, kak ^^ ',
  '#baca4': 'silahkan dibaca terlebih dahulu dan dipahami informasi yang  kami berikan di atas ya kak ^^ ',
  '#bacasyaratreset': 'biasakan untuk membaca informasi yang kami berikan hingga selesai terlebih dahulu, lalu dipahami, kemudian difikirkan apakah sudah memenuhi persyaratan / belum kak. Jangan malas untuk membaca ya kak 🙂 ',
  '#beritadepo': 'Kami tidak pernah menyarankan kakak untuk transfer menggunakan keterangan (berita transfer) ya kak, untuk kali ini akan kami bantu proseskan depositnya. Tapi, jika ke depannya kakak masih transfer menggunakan keterangan maka deposit akan kami hanguskan  dan user ID anda akan di-banned, mohon untuk tidak melanggar dan terima kasih atas pengertiannya ^^ ',
  '#beritadepo2': `mohon maaf atas keterlambatan prosesan depositnya dikarenakan kakak melakukan transfer dengan menggunakan KODE BERITA, yang dimana di situs kami tindakan kakak sangat dilarang keras ya kak. 
Kedepannya jika melakukan deposit untuk tidak menggunakan KODE BERITA ya kak^^ dan apabila kakak kedepannya masih menggunakan KODE BERITA, maka mohon maaf depaosit kakak kami anggap gagal dan saldo tersebut kami anggap hangus ya kak 🙂 `,
  '#kodeunik': `jika ingin diproses dan dicek dengan cepat depositnya, biasakan transfer sesuai nominal yang muncul pada formular deposit ya, kak 🙂
Contoh: jika yang muncul 50.058 maka transfer juga sesuai nominal tersebut kak `,
  '#norekdepo': `Cara mengetahui nomor rekening deposit di website kami:

-Pilih menu Deposit di halaman utama
-Pilih metode deposit Transfer Bank
-Pilih BNI/BCA
-Masukan nominal depositnya
-Klik Deposit
-Nanti akan muncul nomor rekening deposit di website kami ya kak

Jangan lupa menyertakan kode unik saat melakukan transfer depositnya ya kak^^ 
Contoh kode unik :
Jika tertera di form deposit 50.012
kakak harus transfer 50.012 juga kakak, bukan hanya 50.000 saja ^^ .

Terima kasih 🙏🏻 `,
  '#norekgakedaftar': 'nomor rekening yang kakak berikan tidak terdaftar di situs kami kak. Tolong berikan nomor rekening yang benarnya ya, kak 🙂 ',
  '#norekbaru': 'tolong kirimkan nomor rekening BANK/EWALLET terbarunya, agar dapat kami cek terlebih dahulu kak 🙂 ',
  '#clearcache': `wajib menggunakan browser Google Chrome dan hapus Cache browesrnya dengan cara di bawah ini kak:

- Klik titik 3 di pojok kanan atas browser Google Chrome
- Pilih "Hapus data penjelajahan"
- Pilih "Opsi lainnya"
- Pada bagian "Rentang Waktu" pilih "Semua"
- Ceklis saja bagian "Gambar dan file cache" yang lain tidak perlu ya kak
- Terakhir pilih "Hapus data"

silakan dicoba, dan pastikan juga jaringan yang Anda gunakan itu stabil serta lancar ya kak 🙂 `,
  '#clearcache2': `silahkan di coba ikuti Langkah-langkah berikut ini kak :  

1. Pastikan semua tab/game yang sedang terbuka sudah benar-benar ditutup (close all tabs).

2. Lakukan clear cache dan cookies pada browser/perangkat yang digunakan.

3. Logout dari akun, kemudian login kembali.

4. Pastikan menggunakan jaringan internet yang stabil.

5. Setelah itu, silakan coba akses kembali game yang mengalami kendala.`,
  '#dompetutama': 'saldo kakak sudah berada di dompet utama ya, silakan direfresh dan dicek kembali kak ^^ ',
  '#bonusapk': `cara claim bonus EXP VIP:

- Download "Web APP" kami dari halaman browser. Letaknya di sini: https://prnt.sc/dZIIlawYab6u
- Setelah didownload, aplikasi akan otomatis terinstall di handphone Anda kak
- Buka aplikasinya yang sudah terinstall otomatis, lalu login
- Cek bagian "Bonus Saya"
- Lalu ke "Riwayat VIP Yang Ditukarkan"
- Nanti akan muncul bonus EXP VIP yang sudah otomatis masuk dan terhitung ke dalam EXP VIP Anda kak. Contohnya seperti ini kak: https://prnt.sc/Jf-_7nadaP9K `,
  '#NLC': 'Baik kakak, disini kami cek kakak mengambil Promosi Spin Gratis No Limit City ya kak. Silakan bermain di provider No Limit CIty untuk menyelesaikan Promo/TurnOver yang kaka ambil, dan jika sudah selesai, maka TurnOver-nya akan terbuka secara otomatis ^^ ',
  '#PP': 'Baik kakak, di sini kami cek kaka mengambil Promosi Spin Gratis PP ya ka. Silakan bermain di Provider Pragmatic Play ya kak untuk menyelesaikan Promo/TurnOver yang kaka ambil, dan jika sudah selesai maka TurnOver-nya akan terbuka secara otomatis ^^  ',
  '#FATPANDA': 'Baik bosku, di sini kami cek boskumengambil Promosi Spin Gratis PRAGMATIC PLAY POP ya bosku. Silakan bermain di provider PRAGMATIC PLAY POP untuk menyelesaikan Promo/TurnOver yang kakak ambil, dan jika sudah selesai, maka TurnOver-nya akan terbuka secara otomatis ^^ ',
  '#PG': 'Baik kakak, di sini kami cek kaka mengambil Promosi Spin Gratis PG Soft ya ka. Silakan bermain di Provider PG Soft ya kak untuk menyelesaikan Promo/TurnOver yang kaka ambil, dan jika sudah selesai maka TurnOver-nya akan terbuka secara otomatis ^^   ',
  '#COSMO': 'Baik kakak, di sini kami cek kaka mengambil Promosi Spin Gratis PG Soft ya ka. Silakan bermain di Provider Cosmo Play ya kak untuk menyelesaikan Promo/TurnOver yang kaka ambil, dan jika sudah selesai maka TurnOver-nya akan terbuka secara otomatis ^^ ',
  '#donepromo': 'promo yang kakak claim sudah ter-unlock ya kak, silahkan re-login/log out lalu login kembali ya kak ^^ ',
  '#edc': 'Jika kaka deposit melalui mesin EDC/WBNK maka kami akan proses setelah 1x24 jam ya ka. Silakan kembali lagi setelah 1x24 jam, dengan mengirimkan kembali screenshot bukti transfernya ya kak 🙂 ',
  '#estimasi': 'kami belum bisa memastikan untuk estimasinya kakak, silahkan ditunggu dan cek secara berkala untuk dapat mengetahui jika sudah normal kembali ya kakak🙏🏻 ',
  '#estimasi2': 'untuk estimasi waktunya belum dapat kami pastikan ya kak, silahkan ditunggu saja dan dicek secara berkala ^^ ',
  '#estimasiresetakun': 'mohon ditunggu ya kak, selama proses reset akun jangan dimainkan saldonya kak. Estimasi peresetan akun sekitar 30 menit / lebih daripada itu ya kak, mohon ditunggu kabar terbaru dari kami / kakak bisa menghubungi HUMAS kami di Whatsapp / Telegram untuk mengetahui proses reset akun yang sedang berlangsung 🙂 ',
  '#akunterbatas': `jika akun kakak dibatasi itu karena kakak memasukkan ID atau PASWORD yang tidak sesuai secara terus menerus ya kak 🙂
silahkan diingat kembali ID/PASWORD yang kakak gunakan, lalu dicoba kembali setelah 24 jam ke depan  kak ^^ `,
  '#daftarbaru': `untuk membuat/mendaftarkan akun baru, kakak bisa pergi ke menu "Daftar" ya kak 🙂
Letaknya ada di sini kak: https://prnt.sc/A1EE_g3C10x6 `,
  '#followup': 'untuk kendala tersebut sudah kami bantu follow up ya kak, mohon bersbar menunggu dalam 1x24 jam ke depan dan dicek secara berkala kak ^^ ',
  '#followup2': 'mohon bersabar menunggu ya kak, karena memang masih dalam proses pengecekan lebih lanjut ^^ ',
  '#followup3': 'mohon maaf atas keterlambatannya ya kak, namun hingga saat ini memang masih dalam proses pengecekan kak 🙏🏻 ',
  '#followup4': 'baik kakak, untuk kendala tersebut masih dalam proses pengecekan kembali ya kak ^^ mohon maaf atas keterlambatannya kak, akan kami follow up kembali hingga kendalanya terselesaikan ya kak 🙂 ',
  '#maafkendala': 'mohon maaf atas ketidaknyamanannya dan kendala yang terjadi kak 🙏😊 ',
  '#kendalamembaca': 'jika memiliki kendala dalam hal membaca, maka mintalah bantuan orang lain untuk membacakan dan menjelaskannya kepada Anda ya kak ^^ ',
  '#followuptanpabukti': 'silahkan ditunggu saja hingga saldo masuk, karena kami tidak dapat membantu follow up jika tidak ada bukti transaksi secara detail ya kak, terima kasih 🙂 ',
  '#capca': `silahkan masukkan captcha yang tersedia untuk validasi pendaftaran dengan mengikuti angka, huruf besar/kecil yang muncul. Jika salah, tekan refresh di sebelah captcha untuk mengganti captcha yang baru dan masukkan kembali dengan benar.
Selamat mencoba, semoga berhasil kak🙏🏻😊 `,
  '#tambahrek': 'tidak bisa ya kak, 1 akun hanya 1 nomor rekening BANK/Ewallet saja kak ^^ ',
  '#ewalletprem': 'silakan dipremiumkan terlebih dahulu ewallet yang Anda gunakan ya kak, agar mendapatkan limit bulanan yang lebih besar daripada ewallet yang belum premium ^^ ',
  '#bahas': 'mohon maaf kakak kami tidak mengerti apa yang kakak maksud 😊 ',
  '#bahas2': `Mohon maaf kakak kami hanya melayani chat seputar kendala deposit, withdraw, atau tidak dapat mengakses website kami 🙂 mohon dipahami ya kak^^ `,
  '#bahas3': 'mohon gunakan kosakata dan tatanan huruf yang benar agar dapat dimengerti kak ^^ ',
  '#wdantri1': 'Untuk proses withdraw sedang dalam antrian ya kakak, silahkan untuk ditunggu dan dicek secara berkala pada rekening E-WALLET / BANK yang kakak gunakan ya ^^',
  '#wdantri2': 'semua akan kami proses sesuai antrian ya kakak, silahkan untuk ditunggu saja. Terima kasih kak :)',
  '#wdantri3': 'Baik kakak, mohon kesabarannya untuk menugggu ya kak. Semua kami proses sesuai dengan antrian ya kak, biasakan untuk menunggu beberapa saat dahulu ya kakak ^^ Terimakasih 😊🙏',
  '#wdantri4': 'kami informasikan untuk saat ini proses withdraw kami sedang sangat-sangat ramai&padat ya kak🙏 namun semua withdraw juga sedang dalam proses sesuai antrian ya kak🥰 kami mohon kerjasama dan kesabarannya menunggu proses withdrawnya hingga sukses ya kak🥰 withdraw berapapun pasti kami bayar💸💸💸',
  '#wdantri5': 'mohon untuk ditunggu dan dicek secara berkala proses withdrawnya hingga sukses ya kak :) withdraw berapapun pasti kami bayar💸💸💸',
  '#wddone': `withdraw Anda sudah sukses dan berhasil kami proses ya kak🥰 silakan dicek & refresh pada EWALLET/M-Banking yang Anda gunakan kak😉

Salam Sensational & Terima Kasih ^^`,
  '#wdcutoff': `Mohon maaf kakak, saat ini Withdraw BANK tujuan BRI & MANDIRI sedang memasuki waktu Cut Off/jam offline transaksi antar BANK dari pihak BANK terkait. Estimasi waktu pukul 04.00 WIB akan normal kembali ya, kak :) Jika sudah melewati jam cut off/offline maka transaksi kakak akan segera kami proses.
Terima kasih atas pengertiannya, kak. 🙏🏻`,
  '#wdgagalotomatis': `untuk kendala withdraw ditolak otomatis oleh sistem, sedang dalam pengecekan tim kami ya kak 🙂 kami sarankan untuk mengajukan ulang nanti pagi pukul 04:00 setelah normal ya kak. Mohon maaf atas kendala yang terjadi, dan terima kasih sudah mau mengerti penjelasan kami kak🙏`,
  '#wdbcamt': `untuk saat ini Withdraw akan diproseskan sesuai antrian ya kak, namun ada keterlambatan dikarenakan saat ini BANK yang digunakan untuk melakukan proses transfer Withdraw yaitu BANK BCA sedang dalam pemeliharaan sistem dari pihak BANK BCA-nya langsung.
Kami mohon kesabarannya dan menunggu untuk proses Withdraw nya ya, kak ^^`,
  '#mindepowd': `Untuk Deposit & Minimal Deposit ada 2 Metode pilihan :
- Auto Bank
- Transfer Bank

Syarat & Ketentuan
- Untuk tujuan Deposit AUTO BANK / QRIS minimal Deposit 10.000
- Untuk tujuan Deposit TRANSFER BANK minimal Deposit 20.000

Untuk penarikan/withdraw
- Minimal saldo yang bisa diwithdraw sebesar 20.000

Silahkan kakak bisa pilih salah satu metode deposit yang tertera di menu Form Deposit :)`,
  
  '#kendalamembaca': 'jika memiliki kendala dalam hal membaca, maka mintalah bantuan orang lain untuk membacakan dan menjelaskannya kepada Anda ya kak ^^ ',

  '#kasar': 'sebaiknya gunakan kata yang pantas dan baik yah kaka. karena setiap kata yang terucap itu adalah doa. coba kaka berkata yang baik. semoga saja kaka kedepannya akan mendapat kemenangan yang luar biasa yah kak. ',

  '#kasar2': 'Kami mohon kerja samanya ya kakak untuk tidak menggunakan kata-kata kasar atau tidak pantas sehingga kami dapat memberikan pelayanan terbaik untuk kaka🙏🙏 ',

  '#kasar3': 'Kami menyarankan dan mohon kerja sama kakak untuk tidak menggunakan kata-kata kasar atau tidak pantas, sehingga kami dapat memberikan pelayanan terbaik untuk Anda ya, kak 😊 ',

  '#marah': `Mohon maaf kak, kami hanya operator yang menghubungkan kaka main di Provider GAME.
Untuk menang atau kalah itu semua di luar kuasa kami, kami doakan semoga kaka beruntung / hoki di permainan berikutnya ya kak 😊🙏🏻 `,

  '#kasar4': 'tenang saja ya kak, Anda tidak perlu menggunakan kata-kata kasar ^^ karena sejatinya perkataan kasar Anda tidak akan bisa memberikan kemenangan kepada Anda ya kak :)',

  '#kasar5': 'jika Anda mengalammi kekalahan, kami menyarankan untuk tidak emosi dan menggunakan kata-kata kasar ya kak ^^ karena menang/kalah itu tergantung dari hoki Anda sendiri kak, tetap semangat dan semoga mendapatkan kemenangan di permainan berikutnya kak :)',

  '#vip': `untuk mengclaim lencana VIP kakak harus menyelesaiakan XP yang sudah di tentukan ya kak.
masing masing lencana memiliki bonus yang berbeda bergantung tingkat lencana saat ini yang kakak capai ya kak^^

Aturan
XP Multiplier :
XP Slot : Turnover x 0,1%
Example = Slot Turnover (1,000,000) x 0,1% = 1,000 XP

XP Untuk Setiap VIP Level :
Iron
0 - 3,000 XP
Copper
3,000 - 6,000 XP
Bronze
6,000 - 12,000 XP
Silver
12,000 - 24,000 XP
Gold
24,000 - 48,000 XP
Platinum
48,000 - 96,000 XP
Emerald
96,000 - 192,000 XP
Aquamarine
192,000 - 384,000 XP
Ruby
384,000 - 768,000 XP
Diamond
768,000 - 1,536,000 X`,

  '#vip2': `Pemain VIP dapat menikmati hadiah berdasarkan progres XP, termasuk :

• Putaran Gratis

• Hadiah Uang - Bonus tunai

* Batas Waktu Klaim Hadiah : Hadiah harus diklaim dalam waktu 7 hari setelah setiap musim VIP berakhir. Hadiah yang kedaluwarsa tidak dapat diklaim.

* Batas Waktu Penggunaan Putaran Gratis : Hadiah harus digunakan dalam waktu 7 hari. Hadiah yang kedaluwarsa tidak dapat digunakan.

* Catatan: Untuk Free Spin dari Pragmatic Play, masa berlaku adalah 30 hari setelah diklaim. Silakan merujuk pada tanggal kedaluwarsa yang tertera`,

  '#vip3': `Hanya perputaran permainan dari penyedia berikut yang akan dihitung untuk perhitungan VIP XP Anda. Daftar ini dapat diperbarui dari waktu ke waktu untuk memastikan pengalaman pengguna terbaik.

Pragmatic Play
PG Soft
Cosmo Play
Fat Panda
FastSpin
Habanero
NetEnt
No Limit City
Red Tiger
5G Gaming
Relax Gaming
Playstar
Naga Games
Advant Play
Big Time Gaming
BESOFT
FunTa Gaming
Playtech
Hacksaw
Evoplay
568Win
Spadegaming
GamePlay
CQ9 Slot`,

  '#vipclaim': `Bagaimana Cara Klaim Hadiah?

1. Periksa Progres VIP Anda : Kunjungi Halaman VIP untuk melihat level XP Anda saat ini.
2. Buka Hadiah : Capai puncak setiap tingkatan untuk mengklaim bonus eksklusif.
3. Klaim Hadiah Anda :
• Bonus akan tersedia untuk klaim manual di Halaman VIP.
• Atau, kunjungi Halaman Bonus untuk melihat dan mengklaim hadiah yang telah dibuka.`,

  '#vipdelay': 'untuk bonus VIP yang masih dalam proses silahkan untuk menunggu sambil bermain ya kaka untuk bonus akan di berikan disaat kaka sedang bermain ya kaka sebelum mendapatkan bonusnya akan ada notifukasi khusunya ya kaka',

  '#vipdelay2': 'semua proses claim hadiah lencana VIP saat ini sedang ada delay ya kakak, dan kendala tersebut sedang dalam penanganan lebih lanjut kak. Silakan bisa cek secara berkala, untuk estimasi belum bisa dipastikan dikarenakan langsung dari sistem ya kak 🙂 mohon maaf atas ketidak nyamanannya ya kak 🙂🙏',

  '#vipdelay3': 'untuk claim bonus VIP yang masih tahap proses, silakan ditunggu dan cek secara berkala ya, kak. Karena masih dalam tahap pengecekan lebih lanjut. Terima kasih :)',

  '#vipmt': 'fitur VIP masih dalam maintenance hingga waktu yang belum dapat kami pastikan kapan selesainya ya kak. Jadi, untuk sementara waktu tidak ada fitur VIP kak🙏',

  '#wdcekmutasi': 'untuk kendala withdraw pada ID tersebut, setelah kami cek bahwa withdraw tersebut sudah kami transfer namun terjadi kegagalan dari pihak BANK/Ewallet terkait yang kakak gunakan ya kak, dan untuk saldo pada BANK Withdraw kami telah terpotong meskipun transaksinya gagal ya kak. Mohon ditunggu dalam 1 x 24 jam ke depan (estimasi Waktu paling cepat) atau dalam 7 x 24 jam ke depan (estimasi Waktu paling lambatnya) ',
  

};

// 1. Fitur Tambah Hashtag Baru
bot.command('add', (ctx) => {
  const args = ctx.message.text.split(' ').slice(1);
  const input = args.join(' ').trim();
  if (!input) return ctx.reply('⚠️ Format: /add #hashtagbaru');

  let newTag = input.startsWith('#') ? input : `#${input}`;
  const hashtags = loadHashtags();

  if (hashtags.some(tag => tag.toLowerCase() === newTag.toLowerCase())) {
    return ctx.reply(`⚠️ Hashtag ${newTag} udah ada!`);
  }

  hashtags.push(newTag);
  saveHashtags(hashtags);
  return ctx.reply(`✅ Berhasil menambahkan ${newTag}!`);
});

// 📌 FITUR CARI HASHTAG (/buk atau #buk)
bot.on('text', (ctx, next) => {
  const text = ctx.message.text.trim();

  // 🛑 Abaikan perintah sistem bawaan biar gak dibaca sebagai hashtag!
  if (text.startsWith('/start') || text.startsWith('/list') || text.startsWith('/add')) {
    return next(); // Lanjut ke perintah /start, /list, atau /add aslinya
  }

  if (text.startsWith('/') || text.startsWith('#')) {
    const keyword = text.replace(/^[/|#]/, '').toLowerCase();
    if (!keyword) return;

    const hashtags = loadHashtags();
    const matches = hashtags.filter(tag =>
      tag.replace('#', '').toLowerCase().startsWith(keyword)
    );

    if (matches.length > 0) {
      ctx.reply(`🔎 **Pilihan Hashtag untuk \`${keyword}\`:**\n\n${matches.join(', ')}`, { parse_mode: 'Markdown' });
    } else {
      ctx.reply(`❌ Hashtag berawalan \`${keyword}\` tidak ditemukan.`);
    }
  }
});


// Command /start
bot.start((ctx) => {
  ctx.reply('Butuh bantuan hashtag? Ketik /list ya ^^.\nDibuat oleh @shllwGrave 🗿');
});

// Command /list (Otomatis Grouping dari responses)
bot.command('list', async (ctx) => {
  try {
    if (typeof responses === 'undefined' || !responses) {
      return ctx.reply('Data responses belum terdaftar/kosong.');
    }

    const allHashtags = Object.keys(responses);

    if (allHashtags.length === 0) {
      return ctx.reply('Belum ada hashtag yang terdaftar.');
    }

    // Key internal tanpa emoji
    const grouped = {
  cek: [],
  riwayat: [],
  reset: [],
  promo: [],
  vip: [],
  rollingan: [],
  deposit: [],
  withdraw: [],
  lainnya: []
};

// Label tampilan untuk Telegram
const labels = {
  cek: "🔍 Cek & Kendala",
  riwayat: "📜 Riwayat",
  reset: "🗝️ Reset Account & Password",
  promo: "🎁 Promo",
  vip: "👑 VIP",
  rollingan: "🎰 Rollingan & Freeround",
  deposit: "💳 Deposit & QRIS",
  withdraw: "💸 Withdraw & Transaksi",
  lainnya: "📌 Lainnya"
};

// Filter hashtag berdasarkan keyword
allHashtags.forEach(tag => {
  const t = tag.toLowerCase();
  if (t.includes('cek') || t.includes('kendala') || t.includes('detail') || t.includes('ss')) {
    grouped.cek.push(tag);
  } else if (t.includes('riwayat') || t.includes('rekam')) {
    grouped.riwayat.push(tag);
  } else if (t.includes('reset') || t.includes('password') || t.includes('pw')) {
    grouped.reset.push(tag);
  } else if (t.includes('promo') || t.includes('selamat')) {
    grouped.promo.push(tag);
  } else if (t.includes('vip')) {
    grouped.vip.push(tag);
  } else if (t.includes('rollingan') || t.includes('freeround')) {
    grouped.rollingan.push(tag);
  } else if (t.includes('qris') || t.includes('depo')) {
    grouped.deposit.push(tag);
  } else if (t.includes('wd') || t.includes('format')) {
    grouped.withdraw.push(tag);
  } else {
    grouped.lainnya.push(tag);
  }
});

// Susun isi pesan
let message = '<b>Daftar Hashtag Tersedia:</b>\n\n';

for (const [key, tags] of Object.entries(grouped)) {
  if (tags.length > 0) {
    // Mengurutkan hashtag sesuai abjad (A-Z) tanpa peduli huruf besar/kecil
    const sortedTags = tags.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    message += `<b>${labels[key]}</b>\n`;
    message += sortedTags.map(tag => `#${tag.replace(/^#+/, '')}`).join(', ') + '\n\n';
  }
}

message += 'Ketik #namahashtag atau /namahashtag yang ada di list agar muncul isinya ya 🤩';

await ctx.reply(message, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Error pada command /list:', error);
    ctx.reply('Gagal mengambil daftar hashtag.');
  }
});

// Handle teks hashtag dan command slash
bot.on('text', (ctx) => {
  let text = ctx.message.text.trim();

  // Ubah /hashtag jadi #hashtag
  if (text.startsWith('/')) {
    text = '#' + text.slice(1);
  }

  if (responses[text]) {
    ctx.reply(responses[text]);
  }
});

// Web Server
app.get('/', (req, res) => {
  res.send('Bot Telegram Aktif!');
});

bot.launch();

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
