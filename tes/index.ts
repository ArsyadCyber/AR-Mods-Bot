import { Bot } from 'grammy';
import { uploadByBuffer } from 'telegraph-uploader';
import fetch from 'node-fetch';

// Ganti 'YOUR_TELEGRAM_BOT_TOKEN' dengan token bot Telegram Anda
const bot = new Bot('7079720533:AAGJdsVYtrq7AyEzKaIk6Ea3umrRpb-RAT4');

// Tangani pesan /start
bot.command('start', (ctx) => {
  ctx.reply('Kirimkan saya sebuah gambar, dan saya akan mengunggahnya ke Telegraph.');
});

// Tangani ketika pengguna mengirim foto
bot.on(':photo', async (ctx) => {
  // Cek apakah ada foto dalam pesan
  if (ctx.message?.photo && ctx.message.caption === '/telegraph') {
    const photo = ctx.message.photo.sort((a, b) => (b.file_size ?? 0) - (a.file_size ?? 0))[0]; // Ambil resolusi foto tertinggi
    try {
      // Dapatkan informasi file dari foto yang dikirim
      const fileInfo = await bot.api.getFile(photo.file_id);
      // Bangun URL lengkap file menggunakan file_path
      const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${fileInfo.file_path}`;
      // Dapatkan buffer data dari foto
      const response = await fetch(fileUrl);
      const buffer = await response.buffer();
      // Unggah buffer data ke Telegraph
      const result = await uploadByBuffer(buffer, 'image/png');
      // Kirim link gambar yang diunggah ke pengguna
      await ctx.reply(`Gambar berhasil diunggah! Link: ${result.link}`);
    } catch (error) {
      console.error(error);
      await ctx.reply('Maaf, terjadi kesalahan saat mengunggah gambar.');
    }
  }
});

// Jalankan bot
bot.start();