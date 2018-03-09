# bering
Programm zur Erfassung von Vogelberingungsdaten

##Version
0.9.0

##Programmiert von
Peter Korduan und Christian Seip
GDI-Service Rostock (gdi-service.de)

##Features
- Ein Formular zur Erfassung von Daten zur Berinung von Vögeln.
- Funktion zum Suchen von bereits erfassten Beringungen.
- Unterscheidung zwischen Neu-, Wieder- und Fremdfunden.
- Export in Daten pro Beringer für das BERIHID Programm.

##Installation
Installation von node.js und electron
https://electronjs.org/docs/tutorial/installation
sudo apt-get install node.js
sudo apt-get install npm
sudo apt-get install nodejs-legacy
npm install electron --save-dev --save-exact -g 
cd /Verzeichnis/der/Anwendung/
git clone https://github.com/pkorduan/bering.git
electron .

##Migrations
Zum Ausführen einer neuen Migration eine neue SQL-Datei in den Ordner app/db/migrations ablegen und die Anwendung neu Starten.
Jede erfolgreich durchgeführte Migration wird in der Tabelle Migrationen abgelegt. Um eine Migration nochmal auszuführen, einfach den Eintrag in Migrationen löschen, alle Änderuengen in der Datenbank rückgängig machen, die bereits durch die vorherige gemacht wurden und die Anwendung neu starten.