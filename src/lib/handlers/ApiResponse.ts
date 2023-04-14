// This class represents an API response object and provides a consistent way to format response objects for both success and error cases.

class ApiResponse {
  // Status code of the response
  status: number;
  message: string;
  data: Object;

  // Constructor method to initialize the properties
  constructor(status: number, data: Object, message: string) {
    this.status = status;
    this.data = data;
    this.message = message;
  }

  // Getter method to return success response object
  get success() {
    return {
      success: true,
      data: this.data,
      status: this.status,
      message: this.message,
    };
  }

  // Getter method to return error response object
  get error() {
    return {
      success: false,
      data: this.data,
      status: this.status,
      message: this.message,
    };
  }
}
