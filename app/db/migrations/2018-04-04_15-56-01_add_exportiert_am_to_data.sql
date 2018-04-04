BEGIN TRANSACTION;

PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS SELECT * FROM Daten;

DROP TABLE Daten;

CREATE TABLE Daten (
  id  INTEGER  PRIMARY KEY,
  beringernr  VARCHAR (4),
  zentrale  VARCHAR  DEFAULT ('DEH'),
  ringnr  INTEGER  NOT NULL,
  bemerkung  TEXT,
  vogelart  VARCHAR,
  datum  DATE  DEFAULT (CURRENT_DATE),
  uhrzeit  TIME  DEFAULT (CURRENT_TIME),
  geschlecht  VARCHAR (1),
  [alter]  CHAR (4),
  fluegellaenge  DOUBLE (99, 1),
  teilfederlaenge  DOUBLE (99, 1),
  schnabellaenge  DOUBLE (99, 1),
  schnabel_kopflaenge DOUBLE (99, 1),
  lauf  DOUBLE (99, 1),
  gewicht  DOUBLE (99, 1),
  brutstatus  VARCHAR,
  beringungsort  VARCHAR  DEFAULT ('a021insel langenwerder'),
  koordinaten  VARCHAR  DEFAULT ('540200n0113000e'),
  skz_1  VARCHAR,
  skz_2  VARCHAR,
  farbring  VARCHAR,
  fundzustand  INTEGER  REFERENCES Fundzustaende (code),
  fundursache  VARCHAR,
  fundart  INTEGER  DEFAULT (1),
  exportiert_am  DATETIME
);

INSERT INTO Daten (
  id,
  beringernr,
  zentrale,
  ringnr,
  bemerkung,
  vogelart,
  datum,
  uhrzeit,
  geschlecht,
  [alter],
  fluegellaenge,
  teilfederlaenge,
  schnabellaenge,
  schnabel_kopflaenge,
  lauf,
  gewicht,
  brutstatus,
  beringungsort,
  koordinaten,
  skz_1,
  skz_2,
  farbring,
  fundzustand,
  fundursache,
  fundart
)
SELECT
  id,
  beringernr,
  zentrale,
  ringnr,
  bemerkung,
  vogelart,
  datum,
  uhrzeit,
  geschlecht,
  "alter",
  fluegellaenge,
  teilfederlaenge,
  schnabellaenge,
  schnabel_kopflaenge,
  lauf,
  gewicht,
  brutstatus,
  beringungsort,
  koordinaten,
  skz_1,
  skz_2,
  farbring,
  fundzustand,
  fundursache,
  fundart
FROM
  sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;

COMMIT TRANSACTION;
