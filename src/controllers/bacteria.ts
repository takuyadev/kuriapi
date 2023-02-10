import Bacteria from "../schemas/Bacteria"
import Ability from "../schemas/Ability"
import { errorResponse } from "../middlewares/error"
import { asyncHandler } from "../middlewares/async"
import { Request, Response, NextFunction } from "express"
import { IBacteria } from "../models/interfaces/IBacteria"
import { IAbility } from "../models/interfaces/IAbility"
import { isValidObjectId, ObjectId } from "mongoose"

// @route /bacteria
// @desc Gets all bacteria
// @method GET
export const getBacterias = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const bacteria = await Bacteria.find()

    res.status(200).json({
      success: true,
      data: bacteria,
    })
  }
)

// @route /bacteria/:id
// @desc Gets one bacteria by ID
// @method GET
export const getBacteria = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params

    // Validate ID format
    if (!isValidObjectId(id)) {
      errorResponse(res, 404, "Please provide proper ObjectId", {})
    }

    const bacteria = await Bacteria.findById(id)

    if (!bacteria) {
      errorResponse(res, 404, "Could not find Bacteria with provided id", {})
    }

    res.status(200).json({
      success: true,
      data: bacteria,
    })
  }
)

// @route /bacteria
// @desc Add single bacteria to
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
    const bacteria: IBacteria = await Bacteria.create(req.body)

    res.status(200).json({
      success: true,
      data: bacteria,
    })
  }
)

// @route /bacteria/:id
// @desc Update single bacteria to
// @method PUT
export const updateBacteria = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Deconstruct ability out of request
    const { id } = req.params
    const data: IBacteria = req.body

    // Search for ability data before adding bacteria
    const bacteria = await Bacteria.findByIdAndUpdate(id, data)

    // Error handle if ability returns false
    if (!bacteria) {
      errorResponse(res, 404, "Could not find Bacteria with provided id", {})
    }

    bacteria?.save({ validateBeforeSave: false })

    res.status(200).json({
      success: true,
      data: bacteria,
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
    const data: IBacteria = req.body

    // Search for ability data before adding bacteria
    const bacteria = await Bacteria.findByIdAndDelete(id, data)

    // Error handle if ability returns false
    if (!bacteria) {
      errorResponse(res, 404, "Could not find Bacteria with provided id", {})
    }

    res.status(200).json({
      success: true,
      data: {},
    })
  }
)
