const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const bot = new Client({
  authStrategy: new LocalAuth({
    clientId: "DinoStars-Beta",
  }),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

module.exports = {
  bot,
  qrcode,
  MessageMedia,
};
