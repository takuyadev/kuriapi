import { Request, Response, NextFunction, RequestHandler } from "express";
import { errorResponse } from "./error-middleware";
import { ApiError } from "@/types/intefaces.common";

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler => {
   return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch((error: ApiError) => {
         errorResponse(error, req, res, next)
      });
   };
};
