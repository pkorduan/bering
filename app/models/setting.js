// model setting
'use strict'

module.exports.findByBezeichnung = function (bezeichnung) {
  console.log('Model Setting.findByBezeichnung')
  let settings = {},
      setting;

  if (bezeichnung != '') {
    let settings = this.findWhere("bezeichnung = '" + bezeichnung + "'"),
        keys = Object.keys(settings)

    if (keys.length > 0) {
      setting = settings[keys[0]];
    }
    else {
      setting = false
    }
  }
  return setting
}

module.exports.findWhere = function (where = '', order = '`bezeichnung`') {
  console.log('Model setting.findWhere')
  let db = SQL.dbOpen(window.model.db),
      rows = {};

  if (db !== null) {
    let query = 'SELECT * FROM `Einstellungen`'
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

module.exports.insert = function (tableName, kvps, callback) {
  console.log('Model setting.saveformData');
}

module.exports.update = function (kvps) {
  console.log('Model setting.update');
  let db = SQL.dbOpen(window.model.db),
      success = false
    
  if (db !== null) {
    let query = "\
      UPDATE\
        `Einstellungen`\
      SET\
        " + $.map(
          kvps,
          function(value, key) {
            return "`" + key + "`"  + " = '" + value + "'";
          }
        ).join(', ') + "\
      WHERE\
        bezeichnung = '" + kvps.bezeichnung + "'\
    ";
    console.log('query: ', query)
    let result = db.exec(query)
    try {
      if (result !== undefined) {
        success = true
        SQL.dbClose(db, window.model.db)
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
  console.log('Model setting.validate');
}