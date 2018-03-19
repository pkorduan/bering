BEGIN;

CREATE TABLE Einstellungen (
  bezeichnung VARCHAR PRIMARY KEY,
  wert        TEXT
);

INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort', 'a021insel langenwerder');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort_position', '540200n0113000e');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort_kreis', 'NWM');

INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('loesch_funktion_an', 'aus');

INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('sicherung_dateiname', 'Sicherung.db');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('sicherung_verzeichnis', 'C:\tmp\');

COMMIT;