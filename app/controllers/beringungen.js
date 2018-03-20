// controller beringungen
'use strict'

module.exports.init = function() {
  console.log('controllers.beringungen.init');

  // register event handler

  console.log('register click on beringung_link')
  $('#beringung_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      $('.menue-selected').removeClass('menue-selected')
      $(evt.target).parent().addClass('menue-selected')
      evt.data.context.newBeringung()
    }
  )

  console.log('register click on fund_link')
  $('#fund_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      $('.menue-selected').removeClass('menue-selected')
      $(evt.target).parent().addClass('menue-selected')
      evt.data.context.searchForm()
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

  console.log('register click on list_all_data_menue_link')
  $('#list_all_data_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), "")
    }
  )

  console.log('register click on list_all_beringungen_menue_link')
  $('#list_all_beringungen_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), "fundart = 1")
    }
  )

  console.log('register click on list_meine_beringungen_menue_link')
  $('#list_meine_beringungen_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), "fundart = 1 AND beringernr = '" + window.session.beringernr + "'")
    }
  )

  console.log('register click on list_meine_wiederfunde_menue_link')
  $('#list_meine_wiederfunde_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), "fundart = 2 AND beringernr = '" + window.session.beringernr + "'")
    }
  )

  console.log('register click on list_alle_wiederfunde_menue_link')
  $('#list_alle_wiederfunde_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), "fundart = 2")
    }
  )

  console.log('register click on list_fremdfunde_menue_link')
  $('#list_fremdfunde_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), "fundart = 3")
    }
  )

  console.log('register click on beringung_speichern_button')
  $('#beringung_speichern_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      if ($(evt.target).val() == 'Insert') {
        evt.data.context.insert(evt)
      }
      else {
        evt.data.context.update(evt)
      }
    }
  )

  console.log('register click on beringung_speichern_uebernehmen_button')
  $('#beringung_speichern_uebernehmen_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.insert(evt, true)
    }
  )

  console.log('fill select option for alter');
  let altersangaben = window.models.vogelalter.findWhere()
  console.log('vogelalter %o', altersangaben)

  $.each(altersangaben, function (i, item) {
    $('#beringung_edit_form select[id=alter]').append(
      $('<option>', { 
        value: item.code,
        text : item.bezeichnung_de 
      })
    );
  });

  console.log('fill select option for vogelarten');
  let vogelarten = window.models.vogelarten.findWhere('', 'arname')
  console.log('vogelarten %o', vogelarten)

  $.each(vogelarten, function (i, item) {
    $('#beringung_edit_form select[id=vogelart]').append(
      $('<option>', { 
        value: item.code,
        text : item.bezeichnung
      })
    );
  });

  console.log('fill select option for fundzustaende');
  let fundzustaende = window.models.fundzustand.findWhere('', 'bezeichnung')
  console.log('fundzustaende %o', fundzustaende)

  $.each(fundzustaende, function (i, item) {
    $('#beringung_edit_form select[id=fundzustand]').append(
      $('<option>', { 
        value: item.code,
        text : item.bezeichnung
      })
    );
  });

  console.log('fill select option for fundursache');
  let fundursachen = window.models.fundursache.findWhere('', 'bezeichnung_de')
  console.log('fundursachen %o', fundursachen)

  $.each(fundursachen, function (i, item) {
    $('#beringung_edit_form select[id=fundursache]').append(
      $('<option>', { 
        value: item.code,
        text : item.bezeichnung_de
      })
    );
  });

  console.log('fill select option for brutstati');
  let brutstati = window.models.brutstatus.findWhere('', 'beschreibung')
  console.log('brutstati %o', brutstati)

  $.each(brutstati, function (i, item) {
    $('#beringung_edit_form select[id=brutstatus]').append(
      $('<option>', { 
        value: item.status,
        text : item.beschreibung
      })
    );
  });

}

module.exports.searchForm = function() {
  console.log('controllers.beringungen.controllers.start');

  $('.sidebar').hide()
  $('#beringungen_menu').show()

  $('section').hide();
  $('#beringungen_search_section').show();

  $('#beringung_search_form :input[id=ringnr]').focus();
}

