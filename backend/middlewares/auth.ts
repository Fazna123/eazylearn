import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../enums/HttpStatus.enum";
import { redis } from "../utils/redis";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies);

  const access_token = req.cookies.access_token as string;
  console.log("accesstoken", access_token);

  if (!access_token) {
    return {
      status: HttpStatus.BadRequest,
      data: {
        success: false,
        message: "Please login",
      },
    };
  }

  const decoded = jwt.verify(
    access_token,
    process.env.ACCESS_TOKEN as string
  ) as JwtPayload;

  console.log("decoded", decoded);

  if (!decoded) {
    return {
      status: HttpStatus.BadRequest,
      data: {
        success: false,
        message: "Access Token is not valid",
      },
    };
  }

  const user = await redis.get(decoded.id);

  console.log("user", user);

  if (!user) {
    return {
      status: HttpStatus.NotFound,
      data: {
        success: false,
        message: "User not found",
      },
    };
  }

  //req.user = JSON.parse(user);
  req.user = JSON.parse(user);
  console.log(req.user);

  next();
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next({
        status: HttpStatus.BadRequest,
        data: {
          success: false,
          message: "Unauthorized Access",
        },
      });
    }
    // Continue processing if authorized
    next();
  };
};
