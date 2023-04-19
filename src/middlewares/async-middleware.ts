import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express-serve-static-core";

export const asyncHandler =
   (fn: RequestHandler) =>
   (req: Request, res: Response, next: NextFunction): Promise<void> =>
      Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
