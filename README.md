# bering
Programm zur Erfassung von Vogelberingungsdaten

## Version
1.0.5

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
