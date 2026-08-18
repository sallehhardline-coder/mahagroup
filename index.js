const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const bot = new Telegraf(process.env.BOT_TOKEN);


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

  '#formatresetbank': `WEB : 
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
  '#donedeposit': `Permintaan deposit kakak sudah kami bantu proseskan ya. Silahkan di cek kembali saldo di dompet utamanya.

Mohon selalu check terlebih dahulu untuk nomor tujuan rekening deposit kami yang aktif sebelum melakukan transfer saldo ya kak, dikarnakan nomor tujuan rekening deposit bisa berubah sewaktu waktu^^ 

Selamat bermain dan kami doakan jackpot 🙏🏻❤️ `,
  '#donedepoqris': `untuk deposit QRIS kakak sudah berhasil diproses ya kak, silahkan dicek dan di-refresh kembali dompet utama ya kak 🙂

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
  '#rollingandapaet2': 'Rollingan/Cashback sudah terhitung otomatis oleh sistem ya kak, dan akan masuk secara otomatis di dompet utama kakak. Apabila kakak tidak mendapatkan bonus rollingan/cashback, berarti kakak tidak mencapai syarat minimal TO/TurnOver sebesar 500.000 pada minggu kemarin ya^^ ',
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

};

// Command /start
bot.start((ctx) => {
  ctx.reply(`Butuh bantuan hashtag? Ketik /list ya ^^. 
Dibuat oleh @shllwGrave 🗿`);
});

// Command /list
bot.command('list', (ctx) => {
  const hashtags = Object.keys(responses);
  
  if (hashtags.length === 0) {
    return ctx.reply('Belum ada hashtag yang terdaftar.');
  }

  let message = '📋 **Daftar Hashtag Tersedia:**\n\n';
  hashtags.forEach((tag, index) => {
    message += `${index + 1}. ${tag}\n`;
  });
  message += '\nKetik #namahashtag atau /namahastag yang ada di list agar muncul isinya ya 😉';

  ctx.replyWithMarkdown(message);
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
