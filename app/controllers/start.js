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
      dst = window.models.setting.findByBezeichnung('sicherung_verzeichnis').wert + '/' +
            window.models.setting.findByBezeichnung('sicherung_dateiname').wert
  log('Save Database ' + src + ' to ' + dst)

  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}
