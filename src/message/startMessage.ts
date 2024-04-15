import { Context } from "grammy";
const startMessage = (ctx: Context): string =>
  `Selamat datang *${ctx.from?.first_name} ${ctx.from?.last_name}*! Bot Ini bisa membantu anda sehari hari. ketik /help atau klik tombol di bawah`;

export { startMessage };
