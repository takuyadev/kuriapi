import { Request, Response, NextFunction } from "express";
import { IsoCodeType } from "@/types/types.common";
import { getIdByIsoCode } from "@/db/query/language-queries";

// @desc Handles all supported queries
// @query limit, page, lang

export const advancedQueries = async (req: Request, res: Response, next: NextFunction) => {
   // Setup all queries to next middleware
   req.limit = Number(req.query.limit);
   req.offset = Number(req.query.page);
   const isoCode = req.query.lang as IsoCodeType;

   // If limit is not defined, set default of 20
   if (!req.limit) {
      req.limit = 20;
   }

   // If offset is undefined, set default of 0
   if (!req.offset) {
      req.offset = 0;
   }

   // If language is not specified, then use JP as default
   if (!isoCode) {
      req.lang_id = 2;
   }

   // If language was specified, try getting language id
   if (isoCode) {
      req.lang_id = await getIdByIsoCode(isoCode);
   }

   next();
};
