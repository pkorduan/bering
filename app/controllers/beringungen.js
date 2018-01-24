// controller beringungen
'use strict'

module.exports.init = function() {
  console.log('beringungen_controller.init');

  console.log('register click on beringungen_list_all_menue_link')
  $('#beringungen_list_all_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list('')
    }
  )

  console.log('register click on beringungen_list_meine_menue_link')
  $('#beringungen_list_meine_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list('beringernr = ' + require('electron').remote.getGlobal('sharedObject').session.id)
    }
  )
}

module.exports.list = function(filter = '') {
  console.log('beringungen_controller.list');
  let beringungen = window.models.beringung.findWhere(filter),
      t = $('<table id="list-table">');

  t.append('<tr><th width="20%">Ringnr</th><th width="20%">Zeit</th><th width="20%">Art</th><th width="20%">Alter</th><th>Notiz</th></tr>');
  $.each(
    beringungen,
    function(index, v) {
      t.append('<tr>\
        <td width="20%">' + v.ringnr + '</td>\
        <td width="20%">' + v.uhrzeit+ '</td>\
        <td width="20%">' + v.vogelart + '</td>\
        <td width="20%">' + v.alter + '</td>\
        <td>' + v.bemerkung + '</td>\
        <td><a href="#" onclick="window.beringungen_controller.edit(' + v.id + ')"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>\
        <td><a href="#" onclick="window.beringungen_controller.delete(' + v.id + ')"><i class="fa fa-trash" aria-hidden="true"></i></a></td>\
      </tr>');
    }
  )
  $('#beringungen_list').html(t)

  $('.sidebar').hide()
  $('#beringungen_menu').show()

  $('section').hide();
  $('#beringungen_list_section').show();
}

module.exports.edit = function(id) {
  console.log('controller beringungen.edit id:' + id);
  //ToDo Query beringung and fill the form
  let beringung = window.models.beringung.findById(id)

  this.setValuesToForm(beringung);
  $('section').hide();
  $('#beringungen_edit_section').show();
}

module.exports.delete = function(id) {
  console.log('controller beringungen.delete id:' + id);
}

module.exports.setValuesToForm = function(b) {
  console.log('Controller beringungen.setValuesToForm %o', b)
  $.each(
    b,
    function(index, value) {
      console.log('index: ' + index + ' value: ' + value);
      $('#' + index).val(value)
    }
  )
}