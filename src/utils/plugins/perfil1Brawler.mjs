import { createCanvas, loadImage } from "canvas";
import fs from "fs";

async function pfb1(...data) {
  // canvas
  const canvas = createCanvas(800, 300);
  const ctx = canvas.getContext("2d");

  // imagenes a usar
  const bg = await loadImage("../../img/roanh.png");
  const brawler = await loadImage("../../img/Colette_Skin-Default.png");
  const pfp = await loadImage("../../img/player_icon_mortis.png");

  ctx.drawImage(bg, 0, 0, 800, 300);
  ctx.drawImage(pfp, 30, 30, 108, 109);

  ctx.font = "bold 20px Block Berthold";
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "black";
  // ctx.lineWidth = '2px'
  ctx.lineWidth = 0.5
  ctx.fillText(data[0].toUpperCase(), 30 + 109 + 10, 50);
  ctx.strokeText(data[0].toUpperCase(), 30 + 109 + 10, 50);

  ctx.fillStyle = "white";
  ctx.font = "bold 16px Block Berthold";
  ctx.fillText(data[1].toUpperCase(), 30 + 109 + 10, 65);
  ctx.strokeText(data[1].toUpperCase(), 30 + 109 + 10, 65);


  ctx.font = "bold 16px Block Berthold";
  const twC =ctx.measureText(data[2])
  ctx.fillText(data[2], 30 + 109 + 10, 125);
  ctx.strokeText(data[2], 30 + 109 + 10, 125);
  ctx.rotate(45)

  fs.writeFileSync(
    "./prueba.png",
    await canvas.toBuffer("image/png"),
    "binary"
  );
}

pfb1("roanh", "#pltfdf", 14000);
