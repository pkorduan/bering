// controllers users
'use strict'

module.exports.init = function() {
  console.log('controllers.users.init');

  // register event handler

  console.log('register click on users_list_link')
  $('#users_list_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list(evt)
    }
  )

  console.log('register click on users_change_passwort_button')
  $('#change_user_passwort_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.saveChangedPasswort(
        $('#settings_edit_form input[name=old_passwort]').val(),
        $('#settings_edit_form input[name=new_passwort1]').val(),
        $('#settings_edit_form input[name=new_passwort2]').val()
      )
    }
  )

}

module.exports.saveChangedPasswort = function(oldPwd, newPwd1, newPwd2) {
  console.log('controllers.users.saveChangedPasswort');

  let user = window.models.user.findByLoginName(window.session.loginname),
      help_text = ''

  if (user.passwort != SHA256(oldPwd)) {
    help_text = 'Das alte Passwort stimmt nicht! Versuchen Sie es noch einmal.'
  }
  else {
    if (newPwd1 == '' || newPwd2 == '') {
      help_text = 'Es muss ein neues Passwort und seine Wiederholung angegeben werden!'
    }
    else {
      if (newPwd1 != newPwd2) {
        help_text = 'Die beiden neuen Passwörter stimmen nicht überein! Versuchen Sie es noch einmal.'
      }
      else {
        if (newPwd1 == oldPwd) {
          help_text = 'Das neue Passwort muss sich vom alten unterscheiden!';
        }
        else {
          user.passwort = SHA256(newPwd1);
          window.models.user.update(user);
          $('#settings_edit_form div[id=users_change_passwort_div]').hide()
        }
      }
    }
  }
  if (help_text != '') {
    $('#settings_edit_form div[id=change_passwort_help_text]').html(help_text).show()
  }
  else {
    $('#settings_edit_form div[id=change_passwort_help_text]').html('').hide()
  }
}

module.exports.list = function(evt) {
  console.log('controllers.users.list')
  let users = window.models.user.findWhere(),
      t = $('<table id="user-list-table">');

  t.append('<tr><th width="5%">Beringernr</th><th width="15%">Nachname</th><th width="15%">Vorname</th></tr>');
  $.each(
    users,
    function(index, v) {
      t.append('<tr>\
        <td width="20%">' + v.beringernr + '</td>\
        <td width="20%">' + v.name + '</td>\
        <td width="20%">' + v.vorname+ '</td>\
      </tr>');
    }
  )
  $('#beringer_list_div').html(t);
}
