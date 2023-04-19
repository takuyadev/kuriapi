import { getIdByIsoCode } from "@/db/query/language-queries";
import { IsoCodeType } from "@/types/types.common";
import { Request, Response, NextFunction } from "express";

// @desc Handles pagination queries

export const language = async (
   req: Request,
   _res: Response,
   next: NextFunction
) => {
   const isoCode = req.query.lang as IsoCodeType || undefined;

   // If language is not specified, then use JP as default
   if (!isoCode) {
      req.lang_id = 2;
   }

   // If language was specified, try getting language id
   if (isoCode) {
      req.lang_id = await getIdByIsoCode(isoCode);
      console.log(req.lang_id)
   }

   next();
};
