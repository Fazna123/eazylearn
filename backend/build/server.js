"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Request, Response } from "express";
const app_1 = __importDefault(require("./configs/app"));
const db_1 = __importDefault(require("./configs/db"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_route_1 = __importDefault(require("./routes/user.route"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const chat_repository_1 = __importDefault(require("./repositories/chat.repository"));
const socket_utils_1 = __importDefault(require("./utils/socket.utils"));
const chatRepository = new chat_repository_1.default();
const { app, server, io } = (0, app_1.default)();
const socketUtils = new socket_utils_1.default(chatRepository);
socketUtils.configureSocketIO(io);
app.use("/api/user", user_route_1.default);
app.use("/api/admin", admin_route_1.default);
app.use("/api/user", course_route_1.default);
app.use("/api/order", order_route_1.default);
app.use("/api/chat", chat_route_1.default);
// app.all("*", (req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: "Invalid Route in URL",
//   });
// });
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});
server.listen(process.env.PORT, () => {
    console.log("Server listening on http://localhost:8000");
    (0, db_1.default)();
});
