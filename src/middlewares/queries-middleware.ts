import { Request, Response, NextFunction } from "express";
import { IsoCodeType } from "@/types/types.common";
import { QueryOptions } from "@/types/intefaces.common";
import { getIdByIsoCode } from "@/db/query/language-queries";

// @desc Handles all supported queries
// @query limit, page, lang

export const advancedQueries = async (req: Request, res: Response, next: NextFunction) => {
   // Destructure query strings
   const { limit, page, order, sort, search } = req.query;

   // Setup all queries to next middleware
   const isoCode = req.query.lang as IsoCodeType;

   // Setup filter options for next()
   const options: QueryOptions = {
      limit: limit ? Number(limit) : 0,
      offset: page && limit ? Number(page) * Number(limit) : page ? Number(page) : 0,
      sort: sort ? String(sort) : "",
      order: order ? String(order) : "",
      search: search ? String(search) : "",
   };

   // If language is not specified, then use JP as default
   if (!isoCode) {
      req.lang_id = 2;
   }

   // If language was specified, try getting language id
   if (isoCode) {
      req.lang_id = await getIdByIsoCode(isoCode);
   }

   // Set new options to pass to next middleware
   req.options = options;

   next();
};
