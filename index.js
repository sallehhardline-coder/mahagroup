const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const bot = new Telegraf(process.env.BOT_TOKEN);

// Database hashtag & jawabannya
const responses = {
  '#cancelWDDONE': 'proses pembatalan withdraw telah selesai kak, dan saldo sudah kami kembalikan ke dompet utama ya kakak. Silakan dicek kembali kak^^',
  '#ajukanULANGWD': 'withdraw kakak sudah kami cancel ya, silakan ajukan ulang withdrawnya kak :)',
  '#WDLIMIT': 'Mohon maaf atas kendala yang terjadi ya kak, kami tidak dapat memproses withdraw ke nomor rekening kakak yang terdaftar dikarenakan rekening kakak terindikasi mengalami limit bulanan ya kak',
  '#PUSATRESETPW': `Halo Kakak,

Terkait kendala lupa password, silakan gunakan fitur Lupa Password yang tersedia di beranda situs kami.

Namun, apabila email yang terhubung dengan ID akun sudah tidak aktif atau Anda juga lupa email yang terdaftar, kakak dapat mengajukan reset password dengan menghubungi tim kami melalui tautan berikut:

Link Pusat Reset Password:
https://customer.customersupportdesk.ai/chat?workspaceId=019bfd25-bb3c-71b1-83d6-3989be2dda33`,
  '#humasMAHAGROUP': `silahkan hubungi humas kami bila ada kendala perihal deposit, whithdraw, reset rekening, atau seputar website kami ya kak ^^ kami siap melayani anda 1x24 jam.

Whatsapp: https://wa.me/+94762388938
Telegram: https://t.me/MAHAGRUP`,
  '#hubungiPUSATRESET': 'silakan hubungi Pusat Reset Password melalui link yang kami berikan di atas ya kak. Akan dibantu oleh tim kami untuk kendala lupa password yang kakak alami. Terima kasih kakak :)',
  '#kendala': `hallo kakak, selamat datang di website kami^^
bisa dibantu jelaskan kendalanya? Agar dapat kami bantu ^^`,
  '#detail': 'hallo kakak, bisa dijelaskan dengan detail terkait kendala yang terjadi kak? Agar kami bisa cek dan bantu kendalanya kak^^',
  '#FORMATRESETBANK': `
WEB :
User ID :
Nama Yang Terdaftar :
Nama Yang Terupdate :
Nomor Rekening Terdaftar :
Nomor Rekening Terupdate :
BANK Terdaftar :
BANK Terupdate :
SALDO :
ALASAN : `
  '#CARAISIFORMATRESET': `
WEB : diisi nama web/situs kami
User ID : diisi ID/username untuk login
Nama Yang Terdaftar : diisi nama rekening terdaftar di web/situs kami
Nama Yang Terupdate : diisi nama rekening yang benar sesuai KTP Anda
Nomor Rekening Terdaftar : diisi nomor rekening terdaftardi web/situs kami
Nomor Rekening Terupdate : diisi nomor rekening terbaru / yang benar
BANK Terdaftar : diisi tujuan BANK WD terdaftar di web/situs kami
BANK Terupdate : diisi tujuan BANK WD yang benar
SALDO : diisi dengan saldo di akun game
ALASAN : biarkan kami yang isi kak`,
  '#FORMATQRISPENDING': `
FORMAT QRIS PENDING

WEB :
USER NAME :
NAMA LENGKAP :
NOMOR REK YG DIGUNAKAN :
NOMOR REFF / RRN :
RRN QRIS :
TUJUAN TRANSAKSI :
STATUS : Dalam pengecekan`,
  '#isiformat': 'silakan disalin dan diisi formatnya dengan benar dan sesuai dengan yang kami kirimkan ya kak',
  '#DONERESETBANK': `
Hallo kaka, pengajuan RESET AKUN sudah kita bantu reset ya

Silahkan kaka bisa isi data kembali dengan benar di menu Withdraw / Penarikan, jika sudah mengisi data dengan benar kaka bisa mengajukan WD nya kembali

Langkah - langkah mengisi data rekening
- Login akun WEB
- Klik tombol menu GARIS TIGA di pojok kiri atas layar
- Pilih menu penarikan/withdraw
https://prnt.sc/K-ydht-rxrMp (Tampilan Versi Handphone)
https://prnt.sc/HeeIdXsTdm4L (Tampilan Versi Dekstop / WEB)
- Silakan diisi data rekening yang benar dan sesuai format reset yang sudah diisi sebelumnya, dan pastikan tidak ada kesalahan dalam pengisian data rekening kak
- Jika sudah mengisi data rekening bisa ajukan kembali WD nya yah kaka ^^`,

};



// Perintah /start
bot.start((ctx) => {
  ctx.reply('Butuh bantuan hashtag? Ketik /list ya ^^. Dibuat oleh @shllwGrave.');
});

// Perintah /list untuk menampilkan seluruh hashtag
bot.command('list', (ctx) => {
  const hashtags = Object.keys(responses);
  
  if (hashtags.length === 0) {
    return ctx.reply('Belum ada hashtag yang terdaftar.');
  }

  let message = '📋 **Daftar Hashtag Tersedia:**\n\n';
  hashtags.forEach((tag, index) => {
    message += `${index + 1}. ${tag}\n`;
  });
  message += '\nKetik # sesuai list agar muncul isinya ya!';

  ctx.replyWithMarkdown(message);
});

// Mendeteksi teks hashtag
bot.on('text', (ctx) => {
  const text = ctx.message.text.trim();

  if (responses[text]) {
    ctx.reply(responses[text]);
  }
});

// Server Web untuk Render
app.get('/', (req, res) => {
  res.send('Bot Telegram Aktif!');
});

bot.launch();

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
