import db from "@/db/db";
import { Kin, QueryOptions } from "@/types/intefaces.common";
import { ApiError } from "@/utils/ApiError";
import { handleFilters } from "@/utils/handleFilters";
import { QueryResult } from "pg";

// @desc Queries all kins from the database
// @params langId, limit, page

export const getAllKins = async (langId: number, options: QueryOptions) => {
   // Setup tracking query state
   let paramIndex = 1;
   let params: any[] = [];
   const allowedSorts = ["id", "name", "slug", "hp", "attack", "defense", "speed", "size"];

   // Setup conditional queries
   let conditionalQueries = "";

   // Check for language
   if (langId) {
      conditionalQueries += `
      WHERE
         b.language_id = $${paramIndex}
         AND d.language_id = $${paramIndex}
         AND j.language_id = $${paramIndex++} 
      `;
      params.push(langId);
   }

   // Search for kin
   if (options.search) {
      // If search for name is provided, then use either name or slug to search
      conditionalQueries += `AND b.name LIKE $${paramIndex} OR a.slug LIKE $${paramIndex++} `;
      params.push(`%${options.search}%`);
   }

   // Setup filter queries
   const filterQueries = handleFilters(params, paramIndex, options, allowedSorts);

   // Setup query for getting kins
   const query = `
      SELECT
         a.id,
         a.slug,
         b.name,
         d.name AS ability,
         b.description,
         a.img,
         b.saying,
         n.name AS obtain,
         a.hp,
         a.attack,
         a.defense,
         a.attack_speed,
         a.growth_speed,
         g.speed_class AS speed,
         o.size_class AS size,
         j.name AS temperature,
         l.name AS ph,
         json_build_object('name', f.name, 'img', e.img) AS type
      FROM kin AS a
         JOIN kin_translations AS b ON (a.id = b.kin_id)
         JOIN abilities AS c ON (c.id = a.ability_id)
         JOIN ability_translations d ON (d.ability_id = c.id)
         JOIN type AS e ON (e.id = a.type_id)
         JOIN type_translations AS f ON (f.type_id = e.id)
         JOIN speed AS g ON (g.id = a.speed_id)
         JOIN size AS h ON (h.id = a.size_id)
         JOIN temperatures AS i ON (i.id = a.temperature_id)
         JOIN temperature_translations AS j ON (j.temperature_id = i.id)
         JOIN ph AS k ON (k.id = a.ph_id)
         JOIN ph_translations AS l ON (l.ph_id=k.id)
         JOIN obtain as m ON (m.id = a.obtain_id)
         JOIN obtain_translations AS n ON (n.obtain_id = m.id)
         JOIN size AS o ON (a.size_id = o.id)
      ${conditionalQueries}
      GROUP BY
         a.id,
         b.name,
         b.description,
         a.hp,
         b.saying,
         a.attack,
         a.defense,
         a.attack_speed,
         a.growth_speed,
         ability,
         a.img,
         f.name,
         e.img,
         size,
         speed,
         temperature,
         ph,
         obtain
      ${filterQueries}
   `;

   console.log(query)
   console.log(params)

   // Attempt to query all kins
   try {
      // Await for response
      const result: QueryResult = await db.query(query, params);
      const data: Kin[] = result.rows;

      // Return only data from result
      return result.rows;
   } catch (err) {
      // Throw error for async handler
      throw new ApiError([], 500, "Internal server error querying for kins");
   }
};

// @desc Queries one single kin by id or slug
// @params id, slug, lang_id

export const getKinByIdOrSlug = async (id: number | undefined, slug: string | undefined, langId: number) => {
   // Conditionally change slug or id based on what is provided
   const filterQuery = slug ? "slug" : id ? "id" : "";
   const param = slug ? slug : id ? id : "";

   // Full query for getting one kin
   const query = `
      SELECT
         a.id,
         a.slug,
         b.name,
         d.name AS ability,
         b.description,
         a.img,
         b.saying,
         n.name AS obtain,
         a.hp,
         a.attack,
         a.defense,
         a.attack_speed,
         a.growth_speed,
         g.speed_class AS speed,
         o.size_class AS size,
         j.name AS temperature,
         l.name AS ph,
         json_build_object('name', f.name, 'img', e.img) AS type
      FROM kin AS a
         JOIN kin_translations AS b ON (a.id = b.kin_id)
         JOIN abilities AS c ON (c.id = a.ability_id)
         JOIN ability_translations d ON (d.ability_id = c.id)
         JOIN type AS e ON (e.id = a.type_id)
         JOIN type_translations AS f ON (f.type_id = e.id)
         JOIN speed AS g ON (g.id = a.speed_id)
         JOIN size AS h ON (h.id = a.size_id)
         JOIN temperatures AS i ON (i.id = a.temperature_id)
         JOIN temperature_translations AS j ON (j.temperature_id = i.id)
         JOIN ph AS k ON (k.id = a.ph_id)
         JOIN ph_translations AS l ON (l.ph_id=k.id)
         JOIN obtain as m ON (m.id = a.obtain_id)
         JOIN obtain_translations AS n ON (n.obtain_id = m.id)
         JOIN size AS o ON (a.size_id = o.id)
      WHERE
         a.${filterQuery} = $1
         AND b.language_id = $2
         AND d.language_id = $2
         AND j.language_id = $2
      GROUP BY
         a.id,
         b.name,
         b.description,
         a.hp,
         b.saying,
         a.attack,
         a.defense,
         a.attack_speed,
         a.growth_speed,
         ability,
         a.img,
         f.name,
         e.img,
         size,
         speed,
         temperature,
         ph,
         obtain;
   `;

   try {
      // Await for response
      const result: QueryResult = await db.query(query, [param, langId]);
      const data: Kin = result.rows[0];

      // Return only data
      return data;
   } catch (err) {
      // If there was internal server error, throw
      throw new ApiError({}, 500, "Internal server error querying for kin");
   }
};
