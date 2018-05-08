// model Fundzustand
'use strict'

module.exports.findWhere = function (where = '', order = '`code`') {
  log('Model Fundzustand findWhere')
  let db = SQL.dbOpen(window.model.db),
      rows = {};

  if (db !== null) {
    let query = "\
      SELECT\
        code,\
        bezeichnung\
      FROM\
        `Fundzustaende`\
    ";
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
      log('Fehler: ', error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
  return rows;
}