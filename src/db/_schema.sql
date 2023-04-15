DROP TABLE bacteria; 
DROP TABLE ability; 

CREATE TABLE ability (
    id SERIAL PRIMARY KEY NOT NULL,
    slug VARCHAR(50) NOT NULL
);

CREATE TABLE bacteria (
    id SERIAL PRIMARY KEY NOT NULL,
    ability_id INTEGER NOT NULL REFERENCES ability(id),
    slug VARCHAR(50) NOT NULL,
    obtain_type VARCHAR(9) NOT NULL,
    hp SMALLINT NOT NULL,
    attack SMALLINT NOT NULL,
    defense SMALLINT NOT NULL,
    attackSpeed SMALLINT,
    growthSpeed SMALLINT,
    speed VARCHAR(9) NOT NULL,
    type VARCHAR(6) NOT NULL,
    size VARCHAR(2) NOT NULL,
    temperature VARCHAR(7) NOT NULL,
    ph VARCHAR(9) NOT NULL
);

CREATE TABLE languages (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    iso_code VARCHAR(5)
);

CREATE TABLE bacteria_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    bacteria_id INTEGER NOT NULL REFERENCES bacteria(id),
    languages_id INTEGER NOT NULL REFERENCES languages(id),
    name VARCHAR(75),
    description TEXT,
    saying VARCHAR(100)
);

CREATE TABLE ability_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    ability_id INTEGER NOT NULL REFERENCES ability(id),
    languages_id INTEGER NOT NULL REFERENCES languages(id),
    name VARCHAR(75),
    description TEXT,
)