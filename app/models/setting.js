// model setting
'use strict'

module.exports.findByBezeichnung = function (bezeichnung) {
  log('Model Setting.findByBezeichnung')
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
  log('Model setting.findWhere')
  let db = SQL.dbOpen(window.model.db),
      rows = {};

  if (db !== null) {
    let query = 'SELECT * FROM `Einstellungen`'
    if (where != '') query += ' WHERE ' + where
    if (order != '') query += ' ORDER BY ' + order
    log('query: ' + query);

    try {
      let result = db.exec(query)
      log('query result: %o', result);
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

module.exports.insert = function (tableName, kvps, callback) {
  log('Model setting.saveformData');
}

module.exports.update = function (kvps) {
  log('Model setting.update');
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
    log('query: ' + query)
    let result = db.exec(query)
    try {
      if (result !== undefined) {
        success = true
        SQL.dbClose(db, window.model.db)
      }
      else {
        log('Fehler: Query failed for: ' + JSON.stringify(kvps.values))
      }
    } catch (error) {
      log('Fehler: ' + error.message)
    }
    if (!success) SQL.dbClose(db, window.model.db)
  }
}

module.exports.validate = function (field) {
  log('Model setting.validate');
}