module.exports.search = function(evt) {
  console.log('controllers.beringungen.search');
  let ringnr = $('#beringung_search_form :input[id=ringnr]').val(),
      beringung = window.models.beringung.findByRingnr(ringnr)

  if (beringung.hasOwnProperty('ringnr')) {
    if (beringung.beringernr == window.session.beringernr) {
      // Eigenwiederfund
      beringung.fundart = 2
    }
    else {
      // Fremdwiederfund
      beringung.fundart = 3
    }
  }
  else {
    // Fremdfund nicht in Datenbank erfasst
    beringung.fundart = 3
    beringung.ringnr = ringnr
    beringung.beringernr = ''
    beringung.vogelart = ''
  }

  this.newFund(beringung)
}

module.exports.list = function(target, filter = '') {
  console.log('controllers.beringungen.list');
  let beringungen = window.models.beringung.findWhere(filter),
      loesch_funktion_an =  window.models.setting.findByBezeichnung('loesch_funktion_an'),
      rows = [],
      table = $('#beringungen_list_table')

  $('.menue-selected').removeClass('menue-selected')
  target.parent().addClass('menue-selected')
  $('#beringungen_list_title').html(target.html())

  $.each(
    beringungen,
    function(index, v) {
      rows.push({
        id: v.id,
        ringnr: v.ringnr,
        beringernr: v.beringernr,
        datum: v.datum,
        uhrzeit: v.uhrzeit,
        vogelart: v.vogelart,
        alter: v.alter,
        brutstatus: v.brutstatus,
        skz_1: v.skz_1,
        skz_2: v.skz_2,
        fundursache: v.fundursache,
        fundzustand: v.fundzustand,
        farbring: v.farbring,
        bemerkung: v.bemerkung,
        edit: (v.beringernr == window.session.beringernr ? '<a href="#" onclick="window.controllers.beringungen.edit(' + v.id + ')"><i class="fa fa-pencil" aria-hidden="true"></i></a>' : '&nbsp;'),
        delete: (v.beringernr == window.session.beringernr && loesch_funktion_an.wert == 'an' ? '<a href="#" onclick="window.controllers.beringungen.delete(' + v.id + ')"><i class="fa fa-trash" aria-hidden="true"></i></a>' : '&nbsp;')
      })
    }
  )
  //console.log('rows: ', rows);
  table.bootstrapTable('load', rows)
  $('.fixed-table-loading').hide()

  $('.sidebar').hide()
  $('#beringungen_menu').show()

  $('section').hide();
  $('#beringungen_list_section').show();
}

module.exports.edit = function(id) {
  console.log('controller beringungen.edit id:' + id);

  let beringung = window.models.beringung.findById(id)
  this.setValuesToForm(beringung);

  $('#beringung_edit_title').html('Änderung Beringungsdaten')
  // Zeige id
  $('#beringung_id_div').show()
  // enable edit ringnr
  $('form#beringung_edit_form :input[id=ringnr]').prop('readonly', false)
  // Setze Speichervariante update
  $('#beringung_speichern_button').val('Update')
  // Verberge Übernehmen-Speicherbutton
  $('#beringung_speichern_uebernehmen_button').hide()
  // Zeige view an
  $('section').hide();
  $('#beringungen_edit_section').show();
}

module.exports.newBeringung = function(uebernehmen = false) {
  console.log('controller beringungen.newBerinung uebernehmen:', uebernehmen);
  let d = new Date(),
      beringung = {}

  if (uebernehmen) {
    $('#beringung_edit_title').html('Neue Beringung (Daten übernommen)')
    $('form#beringung_edit_form :input').each(
      function(i, field) {
        if (field.id == 'ringnr') {
          $(field).val(parseInt($(field).val()) + 1)
        }
        else {
          if ($.inArray(field.id, ['vogelart', 'alter', 'beringungsart']) == -1) $(field).val('')
        }
      }
    )
  }
  else {
    $('#beringung_edit_title').html('Neue Beringung')
    $('form#beringung_edit_form :input').each(
      function(i, field) {
        $(field).val('')
      }
    )
  }

  $('#beringung_beringernr_alt_div').hide()
  $('form#beringung_edit_form :input[id=fundart]').val(1);
  $('form#beringung_edit_form :input[id=ringnr]').prop('readonly', false).focus()
  $('#beringung_speichern_uebernehmen_button').show()
  this.openNewForm()
}

