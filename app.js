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

async function getItems(query) {
  const result = await db.query(query);
  const items = result.rows;
  console.log(items);
  return items;
}

function pathname(req) {
  const referer = req.get("Referer");
  if (!referer) return "/";

  try {
    const url = new URL(referer);
    return url.pathname;
  } catch (error) {
    console.error("Invalid Referer URL:", error);
    return "/";
  }
}

app.get("/", async (req, res) => {
  const items = await getItems("SELECT *  FROM daily_todos ORDER BY id ASC");
  res.render("index", {
    listTitle: "Today",
    listItems: items,
    link: "/weekly",
    linkText: "Weekly Todos"
  });
});

app.get("/weekly", async (req, res) => {
  const items = await getItems("SELECT * FROM weekly_todos ORDER BY id ASC");
  res.render("weekly", {
    listTitle: "This Week",
    listItems: items,
    link: "/",
    linkText: "Daily Todos"
  });
});

app.post("/add", async (req, res) => {
  const pathName = pathname(req);
  
  const item = req.body.newItem;
  if (pathName === "/") {
    try {
      await db.query("INSERT INTO daily_todos (title) VALUES ($1)", [item]);
      res.redirect("/");
    } catch (error) {
      console.error("Error inserting to database", error.stack);
    }
  } else if (pathName === "/weekly") {
    try {
      await db.query("INSERT INTO weekly_todos (title) VALUES ($1)", [item]);
      res.redirect("/weekly");
    } catch (error) {
      console.error("Error inserting to database", error.stack);
    }
  }
});

app.post("/edit", async (req, res) => {
  const pathName = pathname(req);
  const updatedItemId = req.body["updatedItemId"]
  const updatedItemTitle = req.body["updatedItemTitle"]
  console.log(updatedItemId, updatedItemTitle);
  if (pathName === "/") {
    try {
      await db.query("UPDATE daily_todos SET title = $1 WHERE id = $2", [updatedItemTitle, updatedItemId]);
      res.redirect("/");
    } catch (error) {
      console.error("Error Updating items in database", error.stack);
    }
  } else if (pathName === "/weekly") {
    try {
      await db.query("UPDATE weekly_todos SET title = $1 WHERE id = $2", [updatedItemTitle, updatedItemId]);
      res.redirect("/weekly");
    } catch (error) {
      console.error("Error Updating items in database", error.stack);
    }
  }
});

app.post("/delete", async (req, res) => {
  const pathName = pathname(req);

  const itemId = req.body["deleteItemId"];

  if (pathName === "/") {
    try {
      await db.query("DELETE FROM daily_todos WHERE id = $1", [itemId]);
      res.redirect("/");
    } catch (error) {
      console.error("Error deleting from database", error.stack);
    }
  } else if (pathName === "/weekly") {
    try {
      await db.query("DELETE FROM weekly_todos WHERE id = $1", [itemId]);
      res.redirect("/weekly");
    } catch (error) {
      console.error("Error deleting from database", error.stack);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
