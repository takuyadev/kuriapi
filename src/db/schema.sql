DROP TABLE ability CASCADE;
DROP TABLE kin CASCADE;
DROP TABLE languages CASCADE;
DROP TABLE obtain CASCADE;
DROP TABLE type CASCADE;
DROP TABLE size CASCADE;
DROP TABLE speed CASCADE;
DROP TABLE temperature CASCADE;
DROP TABLE ph CASCADE;
DROP TABLE obtain_translations;
DROP TABLE ability_translations;
DROP TABLE size_translations;
DROP TABLE kin_translations;
DROP TABLE ph_translations;
DROP TABLE temperature_translations;
DROP TABLE type_translations;

-- All base tables
CREATE TABLE ability (
    id SERIAL PRIMARY KEY NOT NULL,
    slug VARCHAR(50) NOT NULL
);

CREATE TABLE obtain (id SERIAL PRIMARY KEY NOT NULL);

CREATE TABLE type (
    id SERIAL PRIMARY KEY NOT NULL,
    img VARCHAR(255) NOT NULL
);

CREATE TABLE size (
    id SERIAL PRIMARY KEY NOT NULL,
    size_class VARCHAR(2) NOT NULL
);

CREATE TABLE temperature (id SERIAL PRIMARY KEY NOT NULL);

CREATE TABLE ph (id SERIAL PRIMARY KEY NOT NULL);

CREATE TABLE languages (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    iso_code VARCHAR(5) NOT NULL
);

CREATE TABLE speed (
    id SERIAL PRIMARY KEY NOT NULL,
    speed_class VARCHAR(2) NOT NULL
);

CREATE TABLE kin (
    id SERIAL PRIMARY KEY NOT NULL,
    ability_id INTEGER NOT NULL REFERENCES ability(id),
    obtain_id INTEGER NOT NULL REFERENCES obtain(id),
    type_id INTEGER NOT NULL REFERENCES type(id),
    speed_id INTEGER NOT NULL REFERENCES speed(id),
    size_id INTEGER NOT NULL REFERENCES size(id),
    temperature_id INTEGER NOT NULL REFERENCES temperature(id),
    ph_id INTEGER NOT NULL REFERENCES ph(id),
    slug VARCHAR(50) NOT NULL,
    img VARCHAR(255) NOT NULL,
    hp SMALLINT NOT NULL,
    attack SMALLINT NOT NULL,
    defense SMALLINT NOT NULL,
    attack_speed SMALLINT,
    growth_speed SMALLINT
);

-- All translation tables
CREATE TABLE kin_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    kin_id INTEGER NOT NULL REFERENCES kin(id),
    languages_id INTEGER NOT NULL REFERENCES languages(id),
    name VARCHAR(75) NOT NULL,
    description TEXT NOT NULL,
    saying VARCHAR(100) NOT NULL
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

CREATE TABLE type_translations (
    id SERIAL PRIMARY KEY NOT NULL,
    type_id INTEGER NOT NULL REFERENCES type(id) ON DELETE CASCADE,
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

-- Languages
INSERT INTO
    languages
VALUES
    (1, 'english', 'en'),
    (2, 'japanese', 'jp');

-- Ability
INSERT INTO
    ability
VALUES
    (1, 'attackimin'),
    (2, 'defendimin'),
    (3, 'growthimin'),
    (4, 'nightimin'),
    (5, 'tornadimin'),
    (6, 'poisonimin'),
    (7, 'wipimin');

INSERT INTO
    ability_translations (ability_id, languages_id, name, description)
VALUES
    (1, 2, 'セメルミン', '攻撃力アップ'),
    (2, 2, 'マモルミン', '防御力アップ'),
    (3, 2, 'フエルミン', '増殖力アップ'),
    (4, 2, 'オヤスミン', '相手のキンを眠らせる'),
    (5, 2, 'ナノトルネード', '爆発で相手のキンを倒す'),
    (6, 2, 'ポイズンブラスト', '強烈の爆発で相手のキンを倒す'),
    (7, 2, 'キリングボム', '強烈の爆発で両側のキンお倒す');

-- Type
INSERT INTO
    type
VALUES
    (1, 'https://picsum.photos/200/300'),
    (2, 'https://picsum.photos/200/300'),
    (3, 'https://picsum.photos/200/300');

INSERT INTO
    type_translations (type_id, language_id, name)
VALUES
    (1, 2, 'エッジ'),
    (2, 2, 'ソリッド'),
    (3, 2, 'ヴェール');

-- Obtain
INSERT INTO
    obtain
VALUES
    (1),
    (2),
    (3),
    (4);

INSERT INTO
    obtain_translations (obtain_id, language_id, name)
VALUES
    (1, 2, '原生'),
    (2, 2, '新種'),
    (3, 2, 'コユウキン'),
    (4, 2, 'かくれキン');

-- Size
INSERT INTO
    size
VALUES
    (1, 'S'),
    (2, 'M'),
    (3, 'L');

-- Temperature
INSERT INTO
    temperature
VALUES
    (1),
    (2),
    (3);

INSERT INTO
    temperature_translations (temperature_id, language_id, name)
VALUES
    (1, 2, '低温'),
    (2, 2, '中温'),
    (3, 2, '高温');

-- Ph
INSERT INTO
    ph
VALUES
    (1),
    (2),
    (3);

INSERT INTO
    ph_translations (ph_id, language_id, name)
VALUES
    (1, 2, '酸'),
    (2, 2, '中'),
    (3, 2, 'アルカリ');

-- Setup Speed
INSERT INTO
    speed
VALUES
    (1, 'E'),
    (2, 'D'),
    (3, 'C'),
    (4, 'B'),
    (5, 'A');