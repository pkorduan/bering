BEGIN TRANSACTION;

PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS SELECT * FROM Nutzer;

DROP TABLE Nutzer;

CREATE TABLE Nutzer (
  beringernr VARCHAR (4)  NOT NULL
  PRIMARY KEY,
  name  VARCHAR  NOT NULL,
  vorname  VARCHAR,
  loginname  VARCHAR (255) NOT NULL,
  passwort  TEXT
);

INSERT INTO Nutzer (
  beringernr,
  name,
  vorname,
  loginname,
  passwort
)
SELECT
  beringernr,
  name,
  vorname,
  loginname,
  passwort
FROM
  sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;

COMMIT TRANSACTION;