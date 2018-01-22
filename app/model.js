'use strict'

const path = require('path')
const fs = require('fs')
const SQL = require('sql.js')
const view = require(path.join(__dirname, 'view.js'))

/*
  SQL.js returns a compact object listing the columns separately from the
  values or rows of data. This function joins the column names and
  values into a single objects and collects these together by row id.
  {
    0: {first_name: "Jango", last_name: "Reinhardt", person_id: 1},
    1: {first_name: "Svend", last_name: "Asmussen", person_id: 2},
  }
  This format makes updating the markup easy when the DOM input id attribute
  is the same as the column name. See view.showPeople() for an example.
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
  //console.log('bin in model.initDb in model.js');
  // let dbPath = path.join(app.getAppPath(), '//app//db//example.db')
  let dbPath = path.join(appPath, 'example.db')
  let createDb = function (dbPath) {
    // Create a database.
	// console.log('Erzeuge DB')
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
  // console.log('bin vor dbOpen');
  let db = SQL.dbOpen(dbPath)
  // console.log('bin nach dbOpen');
  if (db === null) {
    /* The file doesn't exist so create a new database. */
	console.log('keine db da');
    createDb(dbPath)
  } else {
    /*
      The file is a valid sqlite3 database. This simple query will demonstrate
      whether it's in good health or not.
    */
	// console.log('db da');
    let query = 'SELECT count(*) as `count` FROM `sqlite_master`'
    let row = db.exec(query)
    let tableCount = parseInt(row[0].values)
    if (tableCount === 0) {
      console.log('The file is an empty SQLite3 database.')
      createDb(dbPath)
    } else {
      console.log('The database has', tableCount, 'tables.')
    }
    if (typeof callback === 'function') {
      callback()
    }
  }
}

