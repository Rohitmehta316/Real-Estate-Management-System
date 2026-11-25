import "dotenv/config";
import express from "express";
import http from "node:http";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { uploads } from "./middleware/uploads.js";
import errorHandler from "./middleware/errorHandler.js";
import createApiRouter from "./routes/index.js";

const app = express();
const server = http.createServer(app);
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const io = new Server(server, { cors: { origin: clientUrl } });

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: clientUrl }));
app.use(express.json({ limit: "2mb" }));
app.use("/api", rateLimit({ windowMs: 60_000, limit: 240, standardHeaders: true, legacyHeaders: false }));
app.use("/uploads", express.static(uploads));
app.use("/api", createApiRouter(io));
app.use(errorHandler);

io.on("connection", (socket) => {
  socket.on("authenticate", (userId) => {
    if (userId) socket.join(String(userId));
  });
});

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dwellix";
if (!process.env.MONGODB_URI) {
  console.warn("MONGODB_URI is not set; using local MongoDB at mongodb://127.0.0.1:27017/dwellix. Set it in backend/.env to use another database.");
}

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop the process listening on port ${port}, or set PORT to another free port in backend/.env.`);
    process.exit(1);
  }
  console.error("DWELLIX API failed to start:", error.message);
  process.exit(1);
});

try {
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
  console.log("MongoDB connected");
  server.listen(port, () => console.log(`DWELLIX API listening on ${port}`));
} catch (error) {
  console.error(`MongoDB connection failed: ${error.message}`);
  console.error("Check that MongoDB is running and MONGODB_URI in backend/.env is valid. For local development, start MongoDB or set MONGODB_URI to your MongoDB connection string.");
  process.exit(1);
}
