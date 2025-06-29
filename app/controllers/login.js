'use strict'

module.exports.init = function() {
  log('controllers.login.init');

  // register event handler - für Langenwerder

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
 
  // Ohne Klick für ProRing?
  /*
  controllers.login.login(
    $('#login_form input[name=loginname]').val(),
    $('#login_form input[name=passwort]').val(),
    $('#login_form input[name=passwort2]').val()
  );
  */
}

module.exports.login = function(loginname, passwort, passwort2) {
  log('controllers.login.login für Nutzer: ' + loginname);

  let admin_passwort_hint = '',
      errMsg = []

  if (loginname == '') {
    errMsg.push('Bitte einen Nutzernamen angeben!')
  }
  if (passwort == '') {
    errMsg.push('Bitte ein Passwort angeben!')
  }
  if (errMsg.length > 0) {
    dialog.showMessageBox({
      title: 'Login',
      message: errMsg.join('\n'),
      type: 'warning'
    })
  }
  else {
    let user = window.models.user.findByLoginName(loginname)

    log('controllers.login.login found user ' + JSON.stringify(user));

    if (user) {
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
          window.session.rolle = user.rolle
          window.controllers.start.start()
        }
        else {
          dialog.showMessageBox({
            title: 'Login',
            message: 'Nutzername und Passwort stimmen nicht überein. Prüfen Sie Ihre Eingaben!',
            type: 'warning'
          })
          $('#login_form input[name=passwort2]').hide()
          $('#login_form div[id=admin_passwort_hint]').hide()
        }
      }
    }
    else {
      dialog.showMessageBox({
        title: 'Login',
        message: 'Nutzer mit dem Namen ' +  loginname + ' existiert nicht in Datenbank!',
        type: 'warning'
      })
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
