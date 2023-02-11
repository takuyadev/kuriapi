import Bacteria from "../schemas/Bacteria"
import Ability from "../schemas/Ability"
import { errorResponse } from "../middlewares/errorResponse"
import { asyncHandler } from "../middlewares/async"
import { Request, Response, NextFunction } from "express"
import { IBacteria } from "../models/interfaces/IBacteria"
import { IAbility } from "../models/interfaces/IAbility"
import { getByNameOrId, getByPageAndLimit } from "../middlewares/query"
import { IPaginationResult } from "../models/interfaces/IPaginate"

// @route /bacteria
// @desc Gets all bacteria
// @method GET
export const getBacterias = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { data, next, previous } = (await getByPageAndLimit(
      "bacteria",
      Bacteria,
      res,
      req
    )) as IPaginationResult<IBacteria>

    res.status(200).json({
      success: true,
      data,
      next,
      previous,
    })
  }
)

// @route /bacteria/:id
// @desc Gets one bacteria by ID
// @method GET
export const getBacteria = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    let data = await getByNameOrId("bacteria", Bacteria, res, req)

    res.status(200).json({
      success: true,
      data,
    })
  }
)

// @route /bacteria
// @desc Add single bacteria to database
// @method POST
export const addBacteria = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Deconstruct ability out of request
    const { ability } = req.body

    // Search for ability data before adding bacteria
    const abilityResult: IAbility | null = await Ability.findById(ability._id)

    // Error handle if ability returns false
    if (!abilityResult) {
      errorResponse(res, 404, "Could not find ability with provided id", {})
    }

    // Create bacteria if ability is found
    const data: IBacteria = await Bacteria.create(req.body)

    res.status(200).json({
      success: true,
      data,
    })
  }
)

// @route /bacteria/:id
// @desc Update single bacteria to datavase
// @method PUT
export const updateBacteria = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Deconstruct ability out of request
    const { id } = req.params
    const { body }: { body: IBacteria } = req.body

    // Search for ability data before adding bacteria
    const data = await Bacteria.updateOne({ _id: id }, body)

    // Error handle if ability returns false
    if (!data) {
      errorResponse(res, 404, "Could not find Bacteria with provided id", {})
    }

    res.status(200).json({
      success: true,
      data,
    })
  }
)

// @route /bacteria/:id
// @desc Delete single bacteria to
// @method DELETE
export const deleteBacteria = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Deconstruct ability out of request
    const { id } = req.params
    const { body }: { body: IBacteria } = req.body

    // Search for ability data before adding bacteria
    const data = await Bacteria.findByIdAndDelete(id, body)

    // Error handle if ability returns false
    if (!data) {
      errorResponse(res, 404, "Could not find Bacteria with provided id", {})
    }

    res.status(200).json({
      success: true,
      data: {},
    })
  }
)
