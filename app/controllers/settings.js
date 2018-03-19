// controllers settings
'use strict'

module.exports.init = function() {
  console.log('controllers.settings.init');

  // register event handler

  console.log('register click on settings_edit_link')
  $('#settings_edit_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
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
        $('#settings_edit_form input[name=beringungsort_position]').val(),
        $('#settings_edit_form input[name=beringungsort_kreis]').val()
      )
    }
  )
  $('#settings_edit_form input[name=beringungsort]').on(
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
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_sicherungsort_button]').show()
    }
  )
  $('#settings_edit_form input[name=sicherung_dateiname]').on(
    'keyup',
    function(evt) {
      $('#settings_edit_form button[id=change_sicherungsort_button]').show()
    }
  )
}

module.exports.saveBeringungsort = function(beringungsort, beringungsort_position, beringungsort_kreis) {
  console.log('controllers.settings.saveBerinungsort')
  let setting;

  window.models.setting.update({
    'bezeichnung' : 'beringungsort',
    'wert' : beringungsort
  })
  window.models.setting.update({
    'bezeichnung' : 'beringungsort_position',
    'wert' : beringungsort_position
  })
  window.models.setting.update({
    'bezeichnung' : 'beringungsort_kreis',
    'wert' : beringungsort_kreis
  })

  $('#change_beringungsort_button').hide()
  $('#beringungsort_div').fadeOut(1000)
}

module.exports.saveSicherungsort = function(sicherung_verzeichnis, sicherung_dateiname) {
  console.log('controllers.settings.saveSicherungsort')
  let setting;

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

module.exports.edit = function(evt) {
  console.log('controllers.settings.edit');

  let rows = window.models.setting.findWhere('','bezeichnung'),
      settings = {};

  $.each(rows, function(i, v) {
    settings[v.bezeichnung] = v.wert
    $('#settings_edit_form input[name=' + v.bezeichnung + ']').val(v.wert)
  })
  console.log('settings: %o', settings)
  
  $('section').hide();
  $('#settings_edit_section').show()
}

module.exports.info = function(evt) {
  console.log('controllers.settings.info');
  let converter = new showdown.Converter(),
      readme = fs.readFileSync(path.join(app.getAppPath(), 'README.md'), 'utf8')

  $('#settings_info').append(converter.makeHtml(readme))
  $('section').hide();
  $('#settings_info_section').show()
}