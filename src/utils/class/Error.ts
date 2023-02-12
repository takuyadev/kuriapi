// Return error object on for handling errors
export class Error {
  status: number
  message: string
  data: Object

  constructor(status: number, data: any, message: string) {
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
