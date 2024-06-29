"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpStatus_enum_1 = require("../enums/HttpStatus.enum");
const redis_1 = require("../utils/redis");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req);
    console.log("req.cookies in isAthenticated", req.cookies);
    const access_token = req.cookies.access_token;
    // console.log("access_token:", access_token);
    if (!access_token) {
        return {
            status: HttpStatus_enum_1.HttpStatus.BadRequest,
            data: {
                success: false,
                message: "Please login",
            },
        };
    }
    const decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
    // console.log("decoded", decoded);
    if (!decoded) {
        return {
            status: HttpStatus_enum_1.HttpStatus.BadRequest,
            data: {
                success: false,
                message: "Access Token is not valid",
            },
        };
    }
    const user = yield redis_1.redis.get(decoded.id);
    // console.log("user", user);
    if (!user) {
        return {
            status: HttpStatus_enum_1.HttpStatus.NotFound,
            data: {
                success: false,
                message: "User not found",
            },
        };
    }
    //req.user = JSON.parse(user);
    req.user = JSON.parse(user);
    // console.log("req.user in isAuthenticated", req.user);
    console.log("req.user", req.user);
    next();
});
exports.isAuthenticated = isAuthenticated;
const authorizeRoles = (...roles) => {
    // console.log("authorizeRoles");
    return (req, res, next) => {
        var _a;
        if (!roles.includes(((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || "")) {
            return res.status(500).send({
                success: false,
                message: "Unauthorized Action",
            });
        }
        // Continue processing if authorized
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
