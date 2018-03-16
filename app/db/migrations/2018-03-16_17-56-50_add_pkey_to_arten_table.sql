PRAGMA foreign_keys = 0;

CREATE TABLE sqlitestudio_temp_table AS SELECT * FROM Arten;

DROP TABLE Arten;

CREATE TABLE Arten (
  armarke  VARCHAR (100),
  arrotlist VARCHAR (100),
  arart  VARCHAR (10)  PRIMARY KEY,
  arname  VARCHAR (50),
  arlatein  VARCHAR (100),
  suchen  VARCHAR (255),
  areuria  INTEGER,
  areurin  INTEGER,
  argmin  INTEGER,
  argmax  INTEGER,
  arfmin  INTEGER,
  arfmax  INTEGER,
  arneunutz VARCHAR (100),
  arneudatu DATE,
  arneuzeit TIME,
  araennutz VARCHAR (100),
  araendatu DATE,
  araenzeit TIME
);

INSERT INTO Arten (
  armarke,
  arrotlist,
  arart,
  arname,
  arlatein,
  suchen,
  areuria,
  areurin,
  argmin,
  argmax,
  arfmin,
  arfmax,
  arneunutz,
  arneudatu,
  arneuzeit,
  araennutz,
  araendatu,
  araenzeit
)
SELECT armarke,
  arrotlist,
  arart,
  arname,
  arlatein,
  suchen,
  areuria,
  areurin,
  argmin,
  argmax,
  arfmin,
  arfmax,
  arneunutz,
  arneudatu,
  arneuzeit,
  araennutz,
  araendatu,
  araenzeit
FROM
  sqlitestudio_temp_table;

DROP TABLE sqlitestudio_temp_table;

PRAGMA foreign_keys = 1;
