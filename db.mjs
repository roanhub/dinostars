import fs from "fs";
const dbPath = "./db.json";

async function loadDb() {
  try {
    const db = await JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    return db;
  } catch (error) {
    console.error(error);
  }
}

async function addUserToDb(data) {
  try {
    const db = await loadDb();
    db.data.user.push(data);
    fs.writeFileSync(dbPath, JSON.stringify(db), "utf-8");
    return console.log(`El usuario ${data.nombre} fue agregado con exito.`);
  } catch (error) {
    console.error(error);
  }
}

export default {
  loadDb,
  addUserToDb,
};
