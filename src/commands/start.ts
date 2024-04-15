import { Composer, InlineKeyboard } from "grammy";
import { autoQuote } from "@roziscoding/grammy-autoquote";
import { startMessage } from "../message/startMessage";

const bot = new Composer();
const bantuan = new InlineKeyboard()
  .text("Bantuan", "help")
  .text("Tentang", "about");
bot.use(autoQuote());
bot.command("start", (ctx) => {
  ctx.reply(startMessage(ctx), {
    parse_mode: "Markdown",
    reply_markup: bantuan,
  });
});
bot.callbackQuery("start", async (ctx) => {
  await ctx.editMessageText(startMessage(ctx), {
    parse_mode: "Markdown",
    reply_markup: bantuan,
  });
});

export default bot;
