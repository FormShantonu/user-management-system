import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { swaggerDocs } from "./docs/swagger.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Set CORS options
const corsOptions = {
  origin: process.env.LOCAL_SERVER, // Adjust the origin to your frontend's address
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow methods you want
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  credentials: true, // Allow credentials if needed (cookies, authorization headers)
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

app.use(errorHandler);

swaggerDocs(app);

export default app;
