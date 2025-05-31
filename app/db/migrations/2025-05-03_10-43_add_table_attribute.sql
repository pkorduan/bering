BEGIN TRANSACTION;

CREATE TABLE Attribute (
  id         INTEGER        PRIMARY KEY,
  name       VARCHAR,
  fullname   VARCHAR,
  position   INTEGER,
  defaultpos INTEGER,
  anzeige    INTEGER
);

INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('beringernr', 'Beringernr', 0, 0, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('fundart', 'Fundart', 1, 1, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('ringnr', 'Ringnummer', 2, 2, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('vogelart', 'Vogelart', 3, 3, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('datum', 'Datum', 4, 4, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('uhrzeit', 'Uhrzeit', 5, 5, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('alter', 'Alter', 6, 6, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('geschlecht', 'Geschlecht', 7, 7, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('fluegellaenge', 'Flügellänge', 8, 8, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('teilfederlaenge', 'Teilfederlänge', 9, 9, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('schnabellaenge', 'Schnabellänge', 10, 10, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('schnabel_kopflaenge', 'Schnabel+Kopflänge', 11, 11, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('lauf', 'Lauf', 12, 12, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('gewicht', 'Gewicht', 13, 13, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('brutstatus', 'Brutstatus', 14, 14, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('skz_1', 'SKZ 1', 15, 15, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('skz_2', 'SKZ 2', 16, 16, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('bemerkung', 'Bemerkung', 17, 17, 1);


COMMIT TRANSACTION;