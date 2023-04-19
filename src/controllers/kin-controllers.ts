import { NextFunction, Request, Response } from "express";
import { getAllKins, getKinById } from "@/db/query/kin-queries";
import asyncHandler from "express-async-handler";

// @method GET
// @route /kin
// @desc Gets all kin from the database

export const getKins = asyncHandler(
   async (req: Request, res: Response, next: NextFunction) => {
      const data = await getAllKins(req.limit, req.offset * req.limit, req.lang_id);

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
      const { id: kinId } = req.params;
      const data = await getKinById(Number(kinId), req.lang_id);

      res.status(200).json({
         success: true,
         data: data,
      });
   }
);
