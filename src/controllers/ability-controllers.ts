import { NextFunction, Request, Response } from "express";
import { getAllAbilities, getAbilityByIdOrSlug } from "@/db/query/ability-queries";
import { handleResponse } from "utils/handleResponse";
import { asyncHandler } from "@/middlewares/aysnc-middleware";

// @method GET
// @route /ability`
// @desc Gets all abilities in database

export const getAbilities = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
   // Set message if any errors occur
   let message = "";
   
   // Await for data kins query response
   const { lang_id, options} = req;
   const data = await getAllAbilities(lang_id, options);

   // If there is no data (length of 0)
   if (data.length === 0) {
      message = "Could not find any abilities";
   }

   // If there is data, return 200
   res.status(200).json(handleResponse(true, data, message));
});

// @method GET
// @route /ability/:id
// @desc Get one ability by id or slug

export const getAbility = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
   // Set message if any errors occur
   let message = "";

   // Await for kin by slug or id response
   const data = await getAbilityByIdOrSlug(req.param_id, req.slug, req.lang_id);

   // If data is empty (empty {})
   if (!data) {
      message = "Could not find specified ability";
   }

   // If data isn't empty, return with 200
   res.status(200).json(handleResponse(true, data, message));
});
