BEGIN TRANSACTION;

CREATE TABLE Einstellungen (
  bezeichnung VARCHAR PRIMARY KEY,
  wert        TEXT
);

INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort', 'A021INSEL LANGENWERDER');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort_position', '540200N0113000E');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort_kreis', 'NWM');

INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('loesch_funktion_an', 'aus');

INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('sicherung_dateiname', 'Sicherung.db');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('sicherung_verzeichnis', 'C:\tmp\');

COMMIT TRANSACTION;