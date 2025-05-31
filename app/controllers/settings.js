// controllers settings
'use strict'

module.exports.init = function() {
  log('controllers.settings.init');

  // register event handler

  log('register click on select_sicherung_verzeichnis_button');
  $('#select_sicherung_verzeichnis_button').on(
    'click',
    {
      context: this
    },
    function (evt) {
      log('Funktion ist noch nicht eingebaut.');
//        $('#sicherung_verzeichnis').val(fileNames[0])
    }
  )

  log('register click on settings_edit_link')
  $('#settings_edit_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      $('.menue-selected').removeClass('menue-selected')
      evt.data.context.edit(evt)
    }
  )

  $('#settings_info_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.info(evt)
    }
  )

  $('#change_beringungsort_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.saveBeringungsort(
        $('#settings_edit_form input[name=beringungsort]').val(),
        $('#settings_edit_form input[name=beringungsort_id]').val(),
        $('#settings_edit_form input[name=beringungsort_position]').val(),
        $('#settings_edit_form input[name=beringungsort_kreis]').val(),
        $('#settings_edit_form input[name=zentrale]').val(),
		$('#settings_edit_form input[name=beringungsort_zwei]').val(),
		$('#settings_edit_form input[name=beringungsort_zwei_id]').val(),
        $('#settings_edit_form input[name=beringungsort_position_zwei]').val(),
        $('#settings_edit_form input[name=beringungsort_kreis_zwei]').val(),
        $('#settings_edit_form input[name=zentrale_zwei]').val()
      )
    }
  )
  $('#settings_edit_form input[name=beringungsort]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )
  $('#settings_edit_form input[name=beringungsort_id]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )
  $('#settings_edit_form input[name=beringungsort_position]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )
  $('#settings_edit_form input[name=beringungsort_kreis]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )
  $('#settings_edit_form input[name=zentrale]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )

  $('#settings_edit_form input[name=beringungsort_zwei]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )
  $('#settings_edit_form input[name=beringungsort_zwei_id]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )
  $('#settings_edit_form input[name=beringungsort_position_zwei]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )
  $('#settings_edit_form input[name=beringungsort_kreis_zwei]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )
  $('#settings_edit_form input[name=zentrale_zwei]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )  

  $('#settings_edit_form input[name=beringungsort_zwei_nutzen').on(
    'click',
    function(evt) {
	  log('Klick auf beringungsort_zwei_nutzen')
      $('#settings_edit_form div[id=beringungsort_zwei_div]').show()
	  $('#settings_edit_form button[id=change_beringungsort_button]').show()
    }
  )

  log('fill select option for sicherung_anzahl');
  for (var i = 1; i <= 20; i++) {
    $('#settings_edit_form select[name=sicherung_anzahl]').append(
      $('<option>', {
        value: i,
        text : i
      })
    );
  };

  $('#sicherung_anzahl_select').on(
    'change',
    function(evt) {
      $('#save_sicherung_anzahl_button').show()
    }
  )

  $('#save_sicherung_anzahl_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.saveSicherungAnzahl(
        $('#settings_edit_form [name=sicherung_anzahl]').val()
      )
    }
  )

  $('#change_sicherungsort_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.saveSicherungsort(
        $('#settings_edit_form input[name=sicherung_verzeichnis]').val(),
        $('#settings_edit_form input[name=sicherung_dateiname]').val()
      )
    }
  )

  $('#settings_edit_form input[name=sicherung_verzeichnis]').on(
    'keyup keypress blur change',
    function(evt) {
      $('#settings_edit_form button[id=change_sicherungsort_button]').show()
    }
  )

  $('#settings_edit_form input[name=sicherung_dateiname]').on(
    'keyup keypress blur change',
    function(evt) {
      $('#settings_edit_form button[id=change_sicherungsort_button]').show()
    }
  )

  $('#change_exportort_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.saveExportort(
        $('#settings_edit_form input[name=export_verzeichnis]').val(),
      )
    }
  )

  $('#settings_edit_form input[name=export_verzeichnis]').on(
    'keyup keypress blur change',
    function(evt) {
      $('#settings_edit_form button[id=change_exportort_button]').show()
    }
  )

  $('#save_change_functions_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.saveAdminFunctions([
          'loesch_funktion_an',
          'nur_nicht_exportierte_an',
		  'auto_datum_uhrzeit'
      ])
    }
  )

  $('#settings_edit_form .admin_setting_input').on(
    'click',
    function(evt) {
		log('Klick auf Admin Settings Checkbox')
      $('#settings_edit_form button[id=save_change_functions_button]').show()
    }
  )
  
  $('.setting_link').on(
    'click',
    function (evt) {
	  log('Klick auf Settings-Überschrift')
	  let beringungsort_zwei_nutzen_wert = ($('#settings_edit_form input[name=beringungsort_zwei_nutzen]').is(':checked') ? 'an' : 'aus')
      if ($(evt.target).next().is(':visible')) {
        $(evt.target).next().hide()
      }
      else {
        $('.setting_div').hide()
        $(evt.target).next().toggle()
		if (beringungsort_zwei_nutzen_wert == "an" && evt.target.id == 'beringungsort_link') $('#settings_edit_form div[id=beringungsort_zwei_div]').show()
      }
    }
  )

  $('.dir-button').on(
    'click',
    function (evt) {
      let dir_field = ($(evt.target).is('i') ? $(evt.target).parent() : $(evt.target)).prev()
      dialog.showOpenDialog(
        {
          //Weitere mögliche Properties:
          //createDirectory: macOS - Allow creating new directories from dialog.
          //promptToCreate: Windows - Prompt for creation if the file path entered in the dialog does not exist. This does not actually create the file at the path but allows non-existent paths to be returned that should be created by the application.
          //zumindest unter Windows kann man sich die Optionen sparen -> Ordner kann man auch so anlegen
        properties: ['openDirectory']
        },
        function (dirname) {
          if (dirname === undefined) {
            log("No destination folder selected");
          }
          else {
            log('Ausgewähltes Verzeichnis: ', dirname);
              dir_field.val(dirname.toString()).change()
          }
        }
      );
    }
  )

}

