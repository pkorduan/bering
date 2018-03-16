CREATE TABLE Brutstatus (
    status       CHAR (1)     PRIMARY KEY,
    beschreibung VARCHAR (50) 
);

INSERT INTO Brutstatus (status, beschreibung) VALUES
  ('1', 'beringte Nestgeschw.: 1'),
  ('2', 'beringte Nestgeschw.: 2'),
  ('3', 'beringte Nestgeschw.: 3'),
  ('4', 'beringte Nestgeschw.: 4'),
  ('5', 'beringte Nestgeschw.: 5'),
  ('6', 'beringte Nestgeschw.: 6'),
  ('7', 'beringte Nestgeschw.: 7'),
  ('8', 'beringte Nestgeschw.: 8 oder >'),
  ('9', 'Kuckuck, Wirtsvogel bekannt'),
  ('B', 'mit Blutfleck'),
  ('C', 'wahrscheinlich Brutvogel'),
  ('D', 'sicherer Brutvogel')