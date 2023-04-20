import { NextFunction, Request, Response } from "express";
import { getAllKins, getKinByIdOrSlug } from "@/db/query/kin-queries";
import asyncHandler from "express-async-handler";
import { responseHandler } from "utils/responseHandler";

// @method GET
// @route /kin
// @desc Gets all kin from the database

export const getKins = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
   // Set message if any errors occur
   let message = "";

   // Await for data kins query response
   const data = await getAllKins(req.lang_id, req.limit, req.offset * req.limit);

   // If there is no data (length of 0)
   if (data.length === 0) {
      message = "Could not find any Kin";
   }

   // If there is data, return 200
   res.status(200).json(responseHandler(true, data, message));
});

// @method GET
// @route /kin/:id
// @desc Get kin by id from the database

export const getKin = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
   // Set message if any errors occur
   let message = "";

   // Await for kin by slug or id response
   const data = await getKinByIdOrSlug(req.param_id, req.slug, req.lang_id);

   // If data is empty (empty {})
   if (!data) {
      message = "Could not find specified Kin";
   }

   // If data isn't empty, return with 200
   res.status(200).json(responseHandler(true, data, message));
});
