import { Response, Request } from "express"
import { isValidObjectId, Model } from "mongoose"
import { errorResponse } from "./errorResponse"

// Checks parameters and validate against if it is an ObjectId or normal string
// If empty: return false, if invalid: return error.
export async function getByNameOrId<T>(
  name: string,
  model: Model<T>,
  res: Response,
  req: Request
) {
  const { id } = req.params

  // Validate ID format and if req.params exists
  let data = null

  if (!isValidObjectId(id) && !req.params) {
    errorResponse(
      res,
      404,
      `Could not find any ${name} with provided query`,
      {}
    )
  }

  // If it's valid objectid, then search using objectId
  if (isValidObjectId(id)) {
    data = await model.findById(id)
  }

  // If not, then try using slug instead
  else {
    data = await model.findOne({ slug: id })
  }

  // If all search returns false, then respond with error
  if (!data) {
    errorResponse(
      res,
      404,
      `Could not find any ${name} with provided query`,
      {}
    )
  }

  return data
}

// Uses the paginate middleware to validate query
export async function getByPageAndLimit(
  name: string,
  model: any,
  res: Response,
  req: Request
) {
  let data

  // If query is not filled, find all Bacteria on database
  if (!req.query) {
    data = await model.find()
  }

  // If query is filled out, find based on query
  if (req.query) {
    const { page, limit } = req.query

    // Check query type, if not provide default
    const currentPage = typeof page === "string" ? parseInt(page) : 1
    const limitPerPage = typeof limit === "string" ? parseInt(limit) : 10

    // Return pagination results
    data = await model.paginate({}, { currentPage, limitPerPage })
  }

  if (!data) {
    errorResponse(res, 404, `No results for ${name} with provided query`, {})
  }

  return data
}
