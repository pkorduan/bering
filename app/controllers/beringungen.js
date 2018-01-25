// controller beringungen
'use strict'

module.exports.init = function() {
  console.log('beringungen_controller.init');

  // register event handler

  console.log('register click on beringungen_search_link')
  $('#beringungen_search_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.searchForm(evt)
    }
  )

  console.log('register click on beringung_search_button')
  $('#beringung_search_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.search(evt)
    }
  )

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

  console.log('register click on beringung_speichern_button')
  $('#beringung_speichern_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.save(evt)
    }
  )
}

module.exports.searchForm = function() {
  console.log('beringungen_controller.searchForm');

  $('.sidebar').hide()
  $('#beringungen_menu').show()

  $('section').hide();
  $('#beringungen_search_section').show();
}

module.exports.search = function(evt) {
  console.log('beringungen_controller.search');
  let ringnr = $('#beringung_search_form :input[id=ringnr]').val()

  let beringungen = window.models.beringung.findWhere('ringnr = ' + ringnr)

  window.debug_b = beringungen;

  if (Object.keys(beringungen).length > 0) {
    this.new(beringungen[0])
  }
  else {
    this.new({ ringnr: ringnr})
  }
}

module.exports.list = function(filter = '') {
  console.log('beringungen_controller.list');
  let beringungen = window.models.beringung.findWhere(filter),
      t = $('<table id="list-table">');

  t.append('<tr><th width="20%">Ringnr</th><th width="20%">Datum</th><th width="20%">Zeit</th><th width="20%">Art</th><th width="20%">Alter</th><th>Notiz</th></tr>');
  $.each(
    beringungen,
    function(index, v) {
      t.append('<tr>\
        <td width="20%">' + v.ringnr + '</td>\
        <td width="20%">' + v.datum + '</td>\
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

  let beringung = window.models.beringung.findById(id)
  this.setValuesToForm(beringung);

  $('section').hide();
  $('#beringungen_edit_section').show();
}

module.exports.new = function(beringung) {
  console.log('controller beringungen.edit id: %o', beringung);

  if (beringung.id === undefined) {
    // empty all form fields despite ringnr
    $('form#beringung_edit_form :input').each(
      function(i, field) {
        $(field).val('')
      }
    )
    $('#beringung_edit_title').html('Neufund')
    $('form#beringung_edit_form :input[id=ringnr]').val(beringung.ringnr)
    $('#beringung_speichern_button').val('Insert')
  }
  else {
    $('#beringung_edit_title').html('Wiederfund')
    $('#beringung_speichern_button').val('Insert')
    this.setValuesToForm(beringung);
    // ToDo Set Wiederfund
    // Set values in form to identify it as wiederfund
    // ohne id, nicht als edit, sondern als new aber
    // werte übernommen.
  }

  $('section').hide();
  $('#beringungen_edit_section').show();
}

module.exports.delete = function(id) {
  console.log('controller beringungen.delete id:' + id);
}

module.exports.setValuesToForm = function(beringung) {
  console.log('Controller beringungen.setValuesToForm %o', beringung)

  $.each(
    beringung,
    function(index, value) {
      //console.log('index: ' + index + ' value: ' + value);
      $('#' + index).val(value)
    }
  )
}

module.exports.save = function(evt) {
  console.log('Controller beringungen.save')
  let all_valid = true,
      validation

  evt.preventDefault() // ToDo: prüfen was das soll
  $('form#beringung_edit_form :input').each(
    function(i, field) {
      if (field.type != 'submit') {
        validation = window.models.beringung.validate(field)
        if (!validation.valid) {
          all_valid = false
          $(field).parent().removeClass('has-success').addClass('has-danger')
          $(field).next().html('&nbsp;&nbsp;&nbsp; ' + validation.message);
          $(field).next().next().html("");
        }
        else {
          $(field).parent().addClass('has-success').removeClass('has-danger')
        }
      }
    }
  )
  if (all_valid) {
    console.log('Alle Eingabenn valide!')
    let kvps = window.models.dbMapper.getFormFieldKVPs('beringung_edit_form')
    window.models.beringung.update(kvps)
  }
}
