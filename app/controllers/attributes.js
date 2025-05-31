// controller attributes
'use strict'

module.exports.init = function() {
  log('controllers.attributes.init');

  // register event handler

  log('register click on attributanpassungen_link')
  $('#attributanpassungen_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.list(evt)
    }
  )

  log('register click on save_attributanpassungen_button')
  $('#save_attributanpassungen_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.saveChangedAttributes(evt)
    }
  )
  
  log('register click on restore_attributanpassungen_button')
  $('#restore_attributanpassungen_button').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.restoreAttributes(evt)
    }
  )

}

module.exports.restoreAttributes = function(evt) {
  log('controllers.attributes.restoreAttributes')
}

module.exports.saveChangedAttributes = function(evt) {
  log('controllers.attributes.saveChangedAttributes');

  var help_text = 'TODO: Prüfen, das Positionen konsistent bleiben und hier dann Fehler ausgeben.'

  if (help_text != '') {
    $('#settings_edit_form div[id=save_attributanpassungen_help_text]').html(help_text).show()
  }
  else {
    $('#settings_edit_form div[id=save_attributanpassungen_help_text]').html('').hide()
  }
  let attributes = window.models.attribute.findWhere()
  
  $.each(
    attributes,
    function(index, v) {
	  let anzeigeAppWert = ($('#settings_edit_form input[name=' + v.name + '_an' + ']').is(':checked') ? '1' : '0')
	  if (v.anzeige != anzeigeAppWert) {
		  //log("Anzeige-Wert für "  + v.fullname + " unterscheidet sich")
		  window.models.attribute.update({'name' : v.name,'anzeige' : anzeigeAppWert})
	  }
	  if (v.position != $('#settings_edit_form input[name=' + v.name + '_pos' + ']').val()) {
		  //log("Positions-Wert für "  + v.fullname + " unterscheidet sich")
		  window.models.attribute.update({'name' : v.name,'position' : $('#settings_edit_form input[name=' + v.name + '_pos' + ']').val()})
	  }
	}
  )
}
  

/* Falls doch über Select-Optionen, mit dem folgenden was zusammenbauen:
  log('fill select option for sicherung_anzahl');
  for (var i = 1; i <= 20; i++) {
    $('#settings_edit_form select[name=sicherung_anzahl]').append(
      $('<option>', {
        value: i,
        text : i
      })
    );
  };
  
  <select id="sicherung_anzahl_select" class="col-sm-8 form-control" name="sicherung_anzahl" title="Anzahl Sicherungen">
          <option value="0">keine</option>
        </select>
		
  <input class="col-sm-4 form-control" type="text" name="zentrale" id="zentrale" placeholder="Zentrale">
*/
module.exports.list = function(evt) {
  log('controllers.attributes.list')
  var testanz = 0
  var testanzval = (testanz == 1) ? 'checked' :'unchecked'
  
  let attributes = window.models.attribute.findWhere(),
      t = $('<table id="attributes-list-table" class="attributes-table">');

  t.append('<tr><th width="5%">Attribut</th><th width="15%">Anzeigen</th><th width="15%">Position</th></tr>');
  $.each(
    attributes,
    function(index, v) {
      (v.anzeige == 1) ? t.append('<tr>\
        <td width="20%">' + v.fullname + '</td>\
		<td><input type="checkbox" class="attributes_input" name="' + v.name + '_an" checked></td>\
        <td width="10%"><input class="col-sm-4 form-control" type="text" name="' + v.name + '_pos" value="' + v.position + '"></td>\
      </tr>')
	  :
	  t.append('<tr>\
        <td width="20%">' + v.fullname + '</td>\
		<td><input type="checkbox" class="attributes_input" name="' + v.name + '_an" unchecked></td>\
        <td width="10%"><input class="col-sm-4 form-control" type="text" name="' + v.name + '_pos" value="' + v.position + '"></td>\
      </tr>')
    }
  )
  t.append('</table>')
  $('#attributanpassungen_div').html(t);
  if ($('#attributanpassungen_div').is(":visible")) {
	  $('#settings_edit_form button[id=save_attributanpassungen_button]').show()
	  $('#settings_edit_form button[id=restore_attributanpassungen_button]').show()
  }
  else {
	  $('#settings_edit_form button[id=save_attributanpassungen_button]').hide()
	  $('#settings_edit_form button[id=restore_attributanpassungen_button]').hide()
  }
}
