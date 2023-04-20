import db from "@/db/db";
import { QueryResult } from "pg";
import { Ability } from "@/types/intefaces.common";

// @desc Queries all abilities from the database
// @params langId, limit, page

export const getAllAbilities = async (langId: number, limit: number, offset: number) => {
   // Setup query for getting abilities
   const query = `
      SELECT 
         a.id, 
         a.slug,
         b.name, 
         b.description 
      FROM abilities AS a
         JOIN ability_translations AS b ON (a.id = b.ability_id)
         WHERE b.language_id = $1
         LIMIT $2
         OFFSET $3;
   `;

   // Attempt request for all abilities from database
   try {
      const result: QueryResult = await db.query(query, [langId, limit, offset]);
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