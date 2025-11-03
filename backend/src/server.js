import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { connectDB } from "./utils/connectDB.js";
import { inngest, functions } from "./utils/inngest.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

import chatRoutes from "./routes/chatRoute.js";

app.use("/api/chat/", chatRoutes);
// make our app ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () =>
      console.log("Server is running on port:", process.env.PORT)
    );
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