/*
  Populates the People List.
*/
module.exports.getPeople = function () {
  let db = SQL.dbOpen(window.model.db)
  if (db !== null) {
    let query = 'SELECT * FROM `people` ORDER BY `last_name` ASC'
    try {
      let row = db.exec(query)
      if (row !== undefined && row.length > 0) {
        row = _rowsFromSqlDataObject(row[0])
		console.log('getPeople Ergebnis:', row)
        view.showPeople(row)
      }
    } catch (error) {
      console.log('model.getPeople', error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
}

/*
  Populates the Nutzer List.
*/
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

/*
  Populates the Tables List.
*/
module.exports.getTables = function () {
  let db = SQL.dbOpen(window.model.db)
  if (db !== null) {
    let query = "SELECT name FROM sqlite_master WHERE type='table'";
    try {
      let row = db.exec(query)
      if (row !== undefined && row.length > 0) {
        row = _rowsFromSqlDataObject(row[0])
		console.log('getTables Ergebnis:', row)
        view.showTables(row)
      }
    } catch (error) {
      console.log('model.getTables', error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
}

/*
  Fetch a person's data from the database.
*/
module.exports.getPerson = function (pid) {
  let db = SQL.dbOpen(window.model.db)
  if (db !== null) {
    let query = 'SELECT * FROM `people` WHERE `person_id` IS ?'
    let statement = db.prepare(query, [pid])
    try {
      if (statement.step()) {
        let values = [statement.get()]
        let columns = statement.getColumnNames()
        return _rowsFromSqlDataObject({values: values, columns: columns})
      } else {
        console.log('model.getPeople', 'No data found for person_id =', pid)
      }
    } catch (error) {
      console.log('model.getPeople', error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
}

/*
  Fetch a Nutzer's data from the database.
*/
module.exports.getNutzerMitID = function (pid) {
	console.log("getNutzerMitID: " + pid);
  let db = SQL.dbOpen(window.model.db)
  if (db !== null) {
    let query = 'SELECT * FROM `Nutzer` WHERE `beringernr` IS ?'
    let statement = db.prepare(query, [pid])
    try {
      if (statement.step()) {
        let values = [statement.get()]
        let columns = statement.getColumnNames()
        return _rowsFromSqlDataObject({values: values, columns: columns})
      } else {
        console.log('model.getNutzerMitID', 'No data found for beringernr =', pid)
      }
    } catch (error) {
      console.log('model.getNutzerMitID', error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
}

/*
  Delete a person's data from the database.
*/
module.exports.deletePerson = function (pid, callback) {
  let db = SQL.dbOpen(window.model.db)
  if (db !== null) {
    let query = 'DELETE FROM `people` WHERE `person_id` IS ?'
    let statement = db.prepare(query)
    try {
      if (statement.run([pid])) {
        if (typeof callback === 'function') {
          callback()
        }
      } else {
        console.log('model.deletePerson', 'No data found for person_id =', pid)
      }
    } catch (error) {
      console.log('model.deletePerson', error.message)
    } finally {
      SQL.dbClose(db, window.model.db)
    }
  }
}

/*
  Insert or update a person's data in the database.
*/
module.exports.saveFormData = function (tableName, keyValue, callback) {
	console.log("bin in saveFormData");
  if (keyValue.columns.length > 0) {
    let db = SQL.dbOpen(window.model.db)
    if (db !== null) {
      let query = 'INSERT OR REPLACE INTO `' + tableName
      query += '` (`' + keyValue.columns.join('`, `') + '`)'
      query += ' VALUES (' + _placeHoldersString(keyValue.values.length) + ')'
      let statement = db.prepare(query)
      try {
        if (statement.run(keyValue.values)) {
          $('#' + keyValue.columns.join(', #'))
          .addClass('form-control-success')
          .animate({class: 'form-control-success'}, 1500, function () {
            if (typeof callback === 'function') {
              callback()
            }
          })
        } else {
          console.log('model.saveFormData', 'Query failed for', keyValue.values)
        }
      } catch (error) {
        console.log('model.saveFormData', error.message)
      } finally {
        SQL.dbClose(db, window.model.db)
      }
    }
  }
}

module.exports.test = function () {
	return "Test erfolgreich";
}

//ursprünglich: https://www.npmjs.com/package/node-dbf
//bzw. https://www.npmjs.com/package/dbf-parser
//funzt: https://www.npmjs.com/package/read-dbf
//noch nicht getestet: https://www.npmjs.com/package/stream-dbf

//nach: https://stackoverflow.com/questions/27364486/json-array-into-html-select-option
//https://stackoverflow.com/a/27364771/6532988

//TODO: beim Starten einmal Array füllen, dann nur noch nutzen, da DBF's sehr groß
module.exports.parseDBF = function (fileName) {
	var readDbf = require('read-dbf');
 
	readDbf(path.join(__dirname, '/data/'+fileName), function(err, res) {
		console.log('parseDBF ERROR: '+err);
		// res is an array of objects
		var resJSON = JSON.stringify(res);
		//console.log('parseDBF: '+resJSON);
		var arrayA = []; 
		for (var i = 0; i < resJSON.length; i++) {
			//console.log('parseDBF: '+resJSON[i][0]);
			// console.log("Pushe Nr. "+i+": "+resJSON[i].ARNAME);
			arrayA.push(resJSON[i].ARNAME);
		}
		return arrayA;
		// for (var i = 0; i < resJSON.length; i++) {
			// var select = document.getElementById("vogelart");
			// var option = document.createElement("option");
			// option.text = resJSON[i].ARNAME;
			// option.value = resJSON[i].ARNAME;
			// select.add(option);
		// }
	})
	var test = [{"ARMARKE":null,"ARROTLIST":null,"ARART":"ACCBRE","ARNAME":"Kurzfangsperber","ARLATEIN":"Accipter brevipes","SUCHEN":"ACCBRE  Kurzfangsperber              Accipter brevipes","AREURIA":"0000","AREURIN":"02730","ARGMIN":"0","ARGMAX":"0","ARFMIN":"0","ARFMAX":"0","ARNEUNUTZ":null,"ARNEUDATU":null,"ARNEUZEIT":null,"ARAENNUTZ":null,"ARAENDATU":null,"ARAENZEIT":null},{"ARMARKE":null,"ARROTLIST":null,"ARART":"ACCGEN","ARNAME":"Habicht","ARLATEIN":"Accipiter gentilis","SUCHEN":"ACCGEN  Habicht                      Accipiter gentilis","AREURIA":"1110","AREURIN":"02670","ARGMIN":"4230","ARGMAX":"26000","ARFMIN":"150","ARFMAX":"424","ARNEUNUTZ":null,"ARNEUDATU":null,"ARNEUZEIT":null,"ARAENNUTZ":null,"ARAENDATU":null,"ARAENZEIT":null}];
	var test2 = [
		{ "Produktid": "01", "Titel": "Dangerous", "Band": "David Guetta", "Nettoeinzelpreis": "1.99" },
		{ "Produktid": "02", "Titel": "Sun goes down", "Band": "Robin Schulz", "Nettoeinzelpreis": "1.99" },
		{ "Produktid": "03", "Titel": "Fade out lines", "Band": "The Avener", "Nettoeinzelpreis": "1.99" },
		{ "Produktid": "04", "Titel": "Walk", "Band": "Kwabs", "Nettoeinzelpreis": "1.99" },
		{ "Produktid": "05", "Titel": "Blame", "Band": "Calvin Harris", "Nettoeinzelpreis": "1.99" },
		{ "Produktid": "06", "Titel": "Geronimo", "Band": "Sheppard", "Nettoeinzelpreis": "1.99" },
		{ "Produktid": "07", "Titel": "Animals", "Band": "Maroon 5", "Nettoeinzelpreis": "1.99" },
		{ "Produktid": "08", "Titel": "What are you waiting for?", "Band": "Nickelback", "Nettoeinzelpreis": "1.99" },
		{ "Produktid": "09", "Titel": "Shake it off", "Band": "Taylor Swift", "Nettoeinzelpreis": "1.99" },
		{ "Produktid": "10", "Titel": "Chandelier", "Band": "Sia", "Nettoeinzelpreis": "1.99" }
	];
	for (var i = 0; i < test.length; i++) {
			//console.log('parseDBF: '+resJSON[i][0]);
			console.log("Pushe Nr. "+i+": "+test[i].ARNAME);
		}
	for (var i = 0; i < test2.length; i++) {
			//console.log('parseDBF: '+resJSON[i][0]);
			console.log("Pushe Nr. "+i+": "+test2[i].Titel);
		}
}