const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const bot = new Telegraf(process.env.BOT_TOKEN);

// Database sederhana untuk daftar hashtag dan jawabannya
const responses = {
  '#cancelWDDONE': 'proses pembatalan withdraw telah selesai kak, dan saldo sudah kami kembalikan ke dompet utama ya kakak. Silakan dicek kembali kak^^',
  '#ajukanULANGWD': 'withdraw kakak sudah kami cancel ya, silakan ajukan ulang withdrawnya kak :)',
  '#WDLIMIT': 'Mohon maaf atas kendala yang terjadi ya kak, kami tidak dapat memproses withdraw ke nomor rekening kakak yang terdaftar dikarenakan rekening kakak terindikasi mengalami limit bulanan ya kak'
};

// Respon saat user kirim /start
bot.start((ctx) => {
  ctx.reply('Butuh bantuan hashtag? Bisa kirim contoh seperti #bukti. Dibuat oleh @@shllwGrave');
});

// Mendeteksi semua pesan teks yang masuk
bot.on('text', (ctx) => {
  const text = ctx.message.text.trim();

  // Cek apakah pesan yang dikirim ada di daftar hashtag
  if (responses[text]) {
    ctx.reply(responses[text]);
  }
});

// Server Web untuk syarat Render
app.get('/', (req, res) => {
  res.send('Bot Telegram Aktif!');
});

bot.launch();

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
