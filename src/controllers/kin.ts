import db from "@db/db";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";

// @method GET
// @route /kin
// @desc Gets all kin from the database

export const getKin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Join required information for sending basic list
    const query = `
        SELECT
            a.id,
            b.name,
            d.name AS ability,
            a.img,
            json_build_object('name', f.name, 'img', e.img) AS type
        FROM
            kin AS a
            JOIN kin_translations AS b ON (a.id = b.kin_id)
            JOIN ability AS c ON (c.id = a.ability_id)
            JOIN ability_translations d ON (d.ability_id = c.id)
            JOIN type AS e ON (e.id = a.type_id)
            JOIN type_translations AS f ON (f.type_id = e.id)
        WHERE
            b.languages_id = 2
            AND d.languages_id = 2
        GROUP BY
            a.id,
            b.name,
            ability,
            a.img,
            f.name,
            e.img;
        `;

    // Await for response
    const data = await db.query(query);

    res.status(200).json({
      success: true,
      data: data.rows,
    });
  }
);

// @method GET
// @route /kin/:id
// @desc Get kin by id from the database

export const getKinById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let { lang } = req.query;

    console.log(lang)

    if (!lang) {
      lang = "2";
    }

    // If id does not exist, then return no data
    if (!id) {
      res.status(404).json({});
    }

    // Join required information for sending basic list
    const query = `
      SELECT
          a.id,
          b.name,
          d.name AS ability,
          a.img,
          a.hp,
          a.attack,
          a.defense,
          a.attack_speed,
          a.growth_speed,
          g.speed_class AS speed,
          j.name AS temperature,
          l.name AS ph,
          n.name AS obtain,
          json_build_object('name', f.name, 'img', e.img) AS type
      FROM
          kin AS a
          JOIN kin_translations AS b ON (a.id = b.kin_id)
          JOIN ability AS c ON (c.id = a.ability_id)
          JOIN ability_translations d ON (d.ability_id = c.id)
          JOIN type AS e ON (e.id = a.type_id)
          JOIN type_translations AS f ON (f.type_id = e.id)
          JOIN speed AS g ON (g.id = a.speed_id)
          JOIN size AS h ON (h.id = a.size_id)
          JOIN temperature AS i ON (i.id = a.temperature_id)
          JOIN temperature_translations AS j ON (j.temperature_id = i.id)
          JOIN ph AS k ON (k.id = a.ph_id)
          JOIN ph_translations AS l ON (l.ph_id=k.id)
          JOIN obtain as m ON (m.id = a.obtain_id)
          JOIN obtain_translations AS n  ON (n.obtain_id = m.id)
      WHERE
          a.id = $1
          AND b.languages_id = $2
          AND d.languages_id = $2
          AND j.language_id = $2
      GROUP BY
          a.id,
          b.name,
          a.hp,
          a.attack,
          a.defense,
          a.attack_speed,
          a.growth_speed,
          ability,
          a.img,
          f.name,
          e.img,
          speed,
          temperature,
          ph,
          obtain;
      `;

    // Await for response
    const data = await db.query(query, [id, lang]);

    res.status(200).json(data.rows);
  }
);