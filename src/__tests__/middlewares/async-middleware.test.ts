import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "@/middlewares/aysnc-middleware";
import { errorResponse } from "@/middlewares/error-middleware";
import { ApiError } from "@/utils/ApiError";

// Define the test suite for the asyncHandler function
describe("asyncHandler", () => {
  // Define some variables to use in the tests
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  // Define a mock function that resolves immediately
  const mockFn = jest.fn().mockResolvedValue(undefined);

  // Set up the test environment before each test
  beforeEach(() => {
    // Set up a mock request object
    req = { body: {}, query: {}, params: {}, headers: {}, get: jest.fn() };
    // Set up a mock response object
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    // Set up a mock next function
    next = jest.fn();
  });

  // Clean up the test environment after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Define a test case for when the function passed to asyncHandler resolves successfully
  it("calls the function passed to it with the request, response, and next arguments", async () => {
    // Call the asyncHandler function with the mock function
    const middleware = asyncHandler(mockFn);
    await middleware(req as Request, res as Response, next);

    // Check that the mock function was called with the request, response, and next arguments
    expect(mockFn).toHaveBeenCalledWith(req, res, next);
  });

//   // Define a test case for when the function passed to asyncHandler throws an error
//   it("calls the errorResponse middleware with the error, request, response, and next arguments", async () => {
//     // Set up a mock error object
//     const mockError: ApiError = new ApiError({}, 500, "Internal server error");

//     // Define a mock function that throws the error
//     const mockFnWithError = jest.fn().mockRejectedValueOnce(mockError);

//     // Call the asyncHandler function with the mock function that throws the error
//     const middleware = asyncHandler(mockFnWithError);
//     await middleware(req as Request, res as Response, next);

//     // Check that the errorResponse middleware was called with the error, request, response, and next arguments
//     expect(errorResponse).toHaveBeenCalledWith(mockError, req, res, next);
//   });
});
