import { params } from "@/middlewares/params-middleware";
import { Request, Response, NextFunction } from "express";

describe("params middleware", () => {
  it("should set the param_id property if the provided parameter is a valid number", () => {
    // Create a mock request object with a valid number parameter
    const req = {
      params: { id: "123" },
      param_id: null,
      slug: null,
    } as unknown as Request;

    // Create a mock response object and next function
    const res = {} as Response;
    const next = jest.fn() as unknown as NextFunction;

    // Call the params middleware function with the mock objects
    params(req, res, next);

    // Check that the param_id property is set correctly
    expect(req.param_id).toBe(123);
    expect(req.slug).toBe(null);
    expect(next).toHaveBeenCalled();
  });

  it("should set the slug property if the provided parameter is not a valid number", () => {
    // Create a mock request object with a non-number parameter
    const req = {
      params: { id: "abc" },
      param_id: null,
      slug: null,
    } as unknown as Request;

    // Create a mock response object and next function
    const res = {} as Response;
    const next = jest.fn() as unknown as NextFunction;

    // Call the params middleware function with the mock objects
    params(req, res, next);

    // Check that the slug property is set correctly
    expect(req.param_id).toBe(null);
    expect(req.slug).toBe("abc");
    expect(next).toHaveBeenCalled();
  });
});
