import { errorResponse } from "@/middlewares/error-middleware";
import { ApiError } from "@/types/intefaces.common";
import { Request, Response, NextFunction } from "express";

describe("errorResponse", () => {
  it("should set the response status and message based on the provided error object", () => {
    // Create a mock json function
    const jsonMock = jest.fn();

    // Create a mock response object with status and json functions
    const res = {
      status: jest.fn().mockImplementation(() => {
        return {
          json: jsonMock,
        };
      }),
    } as unknown as Response;

    // Create a mock ApiError object with the properties required
    const error: ApiError = {
      name: "string",
      success: false,
      statusCode: 404,
      data: {},
      message: "Not found",
    };

    // Call the errorResponse function with the mock error, request, response, and next function objects
    errorResponse(error, {} as Request, res, {} as NextFunction);

    // Check that the response status function is called with the correct status code
    expect(res.status).toHaveBeenCalledWith(404);

    // Check that the response json function is called with the correct error details
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      data: {},
      message: "Not found",
    });
  });
});
