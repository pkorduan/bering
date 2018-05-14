BEGIN TRANSACTION;

CREATE TABLE Vogelalter (
  code   CHAR (4) PRIMARY KEY,
  eucode CHAR (1),
  bezeichnung_de VARCHAR(100),
  bezeichnung_en VARCHAR(100)
);

INSERT INTO Vogelalter (code, eucode, bezeichnung_de, bezeichnung_en) VALUES
  ('NJG.', '1', 'Nestjung', 'Nestling'),
  ('NFL.', '1', 'Nicht flügge', 'Not fledged'),
  ('EFL.', '3', 'Eben flügge', 'Just fledged'),
  ('1.JJ', '3', 'Diesjährig, im 1.Kal.-Jahr', '1st calendar-year'),
  ('1.JT', '3', 'Diesjährig, im 1.Kal.-Jahr', '1st calendar-year'),
  ('1.J.', '3', 'Diesjährig, im 1.Kal.-Jahr', '1st calendar-year'),
  ('2.J.', '5', 'Vorjährig,  im 2.Kal.-Jahr', '2nd calendar-year'),
  ('3.J.', '7', 'Im 3.Kalenderjahr', '3rd calendar-year'),
  ('4.J.', '9', 'Im 4.Kalenderjahr', '4th calendar-year'),
  ('5.J.', 'B', 'Im 5.Kalenderjahr', '5th calendar-year'),
  ('IMM.', '2', 'Immatur', 'Immature'),
  ('AD.0', '2', 'Adult', 'Adult'),
  ('FGL.', '2', 'Fängling', 'Unknown, but able to fly'),
  ('N1.J', '4', 'Nach dem 1.Kalenderjahr', 'After 1st calendar-year'),
  ('N2.J', '6', 'Nach dem 2.Kalenderjahr', 'After 2nd calendar-year'),
  ('N3.J', '8', 'Nach dem 3.Kalenderjahr', 'After 3rd calendar-year'),
  ('N4.J', 'A', 'Nach dem 4.Kalenderjahr', 'After 4th calendar-year');

COMMIT TRANSACTION;