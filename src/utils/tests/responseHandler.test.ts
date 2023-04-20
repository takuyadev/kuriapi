import { describe, expect, it } from "vitest";
import { responseHandler } from "../responseHandler";

describe("responseHandler", () => {
   // Test that the function returns a successful response with data
   it("should return a successful response with data", () => {
      // Call the responseHandler function with a true result and some data
      const result = responseHandler(true, { foo: "bar" });

      // Expect that the success property of the response object is true
      expect(result.success).toBe(true);

      // Expect that the data property of the response object is equal to the provided data
      expect(result.data).toEqual({ foo: "bar" });
   });

   // Test that the function returns an unsuccessful response with data
   it("should return an unsuccessful response with data", () => {
      // Call the responseHandler function with a false result and some error data
      const result = responseHandler(false, { error: "Something went wrong" });

      // Expect that the success property of the response object is false
      expect(result.success).toBe(false);

      // Expect that the data property of the response object is equal to the provided error data
      expect(result.data).toEqual({ error: "Something went wrong" });
   });

   // Test that the function includes a message in the response if provided
   it("should include message in response if provided", () => {
      // Call the responseHandler function with a true result, some data, and a message
      const result = responseHandler(true, { foo: "bar" }, "Request successful");

      // Expect that the success property of the response object is true
      expect(result.success).toBe(true);

      // Expect that the data property of the response object is equal to the provided data
      expect(result.data).toEqual({ foo: "bar" });

      // Expect that the message property of the response object is equal to the provided message
      expect(result.message).toBe("Request successful");
   });
});
