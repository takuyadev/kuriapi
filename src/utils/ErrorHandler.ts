import { IError } from "../models/interfaces/IError"

// Return error object on for handling errors
export class ErrorHandler {
  status: number
  message: string
  data: Object

  constructor({ status, data, message }: IError) {
    this.status = status
    this.data = data
    this.message = message
  }

  get Error() {
    return {
      success: false,
      data: this.data,
      status: this.status,
      message: this.message,
    }
  }
}
