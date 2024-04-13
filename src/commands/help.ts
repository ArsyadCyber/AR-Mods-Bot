import { Composer, InlineKeyboard } from "grammy";
import { helpMessage } from "../message/helpMessage";

const bot = new Composer();
const start = new InlineKeyboard().text("Kembali", "start");
bot.callbackQuery("help", async (ctx) => {
  await ctx.editMessageText(helpMessage, {
    reply_markup: start,
  });
});

bot.command("help", (ctx) => {
  ctx.reply(helpMessage, {
    parse_mode: "Markdown",
    reply_parameters: {
      message_id: ctx.msg?.message_id,
    },
  });
});

export default bot;
