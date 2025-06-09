BEGIN TRANSACTION;

INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('fett', 'Fett', 18, 18, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('muskel', 'Muskel', 19, 19, 1);
INSERT INTO Attribute (name, fullname, position, defaultpos, anzeige) VALUES ('netznr', 'Netznummer', 20, 20, 1);


COMMIT TRANSACTION;