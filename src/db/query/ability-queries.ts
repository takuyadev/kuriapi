import db from "@/db/db";
import { QueryResult } from "pg";
import { Ability, QueryOptions } from "@/types/intefaces.common";
import { handleFilters } from "@/utils/handleFilters";

// @desc Queries all abilities from the database
// @params langId, limit, page

export const getAllAbilities = async (langId: number, options: QueryOptions) => {
   // Setup indexing
   let params: any[] = [];
   let paramIndex = 1;
   const allowedSorts = ["id", "name", "slug"];

   // Setup conditional queries
   let conditionalQueries = "";

   // All conditional queries
   if (langId) {
      conditionalQueries += `WHERE b.language_id = $${paramIndex++} `;
      params.push(langId);
   }

   // Search for ability
   if (options.search) {
      // If search for name is provided, then use either name or slug to search
      conditionalQueries += `AND b.name LIKE $${paramIndex} OR a.slug LIKE $${paramIndex++} `;
      params.push(`%${options.search}%`);
   }
   
   // Setup filter queries
   const filterQueries = handleFilters(params, paramIndex, options, allowedSorts);

   let query = `
      SELECT 
         a.id, 
         a.slug,
         b.name, 
         b.description 
      FROM abilities AS a
         JOIN ability_translations AS b ON (a.id = b.ability_id) 
         ${conditionalQueries}
         ${filterQueries}
   `;

   // Attempt request for all abilities from database
   try {
      const result: QueryResult = await db.query(query, params);
      const data: Ability[] = result.rows;

      // Return success object
      return data;
   } catch (err) {
      // If await query throws error
      // Return error object
      throw err;
   }
};

// @desc Queries one ability by id or slug
// @params id, slug, langId

export const getAbilityByIdOrSlug = async (id: number, slug: string, langId: number) => {
   // Conditionally change slug or id based on what is provided
   const filterQuery = slug ? "slug" : id ? " id" : "";
   const param = slug ? slug : id ? id : "";

   // Setup query for query call later
   const query = `
      SELECT 
         a.id, 
         b.name, 
         a.slug,
         b.description 
      FROM abilities AS a
         JOIN ability_translations AS b ON (a.id = b.ability_id)
         WHERE 
            a.${filterQuery} = $1
            AND b.language_id = $2;
   `;

   // Attempt request for one ability from database
   try {
      const result: QueryResult = await db.query(query, [param, langId]);
      const data: Ability = result.rows[0];

      // Return success object
      return data;
   } catch (err) {
      throw err;
   }
};
