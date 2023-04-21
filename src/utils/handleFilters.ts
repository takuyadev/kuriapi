import { QueryOptions } from "@/types/intefaces.common";

// This is an side effect function that takes in current query options, and modifies
export const handleFilters = (params: any[], index: number, options: QueryOptions, allowedSorts: string[]) => {
   let query = "";

   // Destructure all options
   const { limit, offset, sort, order } = options;

   // If sort is not provided, then default to sort by id
   if (!allowedSorts.includes(sort)) {
      query += `ORDER BY a.id `;
   }

   // Avoid SQL injection by only allowing the values in allowedSorts
   if (sort && allowedSorts.includes(sort)) {
      let prefix = "a";

      // If it's name, then we have to look into the translations prefix
      if (sort === "name") {
         prefix = "b";
      }

      // Concatenate prefix and sort name
      query += `ORDER BY ${prefix + "." + sort} `;
   }

   // Handle order of data
   if (order) {
      // To avoid SQL injection, only allow desc or asc as queries
      query += `${order === "desc" ? "DESC" : "ASC"} `;
   }

   // Handle page limit
   if (limit !== 0 &&  typeof limit === "number") {
      query += `LIMIT $${index++} `;
      params.push(limit);
   }

   // Handle offset or skip pages
   if (offset !== 0 &&  typeof offset === "number") {
      query += `OFFSET $${index++} `;
      params.push(offset);
   }

   // Return query to
   return query;
};
