import { advancedQueries } from "@/middlewares/queries-middleware";
import { Request, Response, NextFunction } from "express";
import { getIdByIsoCode } from "@/db/query/language-queries";

jest.mock("@/db/query/language-queries");

describe("advancedQueries middleware", () => {
   let req: Request;
   let res: Response;
   let next: NextFunction;

   beforeEach(() => {
      req = {
         query: {},
         lang_id: 0,
         options: {},
      } as Request;
      res = {} as Response;
      next = jest.fn() as unknown as NextFunction;
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   it("should set default language if none specified", async () => {
      await advancedQueries(req, res, next);

      // Check that the default language id is set correctly
      expect(req.lang_id).toBe(2);

      // Check that the options are set correctly
      expect(req.options).toEqual({
         limit: 0,
         offset: 0,
         sort: "",
         order: "",
         search: "",
      });

      // Check that the next function is called
      expect(next).toHaveBeenCalled();
   });

   it("should set language id if specified", async () => {
      // Mock the getIdByIsoCode function to return 1
      const mockedGetIdByIsoCode = getIdByIsoCode as jest.MockedFunction<typeof getIdByIsoCode>;
      mockedGetIdByIsoCode.mockResolvedValue(1);

      // Set the lang query parameter to "en"
      req.query.lang = "en";

      await advancedQueries(req, res, next);

      // Check that the language id is set correctly
      expect(req.lang_id).toBe(1);

      // Check that the options are set correctly
      expect(req.options).toEqual({
         limit: 0,
         offset: 0,
         sort: "",
         order: "",
         search: "",
      });

      // Check that the next function is called
      expect(next).toHaveBeenCalled();
   });

   it("should set filter options if provided", async () => {
      // Set some query parameters
      req.query.limit = "10";
      req.query.page = "2";
      req.query.sort = "name";
      req.query.order = "asc";
      req.query.search = "test";

      await advancedQueries(req, res, next);

      // Check that the language id is 2 (default)
      expect(req.lang_id).toBe(2);

      // Check that the options are set correctly
      expect(req.options).toEqual({
         limit: 10,
         offset: 20,
         sort: "name",
         order: "asc",
         search: "test",
      });

      // Check that the next function is called
      expect(next).toHaveBeenCalled();
   });
});
