import { IError } from "../models/interfaces/IError"
import { ErrorHandler } from "../utils/ErrorHandler"
import { Response } from "express"

export const errorResponse = (
  res: Response,
  status: number,
  message: string,
  data: any
) => {
  const error = new ErrorHandler({ status, message, data }).Error

  res.status(error.status).json({
    error,
  })
}
