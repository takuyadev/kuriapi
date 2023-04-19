import { Request, Response, NextFunction } from "express";

// @desc Handles pagination queries

export const pagination = (req: Request, res: Response, next: NextFunction) => {
   req.limit = Number(req.query.limit);
   req.offset = Number(req.query.page);

   if (!req.limit) {
      req.limit = 20;
   }

   if (!req.offset) {
      req.offset = 0;
   }

   next();
};
