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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createServer = () => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    console.log("origin", process.env.ORIGIN);
    //app.use(cors());
    const corsOptions = {
        origin: "https://eazylearn.xyz",
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "https://eazylearn.xyz",
            methods: ["GET", "POST"],
            credentials: true,
        },
        transports: ["websocket", "polling"],
    });
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "https://eazylearn.xyz");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    });
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)("dev"));
    app.use(error_1.ErrorMiddleWare);
    return { app, server, io };
};
exports.default = createServer;
// //body-parser
// app.use(express.json());
// app.use(morgan("tiny"));
// //cookie parser
// app.use(cookieParser());
// app.use(ErrorMiddleWare);
