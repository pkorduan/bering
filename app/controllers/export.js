// controllers export
'use strict'

module.exports.init = function() {
  log('controllers.export.init');

  // register event handler

  $('#export_show_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.show()
    }
  )

  $('#edit_export_verzeichnis_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.showExportPathEdit()
    }
  )

  $('#export_beringungen').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export(['fundart = 1', 'berihiddversion = 3'])
    }
  )
  
    $('#export_beringungen_berihidd4').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export(['fundart = 1', 'berihiddversion = 4'])
    }
  )

  $('#export_wiederfunde').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export(['fundart = 2', 'berihiddversion = 3'])
    }
  )
  
  $('#export_wiederfunde_berihidd4').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export(['fundart = 2', 'berihiddversion = 4'])
    }
  )
  
  $('#export_fremdfunde').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export(['fundart = 3', 'berihiddversion = 3'])
    }
  )
  
  $('#export_fremdfunde_berihidd4').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export(['fundart = 3', 'berihiddversion = 4'])
    }
  )
}

module.exports.show = function() {
  log('controllers.export.show');

  let rows = window.models.setting.findWhere("bezeichnung = 'export_verzeichnis'"),
      export_verzeichnis = rows[0],
      select = "\
        fundart,\
        count(*) AS anzahl\
      ",
      where = "\
        beringernr = '" + window.session.beringernr + "' AND\
        exportiert_am IS NULL\
      ",
      group = "fundart",
      order = "datum, uhrzeit",
      beringungen = window.models.beringung.findWhere(select, where, group, order)

  $('#export_verzeichnis_span').html(export_verzeichnis.wert);
  
  $('#anzahl_art_1, #anzahl_art_2, #anzahl_art_3, #anzahl_art_1_berihidd4, #anzahl_art_2_berihidd4, #anzahl_art_3_berihidd4').html('0');

  $.each(
    beringungen,
    function(index, v) {
      $('#anzahl_art_' + v.fundart).html(v.anzahl);
      $('#anzahl_art_' + v.fundart + '_berihidd4').html(v.anzahl);
	  log('controllers.export.show Anzahl:'+v.anzahl);
    }
  )

  $('section').hide();
  $('#export_section').show()
}

module.exports.showExportPathEdit = function() {
  log('controllers.export.showExportPathEdit');

  $('.setting_div').hide();
  $('#exportort_div').toggle();
  controllers.settings.edit();
}
/*
module.exports.calculateSpaces = function (strOrNumber, lengthField) {
  let spaces = '';
  if (strOrNumber == null) strOrNumber = '';
  for (var i = strOrNumber.toString().length; i < lengthField; i++) {
    spaces += '\u0020';
  }
  return spaces;
}
*/
module.exports.lpad = function (value, length = value.length, fillChar = ' ') {
  return (fillChar.repeat(length) + value).slice(-length)
}

module.exports.rpad = function (value, length = value.length, fillChar = ' ') {
  value = value || '';
  //log('value: ' + value + ' length: ' + length + ' fillChar: ' + fillChar);
  let fillLength = length - (value).toString().length;
  if (fillLength < -1) fillLength = 0;
  return (value + Array(fillLength + 1).join(fillChar)).substr(0, length);
}

