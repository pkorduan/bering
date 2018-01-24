'use strict'

module.exports.init = function() {
  console.log('beringungen_controller.init');

  // register event handler
/*
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
    // login
    require('electron').remote.getGlobal('sharedObject').session.username = username;
    $('a.nav-link').removeClass('active')
    $('#login_link').hide()
    $('#logout_link').show().addClass('active')
    $('#login').hide()
    $('#beringungen').show()
  }
}
*/
}