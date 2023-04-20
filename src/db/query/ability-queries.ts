import db from "@/db/db";

/*
   SELECT a.id, 
   json_object_agg(c.iso_code, json_build_object('name', b.name, 'description', b.description)) AS name FROM ability AS a 
   JOIN ability_translations AS b ON (a.id = b.ability_id)
   JOIN languages AS c ON (c.id = b.languages_id)
   GROUP BY a.id; 
*/

export const getAllAbilities = async (
   limit: number,
   offset: number,
   langId: number
) => {
   const query = `
      SELECT 
         a.id, 
         b.name, 
         b.description 
      FROM abilities
         JOIN ability_translations AS b ON (a.id = b.ability_id)
         WHERE b.language_id = $3;
         LIMIT $1
         OFFSET $2;
   `;

   try {
      const res = await db.query(query, [limit, offset, langId]);
      return res.rows;
   } catch (err) {
      return err;
   }
};

export const getAbilityById = async (abilityId: number, langId: number) => {
   const query = `
      SELECT 
         a.id, 
         b.name, 
         b.description 
      FROM abilities AS a
         JOIN ability_translations AS b ON (a.id = b.ability_id)
         WHERE 
            a.id = $1
            AND b.language_id = $2;
   `;

   try {
      const res = await db.query(query, [abilityId, langId]);
      return res.rows;
   } catch (err) {
      return err;
   }
};
