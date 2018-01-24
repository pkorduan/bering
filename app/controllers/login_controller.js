'use strict'

module.exports.init = function() {
  console.log('login_controller.init');

  // register event handler
  $('#login_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.login(
        $('#login_form input[name=username]').val(),
        $('#login_form input[name=passwort]').val()
      );
    }
  )
}

module.exports.login = function(username, passwort) {
  console.log('login_controller.login für Nutzer: ' + username);
  if (username == 'korduan' && passwort == 'peko') {
    console.log()
    // login
    require('electron').remote.getGlobal('sharedObject').session.username = username;
    window.start_controller.start()
  }
}

module.exports.logout = function(evt) {
  console.log('login_controller.logout');
  require('electron').remote.getGlobal('sharedObject').session.username = '';
  window.start_controller.start()
}