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

  '#riwayatpp&pop': `Cara melihat riwayat/history permainan terakhir :

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
STATUS : Dalam pengecekan`
};

// Command /start
bot.start((ctx) => {
  ctx.reply('Butuh bantuan hashtag? Ketik /list ya ^^. Dibuat oleh @shllwGrave.');
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
  message += '\nKetik # atau / sesuai list agar muncul isinya ya!';

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
