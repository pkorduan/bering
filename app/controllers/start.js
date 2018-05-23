'use strict'

module.exports.init = function() {
  log('start_controller.init');

  log('register click on save_database_button')
  $('#save_database_button').on(
    'click',
    {
      context: this
    },
    function (evt) {
      evt.data.context.backupDb()
    }
  )
}

module.exports.start = function() {
  log('start_controller.show')

  $('.row .placeholders').hide();
  if (window.session.angemeldet) {
    $('#menu').show();
    $('.nav-item').show();
    $('#login_link').hide();
    $('#logout_link').show();
    if (window.session.rolle == 'admin') {
      $('#admin_help_div').show();
    }
    else {
      $('#admin_help_div').hide();
    }
    window.controllers.beringungen.list($('#list_all_data_menue_link'));
  } else {
    $('#menu').hide();
    $('.nav-item').hide();
    $('#login_link').addClass('active').show();
    $('#logout_link').hide();
    $('#login').show();
  }
}

module.exports.backupDb = function () {
  log('controllers.start.backupDb');
  let src = window.model.db,
      sicherung_verzeichnis = window.models.setting.findByBezeichnung('sicherung_verzeichnis').wert,
      sicherung_dateiname = window.models.setting.findByBezeichnung('sicherung_dateiname').wert,
      sicherung_anzahl = window.models.setting.findByBezeichnung('sicherung_anzahl').wert,
      sicherungen = [],
      i = 0

  if (sicherung_verzeichnis == '') {
    dialog.showMessageBox({
      title: 'Sicherung',
      message: 'Sie müssen erst ein Verzeichnis auswählen und die Einstellung speichern!',
      type: 'warning',
      buttons: ['ok']
    })
  }
  else {
    if (sicherung_dateiname == '') {
      dialog.showMessageBox({
        title: 'Sicherung',
        message: 'Sie müssen erst einen Dateinamen auswählen und die Einstellung speichern!',
        type: 'warning',
        buttons: ['ok']
      })
    }
    else {
      // ToDo rotate database files
      sicherungen = fs.readdirSync(sicherung_verzeichnis).filter(
        function(file) {
          var parts  = file.split('.')
          if (file.indexOf(sicherung_dateiname) == 0 && parts[parts.length - 1] == 'db') {
            return file;
          }
        }
      ).sort()

      for (i = 0; i <= sicherungen.length - sicherung_anzahl; i++) {
        // delete files[i]
        fs.unlink(sicherung_verzeichnis + '/' + sicherungen[i], (err) => {
          if (err) throw err;
          log('Datei: ' + sicherung_verzeichnis + '/' + sicherungen[i] + ' gelöscht.');
        });
      }

      let dst = sicherung_verzeichnis + '/' + sicherung_dateiname + '_' + window.controllers.export.dateTimeFormatted() + '.db'
      log('Save Database ' + src + ' to ' + dst)
      fs.createReadStream(src).pipe(fs.createWriteStream(dst));

      new Notification('Sicherung', { body: 'Die Datenbank wurde erfolgreich gesichert in Datei: ' + dst })

    }
  }
}
