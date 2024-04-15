import { Composer } from "grammy";
import { getUserPoints } from '../lib/pointsManager'; // Sesuaikan path sesuai lokasi file pointsManager Anda

const bot = new Composer();

bot.command("poin", async (ctx) => {
  // Pastikan ctx.from.id ada sebelum melanjutkan
  if (!ctx.from?.id) return;

  const userId = ctx.from.id.toString();
  const points = await getUserPoints(userId);

  await ctx.reply(`Sisa poin Anda: ${points}`);
});

export default bot;