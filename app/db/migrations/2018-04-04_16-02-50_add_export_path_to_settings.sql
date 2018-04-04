BEGIN TRANSACTION;

INSERT INTO Einstellungen (bezeichnung, wert) VALUES ('export_verzeichnis', 'C:\tmp\');

COMMIT TRANSACTION;
