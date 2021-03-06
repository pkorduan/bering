'use strict'

const path = require('path')
const fs = require('fs')
const SQL = require('sql.js')

/*
  SQL.js returns a compact object listing the columns separately from the
  values or rows of data. This function joins the column names and
  values into a single objects and collects these together by row id.
  {
    0: {first_name: "Jango", last_name: "Reinhardt", person_id: 1},
    1: {first_name: "Svend", last_name: "Asmussen", person_id: 2},
  }
  This format makes updating the markup easy when the DOM input id attribute
  is the same as the column name.
*/
let _rowsFromSqlDataObject = function (object) {
  let data = {}
  let i = 0
  let j = 0
  for (let valueArray of object.values) {
    data[i] = {}
    j = 0
    for (let column of object.columns) {
      Object.assign(data[i], {[column]: valueArray[j]})
      j++
    }
    i++
  }
  return data
}

/*
  Return a string of placeholders for use in a prepared statement.
*/
let _placeHoldersString = function (length) {
  let places = ''
  for (let i = 1; i <= length; i++) {
    places += '?, '
  }
  return /(.*),/.exec(places)[1]
}

SQL.dbOpen = function (databaseFileName) {
  try {
    return new SQL.Database(fs.readFileSync(databaseFileName))
  } catch (error) {
    console.log("Can't open database file.", error.message)
    return null
  }
}

SQL.dbClose = function (databaseHandle, databaseFileName) {
  try {
    let data = databaseHandle.export()
    let buffer = new Buffer(data)
    fs.writeFileSync(databaseFileName, buffer)
    databaseHandle.close()
    return true
  } catch (error) {
    console.log("Can't close database file.", error)
    return null
  }
}

/*
  A function to create a new SQLite3 database from schema.sql.

  This function is called from main.js during initialization and that's why
  it's passed appPath. The rest of the model operates from renderer and uses
  window.model.db.
*/
module.exports.initDb = function (appPath, callback) {
  // let dbPath = path.join(appPath, 'example.db')
  //console.log('model.initDb : ' + appPath);
  // let dbPath = path.join(app.getAppPath(), '//app//db//example.db')
  let dbPath = path.join(appPath, 'example.db')
  let createDb = function (dbPath) {
    // Create a database.
    console.log('Erzeuge DB: ', dbPath)
    let db = new SQL.Database()
	  // console.log('Fülle DB')
    let query = fs.readFileSync(
    path.join(__dirname, 'db', 'schema.sql'), 'utf8')
    let result = db.exec(query)
    if (Object.keys(result).length === 0 &&
      typeof result.constructor === 'function' &&
      SQL.dbClose(db, dbPath)) {
      console.log('Filled new database.')
    } else {
      console.log('model.initDb.createDb failed.')
    }
  }
  console.log('Open DB: ', dbPath);
  let db = SQL.dbOpen(dbPath)
  // console.log('bin nach dbOpen');
  if (db === null) {
    // The file doesn't exist so create a new database.
    console.log('keine db da');
    createDb(dbPath)
  }
  else {
	  // console.log('db da');
    let query = 'SELECT count(*) as `count` FROM `sqlite_master`'
    let row = db.exec(query)
    let tableCount = parseInt(row[0].values)
    if (tableCount === 0) {
      console.log('The file is an empty SQLite3 database.')
      createDb(dbPath)
    }
    else {
      console.log('The database has', tableCount, 'tables.')
    }
    if (typeof callback === 'function') {
      callback()
    }
  }
}

module.exports.migrateDb = function (dbPath, dbName, callback) {
  //console.log('model.js migrateDb dbFile: ', dbName)
  let dbFile = path.join(dbPath, dbName),
      db = SQL.dbOpen(dbFile),
      rows = {},

      migrate = function (dbFile, migrationsPath, migrationFile) {
        console.log('Exec migrations file ', migrationFile)
        let db = SQL.dbOpen(dbFile),
            query = fs.readFileSync(path.join(migrationsPath, migrationFile), 'utf8')

        try {
          let result = db.exec(query)
          console.log('Result: ', result)
          db.exec("INSERT INTO `Migrationen` (`dateiname`) VALUES ('" + migrationFile + "')")
        }
        catch (error) {
          console.log('Fehler: ', error.message)
        }
        finally {
          SQL.dbClose(db, dbFile)
        }
      },

      doMigrations = function(dbPath, dbFile, migrations) {
        let migrationsPath = path.join(dbPath, 'migrations')

        fs.readdir(migrationsPath, (err, files) => {
          files.forEach(file => {
            if (migrations.indexOf(file) == -1) {
              migrate(dbFile, migrationsPath, file)
            }
        });
      })
    }

  let result = db.exec("\
    SELECT\
      name\
    FROM\
      sqlite_master\
    WHERE\
      type='table' AND\
      name='Migrationen'\
  ")
  if (result.length == 0) {
    doMigrations(dbPath, dbFile, [])
  }
  else {
    try {
      result = db.exec("\
        SELECT\
          *\
        FROM\
          `Migrationen`\
        ORDER BY\
          dateiname\
      ")
      if (result !== undefined && result.length > 0) {
        let migrations = result[0].values.map(x => x[0])
        doMigrations(dbPath, dbFile, migrations)
      }
    }
    catch (error) {
      console.log('Fehler: ', error.message)
    }
    finally {
      SQL.dbClose(db, dbFile)
    }
  }

  if (typeof callback === 'function') {
    callback()
  }
}

module.exports.test = function () {
	return "Test erfolgreich";
}
