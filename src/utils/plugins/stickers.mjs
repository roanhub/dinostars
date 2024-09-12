import { createCanvas, loadImage } from "canvas";

async function sticker(buffer) {
  const img = await loadImage(buffer);
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0, 400, 400);
  const base64 = await canvas
    .toDataURL("image/png")
    .replace(/^data:image\/png;base64,/, "");

  return base64;
}

export default sticker;
