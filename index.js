const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const bot = new Telegraf(process.env.BOT_TOKEN);

// Database hashtag & jawabannya
const responses = {
  '#cancelWDDONE': 'proses pembatalan withdraw telah selesai kak, dan saldo sudah kami kembalikan ke dompet utama ya kakak. Silakan dicek kembali kak^^',
  '#ajukanULANGWD': 'withdraw kakak sudah kami cancel ya, silakan ajukan ulang withdrawnya kak :)',
  '#WDLIMIT': 'Mohon maaf atas kendala yang terjadi ya kak, kami tidak dapat memproses withdraw ke nomor rekening kakak yang terdaftar dikarenakan rekening kakak terindikasi mengalami limit bulanan ya kak'
};

// Perintah /start
bot.start((ctx) => {
  ctx.reply('Halo! Bot sudah aktif. Ketik /list untuk melihat daftar hashtag yang tersedia.');
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
  message += '\nKetik/klik salah satu hashtag di atas untuk melihat isinya!';

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
