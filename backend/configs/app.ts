import express from "express";
export const app = express();

import morgan from "morgan";

import { ErrorMiddleWare } from "../middlewares/error";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

const createServer = () => {
  const app = express();
  const server = http.createServer(app);

  app.use(
    cors({
      origin: process.env.ORIGIN,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(ErrorMiddleWare);

  return { app, server };
};

export default createServer;

// //body-parser
// app.use(express.json());

// app.use(morgan("tiny"));

// //cookie parser
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//   })
// );

// app.use(ErrorMiddleWare);
