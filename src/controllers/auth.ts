import User from "../schemas/User"
import { NextFunction, Request, Response } from "express"
import { asyncHandler } from "../middlewares/async"
import { errorResponse } from "../middlewares/errorResponse"
import { IUserModel, IUser } from "../models/interfaces/IUser"

export const login = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body

    // If email or password is not provided, then return error
    if (!email || !password) {
      errorResponse(res, 404, "Please enter credentials", {})
    }

    //@ts-ignore
    const user: IUserModel = await User.findOne({ email: email })

    //  If user doesn't exist, return error
    if (!user) {
      errorResponse(
        res,
        404,
        "No user found with provided email, please provide another email",
        {}
      )
    }

    const isMatch = user.matchPassword(password)

    // Check if provided password matches with encrypted password
    if (!isMatch) {
      errorResponse(
        res,
        404,
        "Invalid password, please enter valid password, ",
        {}
      )
    }

    sendTokenResponse(res, 200, user)
  }
)

export const register = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body

    // If email or password is not provided, then return error
    if (!email || !password) {
      errorResponse(res, 404, "Please enter credentials", {})
    }

    // @ts-ignore
    const user: IUserModel = await User.create(req.body)

    if (!user) {
      errorResponse(res, 404, "Error creating user.", {})
    }

    sendTokenResponse(res, 200, user)
  }
)

const sendTokenResponse = (res: Response, status: number, user: IUserModel) => {
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  res.header("Authorization", "Bearer " + token)

  res.status(status).json({
    success: true,
    token,
  })
}
