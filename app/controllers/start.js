'use strict'

module.exports.init = function() {
  console.log('controllers.start.init');
}

module.exports.start = function() {
  console.log('controllers.start.show')

  $('.row .placeholders').hide();
  if (window.session.angemeldet) {
    $('#menu').show();
    $('.nav-item').show();
    $('#login_link').hide();
    $('#logout_link').show();
    window.controllers.beringungen.list($('#list_all_data_menue_link'));
  }controllers.start
  else {
    $('#menu').hide();
    $('.nav-item').hide();
    $('#login_link').addClass('active').show();
    $('#logout_link').hide();
    $('#login').show();
  }
}
