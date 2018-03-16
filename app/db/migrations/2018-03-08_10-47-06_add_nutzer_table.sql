CREATE TABLE Nutzer (
    beringernr VARCHAR (4)   NOT NULL PRIMARY KEY,
    name       VARCHAR       NOT NULL,
    vorname    VARCHAR,
    loginname  VARCHAR (255) NOT NULL,
    passwort   VARCHAR (25) 
);