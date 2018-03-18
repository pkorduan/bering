BEGIN TRANSACTION;

PRAGMA foreign_keys = off;

-- Table: Fundursachen
CREATE TABLE Fundursachen (
  code           INTEGER PRIMARY KEY,
  euringcode     VARCHAR (2),
  bezeichnung_de VARCHAR (255),
  bezeichnung_en VARCHAR (255) 
);

INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (0, '1', 'Fundursachen unbekannt', 'Found, reasons unknown');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (1, '1', 'Verletzt, geschwächt, Ursache unbekannt', 'Found sick, wounded, unhealthy');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (10, '11', 'Geschossen am Funddatum', 'Shot');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (11, '11', 'Geschossen gefunden', 'Found shot');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (12, '12', 'Geschossen, Vogelabwehr Landwirtschaft', 'Shot to protect agriculture');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (13, '14', 'Geschossen, Vogelabwehr Flugwesen', 'Shot to prevent air-strike');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (14, '12', 'Geschossen an Geflügelfarm', 'Shot at poultry farm');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (15, '22', 'getötet bei Abwehr von Fischereischäden', 'killed, incl. shot, to prevent damage to fishery ');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (16, '21', 'Gefangen zur Käfighaltung', 'trapped for caging');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (20, '20', 'Gefangen/Gefunden Details unbekannt', 'Captured/found, details unknown');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (21, '20', 'Erbeutet', 'Hunted');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (22, '20', 'Gefangen mit spezieller Methode', 'Trapped with special method');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (23, '20', 'Gefangen in Entenkoje', 'Trapped in duck decoy');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (24, '22', 'Absichtlich vergiftet', 'Trapped or poisoned intentionally');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (25, '10', 'In Wildhandlung gefunden', 'Found on wild bird market');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (26, '20', 'In Gefangenschaft gefunden', 'Found in captivity');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (27, '26', 'Getötet, weil beringt', 'Killed because ringed');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (28, '28', 'Aus Entfernung abgelesen', 'Ring read from distance');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (29, '20', 'Befand sich in Pflege/Gefangenschaft', 'Was kept in captivity/nursery');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (30, '34', 'In Tierfalle mitgefangen', 'Accidentally trapped');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (31, '34', 'Zufällig gefangen in Fischnetz', 'Accidentally trapped in fishing net');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (32, '32', 'Gefangen in Pflanzenschutzanlagen', 'Accidentally trapped');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (33, '48', 'Verunglückt bei landw. Arbeiten', 'Accidentally killed, agriculture');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (34, '48', 'Getötet bei militär./kommerz. Aktion', 'Accidentally killed, milit./commerc.');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (35, '49', 'Zufäll.verfangen in wasserbau.Anlage', 'Accid.trapped water container');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (36, '46', 'Zufäll.verfangen in Hohlraum/Gebäude', 'Entered building accidentally');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (37, '32', 'Gefangen in Vogelvoliere o.ä.', 'Accidentally trapped in bird cage');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (38, '71', 'Verfangen, hängengeblieben an Objekt', 'Tangled in natural object');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (39, '9', 'Zufällig gefangen, Ring war Ursache', 'Entangled because of the ring');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (40, '1', 'Gefunden, Ursachen unbekannt', 'Found, reasons unknown');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (41, '2', 'Nur Ring gefunden', 'Ring found without information');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (42, '65', 'Ring in Gewölle', 'Ring found within Gewölle');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (43, '1', 'gefunden im eigenen Nest (Fundort = Beringungsort)', 'found in the nest  (finding place = ringing place)');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (44, '?', 'nur Zusatzmarkierung gefunden', 'only additional mark found');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (45, '', 'nach Tod verfrachtet durch Verkehrsmittel (F/T)', 'transported to the place by traffic');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (49, '0', 'Nur Ring gefunden, Herkunft unklar', 'Ring found, no information on origin');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (50, '60', 'Tierbeute', 'Taken by animal');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (51, '61', 'von Katze erbeutet', 'Taken by cat');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (52, '62', 'von Hund erbeutet', 'Taken by dog');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (53, '62', 'Beute eines Haustiers', 'Taken by domestic animal');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (54, '63', 'von Raubtier erbeutet', 'Taken by a mammal');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (55, '65', 'Greifvogelbeute', 'Taken by a raptor');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (56, '64', 'Eulenbeute', 'Taken by an owl');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (57, '66', 'von Krähenvogel erbeutet', 'Taken by a corvid');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (58, '66', 'erbeutet von anderer Vogelart', 'Taken by bird, not owl,raptor,corvid');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (59, '68', 'von Fisch/Reptil erbeutet', 'Taken by fish or reptil');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (60, '40', 'Kollision mit Straßenfahrzeug', 'Collision with vehicle on road');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (61, '41', 'Kollision mit Schienenfahrzeug', 'Collision with railway');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (62, '42', 'Kollision mit Luftfahrzeug', 'Collision with aircraft on airfields');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (63, '6', 'Gefunden auf Schiff', 'Collision with or found on ship');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (64, '47', 'Gefunden auf Feuerschiff', 'Collision with light-ship');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (65, '47', 'Gefunden an Leuchtturm', 'Collision with light-house');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (66, '44', 'Kollision mit Glasfläche', 'Collision with glass');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (67, '43', 'Kollision mit Mast, Pfeiler o.ä.', 'Collision with masts etc.');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (68, '35', 'Kollis. Freileitung oder Stromschlag', 'Collision with masts, wires and/or electrocuted ');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (69, '43', 'Kollision mit Gegenstand', 'Collision with undefined object');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (70, '74', 'Kälteopfer (kaltes Wetter)', 'victim of cold weather');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (71, '74', 'Kälteopfer (Schnee)', 'Victim of snow');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (72, '77', 'Vereist', 'caught in ice, ice-covered');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (73, '75', 'Hitzeopfer', 'Victim of hot weather');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (74, '78', 'Im Nebel verunglückt', 'Caused by mist');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (75, '78', 'Im Sturm verunglückt', 'Victim of storm');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (76, '78', 'Unwetteropfer', 'Victim of thunderstorm');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (77, '78', 'Hochwasseropfer', 'Victim of inundation');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (80, '30', 'Verölt', 'Oiled');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (81, '70', 'Ertrunken', 'Drowned');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (82, '22', 'vergiftet, zufällig bei Giftanwendung gegen andere Wirbeltiere ', 'accidentally poisoned by venom against other animals');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (83, '22', 'vergiftet durch Pflanzenschutzmittel', 'Poisoned by pesticide or chemical');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (84, '53', 'Viröse o. bakterielle Erkrankung', 'Victim of bact.or viral desease');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (85, '', 'Zum angegebenen Ort verfrachtet (T/F)', 'transported to the place');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (86, '45', 'Kollision mit Windkraftanlage', 'Collision with wind power plant');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (87, '', 'Eingeschläfert, weil verletzt/krank', 'Death by euthanasia');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (88, '50', 'Opfer innerartlicher Auseinandersetzungen', 'Victim of intraspecific conflict');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (89, '1', 'Fundursache nur Original entnehmbar', 'Circumstances known, not to codify');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (90, '84', 'geortet durch Sender', 'Bird identified by transmitter');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (91, '84', 'geortet durch Bodentelemetrie', 'bird identified by radio tracking');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (92, '85', 'geortet durch Satellitentelemetrie', 'bird identified by satellite tracking');
INSERT INTO Fundursachen (code, euringcode, bezeichnung_de, bezeichnung_en) VALUES (93, '86', 'geortet durch Transponder', 'bird identified by transponder
');

PRAGMA foreign_keys = on;

COMMIT TRANSACTION;