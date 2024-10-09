//import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";

dotenv.config();

import "./utils/delete-cron.js";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 2626;

// CORS configuration
/*const corsOptions = {
  origin: "https://pixelshiftlab.web.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Request-Method', 'Access-Control-Request-Headers'],
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
  credentials: true,
  maxAge: 86400
};*/

// Middlewares
//app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*app.use((req, res, next) => {
  res.vary('Origin');
  res.header('Access-Control-Allow-Origin', 'https://pixelshiftlab.web.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'Content-Length, X-Kuma-Revision');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});*/

// Routes
app.use("/api/v1", routes);

// Starting the server
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