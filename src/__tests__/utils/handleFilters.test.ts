import { QueryOptions } from "@/types/intefaces.common";
import { handleFilters } from "@/utils/handleFilters";

describe("handleFilters", () => {
   let params: any[]; // list of params to be passed in the query
   let index: number; // the current index of the params list
   let options: QueryOptions; // the query options
   let allowedSorts: string[]; // the list of allowed sort options

   beforeEach(() => {
      params = [];
      index = 1;
      options = { limit: 10, offset: 0, sort: "name", order: "asc", search: "" };
      allowedSorts = ["name", "created_at", "updated_at"];
   });

   it("should handle filters and return a query string", () => {
      const result = handleFilters(params, index, options, allowedSorts);

      // expect that the result string contains the expected clauses
      expect(result).toContain("ORDER BY b.name");
      expect(result).toContain("ASC");
      expect(result).toContain("LIMIT $1");

      // expect that the params list contains the expected values
      expect(params).toEqual([10]);
   });

   it("should handle filters with no sort and return a query string", () => {
      options.sort = "";
      const result = handleFilters(params, index, options, allowedSorts);

      // expect that the result string contains the expected clauses
      expect(result).toContain("ORDER BY a.id");
      expect(result).toContain("ASC");
      expect(result).toContain("LIMIT $1");

      // expect that the params list contains the expected values
      expect(params).toEqual([10]);
   });

   it("should handle filters with disallowed sorts and return a query string", () => {
      options.sort = "invalid";
      const result = handleFilters(params, index, options, allowedSorts);

      // expect that the result string contains the expected clauses
      expect(result).not.toContain("ORDER BY invalid");
      expect(result).toContain("ORDER BY a.id");
      expect(result).toContain("ASC");
      expect(result).toContain("LIMIT $1");

      // expect that the params list contains the expected values
      expect(params).toEqual([10]);
   });

   it("should handle filters with no limit or offset and return a query string", () => {
      options.limit = 0;
      options.offset = 0;
      const result = handleFilters(params, index, options, allowedSorts);

      // expect that the result string contains the expected clauses
      expect(result).toContain("ORDER BY b.name");
      expect(result).toContain("ASC");

      // expect that the params list is empty
      expect(params).toEqual([]);
   });

   it("should handle filters with offset and return a query string", () => {
      options.offset = 20;
      const result = handleFilters(params, index, options, allowedSorts);

      expect(result).toContain("ORDER BY b.name");
      expect(result).toContain("ASC");
      expect(result).toContain("LIMIT $1");
      expect(result).toContain("OFFSET $2");
      expect(params).toEqual([10, 20]);
   });
});
