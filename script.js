const TelegramBot = require("node-telegram-bot-api");

// Bot tokenini yoz (BotFather dan olganingni)
const token = "8196898859:AAFO-zkCCVxHicj4Ip2p89TUaCC8OQ1X3wo";

// Botni ishga tushirish
const bot = new TelegramBot(token, { polling: true });

// Start komandasi
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Salom! 👋 Men ishlayapman 🚀");
});

// Oddiy xabarlar uchun
bot.on("message", (msg) => {
  if (msg.text !== "/start") {
    bot.sendMessage(msg.chat.id, `Siz yozdingiz: ${msg.text}`);
  }
});
