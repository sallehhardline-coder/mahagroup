const { Telegraf } = require('telegraf');
const express = require('express');

// Express server biar Render gak ngiranya server mati
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot Aktif!'));
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));

// Inisialisasi Bot
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Halo! Bot kamu udah aktif 24/7 nih!'));
bot.help((ctx) => ctx.reply('Ada yang bisa dibantu?'));
bot.on('text', (ctx) => ctx.reply(`Kamu ngetik: ${ctx.message.text}`));

bot.launch();