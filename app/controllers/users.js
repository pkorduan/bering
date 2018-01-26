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
        <td><a href="#" onclick="window.controllers.users.edit(' + v.id + ')"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>\
      </tr>');
    }
  )
  $('#users_list').html(t)






/*



  let rowsObject = window.models.user.findWhere()
  let markup = ''
  for (let rowId in rowsObject) {
    let row = rowsObject[rowId]
    markup += '<div class="row justify-content-start">' +
    '<div class="col-sm-3"><!-- a href="#" onclick="window.controllers.users.edit(' + row.beringernr + ')"><i class="fa fa-pencil" aria-hidden="true"></i></a//--></div>' +
    '<div class="col-sm-3 beringernr">' + row.beringernr + '</div>' +
    '<div class="col-sm-3 name">' + row.name + '</div>' +
    '<div class="col-sm-3 vorname">' + row.vorname + '</div>' +
    '</div>'
  }
  $('#users_list').html(markup)
*/
  $('a.nav-link').removeClass('active')
  $('a.nav-link.settings_edit_link').addClass('active')
  $('section').hide();
  $('#users_list_section').show()
}

module.exports.edit = function(evt) {
  console.log('controllers.users.edit');
  alert('Änderungen des Nutzers ist noch nicht implementiert. Bitte benutzen Sie dafür den Datenbank-Manager!');
}