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

module.exports.findByLoginName = function (loginname) {
  console.log('Model Beringung.findByLoginName')
  let users = {},
      user;

  if (loginname != '') {
    let users = this.findWhere("loginname = '" + loginname + "'"),
        keys = Object.keys(users)

    if (keys.length > 0) {
      user = users[keys[0]];
    }
    else {
      user = false
    }
  }
  return user
}

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

module.exports.isAuthorized = function(loginname, passwort) {
  console.log('Model user.isAuthorized');
  let db = SQL.dbOpen(window.model.db),
      rows = {},
      authorized = false;

  if (db !== null) {
    let query = "\
      SELECT\
        beringernr,\
        name,\
        vorname\
      FROM\
        `Nutzer`\
      WHERE\
        loginname = '" + loginname + "' AND\
        passwort = '" + SHA256(passwort) + "'\
    ";
    console.log('query: ' + query);
        console.log('passwort: %o %o', passwort, SHA256(passwort))
    try {
      let result = db.exec(query)
      console.log('query result: %o', result);
      if (result !== undefined && result.length > 0) {
        rows = window.models.dbMapper.rowsFromSqlDataObject(result[0])
        authorized = true
      }
    } catch (error) {
      console.log('Fehler: ', error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
  return authorized;
}

module.exports.insert = function (tableName, kvps, callback) {
  console.log('Model user.saveformData');
}

module.exports.update = function (kvps) {
  console.log('Model user.update');
  let db = SQL.dbOpen(window.model.db),
      success = false
    
  if (db !== null) {
    let query = "\
      UPDATE\
        `Nutzer`\
      SET\
        " + $.map(
          kvps,
          function(value, key) {
            return "`" + key + "`"  + " = '" + value + "'";
          }
        ).join(', ') + "\
      WHERE\
        loginname = '" + kvps.loginname + "'\
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
  console.log('Model user.validate');
}