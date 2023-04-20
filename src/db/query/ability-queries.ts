import db from "@/db/db";
import { Ability } from "@/types/intefaces.common";
import { QueryResult } from "pg";
import { responseHandler } from "utils/responseHandler";

// @desc Queries all abilities from the database
// @params langId, limit, page

export const getAllAbilities = async (
   langId: number,
   limit: number,
   offset: number
) => {
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
         LIMIT $
         OFFSET $3;
   `;

   // Attempt request for all abilities from database
   try {
      const res: QueryResult = await db.query(query, [langId, limit, offset]);
      const data = res.rows;

      // Return success object
      return responseHandler<Ability[]>(true, data);
   } catch (err) {
      // If await query throws error
      // Return error object
      return responseHandler(false, err);
   }
};

// @desc Queries one ability by id or slug
// @params id, slug, langId

export const getAbilityByIdOrSlug = async (
   id: number,
   slug: string,
   langId: number
) => {
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
      const res: QueryResult = await db.query(query, [param, langId]);
      const data: Ability = res.rows[0];

      // Return success object
      return responseHandler<Ability>(true, data);
   } catch (err) {
      return responseHandler(false, err);
   }
};
