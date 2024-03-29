import { NextFunction, Request, Response } from "express";

// @desc Handles all supported params
// @query id/slug

export const params = (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   const parseId = Number(id)

   // Check if Parse ID is a proper number
   if(!isNaN(parseId)){
      req.param_id = parseId
   }

   // Check if Parse ID is not a number
   if(isNaN(parseId)){
      req.slug = id
   }

   next();
};
