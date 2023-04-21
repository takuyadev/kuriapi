import { Request, Response, NextFunction } from "express";
import { getKin } from "@/controllers/kin-controllers";
import { getKinByIdOrSlug } from "@/db/query/kin-queries";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { Kin } from "@/types/intefaces.common";

// Mock the entire kin-queries module
jest.mock("@/db/query/kin-queries");

// Mock the getKinByIdOrSlug function from the kin-queries module
const mockGetKinByIdOrSlug = getKinByIdOrSlug as jest.MockedFunction<typeof getKinByIdOrSlug>;

// Define the test suite for the getKin function
describe("getKin", () => {
   // Define some variables to use in the tests
   let req: Partial<Request>;
   let res: Partial<Response>;
   let next: NextFunction;

   // Set up the test environment before each test
   beforeEach(() => {
      // Set up a mock request object with a language ID, options, and a mock ID parameter
      req = { lang_id: 1, options: {}, param_id: "1" };
      // Set up a mock response object with a status method that returns `this` and a JSON method that does nothing
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      // Set up a mock next function
      next = jest.fn();
   });

   // Clean up the test environment after each test
   afterEach(() => {
      jest.clearAllMocks();
   });

   // Define a test case for when no kin is found
   it("returns data with status 200 and a message if no kin found", async () => {
      // Mock the getKinByIdOrSlug function to return null
      mockGetKinByIdOrSlug.mockResolvedValue({});

      // Call the getKin function with the mock request, response, and next objects
      await getKin(req as Request, res as Response, next);

      // Check that the response status is 200
      expect(res.status).toHaveBeenCalledWith(200);
      // Check that the response JSON contains an empty object and a message indicating that no kin could be found
      expect(res.json).toHaveBeenCalledWith(new ApiSuccess<{}>({}, "Could not find specified Kin"));
   });

   // Define a test case for when a kin is found
   it("returns data with status 200 and an empty message if kin found", async () => {
      // Set up some mock kin data
      const mockData: Kin = {
         id: 1,
         slug: "kurikin",
         name: "くりキン",
         ability: "セメルミン",
         description:
            "最も多くぶんぶするキン。するどいせん毛をさか立て て攻撃する。いぜんは「うに」だと信じられていたが 研究が進み ｢くり」だということがわかった。",
         img: "https://raw.githubusercontent.com/takuyadev/kuriapi/main/assets/kin/face_sprite/kin_1.png",
         saying: "新しい自分",
         obtain: "primeval",
         hp: 76,
         attack: 53,
         defense: 11,
         attack_speed: 67,
         growth_speed: 236,
         speed: "A",
         size: "s",
         temperature: "average",
         ph: "neutral",
         type: {
            name: "edge",
            img: "https://picsum.photos/200/300",
         },
      };
      // Mock the getKinByIdOrSlug function to return the mock data
      mockGetKinByIdOrSlug.mockResolvedValue(mockData);

      // Call the getKin function with the mock request, response, and next objects
      await getKin(req as Request, res as Response, next);

      // Check that the response status is 200
      expect(res.status).toHaveBeenCalledWith(200);
      // Check that the response JSON contains the mock data and an empty message
      expect(res.json).toHaveBeenCalledWith(new ApiSuccess<Kin>(mockData, ""));
   });
});
