# bering
Programm zur Erfassung von Vogelberingungsdaten

## Version
1.0.11

## Programmiert von
Peter Korduan und Christian Seip
GDI-Service Rostock (gdi-service.de)

## Features
- Ein Formular zur Erfassung von Daten zur Berinung von Vögeln.
- Funktion zum Suchen von bereits erfassten Beringungen.
- Unterscheidung zwischen Neu-, Wieder- und Fremdfunden.
- Export in Daten pro Beringer für das BERIHID Programm.

## Installation
Installation von node.js und electron
https://electronjs.org/docs/tutorial/installation
sudo apt-get install node.js
sudo apt-get install npm
sudo apt-get install nodejs-legacy
npm install electron --save-dev --save-exact -g
cd /Verzeichnis/der/Anwendung/
git clone https://github.com/pkorduan/bering.git
electron .

## Build und Pack
**Electron-Packager**

    npm install -g electron-packager # -g um es global zu installieren, sonst beansprucht es nur unnötig platz im package (node_modules ordner)
    electron-packager . bering --platform=win32 --arch=x64 --electron-version=2.0.0 --overwrite --icon=assets/icons/ico/1024x1024.ico # --overwrite überschreibt einen eventuel schon bestehenden build

für 32-Bit:

    electron-packager . bering --platform=win32 --arch=ia32 --electron-version=2.0.0 --overwrite --icon=assets/icons/ico/1024x1024.ico

oder für beide auf einmal:

    electron-packager . bering --platform=win32 --arch=all --electron-version=2.0.0 --overwrite --icon=assets/icons/ico/1024x1024.ico

**Löschen nicht benötigter Daten**
Anschließend werden eine Menge Dateien erzeugt, von denen man nicht alle benötigt. Deshalb sind zu löschen:
- Ordner "locales"
- api*.dll
- blink_image_resources_200_percent.pak
- content_resources_200_percent.pak
- d3dcompiler_47.dll
- lib*.dll
- LICENSE*
- pdf_viewer_resources.pak
- ucrtbase.dll
- ui_resources_200_percent.pak
- version
- views_resources_200_percent.pak

**Beachte**
Die Exe liegt einfach im Hauptordner und öffnet im Prinzip nur eine Chromium Instanz, die auf dem Code in `\bin\resources\app\app` arbeitet. Aus diesem Grund, kann man in resources/app/app auch alle Dateien ändern und hat diese Änderungen auch gleich beim Start der Exe.

## Start (Windows exe)
* Doppelklick bering.exe
* Speicherort DB: `\bin\resources\app\app\db`

## Migrations
Zum Ausführen einer neuen Migration eine neue SQL-Datei in den Ordner app/db/migrations ablegen und die Anwendung neu Starten.
Jede erfolgreich durchgeführte Migration wird in der Tabelle Migrationen abgelegt. Um eine Migration nochmal auszuführen, einfach den Eintrag in Migrationen löschen, alle Änderuengen in der Datenbank rückgängig machen, die bereits durch die vorherige gemacht wurden und die Anwendung neu starten.

## Releas Notes
**1.0.11**
* Fehlermeldung wenn bei Flügel, Teilfeder und/oder Gewicht ein Wert ohne Nachkommastelle eingegeben wird
* Fehlermeldung wenn bei Uhrzeit ein Wert ohne Minuten eingegeben wird
* Fehlermeldung wenn bei Wiederfunden Fundzustand und Fundursache nicht eingegeben wurden
* Fehlermeldung, wenn bei allen Datensätzen Gewicht angegeben wird, MUSS die Uhrzeit angegeben werden
* Suchfunktion, Sortiermöglichkeit und Anzeige nach Ringnummer und/oder Art, auf- oder abwärts usw., damit man nicht immer alle Beringungen/Wiederfunde auf der Seite hat, sondern sagen kann: "Ich möchte alle Alpenstrandläufer, deren Ringserie mit OC beginnt"
* Sortierungsmöglickeiten in Tabellen
* Filterung: so dass man nach Art und/oder Ringnummer und/oder Datum (vlt. da nur Monat/Jahr) filtern kann. Anzeige aller Attribute muss möglich sein, wenn nicht gewünscht, sollten dies händisch auszublenden sein. Na die Übersicht zeigt jetzt nur einen Teilbereich, ich möchte quasi auswählen können, welche mir angezeigt werden. So ist für manche das Schnabelmaß entscheidend, ich will aber eher Flügel und Gewicht sehen, andere wiederum alles
* Vorausfüllung/Defaultwert: Fundumstände "gefangen mit spez. Methode" und "kontrolliert von Beringer"/„lebend und frei von Beringer“
* Pflichtfelder beim Ausfüllen Beringung: Ringnummer, Art, Alter, Datum, Uhrzeit, bei Funden: Ringnummer, Art, Alter, Datum, Uhrzeit, Fundursache und Fundzustand.
* Änderungen an bestehenden Datensätzen müssen auch möglich sein, wenn ein Export der Daten des Beringers bereits erfolgte
* Datum und die Uhrzeit nicht automatisch setzen, also einen Button, dass das automatische "Mitlaufen" deaktiviert
**1.0.5**
* Basisversion