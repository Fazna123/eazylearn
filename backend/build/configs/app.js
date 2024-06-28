"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const morgan_1 = __importDefault(require("morgan"));
const error_1 = require("../middlewares/error");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const createServer = () => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    // if (process.env.NODE_ENV === "development") {
    //   app.use(
    //     cors({
    //       origin: process.env.ORIGIN,
    //       methods: ["GET", "POST", "PUT", "DELETE"],
    //       credentials: true,
    //     })
    //   );
    // }
    app.use((0, cors_1.default)());
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
        transports: ["websocket", "polling"],
    });
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cookie_parser_1.default)());
    app.use(error_1.ErrorMiddleWare);
    return { app, server, io };
};
exports.default = createServer;
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
