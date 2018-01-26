// model user
'use strict'

/*
  Populates the Nutzer List.
module.exports.getNutzer = function () {
  let db = SQL.dbOpen(window.model.db)
  if (db !== null) {
    let query = 'SELECT * FROM `nutzer` ORDER BY `name` ASC'
    try {
      let row = db.exec(query)
      if (row !== undefined && row.length > 0) {
        row = _rowsFromSqlDataObject(row[0])
		console.log('getNutzer Ergebnis:', row)
        view.showNutzer(row)
      }
    } catch (error) {
      console.log('model.getNutzer', error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
}
*/

module.exports.findWhere = function (where = '', order = '`name`') {
  console.log('Model user.findWhere')
  let db = SQL.dbOpen(window.model.db),
      rows = {};

  if (db !== null) {
    let query = 'SELECT * FROM `Nutzer`'
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
  console.log('Model user.findById')
  let features = {}

  if (id > 0) {
    let feature = this.findWhere('id = ' + id),
        keys = Object.keys(features)

    if (keys.length > 0) {
      feature = features[keys[0]];
    }
  }
  return feature
}

module.exports.insert = function (tableName, kvps, callback) {
  console.log('Model user.saveformData');
}

module.exports.update = function (kvps) {
  console.log('Model user.update');
}

module.exports.validate = function (field) {
  console.log('Model user.validate');
}