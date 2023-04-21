import { ApiSuccess } from "@/utils/ApiSuccess";

describe("ApiSuccess", () => {
   it("should create an instance with the correct properties", () => {
     // Define sample data and message
     const data = { name: "John", age: 30 };
     const message = "Data retrieved successfully";
 
     // Create a new ApiSuccess instance with the sample data and message
     const success = new ApiSuccess(data, message);
 
     // Assert that the resulting object has the correct properties set
     expect(success.success).toEqual(true);
     expect(success.data).toEqual(data);
     expect(success.message).toEqual(message);
   });
 
   it("should create an instance without a message", () => {
     // Define sample data
     const data = { name: "John", age: 30 };
 
     // Create a new ApiSuccess instance with the sample data
     const success = new ApiSuccess(data, "");
 
     // Assert that the resulting object has the correct properties set
     expect(success.success).toEqual(true);
     expect(success.data).toEqual(data);
     expect(success.message).toBeUndefined();
   });
 });
 