// controllers export
'use strict'

module.exports.init = function() {
  console.log('controllers.export.init');

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
      evt.data.context.export(['fundart = 1'])
    }
  )

  $('#export_wiederfunde').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export(['fundart = 2'])
    }
  )

  $('#export_fremdfunde').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export(['fundart = 3'])
    }
  )
}

module.exports.show = function() {
  console.log('controllers.export.show');

  let rows = window.models.setting.findWhere("bezeichnung = 'export_verzeichnis'"),
      export_verzeichnis = rows[0],
      select = "\
        fundart,\
        count(*) AS anzahl\
      ",
      where = "\
        beringernr = '" + window.session.beringernr + "' AND\
        datum > date('now', 'start of year')\
      ",
      group = "fundart",
      order = "datum, uhrzeit",
      beringungen = window.models.beringung.findWhere(select, where, group, order)

  $('#export_verzeichnis_span').html(export_verzeichnis.wert);

  $.each(
    beringungen,
    function(index, v) {
      $('#anzahl_art_' + v.fundart).html(v.anzahl);
    }
  )

  $('section').hide();
  $('#export_section').show()
}

module.exports.showExportPathEdit = function() {
  console.log('controllers.export.showExportPathEdit');

  $('.setting_div').hide();
  $('#exportort_div').toggle();
  controllers.settings.edit();
}

module.exports.calculateSpaces = function (strOrNumber, lengthField) {
  let spaces = '';
  if (strOrNumber == null) strOrNumber = '';
  for (var i = strOrNumber.toString().length; i < lengthField; i++) {
    spaces += '\u0020';
  }
  return spaces;
}

module.exports.export = function(filter = []) {
  console.log('controllers.exports.export');
  let select = "*",
      where = filter.concat(
        "beringernr = '" + window.session.beringernr + "'",
        "exportiert_am IS NULL",
        "datum > date('now', 'start of year')"
      ).join(' AND '),
      order = "datum, uhrzeit",
      beringungen = window.models.beringung.findWhere(select, where, '', order),
      export_verzeichnis = window.models.setting.findByBezeichnung('export_verzeichnis').wert

  console.log('export beringungen: %o', beringungen);

  this.calculateSpaces(200.8, 7);
  //Build String: Ringnummer Vogelart Alter ?? Gewicht Datum Beringungsort Koordinaten ?? ô )Freifeld)+249 Leerezeichen Familienzugehörigkeit (250 lang)
  //ô ist der Beginn einer Freifelddefinition. Dabei handelt es sich in Ihrem Fall einfach um 250 Leerzeichen. Dann folgen 250 Zeichen in denen die Familienzugehörigkeit bestimmt werden kann. (z.B. „N:IA0167138+IA0167139;E:IA0131895;“)
  //ACHTUNG: freifeld hier erstmal fest definiert!
  //TODO: ersetzen durch bemerkung?!

  //ACHTUNG: Familienzugehörigkeit hier erstmal fest definiert!
  //TODO; durch was in der db ersetze?
  let freifeld = '\u00f4',
      family = 'N:IA0167138+IA0167139;E:IA0131895;',
      strWrite = $.map(
        beringungen,
        (function(beringung) {
          if (beringung.gewicht == 0) beringung.gewicht = "0.0";
          //\u0020=normal space; \n=LF; \r=CR; ô = \u00f4
          return '' +
            '\u0020\u0020\u0020' +
            beringung.ringnr +
            '\u0020' +
            beringung.vogelart +
            '\u0020\u0020' +
            beringung.alter +
            '\u0020\u0020\u0020' +
            'ubekannt1' +
            this.calculateSpaces(beringung.gewicht, 7) +
            beringung.gewicht +
            '\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020' +
            beringung.datum +
            '\u0020\u0020\u0020\u0020' +
            beringung.beringungsort +
            this.calculateSpaces(beringung.beringungsort, 30) +
            beringung.koordinaten +
            this.calculateSpaces('ubekannt2', 77) +
            'ubekannt2' +
            this.calculateSpaces(freifeld, 51) +
            freifeld +
            this.calculateSpaces(freifeld, 250) +
            family +
            this.calculateSpaces(family, 250)
        }).bind(this)
      ).join('\r\n')
/*
    if (keys.length > 0) {
      keys.forEach(
        function(key) {
          beringung = beringungen[key];
          //Go through all entries
          //console.log(beringung);
          // console.log("Gewicht: "+beringung.gewicht);
          //Gewicht von 0 muss als "0.0" in der Exportdatei gespeichert werden
          if (beringung.gewicht==0) beringung.gewicht = "0.0";
          //\u0020=normal space; \n=LF; \r=CR; ô = \u00f4
          strWrite += strWrite +
            '\u0020\u0020\u0020' +
            beringung.ringnr +
            '\u0020' +
            beringung.vogelart +
            '\u0020\u0020' +
            beringung.alter +
            '\u0020\u0020\u0020' +
            'ubekannt1' +
            self.calculateSpaces(beringung.gewicht, 7) +
            beringung.gewicht +
            '\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020' +
            beringung.datum +
            '\u0020\u0020\u0020\u0020' +
            beringung.beringungsort +
            self.calculateSpaces(beringung.beringungsort, 30) +
            beringung.koordinaten +
            self.calculateSpaces('ubekannt2', 77) +
            'ubekannt2' +
            self.calculateSpaces(freifeld, 51) +
            freifeld +
            self.calculateSpaces(freifeld, 250) +
            family +
            self.calculateSpaces(family, 250) +
            '\r\n';
        }
      );
    }
*/
    //Dateiende: ^Z = \u001a
    strWrite += '\u001a';
    console.log('exporttext: %o', strWrite);

    if (window.controllers.settings.checkPath(export_verzeichnis)) {
      console.log('checkPath ok');
      fs.writeFile(
        path.join(export_verzeichnis, 'test1.sdf'),
        strWrite,
        (err) => {
          if (err) {
            alert("An error ocurred creating the file "+ err.message)
          }
          alert("The file has been succesfully saved");
        }
      );
    }

}
