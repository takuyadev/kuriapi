import jwt, { JwtPayload } from "jsonwebtoken"
import { asyncHandler } from "./async"
import { errorResponse } from "./errorResponse"
import User from "../schemas/User"
import { NextFunction, Request, Response } from "express"

// Protect routes
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | null = null

    // Check if token in header is in proper format
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    }

    // Make sure token exists
    if (!token) {
      errorResponse(res, 401, "No token in header", {})
    }

    try {
      // Verify token
      const decoded: JwtPayload = jwt.verify(token!, process.env.JWT_SECRET)

      // Send user to next middleware
      req.user = await User.findById(decoded.id)

      next()
    } catch (err) {
      errorResponse(res, 401, "Token has expired", {})
    }
  }
)

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.roles)) {
      errorResponse(res, 403, "Unauthroized to access this route", {})
    }
    next()
  }
}
