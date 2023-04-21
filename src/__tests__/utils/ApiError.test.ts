import { ApiError } from "@/utils/ApiError";

describe("ApiError", () => {
   it("should create an instance with the correct properties", () => {
     // Define sample data, status code, and message
     const data = { message: "Error message" };
     const statusCode = 500;
     const message = "Internal server error";
 
     // Create a new ApiError instance with the sample data
     const error = new ApiError(data, statusCode, message);
 
     // Assert that the resulting object has the correct properties set
     expect(error).toBeInstanceOf(Error);
     expect(error.message).toEqual(message);
     expect(error.statusCode).toEqual(statusCode);
     expect(error.data).toEqual(data);
   });
 });
 