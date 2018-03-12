CREATE TABLE Farbcodes (
    code       CHAR (1)     PRIMARY KEY,
    name VARCHAR (25) ,
    bezeichnung VARCHAR (50) 
);

INSERT INTO Farbcodes (code, name, bezeichnung) VALUES
  ('AL', 'AL', 'metal'),
  ('BL', 'Blau', 'Blau'),
  ('BN', 'Braun', 'Braun'),
  ('GE', 'Gelb', 'Gelb'),
  ('GN', 'Grün', 'Grün'),
  ('GR', 'Grau', 'Grau'),
  ('MET', 'MET', 'Metall'),
  ('OR', 'Orange', 'Orange'),
  ('RT', 'Rot', 'Rot'),
  ('SW', 'Schwarz', 'Schwarz'),
  ('VIO', 'VIO', 'violett'),
  ('WS', 'Weiss', 'Weiss');
