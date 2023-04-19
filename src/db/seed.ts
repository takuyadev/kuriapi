import fs from "fs";
import db from "@db/db";
import path from "path";

type File = string;
type Files = File[];
type Query = string;

const queries = {
  languages: {
    create: `
          CREATE TABLE languages (
              id SERIAL PRIMARY KEY NOT NULL,
              name VARCHAR(255) NOT NULL,
              iso_code VARCHAR(5) NOT NULL
          );
      `,
    insert: `INSERT INTO languages VALUES ($1, $2, $3);`,
  },
  kin: {
    create: `
        CREATE TABLE kin (
            id SERIAL PRIMARY KEY NOT NULL,
            ability_id INTEGER NOT NULL REFERENCES abilities(id),
            obtain_id INTEGER NOT NULL REFERENCES obtain(id),
            type_id INTEGER NOT NULL REFERENCES type(id),
            speed_id INTEGER NOT NULL REFERENCES speed(id),
            size_id INTEGER NOT NULL REFERENCES size(id),
            temperature_id INTEGER NOT NULL REFERENCES temperatures(id),
            ph_id INTEGER NOT NULL REFERENCES ph(id),
            slug VARCHAR(50) NOT NULL,
            img VARCHAR(255) NOT NULL,
            hp SMALLINT NOT NULL,
            attack SMALLINT NOT NULL,
            defense SMALLINT NOT NULL,
            attack_speed SMALLINT,
            growth_speed SMALLINT
        );
    `,
    insert: `INSERT INTO kin VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`,
  },
  kin_translations: {
    create: `
        CREATE TABLE kin_translations (
            id SERIAL PRIMARY KEY NOT NULL,
            kin_id INTEGER NOT NULL REFERENCES kin(id),
            language_id INTEGER NOT NULL REFERENCES languages(id),
            name VARCHAR(75) NOT NULL,
            description TEXT NOT NULL,
            saying VARCHAR(100) NOT NULL
        );
    `,
    insert: `INSERT INTO kin_translations VALUES ($1, $2, $3, $4, $5, $6);`,
  },
  abilities: {
    create: `
        CREATE TABLE abilities (
            id SERIAL PRIMARY KEY NOT NULL,
            slug VARCHAR(50) NOT NULL
        );
    `,
    insert: `INSERT INTO abilities VALUES ($1, $2);`,
  },
  ability_translations: {
    create: `
        CREATE TABLE ability_translations (
            id SERIAL PRIMARY KEY NOT NULL,
            ability_id INTEGER NOT NULL REFERENCES abilities(id),
            language_id INTEGER NOT NULL REFERENCES languages(id),
            name VARCHAR(75),
            description TEXT
        );
    `,
    insert: `INSERT INTO ability_translations VALUES ($1, $2, $3, $4, $5);`,
  },
  obtain: {
    create: `CREATE TABLE obtain (id SERIAL PRIMARY KEY NOT NULL);`,
    insert: `INSERT INTO obtain VALUES($1);`,
  },
  obtain_translations: {
    create: `
        CREATE TABLE obtain_translations (
            id SERIAL PRIMARY KEY NOT NULL,
            obtain_id INTEGER NOT NULL REFERENCES obtain(id) ON DELETE CASCADE,
            language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
            name VARCHAR(100)
        );
    `,
    insert: `INSERT INTO obtain_translations VALUES ($1, $2, $3, $4);`,
  },
  temperatures: {
    create: `CREATE TABLE temperatures (id SERIAL PRIMARY KEY NOT NULL);`,
    insert: `INSERT INTO temperatures VALUES ($1);`,
  },
  temperature_translations: {
    create: `
        CREATE TABLE temperature_translations (
            id SERIAL PRIMARY KEY NOT NULL,
            temperature_id INTEGER NOT NULL REFERENCES temperatures(id) ON DELETE CASCADE,
            language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
            name VARCHAR(100)
        );
    `,
    insert: `INSERT INTO temperature_translations VALUES ($1, $2, $3, $4);`,
  },
  type: {
    create: `
        CREATE TABLE type (
            id SERIAL PRIMARY KEY NOT NULL,
            img VARCHAR(255) NOT NULL
        );
    `,
    insert: `
        INSERT INTO type VALUES ($1, $2);
    `,
  },
  type_translations: {
    create: `
        CREATE TABLE type_translations (
            id SERIAL PRIMARY KEY NOT NULL,
            type_id INTEGER NOT NULL REFERENCES type(id) ON DELETE CASCADE,
            language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
            name VARCHAR(100)
        );
    `,
    insert: `INSERT INTO type_translations VALUES ($1, $2, $3, $4);`,
  },
  ph: {
    create: `CREATE TABLE ph (id SERIAL PRIMARY KEY NOT NULL);`,
    insert: `INSERT INTO ph VALUES ($1);`,
  },
  ph_translations: {
    create: `
        CREATE TABLE ph_translations (
            id SERIAL PRIMARY KEY NOT NULL,
            ph_id INTEGER NOT NULL REFERENCES ph(id) ON DELETE CASCADE,
            language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
            name VARCHAR(100)
        );
    `,
    insert: `INSERT INTO ph_translations VALUES ($1, $2, $3, $4);`,
  },
  size: {
    create: `    
        CREATE TABLE size (
            id SERIAL PRIMARY KEY NOT NULL,
            size_class VARCHAR(2) NOT NULL
        );
    `,
    insert: `INSERT INTO size VALUES ($1, $2);`,
  },
  speed: {
    create: `    
        CREATE TABLE speed (
            id SERIAL PRIMARY KEY NOT NULL,
            speed_class VARCHAR(2) NOT NULL
        );
    `,
    insert: `INSERT INTO speed VALUES ($1, $2);`,
  },
};