module.exports.newFund = function(beringung) {
  console.log('controller beringungen.newFund %o', beringung);

  // Formular erstmal komplett leeren
  $('form#beringung_edit_form :input').each(
    function(i, field) {
      $(field).val('')
    }
  )

  // Fundart, Vogelart und Ringnr setzen
  $('form#beringung_edit_form :input[id=fundart]').val(beringung.fundart)
  $('form#beringung_edit_form :input[id=ringnr]').val(beringung.ringnr).prop('readonly', true)
  $('form#beringung_edit_form :input[id=vogelart]').val(beringung.vogelart)

  if (beringung.fundart == 2) {
    $('#beringung_edit_title').html('Eigener Wiederfund (letzte Daten übernommen)')
    $('#beringung_beringernr_alt_div').hide()
  }
  else {
    if (beringung.beringernr != '') {
      $('#beringung_edit_title').html('Fremdfund (letzte Daten übernommen)')
      $('#beringung_beringernr_alt_div').show()
      $('#beringernr_alt').html(' Beringer mit Nr: ' + beringung.beringernr)
    }
    else {
      $('#beringung_edit_title').html('Fremdfund (keine Daten vorhanden)')
      $('#beringung_beringernr_alt_div').hide()
    }
  }

  // Übernehmenbutton ausblenden
  $('#beringung_speichern_uebernehmen_button').hide()

  this.openNewForm()
}

module.exports.openNewForm = function() {
  let d = new Date()

  // id verstecken
  $('#beringung_id_div').hide()
  $('form#beringung_edit_form :input[id=id]').val('')
  // beringernr und name setzen
  $('form#beringung_edit_form :input[id=beringernr]').val(window.session.beringernr);
  $('#beringung_beringername').html(window.session.beringername);
  // aktuellen Zeitstempel setzen
  $('form#beringung_edit_form :input[id=datum]').val(d.toLocaleDateString());
  $('form#beringung_edit_form :input[id=uhrzeit]').val(d.toLocaleTimeString());
  // Als insert form markieren
  $('#beringung_speichern_button').val('Insert')
  // Auf view umschalten.
  $('section').hide();
  $('#beringungen_edit_section').show();
  // nach oben Scrollen
  $(window).scrollTop(0)
}

module.exports.delete = function(id) {
  console.log('controller beringungen.delete id:' + id);
}

module.exports.setValuesToForm = function(beringung) {
  console.log('Controller beringungen.setValuesToForm %o', beringung)

  $.each(
    beringung,
    function(index, value) {
      console.log('index: ' + index + ' value: ' + value);
      $('form#beringung_edit_form :input[id=' + index + ']').val(value)
    }
  )
}

module.exports.setDateAndTimeToForm = function(d) {
  console.log('setDateAndTimeToForm d: ', d.toLocaleDateString(), d.toLocaleTimeString())
  $('form#beringung_edit_form :input[id=datum]').val(d.toLocaleDateString())
  $('form#beringung_edit_form :input[id=uhrzeit]').val(d.toLocaleTimeString())
}

/*
* Speichert neue Datensätze
* beringungsort und koordinaten werden aus Einstellungen übernommen.
*/
module.exports.insert = function(evt, uebernehmen = false) {
  console.log('Controller beringungen.insert uebernehmen', uebernehmen);
  let all_valid = true,
      validation,
      callback

  if (this.allValid()) {
    console.log('Alle Eingabenn valide!')
    let kvps = window.models.dbMapper.getFormFieldKVPs('beringung_edit_form')

    kvps['beringungsort'] = window.models.setting.findByBezeichnung('beringungsort').wert
    kvps['koordinaten'] = window.models.setting.findByBezeichnung('beringungsort_position').wert

    window.models.beringung.insert(kvps, uebernehmen)
  }
  else {
    $(window).scrollTop(0)
  }
}

module.exports.update = function(evt) {
  console.log('Controller beringungen.update')
  let all_valid = true,
      validation

  if (this.allValid()) {
    console.log('Alle Eingabenn valide!')
    let kvps = window.models.dbMapper.getFormFieldKVPs('beringung_edit_form')

    window.models.beringung.update(kvps)
  }
}

module.exports.allValid = function() {
  let validation,
      all_valid = true

  $('form#beringung_edit_form :input').each(
    function(i, field) {
      if (field.type != 'submit') {
        validation = window.models.beringung.validate(field)
        if (!validation.valid) {
          all_valid = false
          $(field).parent().addClass('has-danger')
          $(field).next().html('&nbsp;&nbsp;&nbsp; ' + validation.message);
          $(field).next().next().html("");
        }
        else {
          if ($(field).parent().hasClass('has-danger')) {
            $(field).parent().removeClass('has-danger')
          }
        }
      }
    }
  )

  return all_valid  
}
