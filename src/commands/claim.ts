import { Composer } from "grammy";
import { claimPoints } from "../lib/pointsManager"; // Sesuaikan path sesuai lokasi file pointsManager Anda

const bot = new Composer();

bot.command("claim", async (ctx) => {
  if (!ctx.from?.id) return;

  const userId = ctx.from.id.toString();
  const responseMessage = await claimPoints(userId);

  await ctx.reply(responseMessage);
});

export default bot;
