import { NextFunction, Request, Response } from "express";
import { getAllKins, getKinById, getKinBySlug } from "@/db/query/kin-queries";
import asyncHandler from "express-async-handler";

// @method GET
// @route /kin
// @desc Gets all kin from the database

export const getKins = asyncHandler(
   async (req: Request, res: Response, next: NextFunction) => {
      const data = await getAllKins(
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

export const getKin = asyncHandler(
   async (req: Request, res: Response, next: NextFunction) => {
      let data: any = {};

      // If param id exists, then search by id
      if (req.param_id) {
         data = await getKinById(req.param_id, req.lang_id);
      }

      // If slug exists, then search by slug
      if (req.slug) {
         data = await getKinBySlug(req.slug, req.lang_id);
      }

      res.status(200).json({
         success: true,
         data: data,
      });
   }
);
