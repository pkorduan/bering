// model Beringung
'use strict'

module.exports.findWhere = function (select = '*', where = '', group = '', order = '`datum`, `uhrzeit` DESC', limit = '') {
  console.log('Model Beringung.findWhere')
  let db = SQL.dbOpen(window.model.db),
      rows = {};

  if (db !== null) {
    let query = 'SELECT ' + select + ' FROM `Daten`'
    if (where != '') query += ' WHERE ' + where
    if (group != '') query += ' GROUP BY ' + group
    if (order != '') query += ' ORDER BY ' + order
    if (limit != '') query += ' LIMIT ' + limit
    console.log('query: ' + query);

    try {
      let result = db.exec(query)
      console.log('query result: %o', result);
      if (result !== undefined && result.length > 0) {
        rows = window.models.dbMapper.rowsFromSqlDataObject(result[0])
      }
    } catch (error) {
      console.log('Fehler: ', error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
  return rows;
}

module.exports.findByRingnr = function (ringnr) {
  console.log('Model Beringung.findByRingnr')
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
  console.log('Model Beringung.findById')
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
	console.log('Model beringung.insert kvps: ', kvps);
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
      console.log('query: ', query)

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
          console.log('Fehler: ', 'Query failed for', kvps)
        }
      } catch (error) {
        console.log('model.saveFormData', error.message)
      }
      if (!success) SQL.dbClose(db, window.model.db)
    }
  }
}

module.exports.update = function (kvps) {
	console.log('Model beringung.update');
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
    console.log('query: ', query)

    try {
      let result = db.exec(query)
      if (result !== undefined) {
        success = true
        SQL.dbClose(db, window.model.db)
        let myNotification = new Notification('Datenbank', {
          body: 'Datensatz erfolgreich aktualisiert'
        })

        myNotification.onclick = () => {
          console.log('Notification clicked')
        }
        window.controllers.beringungen.list($('#list_all_data_menue_link'))
      }
      else {
        console.log('Fehler: ', 'Query failed for', kvps)
      }
    } catch (error) {
      console.log('Fehler: ', error.message)
    }
    if (!success) SQL.dbClose(db, window.model.db)
  }
}

module.exports.validate = function (field) {
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
    } break
  }
  return result
}
