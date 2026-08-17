const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const bot = new Telegraf(process.env.BOT_TOKEN);

// Database Hashtag
const responses = {
  '#cancelWDDONE': 'Transaksi penarikan dana (WD) berhasil dibatalkan.',
  
  '#ajukanULANGWD': 'Silakan ajukan ulang penarikan dana (WD) Anda.',
  
  '#WDLIMIT': 'Batas limit penarikan dana hari ini telah tercapai.',

  '#kendala': 'hallo kakak, selamat datang di website kami^^ bisa dibantu jelaskan kendalanya? Agar dapat kami bantu ^^',
  
  '#detail': 'hallo kakak, bisa dijelaskan dengan detail terkait kendala yang terjadi kak? Agar kami bisa cek dan bantu kendalanya kak^^',

  '#isiformat': 'silakan disalin dan diisi formatnya dengan benar dan sesuai dengan yang kami kirimkan ya kak',

  '#hubungiPUSATRESET': 'silakan hubungi Pusat Reset Password melalui link yang kami berikan di atas ya kak. Akan dibantu oleh tim kami untuk kendala lupa password yang kakak alami. Terima kasih kakak :)',

  '#PUSATRESETPW': `Halo Kakak,

Terkait kendala lupa password, silakan gunakan fitur Lupa Password yang tersedia di beranda situs kami.

Namun, apabila email yang terhubung dengan ID akun sudah tidak aktif atau Anda juga lupa email yang terdaftar, kakak dapat mengajukan reset password dengan menghubungi tim kami melalui tautan berikut:

Link Pusat Reset Password:
https://customer.customersupportdesk.ai/chat?workspaceId=019bfd25-bb3c-71b1-83d6-3989be2dda33`,

  '#humasMAHAGROUP': `silahkan hubungi humas kami bila ada kendala perihal deposit, whithdraw, reset rekening, atau seputar website kami ya kak ^^ kami siap melayani anda 1x24 jam.

Whatsapp: https://wa.me/+94762388938
Telegram: https://t.me/MAHAGRUP`,

  '#FORMATRESETBANK': `WEB : 
User ID : 
Nama Yang Terdaftar : 
Nama Yang Terupdate : 
Nomor Rekening Terdaftar : 
Nomor Rekening Terupdate : 
BANK Terdaftar : 
BANK Terupdate : 
SALDO : 
ALASAN : `,

  '#CARAISIFORMATRESET': `WEB : diisi nama web/situs kami
User ID : diisi ID/username untuk login
Nama Yang Terdaftar : diisi nama rekening terdaftar di web/situs kami
Nama Yang Terupdate : diisi nama rekening yang benar sesuai KTP Anda
Nomor Rekening Terdaftar : diisi nomor rekening terdaftar di web/situs kami
Nomor Rekening Terupdate : diisi nomor rekening terbaru / yang benar
BANK Terdaftar : diisi tujuan BANK WD terdaftar di web/situs kami
BANK Terupdate : diisi tujuan BANK WD yang benar
SALDO : diisi dengan saldo di akun game
ALASAN : biarkan kami yang isi kak`,

  '#FORMATQRISPENDING': `FORMAT QRIS PENDING

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
