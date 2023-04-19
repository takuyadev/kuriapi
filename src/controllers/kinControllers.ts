import db from "@db/db";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { getAllKins, getKinById } from "@db/query/kinQueries";

// @method GET
// @route /kin
// @desc Gets all kin from the database

export const getKins = asyncHandler(
   async (req: Request, res: Response, next: NextFunction) => {
      const data = await getAllKins(20, 0);

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
      const { id } = req.params;
      let { lang } = req.query;

      if (!lang) {
         lang = "2";
      }

      const data = await getKinById(id);

      res.status(200).json({
         success: true,
         data: data,
      });
   }
);
