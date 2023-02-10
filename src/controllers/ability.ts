// @route /bacteria
import Ability from "../schemas/Ability"
import { asyncHandler } from "../middlewares/async"
import { Request, Response, NextFunction } from "express"
import { errorResponse } from "../middlewares/error"
import { isValidObjectId } from "mongoose"
import { IAbility } from "../models/interfaces/IAbility"

// @route /ability
// @desc Gets all abilties
// @method GET
export const getAbilities = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const ability = await Ability.find()

    res.status(200).json({
      success: true,
      data: ability,
    })
  }
)

// @route /ability/:id
// @desc Gets single ability
// @method GET
export const getAbility = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params

    // Validate ID format
    if (!isValidObjectId(id)) {
      errorResponse(res, 404, "Please provide proper ObjectId", {})
    }

    const ability = await Ability.findById(id)

    // Error handle if no ability was found
    if (!ability) {
      errorResponse(res, 404, "Could not find ability", { id })
    }

    res.status(200).json({
      success: true,
      data: ability,
    })
  }
)

// @route /ability
// @desc Adds single ability
// @method POST
export const addAbility = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const ability = await Ability.create(req.body)

    res.status(200).json({
      success: true,
      data: ability,
    })
  }
)

// @route /bacteria/:id
// @desc Update single bacteria to
// @method PUT
export const updateAbility = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Deconstruct ability out of request
    const { id } = req.params
    const data: IAbility = req.body

    // Search for ability data before adding bacteria
    const ability = await Ability.findByIdAndUpdate(id, data, { new: true })

    // Error handle if ability returns false
    if (!ability) {
      errorResponse(res, 404, "Could not find ability with provided id", {})
    }

    res.status(200).json({
      success: true,
      data: ability,
    })
  }
)

// @route /ability/:id
// @desc Delete single ability to
// @method DELETE
export const deleteAbility = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Deconstruct ability out of request
    const { id } = req.params
    const data: IAbility = req.body

    // Search for ability data before adding bacteria
    const ability = await Ability.findByIdAndDelete(id, data)

    // Error handle if ability returns false
    if (!ability) {
      errorResponse(res, 404, "Could not find Bacteria with provided id", {})
    }

    res.status(200).json({
      success: true,
      data: {},
    })
  }
)
