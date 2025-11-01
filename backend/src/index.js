import express from "express";
import path from "path";
import { env } from "./env.js";

const app = express();

const __dirname = path.resolve();

if (env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../fronthend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../fronthend", "dist", "index.html"));
  });
}

app.get("/hello", (req, res) => {
  return res.send("Hello World!");
});

app.listen(env.PORT);
