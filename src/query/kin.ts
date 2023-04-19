// SELECT
//     a.id,
//     b.name,
//     d.name AS ability,
//     a.img,
//     json_build_object('name', f.name, 'img', e.img) AS type
// FROM
//     kin AS a
//     JOIN kin_translations AS b ON (a.id = b.kin_id)
//     JOIN ability AS c ON (c.id = a.ability_id)
//     JOIN ability_translations d ON (d.ability_id = c.id)
//     JOIN type AS e ON (e.id = a.type_id)
//     JOIN type_translations AS f ON (f.type_id = e.id)

// WHERE
//     b.languages_id = 2
//     AND d.languages_id = 2
// GROUP BY
//     a.id,
//     b.name,
//     ability,
//     a.img,
//     f.name,
//     e.img;