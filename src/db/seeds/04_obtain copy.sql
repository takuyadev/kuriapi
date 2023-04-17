-- Setup obtain
INSERT INTO
   obtain
VALUES
   (1),
   (2),
   (3);

-- Japanese
INSERT INTO
   obtain_translations (obtain_id, language_id, name)
VALUES
   (1, 2, '原生'),
   (2, 2, '新種'),
   (3, 2, 'コユウ');