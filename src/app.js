import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ApiError from "./utils/ApiError.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import loggerMiddleware from "./middleware/loggerMiddleware.js";
import router from "./router/index.js";
import path from "path";
import { fileURLToPath } from 'url';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config({
  path: "./config/config.env",
});

// Middlewares
app.use(express.json());
app.use(
  cors()
);
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use(fileUpload());
app.use(
  "/uploads",
  // "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// router index for corporate server
app.use("/", router);

// router index for formula1 server

app.get("/", (req, res) => {
  res.send("Mshrue Server Is Running");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

export default app;
