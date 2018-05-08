'use strict'

module.exports.init = function() {
  log('controllers.login.init');

  // register event handler
  $('#login_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.login(
        $('#login_form input[name=loginname]').val(),
        $('#login_form input[name=passwort]').val(),
        $('#login_form input[name=passwort2]').val()
      );
    }
  )
}

module.exports.login = function(loginname, passwort, passwort2) {
  log('controllers.login.login für Nutzer: ' + loginname);
  
  let user = window.models.user.findByLoginName(loginname),
      admin_passwort_hint = '';
  log('controllers.login.login found user %o', user);

  if (user.loginname == 'admin' && user.passwort == '') {
    if (passwort2 != '') {
      log('Neues Passwort gesendet.');
      if (passwort == passwort2) {
        log('Passwortwiederholung passt.')
        //Trage neues Passwort ein
        user.passwort = SHA256(passwort);
        window.models.user.update(user)
        $('#login_form input[name=passwort2]').hide()
        $('#login_form div[id=admin_passwort_hint]').hide()
      }
      else {
        admin_passwort_hint = 'Passwörter stimmen nicht überein! Versuchen Sie es noch einmal!'
      }
    }
    else {
      log('User Admin hat noch kein Passwort!');      
      admin_passwort_hint = 'Das Passwort vom Nutzer "admin" wurde noch nicht vergeben. Bitte geben Sie ein Passwort für den Administrator an.'
    }
    if (admin_passwort_hint != '') {
      $('#login_form input[name=passwort2]').show()
      $('#login_form div[id=admin_passwort_hint]').html(admin_passwort_hint).show()
    }
  }
  else {
    if (user.passwort == SHA256(passwort)) {
      // login
      window.session.angemeldet = true
      window.session.loginname = user.loginname
      window.session.beringernr = user.beringernr
      window.session.beringername = user.vorname + ' ' + user.name
      window.controllers.start.start()
    }
    else {
      $('#login_form input[name=passwort2]').hide()
      $('#login_form div[id=admin_passwort_hint]').hide()
    }
  }
}

module.exports.logout = function(evt) {
  log('controllers.login.logout');
  window.session.angemeldet = false
  window.session.loginname = ''
  window.session.beringernr = ''
  window.controllers.start.start()
}