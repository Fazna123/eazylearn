import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  stack?: string;
  path?: string;
  code?: number;
}

export const ErrorMiddleWare = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb error
  if (err.name === "CastError") {
    const message = `Resource not found.Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Duplicate Key Error
  if (err.name === "MongoError" && err.code === 11000) {
    // const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    const message = `A user with this this unique key already exists!`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //Jwt expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });

  next();
};
