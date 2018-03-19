'use strict'

module.exports.init = function() {
  console.log('start_controller.init');
}

module.exports.start = function() {
  console.log('start_controller.show')

  $('.row .placeholders').hide();
  if (window.session.angemeldet) {
    $('#menu').show();
    $('.nav-item').show();
    $('#login_link').hide();
    $('#logout_link').show();
    window.beringungen_controller.list();
  }
  else {
    $('#menu').hide();
    $('.nav-item').hide();
    $('#login_link').addClass('active').show();
    $('#logout_link').hide();
    $('#login').show();
  }
}
