import { Composer } from "grammy";
import { uploadByBuffer } from "telegraph-uploader";
import fetch from "node-fetch";
import * as fs from "fs";
import * as path from "path";

const bot = new Composer();

const configPath = path.resolve(__dirname, "..", "config", "token.json");

// Membaca file config.json
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

bot.command("telegraph", (ctx) => {
  ctx.reply(
    "Kirimkan saya gambar dengan caption /telegraph, dan saya akan mengunggahnya ke Telegraph.",
    {
      reply_parameters: {
        message_id: ctx.msg?.message_id,
      },
    },
  );
});

bot.on(":photo", async (ctx) => {
  if (ctx.message?.photo && ctx.message.caption === "/telegraph") {
    const photo = ctx.message.photo.sort(
      (a, b) => (b.file_size ?? 0) - (a.file_size ?? 0),
    )[0];
    try {
      const fileInfo = await ctx.api.getFile(photo.file_id);
      const fileUrl = `https://api.telegram.org/file/bot${config.botToken}/${fileInfo.file_path}`;
      const response = await fetch(fileUrl);
      const buffer = await response.buffer();
      const result = await uploadByBuffer(buffer, "image/png");
      await ctx.reply(
        `Gambar anda berhasil diunggah! Link: [Klik](${result.link})`,
        {
          reply_parameters: {
            message_id: ctx.msg?.message_id,
          },
          parse_mode: "Markdown",
        },
      );
    } catch (error) {
      console.error(error);
      await ctx.reply("Maaf, terjadi kesalahan saat mengunggah gambar.", {
        reply_parameters: {
          message_id: ctx.msg?.message_id,
        },
      });
    }
  }
});

export default bot;
