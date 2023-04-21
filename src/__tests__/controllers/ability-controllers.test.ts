import { Request, Response, NextFunction } from "express";
import { getAbilities } from "@/controllers/ability-controllers";
import { getAllAbilities } from "@/db/query/ability-queries";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { Ability } from "@/types/intefaces.common";

// Mock the entire ability-queries module
jest.mock("@/db/query/ability-queries");

// Mock the getAllAbilities function from the ability-queries module
const mockGetAllAbilities = getAllAbilities as jest.MockedFunction<typeof getAllAbilities>;

// Define a test suite for the getAbilities function
describe("getAbilities", () => {
   // Define some variables to use in the test
   let req: Partial<Request>;
   let res: Partial<Response>;
   let next: NextFunction;

   // Set up the test environment before each test
   beforeEach(() => {
      // Set up a mock request object with a language ID and empty options
      req = { lang_id: 1, options: {} };
      // Set up a mock response object with a status method that returns `this` and a JSON method that does nothing
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      // Set up a mock next function
      next = jest.fn();
   });

   // Clean up the test environment after each test
   afterEach(() => {
      jest.clearAllMocks();
   });

   // Define a test case for when no abilities are found
   it("returns data with status 200 and a message if no abilities found", async () => {
      // Mock the getAllAbilities function to return an empty array
      mockGetAllAbilities.mockResolvedValue([]);

      // Call the getAbilities function with the mock request, response, and next objects
      await getAbilities(req as Request, res as Response, next);

      // Check that the response status is 200
      expect(res.status).toHaveBeenCalledWith(200);
      // Check that the response JSON contains an empty array and a message indicating that no abilities were found
      expect(res.json).toHaveBeenCalledWith(new ApiSuccess([], "Could not find any abilities"));
   });

   // Define a test case for when abilities are found
   it("returns data with status 200 and an empty message if abilities are found", async () => {
      // Set up some mock ability data
      const mockData: Ability[] = [
         { id: 2, slug: "defendimin", name: "マモルミン", description: "防御力アップ" },
         { id: 2, slug: "defendimin", name: "マモルミン", description: "防御力アップ" },
      ];
      // Mock the getAllAbilities function to return the mock data
      mockGetAllAbilities.mockResolvedValue(mockData);

      // Call the getAbilities function with the mock request, response, and next objects
      await getAbilities(req as Request, res as Response, next);

      // Check that the response status is 200
      expect(res.status).toHaveBeenCalledWith(200);
      // Check that the response JSON contains the mock data and an empty message
      expect(res.json).toHaveBeenCalledWith(new ApiSuccess(mockData, ""));
   });
});