module.exports.saveBeringungsort = function(beringungsort, beringungsort_id, beringungsort_position, beringungsort_kreis, zentrale, beringungsort_zwei, beringungsort_zwei_id, beringungsort_position_zwei, beringungsort_kreis_zwei, zentrale_zwei) {
  log('controllers.settings.saveBerinungsort')

  window.models.setting.update({
    'bezeichnung' : 'beringungsort',
    'wert' : beringungsort
  })
  window.models.setting.update({
    'bezeichnung' : 'beringungsort_id',
    'wert' : beringungsort_id
  })
  window.models.setting.update({
    'bezeichnung' : 'beringungsort_position',
    'wert' : beringungsort_position
  })
  window.models.setting.update({
    'bezeichnung' : 'beringungsort_kreis',
    'wert' : beringungsort_kreis
  })
  window.models.setting.update({
    'bezeichnung' : 'zentrale',
    'wert' : zentrale
  })
  
    window.models.setting.update({
    'bezeichnung' : 'beringungsort_zwei',
    'wert' : beringungsort_zwei
  })
  window.models.setting.update({
    'bezeichnung' : 'beringungsort_zwei_id',
    'wert' : beringungsort_zwei_id
  })
  window.models.setting.update({
    'bezeichnung' : 'beringungsort_position_zwei',
    'wert' : beringungsort_position_zwei
  })
  window.models.setting.update({
    'bezeichnung' : 'beringungsort_kreis_zwei',
    'wert' : beringungsort_kreis_zwei
  })
  window.models.setting.update({
    'bezeichnung' : 'zentrale_zwei',
    'wert' : zentrale_zwei
  })
  
  let wert = ($('#settings_edit_form input[name=beringungsort_zwei_nutzen]').is(':checked') ? 'an' : 'aus')
  window.models.setting.update({
	'bezeichnung' : 'beringungsort_zwei_nutzen',
	'wert' : wert
  })

  $('#change_beringungsort_button').hide()
  $('#beringungsort_div').fadeOut(1000)
}

