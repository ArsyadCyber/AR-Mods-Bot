import { Composer, InlineKeyboard } from "grammy";
import aboutMessage from "../message/aboutMessage";

const bot = new Composer();
const start = new InlineKeyboard().text("Kembali", "start");

bot.command("about", (ctx) => {
  ctx.reply(aboutMessage(ctx), {
    parse_mode: "Markdown",
    reply_parameters: {
      message_id: ctx.msg?.message_id,
    },
  });
});
bot.callbackQuery("about", async (ctx) => {
  await ctx.editMessageText(aboutMessage(ctx), {
    parse_mode: "Markdown",
    reply_markup: start,
  });
});

export default bot;
