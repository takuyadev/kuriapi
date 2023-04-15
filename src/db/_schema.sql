DROP TABLE ability CASCADE; 
DROP TABLE nano CASCADE; 
DROP TABLE languages CASCADE; 
DROP TABLE obtain CASCADE; 
DROP TABLE speed CASCADE; 
DROP TABLE type CASCADE; 
DROP TABLE size CASCADE; 
DROP TABLE temperature CASCADE; 
DROP TABLE ph CASCADE; 
DROP TABLE obtain_translations; 
DROP TABLE speed_translations; 
DROP TABLE size_translations; 
DROP TABLE ph_translations; 
DROP TABLE temperature_translations; 
DROP TABLE type_translations; 

-- All base tables

CREATE TABLE ability (
    id SERIAL PRIMARY KEY NOT NULL,
    slug VARCHAR(50) NOT NULL
);

CREATE TABLE obtain (
    id SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE speed (
    id SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE type (
    id SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE size (
    id SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE temperature (
    id SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE ph (
    id SERIAL PRIMARY KEY NOT NULL
);


CREATE TABLE languages (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    iso_code VARCHAR(5)
);

CREATE TABLE nano (
    id SERIAL PRIMARY KEY NOT NULL,
    ability_id INTEGER NOT NULL REFERENCES ability(id),
    slug VARCHAR(50) NOT NULL,
    obtain_id INTEGER NOT NULL REFERENCES obtain(id),
    speed_id INTEGER NOT NULL REFERENCES speed(id),
    type_id INTEGER NOT NULL REFERENCES type(id), 
    size_id INTEGER NOT NULL REFERENCES size(id), 
    temperature_id INTEGER NOT NULL REFERENCES temperature(id),
    ph_id INTEGER NOT NULL REFERENCES ph(id), 
    hp SMALLINT NOT NULL,
    attack SMALLINT NOT NULL,
    defense SMALLINT NOT NULL,
    attackSpeed SMALLINT,
    growthSpeed SMALLINT
);

-- All translation tables

CREATE TABLE nano_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    nano_id INTEGER NOT NULL REFERENCES nano(id),
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
    description TEXT
);

CREATE TABLE obtain_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    obtain_id INTEGER NOT NULL REFERENCES obtain(id) ON DELETE CASCADE, 
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(100)
);

CREATE TABLE speed_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    speed_id INTEGER NOT NULL REFERENCES speed(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(100)
);

CREATE TABLE type_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    type_id INTEGER NOT NULL REFERENCES type(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(100)
);

CREATE TABLE size_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    size_id INTEGER NOT NULL REFERENCES size(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(100)
);

CREATE TABLE temperature_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    temperature_id INTEGER NOT NULL REFERENCES temperature(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(100)
);

CREATE TABLE ph_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    ph_id INTEGER NOT NULL REFERENCES ph(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    name VARCHAR(100)
);
