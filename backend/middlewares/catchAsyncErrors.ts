import { Request, Response, NextFunction, RequestHandler } from "express";

export const CatchAsyncError =
  (theFunc: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
