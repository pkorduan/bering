// model Beringung
'use strict'

module.exports.findWhere = function (where = '', order = '`datum`, `uhrzeit` DESC') {
  console.log('Model Beringung.findWhere')
  let db = SQL.dbOpen(window.model.db),
      rows = {};

  if (db !== null) {
    let query = 'SELECT * FROM `Daten`'
    if (where != '') query += ' WHERE ' + where
    if (order != '') query += ' ORDER BY ' + order
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

module.exports.findById = function (id) {
  console.log('Model Beringung.findById')
  let beringung = {}

  if (id > 0) {
    let beringungen = this.findWhere('id = ' + id),
        keys = Object.keys(beringungen)

    if (keys.length > 0) {
      beringung = beringungen[keys[0]];
    }
  }
  return beringung
}

module.exports.insert = function (tableName, kvps, callback) {
	console.log('Model beringung.saveformData');
  if (kvps.columns.length > 0) {
    let db = SQL.dbOpen(window.model.db)
    if (db !== null) {
      let query = 'INSERT OR REPLACE INTO `' + tableName + '`'
      query += ' (`' + kvps.columns.join('`, `') + '`)'

      let statement = db.prepare(query)
      try {
        window.debug_s = statement
        if (statement.run(kvps.values)) {
          console.log('statement gerunt')
          $('#' + kvps.columns.join(', #'))
          .addClass('form-control-success')
          .animate({class: 'form-control-success'}, 1500, function () {
            window.beringungen_controller.list()
          })
        } else {
          console.log('Model beringung.saveFormData', 'Query failed for', kvps.values)
        }
      } catch (error) {
        console.log('model.saveFormData', error.message)
      } finally {
        SQL.dbClose(db, window.model.db)
      }
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
    let result = db.exec(query)
    try {
      if (result !== undefined) {
        success = true
        SQL.dbClose(db, window.model.db)
        window.beringungen_controller.list()
/*        $('#' + kvps.columns.join(', #'))
        .addClass('form-control-success')
        .animate({class: 'form-control-success'}, 1500, function () {
          window.beringungen_controller.list()
        })*/
      }
      else {
        console.log('Fehler: ', 'Query failed for', kvps.values)
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