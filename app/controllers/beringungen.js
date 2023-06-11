// controller beringungen
'use strict'

module.exports.init = function() {
  log('controllers.beringungen.init');

  $('#beringung_datepicker input').datepicker({
      format: "dd.mm.yyyy",
      todayHighlight: true
  });
/*
  $('#beringung_timepicker input').timepicker({
      format: "hh:mm:ss"
  });
*/
  // register event handler

  log('register click on beringung_link')
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

  log('register click on fund_link')
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

  log('register click on beringung_search_button')
  $('#beringung_search_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.search(evt)
    }
  )

  log('register click on list_all_data_menue_link')
  $('#list_all_data_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target))
    }
  )

  log('register click on list_all_beringungen_menue_link')
  $('#list_all_beringungen_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), ["fundart = 1"])
    }
  )

  log('register click on list_meine_beringungen_menue_link')
  $('#list_meine_beringungen_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), ["fundart = 1", "beringernr = '" + window.session.beringernr + "'"])
    }
  )

  log('register click on list_meine_wiederfunde_menue_link')
  $('#list_meine_wiederfunde_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), ["fundart = 2", "beringernr = '" + window.session.beringernr + "'"])
    }
  )

  log('register click on list_alle_wiederfunde_menue_link')
  $('#list_alle_wiederfunde_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), ["fundart = 2"])
    }
  )

  log('register click on list_fremdfunde_menue_link')
  $('#list_fremdfunde_menue_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list($(evt.target), ["fundart = 3"])
    }
  )

  log('register click on beringung_speichern_button')
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

  log('register click on beringung_speichern_uebernehmen_button')
  $('#beringung_speichern_uebernehmen_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.insert(evt, true)
    }
  )

  log('fill select option for alter');
  let altersangaben = window.models.vogelalter.findWhere()
  log('vogelalter %o', altersangaben)

  $.each(altersangaben, function (i, item) {
    $('#beringung_edit_form select[id=alter]').append(
      $('<option>', {
        value: item.code,
        text : item.bezeichnung_de+" ("+item.code+")"
      })
    );
  });

  log('fill select option for vogelarten');
  let vogelarten = window.models.vogelarten.findWhere('', 'arname')
  log('vogelarten %o', vogelarten)

  $.each(vogelarten, function (i, item) {
    $('#beringung_edit_form select[id=vogelart]').append(
      $('<option>', {
        value: item.code,
        text : item.bezeichnung
      })
    );
  });

  log('fill select option for fundzustaende');
  let fundzustaende = window.models.fundzustand.findWhere('', 'bezeichnung')
  log('fundzustaende %o', fundzustaende)

  $.each(fundzustaende, function (i, item) {
    $('#beringung_edit_form select[id=fundzustand]').append(
      $('<option>', {
        value: item.code,
        text : item.bezeichnung
      })
    );
  });

  log('fill select option for fundursache');
  let fundursachen = window.models.fundursache.findWhere('', 'bezeichnung_de')
  log('fundursachen %o', fundursachen)

  $.each(fundursachen, function (i, item) {
    $('#beringung_edit_form select[id=fundursache]').append(
      $('<option>', {
        value: item.code,
        text : item.bezeichnung_de
      })
    );
  });

  log('fill select option for brutstati');
  let brutstati = window.models.brutstatus.findWhere('', 'beschreibung')
  log('brutstati %o', brutstati)

  $.each(brutstati, function (i, item) {
    $('#beringung_edit_form select[id=brutstatus]').append(
      $('<option>', {
        value: item.status,
        text : item.status + ' ' + item.beschreibung
      })
    );
  });

  log('fill select option for skz_1');
  let skz1 = window.models.skz.findWhere('Sonderkennzeichen1')
  log('skz1 %o', skz1)

  $.each(skz1, function (i, item) {
    $('#beringung_edit_form select[id=skz_1]').append(
      $('<option>', {
        value: item.code,
        text : item.code + ' ' + item.bezeichnung
      })
    );
  });

  log('fill select option for skz_2');
  let skz2 = window.models.skz.findWhere('Sonderkennzeichen2')
  log('skz2 %o', skz2)

  $.each(skz2, function (i, item) {
    $('#beringung_edit_form select[id=skz_2]').append(
      $('<option>', {
        value: item.code,
        text : item.code + ' ' + item.bezeichnung
      })
    );
  });

  log('fill select options for farbringe');
  let farbcodes = window.models.farbcodes.findWhere('', 'code')
  log('farbcodes %o', farbcodes)

  $.each(farbcodes, function (i, item) {
    $('#beringung_edit_form select[id=farbring_liun]').append(
      $('<option>', {
        value: item.code,
        text : item.code + ' ' + item.bezeichnung
      })
    );
    $('#beringung_edit_form select[id=farbring_reun]').append(
      $('<option>', {
        value: item.code,
        text : item.code + ' ' + item.bezeichnung
      })
    );
    $('#beringung_edit_form select[id=farbring_liob]').append(
      $('<option>', {
        value: item.code,
        text : item.code + ' ' + item.bezeichnung
      })
    );
    $('#beringung_edit_form select[id=farbring_reob]').append(
      $('<option>', {
        value: item.code,
        text : item.code + ' ' + item.bezeichnung
      })
    );
  });

  log('register change on skz_1 and skz2 select fields')
  $('#skz_1, #skz_2').on(
    'change',
    {
      context: this
    },
    function(evt) {
      evt.data.context.openFarbringAndInschrift($(evt.target))
    }
  )

}

