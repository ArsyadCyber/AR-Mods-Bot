import { Composer, InlineKeyboard } from "grammy";
import { autoQuote } from "@roziscoding/grammy-autoquote";
import aboutMessage from "../message/aboutMessage";

const bot = new Composer();
const start = new InlineKeyboard().text("Kembali", "start");
bot.use(autoQuote());
bot.command("about", (ctx) => {
  ctx.reply(aboutMessage(ctx), {
    parse_mode: "Markdown",
  });
});
bot.callbackQuery("about", async (ctx) => {
  await ctx.editMessageText(aboutMessage(ctx), {
    parse_mode: "Markdown",
    reply_markup: start,
  });
});

export default bot;
