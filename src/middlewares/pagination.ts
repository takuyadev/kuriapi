import { Request, Response, NextFunction } from "express";

interface PaginationRequest extends Request {
   limit: number;
   offset: number;
}

// @desc Handles pagination queries

export const pagination = (
   req: PaginationRequest,
   _res: Response,
   next: NextFunction
) => {
   req.limit = Number(req.query.limit);
   req.offset = Number(req.query.page);

   if (!req.limit) {
      req.limit = 20;
   }

   if (!req.offset) {
      req.offset = 1;
   }

   next();
};
