/*
   SELECT a.id, a.slug, b.name, b.description FROM ability 
   AS a JOIN ability_translations AS b ON (a.id = b.ability_id) 
   WHERE b.languages_id = $1;
*/

/*
   SELECT a.id, 
   json_object_agg(c.iso_code, json_build_object('name', b.name, 'description', b.description)) AS name FROM ability AS a 
   JOIN ability_translations AS b ON (a.id = b.ability_id)
   JOIN languages AS c ON (c.id = b.languages_id)
   GROUP BY a.id; 
 */