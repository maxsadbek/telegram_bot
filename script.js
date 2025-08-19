const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('8196898859:AAFO-zkCCVxHicj4Ip2p89TUaCC8OQ1X3wo'); // o'zingning tokeningni qo'y

// /secret komandasi
bot.command('secret', async (ctx) => {
    const text = ctx.message.text.split(" ");
    const mention = text[1]; // @user
    const secretMessage = text.slice(2).join(" "); // xabar

    if (!mention || !secretMessage) {
        return ctx.reply("❌ Foydalanish: /secret @user xabar");
    }

    // Xabarni o'chirish
    try {
        await ctx.deleteMessage();
    } catch (err) {
        console.log("❌ Xabarni o‘chirib bo‘lmadi:", err.message);
    }

    // Tugmali xabar yuborish
    ctx.reply("🔒 Sirli xabar! Ko‘rish uchun tugmani bosing.", Markup.inlineKeyboard([
        Markup.button.callback("✉️ Xabarni ochish", `secret:${mention}:${secretMessage}`)
    ]));
});

// Tugma bosilganda
bot.on("callback_query", async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data.startsWith("secret:")) {
        const [_, mention, secretMessage] = data.split(":");

        // faqat mo‘ljallangan user ocha olishi uchun tekshirish
        if ("@" + ctx.from.username === mention) {
            await ctx.answerCbQuery(`✉️ Sirli xabar: ${secretMessage}`, { show_alert: true });
        } else {
            await ctx.answerCbQuery("❌ Bu xabar siz uchun emas!", { show_alert: true });
        }
    }
});

bot.launch();
