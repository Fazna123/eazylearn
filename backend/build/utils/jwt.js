// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.sendToken = exports.refreshTokenOptions = exports.accessTokenOptions = exports.refreshTokenExpire = exports.accessTokenExpire = void 0;
// const dotenv_1 = __importDefault(require("dotenv"));
// dotenv_1.default.config();
// const redis_1 = require("./redis");
// exports.accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
// exports.refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1000", 10);
// exports.accessTokenOptions = {
//     expires: new Date(Date.now() + exports.accessTokenExpire * 1000),
//     maxAge: exports.accessTokenExpire * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: "lax",
// };
// exports.refreshTokenOptions = {
//     expires: new Date(Date.now() + exports.refreshTokenExpire * 1000),
//     maxAge: exports.refreshTokenExpire * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: "lax",
// };
// const sendToken = (user, statusCode, res) => {
//     const accessToken = user.signAccessToken();
//     const refreshToken = user.signRefreshToken();
//     //upload session to redis
//     redis_1.redis.set(user._id, JSON.stringify(user));
//     if (process.env.NODE_ENV === "production") {
//         exports.accessTokenOptions.secure = true;
//     }
//     res.cookie("access_token", accessToken, exports.accessTokenOptions);
//     res.cookie("refresh_token", refreshToken, exports.refreshTokenOptions);
//     res.status(statusCode).json({
//         success: true,
//         user,
//         accessToken,
//     });
// };
// exports.sendToken = sendToken;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken =
  exports.refreshTokenOptions =
  exports.accessTokenOptions =
  exports.refreshTokenExpire =
  exports.accessTokenExpire =
    void 0;
const dotenv_1 = require("dotenv");
const redis_1 = require("./redis");
dotenv_1.config();
exports.accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
exports.refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1000",
  10
);
exports.accessTokenOptions = {
  expires: new Date(Date.now() + exports.accessTokenExpire * 1000),
  maxAge: exports.accessTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};
exports.refreshTokenOptions = {
  expires: new Date(Date.now() + exports.refreshTokenExpire * 1000),
  maxAge: exports.refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};
const sendToken = (user, statusCode, res) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();
  //upload session to redis
  redis_1.redis.set(user._id, JSON.stringify(user));
  if (process.env.NODE_ENV === "production") {
    exports.accessTokenOptions.secure = true;
  }
  res.cookie("access_token", accessToken, exports.accessTokenOptions);
  res.cookie("refresh_token", refreshToken, exports.refreshTokenOptions);
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
exports.sendToken = sendToken;