module.exports.saveSicherungsort = function(sicherung_verzeichnis, sicherung_dateiname) {
  log('controllers.settings.saveSicherungsort')

  window.models.setting.update({
    'bezeichnung' : 'sicherung_verzeichnis',
    'wert' : sicherung_verzeichnis
  })
  window.models.setting.update({
    'bezeichnung' : 'sicherung_dateiname',
    'wert' : sicherung_dateiname
  })

  $('#change_sicherungsort_button').hide()
  $('#sicherungsort_div').fadeOut(1000)
}

module.exports.saveSicherungAnzahl = function(sicherung_anzahl) {
  log('controllers.settings.saveSicherungAnzahl')

  window.models.setting.update({
    'bezeichnung' : 'sicherung_anzahl',
    'wert' : sicherung_anzahl
  })

  $('#save_sicherung_anzahl_button').hide()
  $('#sicherung_anzahl_div').fadeOut(1000)
}

module.exports.saveExportort = function(export_verzeichnis) {
  log('controllers.settings.saveExportort')

  window.models.setting.update({
    'bezeichnung' : 'export_verzeichnis',
    'wert' : export_verzeichnis
  })

  $('#change_exportort_button').hide()
  $('#exportort_div').fadeOut(1000)
}

module.exports.saveAdminFunctions = function(admin_settings) {
  log('controllers.settings.saveAdminFunctions')

  $.each(
    admin_settings,
    function(index, bezeichnung) {
      let wert = ($('#settings_edit_form input[name=' + bezeichnung + ']').is(':checked') ? 'an' : 'aus')

      window.models.setting.update({
        'bezeichnung' : bezeichnung,
        'wert' : wert
      })
    }
  )

  $('#save_change_functions_button').hide()
  $('#change_functions_div').fadeOut(1000)
}

module.exports.edit = function(evt) {
  log('controllers.settings.edit');

  let rows = window.models.setting.findWhere('','bezeichnung'),
      settings = {};

  // Fill form fields with values
  $.each(rows, function(i, v) {
    settings[v.bezeichnung] = v.wert
    $('#settings_edit_form [name=' + v.bezeichnung + ']').val(v.wert)
    if ($('#settings_edit_form [name=' + v.bezeichnung + ']').attr('type') == 'checkbox' && v.wert == 'an') {
      $('#settings_edit_form [name=' + v.bezeichnung + ']').prop('checked', true)
    }
  })
  log('settings: %o', settings)

  $('section').hide();
  $('#settings_edit_section').show()
}

module.exports.info = function(evt) {
  log('controllers.settings.info');
  let converter = new showdown.Converter(),
      readme = fs.readFileSync(path.join(app.getAppPath(), 'README.md'), 'utf8')

  $('#settings_info').append(converter.makeHtml(readme))
  $('section').hide();
  $('#settings_info_section').show()
}

module.exports.checkPath = function (pfad) {
  log('Controllers settings.checkPath')
  // log('Pfad: '+pfad)

  const remote = require('electron').remote;
  const dialog = remote.dialog;

  //https://stackoverflow.com/questions/4482686/check-synchronously-if-file-directory-exists-in-node-js
  var fs = require('fs');
  if (fs.existsSync(pfad)) {
    log('Pfad '+pfad+' existiert');
    //dialog.showMessageBox({message: 'Pfad '+pfad+' existiert', buttons: ["OK"]});
    return true;
  }
  else {
    log('FEHLER setPath: Pfad '+pfad+'existiert nicht!')
    dialog.showErrorBox('FEHLER setPath', 'Pfad '+pfad+' existiert nicht!');
    return false;
  }
}
