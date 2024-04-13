import { Bot } from "grammy";
import { limit } from "@grammyjs/ratelimiter";

import start from "./commands/start";
import help from "./commands/help";
import about from "./commands/about";

const bot = new Bot("7079720533:AAGJdsVYtrq7AyEzKaIk6Ea3umrRpb-RAT4");
bot.use(
  limit({
    // Hanya 3 pesan yang akan diproses dalam rentang waktu 2 detik.
    timeFrame: 2000,
    limit: 3,

    // Berikut akan dijalankan ketika limit terlampaui.
    onLimitExceeded: async (ctx) => {
      await ctx.reply("Tolong jangan kirim request berlebihan!");
    },

    // Key ini harus berupa angka dalam format string, misal "123456".
    keyGenerator: (ctx) => {
      return ctx.from?.id.toString();
    },
  }),
);
bot.use(start.middleware());
bot.use(help.middleware());
bot.use(about.middleware());
// Tangani pesan lainnya.
bot.on("message", (ctx) => ctx.reply("Dapat pesan baru!"));

bot.start();
