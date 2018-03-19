BEGIN TRANSACTION;

CREATE TABLE Fundzustaende (
  code       CHAR (1) PRIMARY KEY,
  code_euring VARCHAR (1) ,
  bezeichnung VARCHAR (100),
  bezeichnung_euring VARCHAR(100)
);

INSERT INTO Fundzustaende (code, code_euring, bezeichnung, bezeichnung_euring) VALUES
  ('0', '0', 'Fundzustand unbekannt', 'Condition completely unknown'),
  ('1', '1', 'Tot, Zeitpunkt des Todes unbekannt', 'Dead, date of death unknown'),
  ('2', '2', 'Sterbend bzw. frischtot', 'Freshly dead within about a week'),
  ('3', '3', 'Bereits länger tot', 'Not freshly dead,for > than a week'),
  ('4', '4', 'Erschöpft, verletzt oder krank', 'Found sick, wounded, unhealthy'),
  ('5', '7', 'Lebend u.frei (kontr.Nicht-Beringer)', 'Alive & prob.healthy,rep.non-ringer'),
  ('6', '8', 'Lebend u.frei (kontr.von Beringer)', 'Alive & prob.healthy,rep.by ringer'),
  ('7', '8', 'Lebend u.frei am Beringungsort', 'Alive, released at place of ringing'),
  ('8', '6', 'Lebend, in Gefangenschaft/in Pflege', 'Alive, but in captivity'),
  ('9', '9', 'Lebend, Verbleib unbekannt', 'Alive, fate unknown'),
  ('A', '9', 'Lebend, Ring entfernt', 'Alive, ring removed');

COMMIT TRANSACTION;