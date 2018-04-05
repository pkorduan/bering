BEGIN TRANSACTION;

INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('nur_nicht_exportierte_an', 'aus');

COMMIT TRANSACTION;
