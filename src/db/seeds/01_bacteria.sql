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

INSERT INTO ability VALUES (1, 'attackimin');
INSERT INTO ability_translations VALUES (1, 1, 1, 'Attackimin', 'Increases your teams attack');