module.exports.export = function(filter = []) {
  log('controllers.exports.export filter: ' + JSON.stringify(filter));//ex.: '["fundart = 1","berihiddversion = 4"]'
  let fundart = filter[0].slice(-1),
      select = "id, beringernr, zentrale, ringnr, bemerkung, vogelart, datum, uhrzeit, geschlecht, \"alter\", printf(\"%.1f\", fluegellaenge) AS fluegellaenge, printf(\"%.1f\", teilfederlaenge) AS teilfederlaenge, printf(\"%.1f\", schnabellaenge) AS schnabellaenge, printf(\"%.1f\", schnabel_kopflaenge) AS schnabel_kopflaenge, printf(\"%.1f\", lauf) AS lauf, printf(\"%.1f\", gewicht) AS gewicht, brutstatus, ortid, beringungsort, koordinaten, skz_1, skz_2, farbring_liun, farbring_liob, farbring_reun, farbring_reob, inschrift, fundart, fundzustand, fundursache, exportiert_am, fett, muskel, netznr",
      //eigentlich wollte ich mit splice(-1) das letzte Element entfernen (also 'berihiddversion = 4' z. B.), aber Ergebnis ist dann dieses entfernte Element, deshalb nun splice(0,1), das entfernt zwar im Prinzip, das Element, das ich brauche, aber da das dann das Ergebnis ist, mit dem weitergearbeitet wird, funktioniert es -> weiterer Vorteil: es bleibt dann nur "berihiddversion = 4" im filter-Array
	  where = filter.splice(0,1).concat(
        "beringernr = '" + window.session.beringernr + "'",
        "exportiert_am IS NULL"
      ).join(' AND '),
      //order = "datum, uhrzeit",
	  order = "ringnr",
      beringungen = window.models.beringung.findWhere(select, where, '', order),
      export_verzeichnis = window.models.setting.findByBezeichnung('export_verzeichnis').wert,
      beringungsort_kreis = window.models.setting.findByBezeichnung('beringungsort_kreis').wert,
      file_name = '',
	  file_name_ext = '',
      lines = [],
      strWrite = '';

  log('controllers.exports.export fundart: ' + fundart);
  
  let berihiddversion = JSON.stringify(filter[0].slice(-1))
  let fundartVersion = fundart + berihiddversion.slice(1, -1)
  log('controllers.exports.export fundartVersion: ' + fundartVersion);
  
  if (window.controllers.settings.checkPath(export_verzeichnis)) {
    if (Object.keys(beringungen).length == 0) {
      // keine zum Export vorhanden
      dialog.showErrorBox('Warnung', 'Es stehen keine Datensätze dieser Fundart zum Export zur Verfügung!');
    }
    else {
      switch (fundartVersion) {
		case '13': {
		  //log('Klich OK für Fundart 1 und berihidd-Version 3');
          file_name = 'B'
		  file_name_ext = 'sdf'
          lines = $.map(
            beringungen,
            (function(beringung) {
              if (beringung.gewicht == 0) beringung.gewicht = "0.0";
			  var ringnr = String(beringung.ringnr);
			  var serie = ringnr.substring(0,2).toUpperCase();
			  var ringnrOhneSerie = ringnr.substring(2, ringnr.length);
              return '' +
                this.lpad(beringung.zentrale, 3) + //Wenn Zentrale kürzer -> füge vorn Leerzeichen ein (vorher rechts [rpad])
                serie +
				ringnrOhneSerie.padStart(7, '0') + //Fülle die 7-stellige ringnr vorn mit 0en auf (hinten: ringnrOhneSerie.padEnd(9, '0'))
                this.rpad(' ', 1) + // Z
                this.rpad(beringung.vogelart, 7) +
                this.rpad(beringung.geschlecht, 1) +
                this.rpad(beringung.alter, 4) +
                this.rpad(beringung.brutstatus, 1) +
                this.lpad(beringung.teilfederlaenge, 5) + //vorher rechts (rpad)
                this.lpad(beringung.fluegellaenge, 5) + //vorher rechts (rpad)
                this.lpad(beringung.gewicht, 7) + //vorher rechts (rpad)
                this.rpad(' ', 4) + // Habitat
                this.rpad(' ', 4) + // Brutstatus
				this.rpad(beringung.datum.substr(8, 2)) + // Tag
                this.rpad(beringung.datum.substr(5, 2)) + // Monat
                this.rpad(beringung.uhrzeit.substr(0, 2)) + // Stunde
                this.rpad(' ', 1) + // U
                this.rpad(beringung.skz_1, 1) + this.rpad(beringung.skz_2, 1) +
                this.rpad(' ', 1) + // RA
                this.rpad(beringungsort_kreis, 4) +
                this.rpad(beringung.beringungsort, 22) +
                this.rpad(' ', 2) + // Entfernung
                this.rpad(' ', 2) + // Richtung
                this.rpad(beringung.koordinaten, 15) +
                this.rpad(' ', 1) + // Genau
                this.rpad(beringung.bemerkung, 60) +
                this.rpad(' ', 3) + // Prog
                this.rpad(' ', 2) + // Zeile
                this.rpad(' ', 3) + // Blatt
                this.rpad(beringung.datum.substr(0, 4)) + // Jahr
                this.lpad(beringung.beringernr, 4) +
                this.rpad(' ', 2) + // Korrzeichen, was aber ans Ende soll und hier mit Leerzeichen
                this.rpad(' ', 7) + // Wirt
                this.rpad(beringung.farbring_liob, 2) + // SKFarbe
                this.rpad(beringung.farbring_liun, 2) + // SKFarbe1
                this.rpad(beringung.farbring_reob, 2) + // SKFarbe2
                this.rpad(beringung.farbring_reun, 2) + // SKFarbe3
                this.rpad(beringung.inschrift, 9) + // SKNummer
                this.rpad(' ', 9) + // ZNummer
                this.rpad(' ', 3) + // ZZentrale
                this.rpad(' ', 9) + // UNummer
                this.rpad(' ', 3) + // UZentrale
                '\u00f4' + // Korrzeich
				this.rpad(' ', 249) + // Freifeld - soll eigentlich 250 lang sein, dann stimmt die Position der Familienzugehörigkeit/Nestgeschwister aber nicht mehr
				this.rpad(' ', 250) // Familienzugehörigkeit, ' ' müsste später mit beringung.family o. ä. ersetzt werden
            }).bind(this)
          )
        } break;
		case '14': {
			log('Klick OK für Fundart 1 und berihidd-Version 4');
			file_name = 'B'
			file_name_ext = 'SD4'
            lines = $.map(
            beringungen,
            (function(beringung) {
              if (beringung.gewicht == 0) beringung.gewicht = "0.0";
              if (!beringung.fett) beringung.fett = "-";
              if (!beringung.muskel) beringung.muskel = "-";
              if (!beringung.netznr) beringung.netznr = "--";
			  var ringnr = String(beringung.ringnr);
			  var serie = ringnr.substring(0,2).toUpperCase();
			  var ringnrOhneSerie = ringnr.substring(2, ringnr.length);
              return '' +
                this.lpad(beringung.zentrale, 3) + //Heißt in BERIHIDD 4 nun VOGELWARTE; gilt das immer noch?: Wenn Zentrale kürzer -> füge vorn Leerzeichen ein
                serie +
				ringnrOhneSerie.padStart(7, '0') + //Kann das mit serien und ringnr auch in BERIHIDD 4 so bleiben? Fülle die 7-stellige ringnr vorn mit 0en auf (hinten: ringnrOhneSerie.padEnd(9, '0'))
                this.rpad(' ', 1) + // Z
                this.rpad(beringung.vogelart, 7) +
                this.rpad(beringung.geschlecht, 1) +
                this.rpad(beringung.alter, 4) +
                this.rpad(beringung.brutstatus, 1) +
                this.lpad(beringung.teilfederlaenge, 5) +
                this.lpad(beringung.fluegellaenge, 5) +
                this.lpad(beringung.gewicht, 7) +
                this.rpad(' ', 4) + // Habitat
                this.rpad(' ', 4) + // Brutstatus
				this.rpad(beringung.datum.substr(8, 2)) + // Tag
                this.rpad(beringung.datum.substr(5, 2)) + // Monat
                this.rpad(beringung.uhrzeit.substr(0, 2)) + // Stunde
                this.rpad(' ', 1) + // U
                this.rpad(beringung.skz_1, 1) + this.rpad(beringung.skz_2, 1) +
                this.rpad(' ', 1) + // RA
				this.lpad(beringung.ortid, 9) + //TODO: beringung.beringungsortid einfügen (auch ins Datenmodell), Wenn ORTID kürzer -> füge vorn Leerzeichen ein
                this.rpad(beringungsort_kreis, 4) +
                this.rpad(beringung.beringungsort, 40) + //Neu in BERIHIDD 4 Länge nun 40 statt vorher 22
                this.rpad(' ', 2) + // Entfernung
                this.rpad(' ', 2) + // Richtung
                this.rpad(beringung.koordinaten, 15) +
                this.rpad(' ', 1) + // Genau
                this.rpad(beringung.bemerkung.substring(0,47)+';F:'+beringung.fett+',M:'+beringung.muskel+',N:'+beringung.netznr, 60) +
                this.rpad(' ', 3) + // Prog
                this.rpad(' ', 2) + // Zeile
                this.rpad(' ', 3) + // Blatt
                this.rpad(beringung.datum.substr(0, 4)) + // Jahr
                this.lpad(beringung.beringernr, 4) +
                this.rpad(' ', 2) + // Korrzeichen
                this.rpad(' ', 7) + // Wirt
                this.rpad(beringung.farbring_liob, 2) + // SKFarbe
                this.rpad(beringung.farbring_liun, 2) + // SKFarbe1
                this.rpad(beringung.farbring_reob, 2) + // SKFarbe2
                this.rpad(beringung.farbring_reun, 2) + // SKFarbe3
                this.rpad(beringung.inschrift, 15) + // SKNummer, Neu in BERIHIDD 4 Länge nun 15 statt vorher 9
                this.rpad(' ', 9) + // ZNummer
                this.rpad(' ', 3) + // ZZentrale
                this.rpad(' ', 9) + // UNummer
                this.rpad(' ', 3) + // UZentrale
                //'\u00f4' + // Korrzeich - nicht mehr nötig in BERIHIDD 4?
				//this.rpad(' ', 249) + // Freifeld - soll eigentlich 250 lang sein, dann stimmt die Position der Familienzugehörigkeit/Nestgeschwister aber nicht mehr - nicht mehr nötig in BERIHIDD 4?
				//this.rpad(' ', 250) // Familienzugehörigkeit, ' ' müsste später mit beringung.family o. ä. ersetzt werden - nicht mehr nötig in BERIHIDD 4?
				this.rpad('\u00B6', 250) + // ZSFREI, in Beispieldatei immer gesetzt mit "X" oder "¶" ('\u00B6'), Rest (also rechts Leerzeichen) immer leer - TODO da neu in BERIHIDD 4
				this.rpad(' ', 250) // ZSFAM, kürzeste Beispiel in N:EA0228900+EA0229332;: 'N:EA0228900+EA0229332;' - TODO da neu in BERIHIDD 4
            }).bind(this)
          )
		} break;
        case '2': // fall through, da Eigenwiederfunde und Fremdwiederfunde identisch behandelt werden (abgesehen vom Dateinamen), s. a. https://stackoverflow.com/questions/6513585/test-for-multiple-cases-in-a-switch-like-an-or
        default: {
          if (fundart == '2') file_name = 'W';
		  else file_name = 'F';
		  file_name_ext = 'sdf'
		  //log('berihiddversion nach fall-through: ' + berihiddversion.slice(1, -1));
		  if (berihiddversion.slice(1, -1) == 3) {
			  //log('Klich OK für Fundart 2 (oder 3) und berihidd-Version 3');
			  lines = $.map(
				beringungen,
				(function(beringung) {
				  if (beringung.gewicht == 0) beringung.gewicht = "0.0";
				  var ringnr = String(beringung.ringnr);
				  var serie = ringnr.substring(0,2).toUpperCase();
				  var ringnrOhneSerie = ringnr.substring(2, ringnr.length);
				  var lebedingOderTot = ' ';
				  if (beringung.fundzustand == '1' || beringung.fundzustand == '2' || beringung.fundzustand == '3') lebedingOderTot = '+';
				  else if (beringung.fundzustand == '0' || beringung.fundzustand == '4' || beringung.fundzustand == '5' || beringung.fundzustand == '6' || beringung.fundzustand == '7' || beringung.fundzustand == '8' || beringung.fundzustand == '9' || beringung.fundzustand == 'A') lebedingOderTot = 'v';
				  return '' +
					this.lpad(beringung.zentrale, 3) + //Wenn Zentrale kürzer -> füge vorn Leerzeichen ein (vorher rechts [rpad])
					serie +
					ringnrOhneSerie.padStart(7, '0') + //Fülle die 7-stellige ringnr vorn mit 0en auf (hinten: ringnrOhneSerie.padEnd(9, '0'))
					this.rpad(' ', 3) + // Nummer, eigentlich 'beringung.id', aber Fr. Kreutzer wollte die raus haben
					this.rpad(' ', 1) + // VER
					this.rpad(' ', 1) + // Zusring
					this.rpad(' ', 1) + // Umring
					this.rpad(beringung.skz_1, 2) +
					this.rpad(beringung.skz_2, 2) +
					this.rpad(' ', 3) + // KZE
					this.rpad(' ', 9) + // Neuring
					this.rpad(beringung.vogelart, 7) +
					this.rpad(beringung.geschlecht, 1) +
					this.rpad(beringung.alter, 4) +
					this.rpad(beringung.brutstatus, 1) +
					this.lpad(beringung.teilfederlaenge, 5) +
					this.lpad(beringung.fluegellaenge, 5) +
					this.lpad(beringung.gewicht, 7) +
					this.rpad(' ', 3) + // VEF
					this.rpad('0', 1) + // Genauigkeit, default mal 0 gesetzt, bis Klagen kommen ;-)
					//this.rpad(beringung.datum.substr(5, 2)) + // Tag
					//this.rpad(beringung.datum.substr(8, 2)) + // Monat
					//this.rpad(beringung.datum.substr(0, 4)) + // Jahr
					//this.rpad(beringung.uhrzeit.substr(0, 2)) + // Stunde
					this.rpad(beringung.datum.substr(8, 2)) + // Tag
					this.rpad(beringung.datum.substr(5, 2)) + // Monat
					this.rpad(beringung.datum.substr(0, 4)) + // Jahr
					this.rpad(beringung.uhrzeit.substr(0, 2)) + // Stunde
					this.rpad(lebedingOderTot, 1) + // v = lebendig, + = tot
					this.rpad(beringung.fundzustand, 1) + // Fundstatus
					this.rpad(beringung.fundursache, 2) + // Umstand
					this.rpad(' ', 1) + // ANS
					this.rpad(' ', 2) + // LAN
					this.rpad(' ', 3) + // FUZ
					this.rpad(beringungsort_kreis, 4) +
					this.rpad(beringung.beringungsort, 22) +
					this.rpad(' ', 2) + // Entfernung
					this.rpad(' ', 2) + // EntRicht
					this.rpad(beringung.koordinaten, 15) +
					this.rpad(' ', 4) + // Tage
					this.rpad(' ', 2) + // Richtung
					this.rpad(' ', 3) + // WIG
					this.rpad(' ', 2) + // WIM
					this.rpad(' ', 5) + // Kilometer
					this.rpad('0', 2) + // FZE
					this.rpad(' ', 4) + // FBL
					this.rpad(' ', 2) + // JGG
					this.rpad(' ', 1) + // KJB
					this.rpad(' ', 4) + // Programm - lt. Spezifikation nur 3, aber beringernr muss eins weiter nach hinten
					this.lpad(beringung.beringernr, 4) +
					this.rpad(beringung.bemerkung, 30) +
					'\u00f4' + // Korrzeich
					this.rpad(' ', 499) // Freifeld - nicht in Spezifikation, soll aber lt. Fr. Kreutzer rein
				}).bind(this)
			  )
		  }
		  else {
			  //log('Klick OK für Fundart 2 (oder 3) und berihidd-Version 4');
			  if (fundart == '2') file_name = 'W';
			  else file_name = 'F';
			  file_name_ext = 'SD4'
			  lines = $.map(
				beringungen,
				(function(beringung) {
				  if (beringung.gewicht == 0) beringung.gewicht = "0.0";
				  if (!beringung.fett) beringung.fett = "-";
                  if (!beringung.muskel) beringung.muskel = "-";
                  if (!beringung.netznr) beringung.netznr = "--";
				  var ringnr = String(beringung.ringnr);
				  var serie = ringnr.substring(0,2).toUpperCase();
				  var ringnrOhneSerie = ringnr.substring(2, ringnr.length);
				  var lebedingOderTot = ' ';
				  if (beringung.fundzustand == '1' || beringung.fundzustand == '2' || beringung.fundzustand == '3') lebedingOderTot = '+';
				  else if (beringung.fundzustand == '0' || beringung.fundzustand == '4' || beringung.fundzustand == '5' || beringung.fundzustand == '6' || beringung.fundzustand == '7' || beringung.fundzustand == '8' || beringung.fundzustand == '9' || beringung.fundzustand == 'A') lebedingOderTot = 'v';
				  return '' +
					this.lpad(beringung.zentrale, 3) + //Wenn Zentrale kürzer -> füge vorn Leerzeichen ein (vorher rechts [rpad])
					serie +
					ringnrOhneSerie.padStart(7, '0') + //Fülle die 7-stellige ringnr vorn mit 0en auf (hinten: ringnrOhneSerie.padEnd(9, '0'))
					this.rpad(' ', 3) + // Nummer, eigentlich 'beringung.id', aber Fr. Kreutzer wollte die raus haben
					this.rpad(' ', 1) + // VER
					this.rpad(' ', 1) + // Zusring
					this.rpad(' ', 1) + // Umring
					this.rpad(beringung.skz_1, 1) + //Neu in BERIHIDD 4 Länge nun 1 statt vorher 2
					this.rpad(beringung.skz_2, 1) + //Neu in BERIHIDD 4 Länge nun 1 statt vorher 2
					this.rpad(' ', 3) + // KZE
					this.rpad(' ', 9) + // Neuring
					this.rpad(beringung.vogelart, 7) +
					this.rpad(beringung.geschlecht, 1) +
					this.rpad(beringung.alter, 4) +
					this.rpad(beringung.brutstatus, 1) +
					this.lpad(beringung.teilfederlaenge, 5) +
					this.lpad(beringung.fluegellaenge, 5) +
					this.lpad(beringung.gewicht, 7) +
					this.rpad(' ', 3) + // VEF
					this.rpad('0', 1) + // Genauigkeit, default mal 0 gesetzt, bis Klagen kommen ;-)
					//this.rpad(beringung.datum.substr(5, 2)) + // Tag
					//this.rpad(beringung.datum.substr(8, 2)) + // Monat
					//this.rpad(beringung.datum.substr(0, 4)) + // Jahr
					//this.rpad(beringung.uhrzeit.substr(0, 2)) + // Stunde
					this.rpad(beringung.datum.substr(8, 2)) + // Tag
					this.rpad(beringung.datum.substr(5, 2)) + // Monat
					this.rpad(beringung.datum.substr(0, 4)) + // Jahr
					this.rpad(beringung.uhrzeit.substr(0, 2)) + // Stunde
					this.rpad(lebedingOderTot, 1) + // v = lebendig, + = tot
					this.rpad(beringung.fundzustand, 1) + // Fundstatus - müsste raus?!
					this.rpad(beringung.fundursache, 2) + // Umstand
					this.rpad(' ', 1) + // ANS
					this.rpad(' ', 2) + // LAN
					this.rpad(' ', 3) + // FUZ
					this.lpad(beringung.ortid, 9) + //TODO: beringung.beringungsortid einfügen (auch ins Datenmodell), Wenn FUNDORTID kürzer -> füge vorn Leerzeichen ein
					this.rpad(beringungsort_kreis, 4) +
					this.rpad(beringung.beringungsort, 40) + //Neu in BERIHIDD 4 Länge nun 40 statt vorher 22
					this.rpad(' ', 2) + // Entfernung
					this.rpad(' ', 2) + // EntRicht
					this.rpad(beringung.koordinaten, 15) +
					this.rpad(' ', 4) + // Tage
					this.rpad(' ', 2) + // Richtung
					this.rpad(' ', 3) + // WIG
					this.rpad(' ', 2) + // WIM
					this.rpad(' ', 5) + // Kilometer
					this.rpad('0', 2) + // FZE
					this.rpad(' ', 4) + // FBL
					this.rpad(' ', 2) + // JGG
					this.rpad(' ', 1) + // KJB
					this.rpad(' ', 4) + // Programm - lt. Spezifikation nur 3, aber beringernr muss eins weiter nach hinten
					this.lpad(beringung.beringernr, 4) +
					this.rpad(beringung.bemerkung, 30) + //BEMERKUNG1
					//'\u00f4' + // Korrzeich - nicht mehr nötig?
					//this.rpad(' ', 499) // Freifeld - nicht in Spezifikation, soll aber lt. Fr. Kreutzer rein - auch nicht mehr nötig?
					this.rpad(';F:'+beringung.fett+',M:'+beringung.muskel+',N:'+beringung.netznr, 30) + //BEMERKUNG2 -> beringung.bemerkung2 - TODO da neu in BERIHIDD 4
					this.rpad(' ', 30) + //BEMERKUNG3 -> beringung.bemerkung3 - TODO da neu in BERIHIDD 4
					this.rpad(' ', 2) + //SKFARBE -> beringung.skfarbe - TODO da neu in BERIHIDD 4
					this.rpad(' ', 2) + //SKFARBE1 -> beringung.skfarbe1 - TODO da neu in BERIHIDD 4
					this.rpad(' ', 2) + //SKFARBE2 -> beringung.skfarbe2 - TODO da neu in BERIHIDD 4
					this.rpad(' ', 2) + //SKFARBE3 -> beringung.skfarbe3 - TODO da neu in BERIHIDD 4
					this.rpad(' ', 15) + //SKNUMMER1 -> beringung.sknummer1 - TODO da neu in BERIHIDD 4
					this.rpad('\u00B6', 250) + //ZSFREI, in Beispieldatei immer gesetzt mit "X" oder "¶" ('\u00B6'), Rest (also rechts Leerzeichen) immer leer - TODO da neu in BERIHIDD 4
					this.rpad(' ', 250) // ZSFAM, kürzeste Beispiel in N:EA0228900+EA0229332;: 'N:EA0228900+EA0229332;' - TODO da neu in BERIHIDD 4
				}).bind(this)
			  )
		  }
        }
      }

      strWrite  = lines.join('\r\n') // join lines
      strWrite += '\r\n\u001a' //Dateiende: ^Z = \u001a

      file_name += window.session.beringernr + '_' + this.dateTimeFormatted() + '.' + file_name_ext

      log('Write export file to: ' + path.join(export_verzeichnis, file_name))

      fs.writeFile(
        path.join(export_verzeichnis, file_name),
         strWrite, 
		 {	//NEUER Parameter wegen Problemen mit dem Korrzeich und Umlauten, s. https://stackoverflow.com/questions/14551608/list-of-encodings-that-node-js-supports
           encoding: "binary"
        },
        (err) => {
          if (err) {
            alert("Fehler beim Speichern der Exportdatei: " + err.message)
          }
          window.models.beringung.updateExportDate(where)
          window.controllers.export.show()
          dialog.showMessageBox({
            title: 'Datenbank',
            message: 'Die Daten wurden erfolgreich exportiert nach\n' + path.join(export_verzeichnis + '/' + file_name),
            type: 'question',
            buttons: ['ok']
          })
        }
      );
    }
  }
}

module.exports.dateTimeFormatted = function(d = new Date()) {
  return d.getFullYear() + '-' + this.lpad(d.getMonth() + 1, 2, '0') + '-' + this.lpad(d.getDate(), 2, '0') + '_' + this.lpad(d.getHours(), 2, '0') + '-' + this.lpad(d.getMinutes(), 2, '0') + '-' + this.lpad(d.getSeconds(), 2, '0')
}