module.exports.searchForm = function() {
  log('controllers.beringungen.searchForm');

  $('.sidebar').hide()
  $('#beringungen_menu').show()

  $('section').hide();
  $('#beringungen_search_section').show();

  $('#beringung_search_form :input[id=ringnr]').focus();
}

module.exports.search = function(evt) {
  log('controllers.beringungen.search');
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

module.exports.list = function(target, filter = []) {
  log('controllers.beringungen.list' + JSON.stringify(filter));

  let loesch_funktion_an =  window.models.setting.findByBezeichnung('loesch_funktion_an'),
      nur_nicht_exportierte_an =  window.models.setting.findByBezeichnung('nur_nicht_exportierte_an'),
      beringungen = window.models.beringung.findWhere(
        '*',
        (nur_nicht_exportierte_an.wert == 'an' ? filter.concat('exportiert_am IS NULL') : filter).join(' AND ')
      ),
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
		zentrale: v.zentrale,
        ringnr: v.ringnr,
        beringernr: v.beringernr,
        datum: v.datum,
        uhrzeit: v.uhrzeit,
        fundart: v.fundart,
        vogelart: v.vogelart,
        alter: v.alter,
		geschlecht: v.geschlecht,
        brutstatus: v.brutstatus,
        fluegellaenge: v.fluegellaenge,
        teilfederlaenge: v.teilfederlaenge,
        schnabellaenge: v.schnabellaenge,
        schnabel_kopflaenge: v.schnabel_kopflaenge,
		lauf: v.lauf,
        gewicht: v.gewicht,
        skz_1: v.skz_1,
        skz_2: v.skz_2,
        fundursache: v.fundursache,
        fundzustand: v.fundzustand,
        farbring_liob: v.farbring_liob,
        farbring_liun: v.farbring_liun,
        farbring_reob: v.farbring_reob,
        farbring_reun: v.farbring_reun,
        inschrift: v.inschrift,
		ortid: v.ortid,
        beringungsort: v.beringungsort,
        koordinaten: v.koordinaten,
        bemerkung: v.bemerkung,
        exportiert_am: v.exportiert_am,
        edit: (v.beringernr == window.session.beringernr ? '<a href="#" onclick="window.controllers.beringungen.edit(' + v.id + ')"><i class="fa fa-pencil" aria-hidden="true"></i></a>' : '&nbsp;'),
        delete: (v.beringernr == window.session.beringernr && loesch_funktion_an.wert == 'an' ? '<a href="javascript:void(0)" onclick="window.controllers.beringungen.delete(' + v.id + ')"><i class="fa fa-trash" aria-hidden="true"></i></a>' : '&nbsp;')
      })
    }
  )
  //log('rows: ', rows);
  table.bootstrapTable('load', rows)
  $('.fixed-table-loading').hide()

  $('.sidebar').hide()
  $('#beringungen_menu').show()

  $('section').hide();
  $('#beringungen_list_section').show();
}

