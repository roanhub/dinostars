import { bot, qrcode, MessageMedia } from "./config/client.cjs";
import bsApi from "./api/bsApi.mjs";
import { loadDb, addUserToDb } from "./api/db.mjs";
import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";

// utils/plugins
import sticker from "./utils/plugins/stickers.mjs";

bot
  .on("qr", (qr) => qrcode.generate(qr, { small: true }))
  .on("ready", () => {
    console.log("READY!");
  })
  .on("message_create", async (msg) => {
    try {
      if (/^[./!#]reg/i.test(msg.body)) {
        const author = await msg.getContact();
        const db = await loadDb();
        const idsWA = await db.data.user.map((id) => id.idWA);
        const vericador = await idsWA.some(
          (id) => id === author.id._serialized
        );
        // console.log(vericador);
        console.log(vericador);

        if (vericador) {
          await msg.reply("> El usuario ya esta registrado.");
        } else {
          const comando = msg.body.split(" ");
          const idP = comando[1];
          const data = await bsApi(idP);
          console.log(await data);

          await msg.reply(await data.name);
          await addUserToDb({
            idWA: author.id._serialized,
            idP: data.tag,
            nombre: data.name,
          });
        }
      } else if (/^[./!#]bs/i.test(msg.body)) {
        const author = await msg.getContact();
        const db = await loadDb();
        const idsWA = await db.data.user.map((id) => id.idWA);
        const vericador = await idsWA.some(
          (id) => id === author.id._serialized
        );

        // console.log(await db.data.user);

        // console.log(idsWA);
        console.log(vericador);

        if (vericador) {
          const comando = msg.body.split(" ");

          if (/^brawler/i.test(comando[1])) {
            const brawlers = [ 'SHELLY', 'COLT', 'BULL', 'BROCK', 'RICO', 'SPIKE', 'BARLEY', 'JESSIE', 'NITA', 'DYNAMIKE', 'EL PRIMO', 'MORTIS', 'CROW', 'POCO', 'BO', 'PIPER', 'PAM', 'TARA', 'DARRYL', 'PENNY', 'FRANK', 'GENE', 'TICK', 'LEON', 'ROSA', 'CARL', 'BIBI', '8-BIT', 'SANDY', 'BEA', 'EMZ', 'MR. P', 'MAX', 'JACKY', 'GALE', 'NANI', 'SPROUT', 'SURGE', 'COLETTE', 'AMBER', 'LOU', 'BYRON', 'EDGAR', 'RUFFS', 'STU', 'BELLE', 'SQUEAK', 'GROM', 'BUZZ', 'GRIFF', 'ASH', 'MEG', 'LOLA', 'FANG', 'EVE', 'JANET', 'BONNIE', 'OTIS', 'SAM', 'GUS', 'BUSTER', 'CHESTER', 'GRAY', 'MANDY', 'R-T', 'WILLOW', 'MAISIE', 'HANK', 'CORDELIUS', 'DOUG', 'PEARL', 'CHUCK', 'CHARLIE', 'MICO', 'KIT', 'LARRY & LAWRIE', 'MELODIE', 'ANGELO', 'DRACO', 'LILY', 'BERRY', 'CLANCY', 'MOE' ]

            if (brawlers.includes(comando[2].toUpperCase())) {
              const perfilPlayer = await db.data.user.find(
                (perfil) => perfil.idWA === author.id._serialized
              );

              const perfilBs = await bsApi(perfilPlayer.idP);

              console.log(perfilBs);

              const brawler = await perfilBs.brawlers.find(
                (brawl) => brawl.name === comando[2].toUpperCase()
              );

              console.log(brawler);
              await msg.reply(
                `Jugador: ${perfilPlayer.nombre} | ${perfilPlayer.idP}\n\n${brawler.name}\n\nCopas: ${brawler.trophies}\n\nRank: ${brawler.rank}`
              );

              const bgPerfil = await loadImage("./src/img/baseBrawler.png");
              const pfp = await loadImage("./src/img/Shelly1-pfp.png");
              const canvas = createCanvas(1080, 1080);
              const brawlerPng = await loadImage("./src/img/Nita-skin-c.png");
              const context = canvas.getContext("2d");
              // const pathFont = path.resolve(__dirname, "./Anton-Regular.ttf");
              // registerFont(pathFont, { family: "Anton" });
              context.drawImage(
                bgPerfil,
                0,
                0,
                bgPerfil.width,
                bgPerfil.height
              );
              context.drawImage(pfp, 94, 125, 97, 97);
              context.font = 'bold 24px "Anton"';
              context.fillStyle = "white";
              context.strokeStyle = "black";
              context.lineWidth = 2;
              const textW = context.measureText(
                `${await perfilBs.name.toUpperCase()}`
              );
              context.fillText(
                `${await perfilBs.name.toUpperCase()}`,
                (94 - textW.width) / 2 + 94,
                226
              );
              context.strokeText(
                `${await perfilBs.name.toUpperCase()}`,
                (94 - textW.width) / 2 + 94,
                226
              );

              context.fillStyle = "#ffbe20";
              context.fillText(`${await perfilBs.trophies}k`, 279, 188);
              context.strokeText(`${await perfilBs.trophies}k`, 279, 188);

              context.font = 'bold 32px "Anton"';
              context.fillStyle = "white";
              context.fillText(`${await brawler.trophies}`, 800, 200);
              context.strokeText(`${await brawler.trophies}`, 800, 200);

              context.drawImage(
                brawlerPng,
                (canvas.width - 500) / 2,
                (canvas.height - 500) / 2,
                500,
                500
              );

              context.font = 'bold 40px "Anton"';
              context.fillText(`${await brawler.name}`, 38, 920);
              context.strokeText(`${await brawler.name}`, 38, 920);

              context.font = 'bold 22px "Anton"';
              context.fillText(`${await brawler.power}`, 366, 980);
              context.strokeText(`${await brawler.power}`, 366, 980);

              const buf = canvas.toBuffer("image/png");
              fs.writeFileSync("prueba.png", buf);
              const base64 = canvas
                .toDataURL("image/png")
                .replace(/^data:image\/png;base64,/, "");

              const media = new MessageMedia("image/png", base64);
              await msg.reply(media);
            } else {
              await msg.reply("> No existe ese brawler.");
            }
          }
        } else {
          await msg.reply("> Necesitas registrarte. !reg ID");
        }
      } else if (/^[./!*$#@]s/i.test(msg.body)) {
        if (msg.hasQuotedMsg) {
          const msgQuote = await msg.getQuotedMessage();
          const base64Image = await msgQuote.downloadMedia();
          const buffer = Buffer.from(base64Image.data, "base64");

          const base64 = await sticker(buffer);

          const media = new MessageMedia("image/png", await base64);
          await msg.reply(media, msg.from, { sendMediaAsSticker: true });
        } else {
          const base64Image = await msg.downloadMedia();
          const buffer = Buffer.from(base64Image.data, "base64");

          const base64 = await sticker(buffer);

          const media = new MessageMedia("image/png", await base64);
          await msg.reply(media, msg.from, { sendMediaAsSticker: true });
        }
      }
    } catch (error) {
      await msg.reply(`> ${error}`);
    }
  });

bot.on("group_join", async (join) => {
  try {
    console.log(join);
    const chat = await join.getChat();
    const contact = await bot.getContactById(join.recipientIds);
    const pic = await contact.getProfilePicUrl();
    console.log(chat);
    // console.log(contact);
    console.log(pic);

    // const picProfile = await Jimp.read(pic);
    const img2 = await loadImage(pic);
    const saludoD = await loadImage("./src/img/saludoDerecha.png");
    const saludoI = await loadImage("./src/img/saludoIzquierda.png");
    // registerFont("./src/font/Anton/Anton-Regular.ttf", { family: "anton" });
    const canvas = createCanvas(800, 300);
    const context = canvas.getContext("2d");
    context.font = "bold 24px Arial";
    context.fillStyle = "white";

    console.log(img2);

    await loadImage("./src/img/saludoBg.png").then((img) => {
      context.drawImage(img, 0, 0, 800, 300);
      context.drawImage(img2, 307, 30, 184, 184);
      context.drawImage(saludoD, 30, 61, 178, 178);
      context.drawImage(saludoI, 592, 61, 178, 178);
      const textW = context.measureText(
        `@${contact.pushname} se ha unido al grupo.`
      ).width;
      context.fillText(
        `@${contact.pushname} se ha unido al grupo.`,
        (canvas.width - textW) / 2,
        260
      );
    });
    // fs.writeFileSync("./prueba.png", buf);
    const base64Image = canvas
      .toDataURL("image/png")
      .replace(/^data:image\/png;base64,/, "");
    // const imgB64 = buf.toString()
    const contactId = contact.id._serialized;
    console.log(contactId);
    console.log(chat);

    const media = new MessageMedia("image/png", base64Image);

    await chat.sendMessage(media, {
      caption: `@${contactId.replace("@c.us", "")} bienvenida/o al grupo.\n\n${
        chat.groupMetadata.desc
      }`,
      mentions: [contactId],
    });
  } catch (error) {
    console.error(error);
  }
});

bot
  .initialize()
  .then(() => console.log("INICIALIZADO!"))
  .catch((err) => console.error(err));
