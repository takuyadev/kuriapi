import db from "@/db/db";

// @desc Queries all abilities from the database
// @params langId, limit, page

export const getAllAbilities = async (
   langId: number,
   limit: number,
   offset: number,
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

// @desc Queries one ability by id or slug
// @params id, slug, langId

export const getAbilityByIdOrSlug = async (
   id: number,
   slug: string,
   langId: number
) => {
   // Conditionally change slug or id based on what is provided
   const filterQuery = slug ? " a.slug = $1 " : id ? " a.id = $1 " : "";
   const param = slug ? slug : id ? id : "";

   const query = `
      SELECT 
         a.id, 
         b.name, 
         a.slug,
         b.description 
      FROM abilities AS a
         JOIN ability_translations AS b ON (a.id = b.ability_id)
         WHERE 
            ${filterQuery}
            AND b.language_id = $2;
   `;

   try {
      const res = await db.query(query, [param, langId]);
      return res.rows[0];
   } catch (err) {
      return err;
   }
};