module.exports.edit = function(id) {
  log('controller beringungen.edit id:' + id);

  let beringung = window.models.beringung.findById(id)
  this.setValuesToForm(beringung);

  $('#beringung_edit_title').html('Änderung Beringungsdaten')
  // Zeige id
  $('#beringung_id_div').show()


  if (beringung.fundart == 1) {
    $('#fundursache_und_zustand_div').hide()
    $('#farbring_div').show()
  }
  else {
    $('#fundursache_und_zustand_div').show()
    $('#farbring_div').hide()
  }

  this.openFarbringAndInschrift()

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

//Mögliches TODO: alle Warnungsmeldungen der Validierung löschen (Bsp.: Noch Meldungen im Fundformular, dan Wechsel auf Beringung)
module.exports.newBeringung = function(uebernehmen = false) {
  log('controller beringungen.newBerinung uebernehmen:', uebernehmen);
  let beringung = {}

  if (uebernehmen) {
    $('#beringung_edit_title').html('Neue Beringung (Daten übernommen)')
    $('form#beringung_edit_form :input').each(
      function(i, field) {
        if (field.id == 'ringnr') {
          // increment the number at the end of the string by 1
          $(field).val($(field).val().replace(/\d+$/, function(n) { return ++n }))
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
  $('#fundursache_und_zustand_div').hide()
  $('#farbring_und_inschrift_div').hide()
  $('form#beringung_edit_form :input[id=fundart]').val(1);
  $('form#beringung_edit_form :input[id=ringnr]').prop('readonly', false).focus()
  $('#beringung_speichern_uebernehmen_button').show()
  this.openNewForm()
}

module.exports.newFund = function(beringung) {
  log('controller beringungen.newFund %o', beringung);

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
  $('form#beringung_edit_form :input[id=fundursache]').val(22)
  $('form#beringung_edit_form :input[id=fundzustand]').val(6)

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
  //this.searchForm()
  //Bei nochmaligem Eintragen eines Funds erscheinen sonst die Felder Fundursache und Zustand nicht
  $('#fundursache_und_zustand_div').show()
}

module.exports.date_format = function(date) {
  return window.controllers.export.lpad(date.getDate(), 2, '0') + '.' +
    window.controllers.export.lpad(date.getMonth() + 1 , 2, '0') + '.' +
    date.getFullYear()
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
  let auto_datum_uhrzeit =  window.models.setting.findByBezeichnung('auto_datum_uhrzeit');
  log('auto_datum_uhrzeit: ' + auto_datum_uhrzeit.wert);
  //beringungen = window.models.beringung.findWhere(
   //(nur_nicht_exportierte_an.wert == 'an' ? filter.concat('exportiert_am IS NULL') : filter).join(' AND ')
   if (auto_datum_uhrzeit.wert == 'an' ) {
	  $('form#beringung_edit_form :input[id=datum]').val(this.date_format(d));
	  $('form#beringung_edit_form :input[id=uhrzeit]').val(d.toLocaleTimeString());
   }
  // Als insert form markieren
  $('#beringung_speichern_button').val('Insert')
  // Auf view umschalten.
  $('section').hide();
  $('#beringungen_edit_section').show();
  // nach oben Scrollen
  $(window).scrollTop(0)
}

module.exports.delete = function(id) {
  log('controller beringungen.delete id:' + id);
  let result = dialog.showMessageBox({
    title: 'Datenbank',
    message: 'Datensatz wirklich löschen?',
    type: 'question',
    buttons: ['Nein', 'Ja']
  })
  if (result == 1) {
    log('Lösche Datensatz id: ' + id)

    window.controllers.start.backupDb()

    window.models.beringung.delete(id)
  }
  else {
    log('Löschen abbrechen.')
  }
}

module.exports.setValuesToForm = function(beringung) {
  log('Controller beringungen.setValuesToForm %o', beringung)

  $.each(
    beringung,
    function(index, value) {
      log('index: ' + index + ' value: ' + value);
      $('form#beringung_edit_form :input[id=' + index + ']').val(value)
    }
  )

  this.formatDateToDe();
}

module.exports.setDateAndTimeToForm = function(d) {
  log('setDateAndTimeToForm d: ', d.toLocaleDateString(), d.toLocaleTimeString())
  $('form#beringung_edit_form :input[id=datum]').val(d.toLocaleDateString())
  $('form#beringung_edit_form :input[id=uhrzeit]').val(d.toLocaleTimeString())
}

/*
* Speichert neue Datensätze
* beringungsort und koordinaten werden aus Einstellungen übernommen.
*/
module.exports.insert = function(evt, uebernehmen = false) {
  log('Controller beringungen.insert uebernehmen', uebernehmen);
  let all_valid = true,
      validation,
      callback

  this.formatDateToEn()

  if (this.allValid()) {
    log('Alle Eingabenn valide!')
    let kvps = window.models.dbMapper.getFormFieldKVPs('beringung_edit_form')

    kvps['ortid'] = window.models.setting.findByBezeichnung('beringungsort_id').wert
    kvps['beringungsort'] = window.models.setting.findByBezeichnung('beringungsort').wert
    kvps['koordinaten'] = window.models.setting.findByBezeichnung('beringungsort_position').wert
    kvps['zentrale'] = window.models.setting.findByBezeichnung('zentrale').wert

    window.controllers.start.backupDb()

    window.models.beringung.insert(kvps, uebernehmen)
  }
  else {
    $(window).scrollTop(0)
  }
}

module.exports.update = function(evt) {
  log('Controller beringungen.update')
  let all_valid = true,
      validation

  this.formatDateToEn()

  if (this.allValid()) {
    log('Alle Eingabenn valide!')

    window.controllers.start.backupDb()

    let kvps = window.models.dbMapper.getFormFieldKVPs('beringung_edit_form')
    window.models.beringung.update(kvps)
  }
}

module.exports.formatDateToEn = function() {
  $('#beringung_edit_form input[id=datum]').val($('#beringung_edit_form input[id=datum]').val().split('.').reverse().join('-'));
}

module.exports.formatDateToDe = function() {
  $('#beringung_edit_form input[id=datum]').val($('#beringung_edit_form input[id=datum]').val().split('-').reverse().join('.'));
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
		  //log('Feld-Typ: ' + field.type);
          $(field).parent().addClass('has-danger')
          $(field).next().html('&nbsp;&nbsp;&nbsp; ' + validation.message);
          $(field).next().next().html("");
        }
        else {
          if ($(field).parent().hasClass('has-danger')) {
            $(field).parent().removeClass('has-danger');
			//remove text message as well
			$(field).next().html("");
          }
        }
      }
    }
  )

  return all_valid
}

module.exports.openFarbringAndInschrift = function() {
  if ($('#skz_1').val() != '' && $('#skz_2').val() != '') {
    $('#farbring_und_inschrift_div').show()
    if ($('#skz_1').val() == 2 && $('#skz_2').val() == 1) {
      $('#inschrift_div').hide();
      $('#farbring_codierung_div').show()
    }
    else {
      $('#farbring_codierung_div').hide()
      $('#inschrift_div').show()
    }
  }
  else {
    $('#farbring_und_inschrift_div').hide()
    $('#farbring_liob, #farbring_liun, #farbring_reob, #farbring_reun').val('')
  }
}
