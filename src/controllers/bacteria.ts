import Bacteria from "../schemas/Bacteria"
import Ability from "../schemas/Ability"
import { errorResponse } from "../middlewares/error"
import { asyncHandler } from "../middlewares/async"
import { Request, Response, NextFunction } from "express"
import { IBacteria } from "../models/interfaces/IBacteria"
import { IAbility } from "../models/interfaces/IAbility"
import { isValidObjectId } from "mongoose"

// @route /bacteria
// @desc Gets all bacteria
// @method GET
export const getBacterias = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    let bacteria

    // If query is not filled, find all Bacteria on database
    if (!req.query) {
      bacteria = await Bacteria.find()
    }

    // If query is filled out, find based on query
    if (req.query) {
      const { page, limit } = req.query

      // Check query type, if not provide default
      const currentPage = typeof page === "string" ? parseInt(page) : 1
      const limitPerPage = typeof limit === "string" ? parseInt(limit) : 10

      // Return pagination results
      bacteria = await Bacteria.paginate({}, { currentPage, limitPerPage })
    }

    if (!bacteria) {
      errorResponse(
        res,
        404,
        "Could not find bacteria with specified query.",
        {}
      )
    }

    res.status(200).json({
      success: true,
      bacteria,
    })
  }
)

// @route /bacteria/:id
// @desc Gets one bacteria by ID
// @method GET
export const getBacteria = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params
    let bacteria: string | null = ""

    // Validate ID format and if req.params exists
    if (!isValidObjectId(id) && !req.params) {
      errorResponse(res, 404, "Please provide proper parameters", {})
    }

    // If it's valid objectid, then search using objectId
    if (isValidObjectId(id)) {
      bacteria = await Bacteria.findById(id)
    }

    // If not, then try using slug instead
    else {
      bacteria = await Bacteria.findOne({ slug: id })
    }

    // If all search returns false, then respond with error
    if (!bacteria) {
      errorResponse(res, 404, "Could not find Bacteria with provided id", {})
    }

    res.status(200).json({
      success: true,
      bacteria,
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
      bacteria,
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
      bacteria,
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
