import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./utils/inngest.js";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

const app = express();

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.get("/hello", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log("Server is running on port:", process.env.PORT);
});
