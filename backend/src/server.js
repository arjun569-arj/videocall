import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.get("/hello", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

app.listen(process.env.PORT, () =>
  console.log("Server is running on port:", process.env.PORT)
);
