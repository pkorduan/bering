// model Beringung
'use strict'

function time_format(time_val) {
   let regEx = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])?$/;
   //console.log(time_val);
   return regEx.test(time_val);
};

module.exports.findWhere = function (select = '*', where = '', group = '', order = '`datum`, `uhrzeit` DESC', limit = '') {
  log('Model Beringung.findWhere: ' + where)
  let db = SQL.dbOpen(window.model.db),
      rows = {};

  if (db !== null) {
    let query = 'SELECT ' + select + ' FROM `Daten`'
    if (where != '') query += ' WHERE ' + where
    if (group != '') query += ' GROUP BY ' + group
    if (order != '') query += ' ORDER BY ' + order
    if (limit != '') query += ' LIMIT ' + limit
    log('query: ' + query);

    try {
      let result = db.exec(query)
      if (result !== undefined && result.length > 0) {
        rows = window.models.dbMapper.rowsFromSqlDataObject(result[0])
      }
    } catch (error) {
      log('Fehler: ' + error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
  return rows;
}

module.exports.findByRingnr = function (ringnr) {
  log('Model Beringung.findByRingnr')
  let beringung = {}

  if (ringnr != '') {
    let beringungen = this.findWhere('*', "ringnr = '" + ringnr + "'", '', "datum, uhrzeit", '1'),
        keys = Object.keys(beringungen)

    if (keys.length > 0) {
      beringung = beringungen[keys[0]];
    }
  }
  return beringung
}

module.exports.findById = function (id) {
  log('Model Beringung.findById')
  let beringung = {}

  if (id > 0) {
    let beringungen = this.findWhere('*', 'id = ' + id),
        keys = Object.keys(beringungen)

    if (keys.length > 0) {
      beringung = beringungen[keys[0]];
    }
  }
  return beringung
}

module.exports.insert = function (kvps, uebernehmen = false) {
	log('Model beringung.insert kvps: ' + JSON.stringify(kvps));
  let success = false;

  if (kvps.hasOwnProperty('ringnr')) {
    let db = SQL.dbOpen(window.model.db)
    if (db !== null) {
      let query = "\
        INSERT OR REPLACE INTO `Daten` (\
          " + $.map(
            kvps,
            function(value, key) {
              return "`" + key + "`";
            }
          ).join(', ') + "\
        )\
        VALUES (\
          " + $.map(
            kvps,
            function(value, key) {
              return "'" + value + "'";
            }
          ).join(', ') + "\
        )\
      ";
      log('query: ' + query)

      try {
        let result = db.exec(query)
        if (result !== undefined) {
          success = true
          SQL.dbClose(db, window.model.db)
          let myNotification = new Notification('Datenbank', {
            body: 'Datensatz erfolgreich angelegt.'
          })
          if ($.inArray(kvps['fundart'], [2,3]) > -1) {
            window.controllers.beringungen.list($('#list_all_data_menue_link'))
          }
          else {
            window.controllers.beringungen.newBeringung(uebernehmen)
          }

        }
        else {
          log('Fehler: Query failed for: ' + JSON.stringify(kvps))
        }
      } catch (error) {
        log('model.saveFormData: ' + error.message)
      }
      if (!success) SQL.dbClose(db, window.model.db)
    }
  }
}

module.exports.update = function (kvps) {
	log('Model beringung.update');
  let db = SQL.dbOpen(window.model.db),
      success = false

  if (db !== null) {
    let query = "\
      UPDATE\
        `Daten`\
      SET\
        " + $.map(
          kvps,
          function(value, key) {
            return "`" + key + "`"  + " = '" + value + "'";
          }
        ).join(', ') + "\
      WHERE\
        id = " + kvps.id + "\
    ";
    log('query: ' + query)

    try {
      let result = db.exec(query)
      if (result !== undefined) {
        success = true
        SQL.dbClose(db, window.model.db)
        let myNotification = new Notification('Datenbank', {
          body: 'Datensatz erfolgreich aktualisiert'
        })

        myNotification.onclick = () => {
          log('Notification clicked')
        }
        window.controllers.beringungen.list($('#list_all_data_menue_link'))
      }
      else {
        log('Fehler: Query failed for: ' + JSON.stringify(kvps))
      }
    } catch (error) {
      log('Fehler: ' + error.message)
    }
    if (!success) SQL.dbClose(db, window.model.db)
  }
}

module.exports.delete = function(id, listType = 'list_all_data_menue_link') {
	log('Model beringung.delete');
  let db = SQL.dbOpen(window.model.db),
      success = false

  if (db !== null) {
    let query = "\
      DELETE FROM\
        `Daten`\
      WHERE\
        id = " + id + "\
    ";
    log('query: ' + query)

    try {
      let result = db.exec(query)
      if (result !== undefined) {
        success = true
        SQL.dbClose(db, window.model.db)
        let myNotification = new Notification('Datenbank', {
          body: 'Datensatz erfolgreich gelöscht.'
        })

        myNotification.onclick = () => {
          log('Notification clicked')
        }
        window.controllers.beringungen.list($('#' + listType))
      }
      else {
        log('Fehler bei Ausführung von Anfrage: ' + query)
      }
    } catch (error) {
      log('Fehler: ' + error.message)
    }
    if (!success) SQL.dbClose(db, window.model.db)
  }
}

module.exports.updateExportDate = function(where) {
  log('models.berinung.updateExportData');
  let db = SQL.dbOpen(window.model.db),
      success = false

  if (db !== null) {
    let query = "\
      UPDATE\
        Daten\
      SET\
        exportiert_am = current_timestamp\
      WHERE\
        " + where + "\
    ";
    log('query: ' + query)

    try {
      let result = db.exec(query)
      if (result !== undefined) {
        success = true
        SQL.dbClose(db, window.model.db)
        log('Datensätze erfolgreich aktualisiert')
      }
      else {
        log('Fehler: Query failed for: ' + JSON.stringify(kvps))
      }
    } catch (error) {
      log('Fehler: ' + error.message)
    }
    if (!success) SQL.dbClose(db, window.model.db)
  }
}

module.exports.validate = function (field) {
  log('models.beringung.validate');
  let result = {
    valid: true,
    message: ''
  }
  switch (true) {
    case (['ringnr'].indexOf(field.id) > -1) : {
      if (field.value == '') {
        result.valid = false
        result.message = 'Die Ringnummer muss angegeben werden!'
      }
	  //Fundart lt. Formular muss genutzt werden, da in der DB das Datensatz noch als Beringung steht und durch das Speichern ja erst zum Wiederfund wird
	  //Merke: Beringung -> beringung.fundart = 1 | Eigenwiederfund -> beringung.fundart = 2 | Fremdwiederfund -> beringung.fundart = 3
	  else if (typeof this.findByRingnr(field.value).ringnr !== 'undefined' && $('#fundart').val() == '1' && document.getElementById('beringung_edit_title').innerHTML != 'Änderung Beringungsdaten'){
		  result.valid = false
          result.message = 'Die Ringnummer existiert bereits!'
	  }
	} break;
	case (['vogelart'].indexOf(field.id) > -1) : {
      if (field.value == '') {
        result.valid = false
        result.message = 'Die Vogelart muss angegeben werden!'
      }
	} break;
	case (['beringungsort'].indexOf(field.id) > -1) : {
      if (field.value == '') {
        result.valid = false
        result.message = 'Der Beringungsort muss angegeben werden!'
      }
	} break;
	case (['uhrzeit'].indexOf(field.id) > -1) : {
		if (field.value == '') {
			//result.valid = true
			result.valid = false
			result.message = 'Die Uhrzeit muss angegeben werden!'
        }
		else if (!time_format(field.value) || field.value.substr(field.value.length - 1) == ':') {
			result.valid = false
			result.message = 'Uhrzeit fehlerhaft!'
		}
		//ProRing: volle Stunde reichen
		/*
		else if (field.value.indexOf(":") == -1 || field.value.substr(-2, 2).indexOf(":") != -1) {
			result.valid = false
			result.message = 'Uhrzeit muss mit Minuten angegeben werden!'
		}
		
		else if (field.value.substr(field.value.length - 1) == ':') {
			result.valid = false
			result.message = 'Uhrzeit fehlerhaft (endet mit Doppelpunkt)!'
		}
		else if (field.value.length == 4 || field.value.length == 7) {
			result.valid = false
			result.message = 'Uhrzeit fehlerhaft!'
		}
		else if (field.value.indexOf(":") == 3) {
			result.valid = false
			result.message = 'Stundenangabe darf nicht dreistellig sein!'
		}
		else if (field.value.substr(0, 2) >23) {
			result.valid = false
			result.message = 'Stunden dürfen nicht größer 23 sein!'
		}
		else if (field.value.substr(-2, 2) >59) {
			result.valid = false
			result.message = 'Minuten bzw. Sekunden dürfen nicht größer 59 sein!'
		}
		*/
    } break;
	case (['alter'].indexOf(field.id) > -1) : {
      if (field.value == '') {
        result.valid = false
        result.message = 'Das Alter muss angegeben werden!'
      }
	} break;
	case (['fluegellaenge'].indexOf(field.id) > -1) : {
	  if (field.value == '') {
			result.valid = true
      }
		else if (field.value.indexOf(".") == -1) {
			result.valid = false
			result.message = 'Flügellänge muss mit Nachkommastelle angegeben werden!'
		}
    } break;
	case (['teilfederlaenge'].indexOf(field.id) > -1) : {
		if (field.value == '') {
			result.valid = true
      }
		else if (field.value.indexOf(".") == -1) {
			result.valid = false
			result.message = 'Teilfederlänge muss mit Nachkommastelle angegeben werden!'
		}
    } break;
	case (['gewicht'].indexOf(field.id) > -1) : {
		if (field.value != '' && $("#uhrzeit").val() == '') {
			result.valid = false
			result.message = 'Die Uhrzeit muss angegeben werden!'
		}
		if (field.value == '') {
			result.valid = true
        }
		else if (field.value.indexOf(".") == -1) {
			result.valid = false
			result.message = 'Gewicht muss mit Nachkommastelle angegeben werden!'
		}
      } break;
	case (['fundursache'].indexOf(field.id) > -1) : {
		if (field.value == '' && !$("#fundursache").is(":hidden")) {
			result.valid = false
			result.message = 'Fundursache muss angegeben werden!'
      }
    } break;
	case (['fundzustand'].indexOf(field.id) > -1) : {
		if (field.value == '' && !$("#fundzustand").is(":hidden")) {
			result.valid = false
			result.message = 'Fundzustand muss angegeben werden!'
      }
    } break
  }
  return result
}
