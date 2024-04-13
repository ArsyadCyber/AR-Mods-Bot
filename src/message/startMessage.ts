// messages.ts
const startMessage = (ctx: any): string =>
  `Selamat datang *${ctx.from?.first_name} ${ctx.from?.last_name}*! Bot Ini bisa membantu anda sehari hari. ketik /help atau klik tombol di bawah`;

export { startMessage };