// Helper for going through data directory, and reading into every file
const useFiles = async (files: Files, queries: any, cb: Function) => {
    console.log(files)
  for (const file of files) {
    try {
      const index = file.replace(/\.json/, "").replace(/^\d+_/, "");
      // Insert Kin data based on CSV file
      await cb(file, queries[index]);
    } catch (err) {
      console.error("Error:", err);
    }
  }
};

// Helper for creating tables
const createQuery = async (file: File, query: any) => {
  console.log(`Creating table ${file}...`);
  try {
    await db.query(query.create);
  } catch (err) {
    console.log(err);
  }
};

// Helper for inserting data into tables
const insertQuery = async (file: File, query: any) => {
  console.log(`Inserting ${file}...`);

  // Insert Kin data based on CSV file
  const dataDir = process.env.PWD + `/data/${file}`;
  const data = await fs.readFileSync(dataDir, "utf-8");
  const parsedData = JSON.parse(data);

  // Loop through json file, and insert by params
  for (const data of parsedData) {
    const params = Object.values(data);
    await db.query(query.insert, params);
  }
};

// Main function
const seedDatabase = async () => {
  const files = await fs.readdirSync(path.resolve(process.env.PWD + "/data"));

  for (const file of files) {
    // For every loop, try dropping table.
    // REASON: Drop table throws error if table does not exist

    // Remove .json ext from file, use for drop query
    const table = file.replace(/\.json/gi, "").replace(/^\d+_/, "");

    try {
      console.log(`Dropping ${table}...`);

      // Drop query
      const dropQuery = `
        DROP TABLE ${table} CASCADE;
      `;

      // Execute drop query with paramter
      await db.query(dropQuery);
    } catch (err) {
      console.error("Skipping: Table most likely does not exist");
    }
  }

  // Create tables for database
  await useFiles(files, queries, createQuery);

  // Insert data into tables
  await useFiles(files, queries, insertQuery);

  // Attempt to insert values into new tables
  process.exit();
};

seedDatabase();
