BEGIN TRANSACTION;

CREATE TABLE Sonderkennzeichen2 (
  code       CHAR (1) PRIMARY KEY,
  bezeichnung VARCHAR (100),
  bezeichnung_en VARCHAR(100)
);

INSERT INTO Sonderkennzeichen2 (code, bezeichnung, bezeichnung_en) VALUES
  ('0', '+ Farbmarkierung', '+Colour marked'),
  ('1', 'indiv. Farbkombination', 'Individual recognizable (combination)'),
  ('2', 'Ort codiert', 'Place coded'),
  ('3', 'Jahr codiert', 'Year coded'),
  ('4', 'Ort u.Jahr codiert', 'Year and place coded'),
  ('5', 'Individueller Code (Inschrift)', 'With individual inscription'),
  ('6', 'Beringungsjahr+-ort codiert', 'Year and place coded'),
  ('7', 'mit Sender versehen', 'Transmitter applicated');

COMMIT TRANSACTION;