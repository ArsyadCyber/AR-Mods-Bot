const proUsers = process.env.PRO_USERS?.split(",").map(Number) || [];
async function pro(ctx, next) {
  ctx.config = {
    botProUsers: proUsers,
    isPro: proUsers.includes(ctx.chat?.id),
  };
}

bot.use(pro);