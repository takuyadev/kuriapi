import db from "@/db/db";
import { IsoCodeType } from "@/types/types.common";

export const getIdByIsoCode = async (iso_code: IsoCodeType) => {
   try {
      const query = `
         SELECT id FROM languages
         WHERE iso_code LIKE $1;
      `;
      const res = await db.query(query, [iso_code]);
      return res.rows[0].id as number;
   } catch (err) {
      return 2
   }
};
 