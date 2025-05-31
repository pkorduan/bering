// model attribute
'use strict'

module.exports.findByName = function (name) {
  log('Model attribute.findByName')
  let attributes = {},
      attribute;

  if (name != '') {
    let attributes = this.findWhere("name = '" + name + "'"),
        keys = Object.keys(attributes)

    if (keys.length > 0) {
      attribute = attributes[keys[0]];
    }
    else {
      attribute = false
    }
  }
  return attribute
}

module.exports.findWhere = function (where = '', order = '`defaultpos`') {
  log('Model attribute.findWhere')
  let db = SQL.dbOpen(window.model.db),
      rows = {};

  if (db !== null) {
    let query = 'SELECT * FROM `Attribute`'
    if (where != '') query += ' WHERE ' + where
    if (order != '') query += ' ORDER BY ' + order
    log('query: ' + query);

    try {
      let result = db.exec(query)
      log('query result: ' + JSON.stringify(result));
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
  log('Model attribute.saveformData');
}

module.exports.update = function (kvps) {
  log('Model attribute.update');
  let db = SQL.dbOpen(window.model.db),
      success = false

  if (db !== null) {
    let query = "\
      UPDATE\
        `Attribute`\
      SET\
        " + $.map(
          kvps,
          function(value, key) {
            return "`" + key + "`"  + " = '" + value + "'";
          }
        ).join(', ') + "\
      WHERE\
        name = '" + kvps.name + "'\
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
  log('Model attribute.validate');
}
