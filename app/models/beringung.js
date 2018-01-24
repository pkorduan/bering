'use strict'

module.exports.findWhere = function (where = '', order = '`datum`, `uhrzeit`') {
  console.log('Model Beringung.findWhere')
  let db = SQL.dbOpen(window.model.db),
      rows = [];

  if (db !== null) {
    let sql = 'SELECT * FROM `Daten`'
    if (where != '') sql += ' WHERE ' + where
    if (order != '') sql += ' ORDER BY ' + order
    console.log('sql: ' + sql);

    try {
      let result = db.exec(sql)
      console.log('query result: %o', result);
      if (result !== undefined && result.length > 0) {
        rows = window.models.dbMapper.rowsFromSqlDataObject(result[0])
        console.log('rows: %o', rows)
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