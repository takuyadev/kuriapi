import db from "@/db/db";
import { IsoCodeType } from "@/types/types.common";
import { QueryResult } from "pg";

// @desc Querries id of language with provided iso code
// @params iso_code

export const getIdByIsoCode = async (iso_code: IsoCodeType) => {

   // Setup query for gettiing id
   const query = `
      SELECT id FROM languages
      WHERE iso_code LIKE $1;
   `;

   try {
      // Attempt to request for id
      const result: QueryResult = await db.query(query, [iso_code]);
      const data: number = result.rows[0].id;

      // Return id if success
      return data
   } catch (err) {
      // Return default of 2, for JP
      return 2;
   }
};
