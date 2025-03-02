BEGIN TRANSACTION;

INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort_zwei', '');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort_position_zwei', '');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort_kreis_zwei', '');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('zentrale_zwei', '');
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort_zwei_id', NULL);
INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('beringungsort_zwei_nutzen', 'aus');

COMMIT TRANSACTION;
