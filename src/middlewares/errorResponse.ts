import { Error } from "../utils/class/Error"
import { Response } from "express"

export const errorResponse = (
  res: Response,
  status: number,
  message: string,
  data: any
) => {
  const error = new Error(status, message, data).Error

  res.status(error.status).json({
    ...error,
  })
}
