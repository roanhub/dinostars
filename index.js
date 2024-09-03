import { bot, qrcode } from "./client.cjs";

bot
  .on("qr", (qr) => qrcode.generate(qr, { small: true }))
  .on("ready", () => {
    console.log("READY!");
  })
  .on("message_create", async (msg) => {
    console.log(msg.body);
    if (/^[./!#]reg/i.test(msg.body)) {
      await msg.reply("Registrado");
    }
  });

bot
  .initialize()
  .then(() => console.log("INICIALIZADO!"))
  .catch((err) => console.error(err));
