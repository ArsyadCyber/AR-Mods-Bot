import { Composer, InlineKeyboard } from "grammy";
import { autoQuote } from "@roziscoding/grammy-autoquote";
import { helpMessage } from "../message/helpMessage";

const bot = new Composer();
const start = new InlineKeyboard().text("Kembali", "start");
bot.callbackQuery("help", async (ctx) => {
  await ctx.editMessageText(helpMessage, {
    reply_markup: start,
    parse_mode: "Markdown",
  });
});
bot.use(autoQuote());
bot.command("help", (ctx) => {
  ctx.reply(helpMessage, {
    parse_mode: "Markdown",
  });
});

export default bot;
