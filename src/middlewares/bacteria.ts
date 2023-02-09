import { asyncHandler } from "./async"
import { Request, Response, NextFunction } from "express"
import { DUMMY_BACTERIA } from "../utils/dummy_data"

// @route /bacteria
// @desc Gets all bacteria
export const getBacterias = asyncHandler(
  (req: Request, res: Response, _next: NextFunction) => {
    const { game_index, name } = DUMMY_BACTERIA
    res.status(200).json({
      success: true,
      bacteria: [
        {
          name,
          game_index,
        },
      ],
    })
  }
)

// @route /bacteria
// @desc Gets all bacteria
export const getBacteria = asyncHandler(
  (req: Request, res: Response, _next: NextFunction) => {
    const bacteria = DUMMY_BACTERIA

    res.status(200).json({
      success: true,
      bacteria,
    })
  }
)
