import { Bot } from "grammy";
import { limit } from "@grammyjs/ratelimiter";
import * as fs from "fs";
import * as path from "path";
import start from "./commands/start";
import help from "./commands/help";
import about from "./commands/about";
import telegraph from "./commands/telegraph";
import point from "./commands/poin";
import claim from "./commands/claim";
import log from "./lib/logging";

const configPath = path.resolve(__dirname, "config", "token.json");

// Membaca file config.json
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const bot = new Bot(config.botToken);
bot.use(log);
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
bot.use(telegraph.middleware());
bot.use(point.middleware());
bot.use(claim.middleware());
// Tangani pesan lainnya.
bot.on("message", (ctx) => ctx.reply("Dapat pesan baru!"));

bot.start();
