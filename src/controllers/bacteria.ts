import { NextFunction, Request, Response } from "express";

// @method GET
// @route /bacteria
// @desc Gets all bacterias from the database
export const getBacterias = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    success: true,
  });
};

// @method GET
// @route /bacteria
// @desc Gets all bacterias from the database
export const getBacteriaById = (eq: Request, res: Response, next: NextFunction) => {
  res.json({
    success: true,
  });
};
