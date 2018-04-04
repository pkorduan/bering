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
      evt.data.context.export('1')
    }
  )

  $('#export_wiederfunde').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export('2')
    }
  )

  $('#export_fremdfunde').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.export('3')
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

module.exports.export = function(fundart) {
  console.log('controllers.exports.export fundart: ', fundart);
  let select = "*",
      where = "\
        fundart = " + fundart + " AND\
        beringernr = '" + window.session.beringernr + "' AND\
        datum > date('now', 'start of year')\
      ",
      order = "datum, uhrzeit",
      beringungen = window.models.beringung.findWhere(select, where, '', order)

  console.log('export beringungen: %o', beringungen);

#// TODO: diese function mit exportBering aus model export zusammenbringen, dann model export löschen.
/*
  var path = $('#savePathExport').val();
  var year = $('#exportBeringYear').val();
  //.checked should be enough, but does not work, cf. https://stackoverflow.com/a/16611733
  var notExportedYet = $('#exportBeringNotExportedYet').prop('checked');

  window.models.export.exportBering(beringernr, path, year, notExportedYet);

    //if (path) window.models.export.exportBering(beringernr, path);
    //else dialog.showErrorBox('FEHLER', 'Kein Pfad angegeben!');
  }
*/





}
