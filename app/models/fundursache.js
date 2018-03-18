// model Fundursache
'use strict'

module.exports.findWhere = function (where = '', order = '`bezeichnung_de`') {
  console.log('Model Fundursache findWhere')
  let db = SQL.dbOpen(window.model.db),
      rows = {};

  if (db !== null) {
    let query = "\
      SELECT\
        code,\
        bezeichnung_de\
      FROM\
        `Fundursachen`\
    ";
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