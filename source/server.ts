/** source/server.ts */
import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/herbs";
require("dotenv").config();
const cors = require("cors");
var fs = require("fs");
var path = require("path");
const bodyParser = require("body-parser");

// NOTE router is the equivalent of 'app' in many tutorials, its our express app
const router: Express = express();

/** Logging */
router.use(morgan("dev"));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data & bodyparsing */
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use("/public", express.static(`${process.cwd()}/public`));

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

/** Routes */
router.use("/", routes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
