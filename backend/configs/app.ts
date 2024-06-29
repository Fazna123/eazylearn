import express from "express";
export const app = express();

import morgan from "morgan";

import { ErrorMiddleWare } from "../middlewares/error";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import dotenv from "dotenv";

dotenv.config();

const createServer = () => {
  const app = express();
  const server = http.createServer(app);

  console.log("origin", process.env.ORIGIN);
  const corsConfig = {
    origin: "https://eazylearn.xyz",
    credentials: true,
  };

  app.use(cors(corsConfig));

  // app.use(
  //   cors({
  //     origin: process.env.ORIGIN,
  //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  //     credentials: true,
  //   })
  // );

  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "http://www.eazylearn.xyz");
  //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //   next();
  // });

  // // Handle preflight requests
  // app.options("*", (req, res) => {
  //   res.header("Access-Control-Allow-Origin", "http://www.eazylearn.xyz");
  //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //   res.sendStatus(200);
  // });

  // if (process.env.NODE_ENV === "development") {
  //   app.use(
  //     cors({
  //       origin: process.env.ORIGIN,
  //       methods: ["GET", "POST", "PUT", "DELETE"],
  //       credentials: true,
  //     })
  //   );
  // }
  //app.use(cors());
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(ErrorMiddleWare);

  return { app, server, io };
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
