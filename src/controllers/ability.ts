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
    let ability

    // If query is not filled, find all Bacteria on database
    if (!req.query) {
      ability = await Ability.find()
    }

    // If query is filled out, find based on query
    if (req.query) {
      const { page, limit } = req.query

      // Check query type, if not provide default
      const currentPage = typeof page === "string" ? parseInt(page) : 1
      const limitPerPage = typeof limit === "string" ? parseInt(limit) : 10

      // Return pagination results
      ability = await Ability.paginate({}, { currentPage, limitPerPage })
    }

    if (!ability) {
      errorResponse(
        res,
        404,
        "Could not find ability with specified query.",
        {}
      )
    }

    res.status(200).json({
      success: true,
      ability,
    })
  }
)

// @route /ability/:id
// @desc Gets single ability
// @method GET
export const getAbility = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params
    let ability: string | null = ""

    // Validate ID format and if req.params exists
    if (!isValidObjectId(id) && !req.params) {
      errorResponse(res, 404, "Please provide proper parameters", {})
    }

    // If it's valid objectid, then search using objectId
    if (isValidObjectId(id)) {
      ability = await Ability.findById(id)
    }

    // If not, then try using slug instead
    else {
      ability = await Ability.findOne({ slug: id })
    }

    // If all search returns false, then respond with error
    if (!ability) {
      errorResponse(res, 404, "Could not find Bacteria with provided id", {})
    }

    res.status(200).json({
      success: true,
      ability,
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
      ability,
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

    ability?.save({ validateBeforeSave: false })

    res.status(200).json({
      success: true,
      ability,
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
