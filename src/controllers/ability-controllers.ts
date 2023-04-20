import { NextFunction, Request, Response } from "express";
import {
   getAllAbilities,
   getAbilityByIdOrSlug,
} from "@/db/query/ability-queries";
import asyncHandler from "express-async-handler";

// @method GET
// @route /ability
// @desc Gets all abilities in database

export const getAbilities = asyncHandler(
   async (req: Request, res: Response, _next: NextFunction) => {
      const data = await getAllAbilities(
         req.lang_id,
         req.limit,
         req.offset * req.limit
      );

      if (!data.success) {
         res.status(500).json(data);
      }
   }
);

// @method GET
// @route /ability/:id
// @desc Get one ability by id or slug

export const getAbility = asyncHandler(
   async (req: Request, res: Response, _next: NextFunction) => {
      const data = await getAbilityByIdOrSlug(
         req.param_id,
         req.slug,
         req.lang_id
      );

      res.status(200).json({
         success: true,
         data: data,
      });
   }
);
