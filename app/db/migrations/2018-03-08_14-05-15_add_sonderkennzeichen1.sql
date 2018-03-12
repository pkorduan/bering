CREATE TABLE Sonderkennzeichen1 (
  code       CHAR (1) PRIMARY KEY,
  bezeichnung VARCHAR (100),
  bezeichnung_en VARCHAR(100)
);

INSERT INTO Sonderkennzeichen1 (code, bezeichnung, bezeichnung_en) VALUES
  ('1', 'Metallring über Intertarsal', 'Metal-ring over intertarsal'),
  ('2', 'Farb.Ring/zusätzl.Farbring', 'Coloured ring or add.col.rings'),
  ('3', 'Farb.Ring über Intertarsal', 'Colour ring over intertarsal'),
  ('4', 'Flügelmarke', 'Wing tagged'),
  ('5', 'Spezielle Markierung', '+Special marked'),
  ('6', 'Markierung mit Halsring', '+Neck-collar'),
  ('7', 'Gefieder gefärbt', '+Plumage coloured'),
  ('8', 'Gefieder gefärbt+Spezialmark.', '+Special marked'),
  ('9', 'Besondere Markierung', '+Special marked');
