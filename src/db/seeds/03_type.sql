-- Setup type ids
INSERT INTO
   type
VALUES
   (1, 'https://picsum.photos/200/300'),
   (2, 'https://picsum.photos/200/300'),
   (3, 'https://picsum.photos/200/300');

-- Japanese
INSERT INTO
   type_translations (type_id, language_id, name)
VALUES
   (1, 2, 'エッジ'),
   (2, 2, 'ソリッド'),
   (3, 2, 'ヴェール');