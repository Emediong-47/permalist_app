import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});
db.connect();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

async function getItems() {
  const result = await db.query("SELECT *  FROM items ORDER BY id ASC");
  const items = result.rows;
  console.log(items);
  return items;
}

app.get("/", async (req, res) => {
  const items = await getItems();
  res.render("index", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting to database", error.stack);
  }
});

app.post("/edit", async (req, res) => {
  const updatedItemId = req.body["updatedItemId"]
  const updatedItemTitle = req.body["updatedItemTitle"]
  console.log(updatedItemId, updatedItemTitle);
  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [updatedItemTitle, updatedItemId]);
    res.redirect("/");
  } catch (error) {
    console.error("Error Updating items in database", error.stack);
  }
});

app.post("/delete", async (req, res) => {
  const itemId = req.body["deleteItemId"];
  try {
    await db.query("DELETE FROM items WHERE id = $1", [itemId]);
    res.redirect("/");
  } catch (error) {
    console.log("Error deleting from database", error.stack);
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
