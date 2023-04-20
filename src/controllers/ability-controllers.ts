import { NextFunction, Request, Response } from "express";
import {
   getAllAbilities,
   getAbilityById,
   getAbilityBySlug,
} from "@/db/query/ability-queries";
import asyncHandler from "express-async-handler";

// @method GET
// @route /kin
// @desc Gets all kin from the database

export const getAbilities = asyncHandler(
   async (req: Request, res: Response, next: NextFunction) => {
      const data = await getAllAbilities(
         req.limit,
         req.offset * req.limit,
         req.lang_id
      );

      res.status(200).json({
         success: true,
         data: data,
      });
   }
);

// @method GET
// @route /kin/:id
// @desc Get kin by id from the database

export const getAbility = asyncHandler(
   async (req: Request, res: Response, next: NextFunction) => {
      let data: any = {};

      // If param id exists, then search by id
      if (req.param_id) {
         data = await getAbilityById(req.param_id, req.lang_id);
      }

      // If param id exists, then search by id
      if (req.slug) {
         data = await getAbilityBySlug(req.slug, req.lang_id);
      }

      res.status(200).json({
         success: true,
         data: data,
      });
   }
);
