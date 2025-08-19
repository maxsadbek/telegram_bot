const TelegramBot = require("node-telegram-bot-api");

const token = "8196898859:AAFO-zkCCVxHicj4Ip2p89TUaCC8OQ1X3wo";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  console.log(msg); // Debug uchun

  if (msg.text && msg.text.startsWith("/secret ")) {
    const text = msg.text.replace("/secret ", "");
    const userId = msg.from.id;
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `🔒 ${msg.from.first_name} ga maxfiy xabar yuborildi.`);
    bot.sendMessage(userId, `🤫 Sizning maxfiy xabaringiz: ${text}`);
  }
});
