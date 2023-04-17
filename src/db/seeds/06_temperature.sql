-- Setup obtain
INSERT INTO
   temperature
VALUES
   (1),
   (2),
   (3);

-- Japanese
INSERT INTO
   temperature_translations (temperature_id, language_id, name)
VALUES
   (1, 2, '低温'),
   (2, 2, '中温'),
   (3, 2, '高温');