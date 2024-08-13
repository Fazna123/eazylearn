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

  //app.use(cors());
  const corsOptions = {
    origin: "https://eazylearn.xyz",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

  app.use(cors(corsOptions));

  const io = new SocketIOServer(server, {
    cors: {
      origin: "https://eazylearn.xyz",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://eazylearn.xyz");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  app.use(ErrorMiddleWare);

  return { app, server, io };
};

export default createServer;

// //body-parser
// app.use(express.json());

// app.use(morgan("tiny"));

// //cookie parser
// app.use(cookieParser());

// app.use(ErrorMiddleWare);
