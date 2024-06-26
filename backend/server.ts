//import { Request, Response } from "express";
import createServer from "./configs/app";
import connectDB from "./configs/db";
import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config();
import { Request, Response } from "express";
import userRoute from "./routes/user.route";
import adminRoute from "./routes/admin.route";
import courseRoute from "./routes/course.route";
import orderRoute from "./routes/order.route";
import chatRoute from "./routes/chat.route";
import ChatRepository from "./repositories/chat.repository";
import SocketUtils from "./utils/socket.utils";

const chatRepository = new ChatRepository();

const { app, server, io } = createServer();

const socketUtils = new SocketUtils(chatRepository);

socketUtils.configureSocketIO(io);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", courseRoute);
app.use("/api/order", orderRoute);
app.use("/api/chat", chatRoute);

// app.all("*", (req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: "Invalid Route in URL",
//   });
// });
app.get("/", (req: Request, res: Response) => {
  res.send("Allset until now");
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

server.listen(process.env.PORT, () => {
  console.log("Server listening on http://localhost:8000");
  connectDB();
});
