import cors from "cors";
import dotenv from "dotenv";
import express from "express";
const app = express();
import fs from "fs";
dotenv.config();

import "./utils/delete-cron.js";

//functions
import routes from "./routes/index.js";

const PORT = process.env.PORT || 2626;

//middlewares
app.use(
  cors({
    origin: "https://pixelshiftlab.web.app",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.listen(PORT, () => {
  const uploadDir = "./uploads";
  const tempDir = "./temp";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  console.log("Current Directory:", process.cwd());
  console.log("Files:", fs.readdirSync(process.cwd()));
  console.log("Server started at", PORT);
});
