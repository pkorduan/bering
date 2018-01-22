'use strict'
const path = require('path')
const model = require(path.join(__dirname, 'model.js'))

module.exports.showPeople = function (rowsObject) {
  $('#people-list h2').html('Tabellen')
  let markup = ''
  for (let rowId in rowsObject) {
    let row = rowsObject[rowId]
    markup += '<div class="row justify-content-start">' +
    '<div class="col-sm-3"><img id="edit-pid_' + row.person_id + '" class="icon edit" src="' +
    path.join(__dirname, 'img', 'edit-icon.png') + '">' +
    '<img id="del-pid_' + row.person_id + '" class="icon delete" src="' +
    path.join(__dirname, 'img', 'x-icon.png') + '"></div>' +
    '<div class="col-sm-3 lastname">' + row.last_name + ',</div>' +
    '<div class="col-sm-3 firstname">' + row.first_name + '</div>' +
    '</div>'
  }
  $('#add-person, #edit-person').hide()
  $('#people-list').html(markup)
  $('a.nav-link').removeClass('active')
  $('a.nav-link.people').addClass('active')
  $('#people').show()
  $('#people-list img.edit').each(function (idx, obj) {
    $(obj).on('click', function () {
      window.view.editPerson(this.id)
    })
  })
  $('#people-list img.delete').each(function (idx, obj) {
    $(obj).on('click', function () {
      window.view.deletePerson(this.id)
    })
  })
}

module.exports.showNutzer = function (rowsObject) {
	console.log('Ergebnis in showNutzer:', rowsObject)
  // $('#people-list h2').html('Tabellen')
  let markup = ''
  for (let rowId in rowsObject) {
    let row = rowsObject[rowId]
    markup += '<div class="row justify-content-start">' +
    '<div class="col-sm-3"><img id="use-pid_' + row.beringernr + '" class="icon edit" src="' + path.join(__dirname, 'img', 'edit-icon.png') + '"></div>' +
	'<div class="col-sm-3 beringernr">' + row.beringernr + '</div>' +
    '<div class="col-sm-3 name">' + row.name + '</div>' +
    '<div class="col-sm-3 vorname">' + row.vorname + '</div>' +
    '</div>'
  }
  $('#add-person, #edit-person, #tables, #people, #login, #use-nutzer').hide()
  $('#nutzer-list').html(markup)
  $('a.nav-link').removeClass('active')
  $('a.nav-link.nutzer').addClass('active')
  $('#nutzer').show()
  $('#nutzer-list img.edit').each(function (idx, obj) {
    $(obj).on('click', function () {
		//Rufe nach Klick auf Stift-Symbol die useNutzer()-Funktion auf!
      window.view.useNutzer(this.id)
    })
  })
  // $('#nutzer-list img.delete').each(function (idx, obj) {
    // $(obj).on('click', function () {
      // window.view.deleteNutzer(this.id)
    // })
  // })
}

module.exports.listPeople = function (e) {
  $('#people-list h2').html('Tabellen')
  $('a.nav-link').removeClass('active')
  $(e).addClass('active')
  $('#edit-person').hide()
  window.model.getPeople()
  $('#people').show()
}

module.exports.listNutzer = function (e) {
  // $('#people-list h2').html('Tabellen')
  $('a.nav-link').removeClass('active')
  $(e).addClass('active')
  $('#edit-person').hide()
  $('#people').hide()
  $('#tables').hide()
  $('#login').hide()
  window.model.getNutzer()
  $('#nutzer').show()
}

module.exports.showTables = function (rowsObject) {
  $('#tables-list h2').html('Tabellen')
  $('#tables').show()
  console.log('Ergebnis in showTables:', rowsObject)
  let markup = ''
  for (let rowId in rowsObject) {
    let row = rowsObject[rowId]
	console.log('row'+rowId + ": " + row.name)
    markup += '<div class="row justify-content-start">' +
    '<div class="col-sm-3 name">' + row.name + '</div>' +
    '</div>'
  }
  // $('#add-person, #edit-person').hide()
  $('#add-person, #edit-person, #tables, #people, #login, #use-nutzer, #nutzer').hide()
  $('#tables-list').html(markup)
  $('a.nav-link').removeClass('active')
  $('a.nav-link.tables').addClass('active')
  $('#tables').show()
  console.log('Ende von showTables')
}

module.exports.listTables = function (e) {
  $('a.nav-link').removeClass('active')
  $(e).addClass('active')
  $('#edit-person').hide()
  $('#people').hide()
  window.model.getTables()
  $('#tables').show()
}

module.exports.addPerson = function (e) {
  $('#edit-person h2').html('Add Personxx')
  $('a.nav-link').removeClass('active')
  $(e).addClass('active')
  $('#people').hide()
  $('#edit-person h2').html('Add Personxxx')
  $('#edit-person-submit').html('Savexxx')
  //nötig zum speichern?
  $('#edit-person-form input').val('')
  $('#first_name, #last_name').parent()
    .removeClass('has-success')
    .addClass('has-error')
  //Ausblenden der ID?
  $('#person_id').parent().hide()
  // nötig zum speichern? Ende
  $('#edit-person').show()
}

module.exports.editPerson = function (pid) {
  $('#edit-person h2').html('Edit Person')
  $('#edit-person-submit').html('Update')
  //Mache für den nächsten Aufruf die Felder "first_name" und "last_name" leer
  $('#first_name, #last_name').parent()
    .removeClass('has-success')
    .addClass('has-error')
  ////nötig für Anzeige/Ausblenden von Infos?nötig zum speichern? Ende
  $('#person_id').parent().show()
  pid = pid.split('_')[1]
  let row = model.getPerson(pid)[0]
  $('#person_id').val(row.person_id)
  $('#first_name').val(row.first_name)
  $('#last_name').val(row.last_name)
  $('#people, #add-person').hide()
  $('#edit-person').show()
}

module.exports.useNutzer = function (pid) {
	console.log("useNutzer");
  //Überschrift
  $('#use-nutzer h2').html('Nehme Nutzer')
  //Button
  $('#use-nutzer-submit').html('Speichern')
  //Damit das mit den Häkchen (Animaton) funzt
  $('#bemerkung, #beringernr, #zentrale, #vogelart, #datum, #uhrzeit, #alter, #geschlecht, #fluegellaenge, #teilfederlaenge, #schnabellaenge, #schnabel_kopflaenge, #lauf, #gewicht, #brutstaus, #beringungsort, #koordinaten, #skz_1, #skz_2, #farbring').parent()
    .removeClass('has-success')
    .addClass('has-error')
  //Zeige ID?
  $('#beringernr').parent().show()
  //Splite übergebene ID bei "_"
  pid = pid.split('_')[1]
  let row = model.getNutzerMitID(pid)[0]
  console.log("getNutzerMitID Ergebnis: "+row.vorname);
  $('#beringernr').val(row.beringernr)
  $('#vorname').val(row.vorname)
  $('#vornameLabel').html(row.vorname)
  $('#smallVorname').text(row.vorname)
  $('#smallName').text(row.name)
  $('#vorname').hide();
  $('#name').val(row.name)
  $('#name').hide();
  var jetzt = new Date();
  // $("#datum").attr("placeholder",jetzt.getDate()+"."+("0" + (jetzt.getMonth() + 1)).slice(-2)+"."+jetzt.getFullYear());
  $("#datum").val(jetzt.getDate()+"."+("0" + (jetzt.getMonth() + 1)).slice(-2)+"."+jetzt.getFullYear());
  $("#uhrzeit").val(jetzt.getHours());
  let test = model.test();
  let vogelArr = model.parseDBF("ARTEN.DBF");
  console.log("vogelArr:"+vogelArr);
  //verstecke andere Seiten
  $('#people, #add-person').hide()
  $('#nutzer').hide()
  $('#use-nutzer').show()
}

//TODO: Funktionen zusammenführen!
module.exports.useNutzerBeringernr = function (beringernr) {
	console.log("useNutzer");
  //Überschrift
  $('#use-nutzer h2').html('Nehme Nutzer')
  //Button
  $('#use-nutzer-submit').html('Speichern')
  //Damit das mit den Häkchen (Animaton) funzt
  $('#bemerkung, #beringernr, #zentrale, #vogelart, #datum, #uhrzeit, #alter, #geschlecht, #fluegellaenge, #teilfederlaenge, #schnabellaenge, #schnabel_kopflaenge, #lauf, #gewicht, #brutstaus, #beringungsort, #koordinaten, #skz_1, #skz_2, #farbring').parent()
    .removeClass('has-success')
    .addClass('has-error')
  //Mache "Bemerkung" wirklich leer
  $('#bemerkung').val("");
  //Zeige ID?
  $('#beringernr').parent().show()
  let row = model.getNutzerMitID(beringernr)[0]
  console.log("getNutzerMitID Ergebnis: "+row.vorname);
  $('#beringernr').val(row.beringernr)
  $('#vorname').val(row.vorname)
  $('#vornameLabel').html(row.vorname)
  $('#smallVorname').text(row.vorname)
  $('#smallName').text(row.name)
  $('#vorname').hide();
  $('#name').val(row.name)
  $('#name').hide();
  //verstecke andere Seiten
  $('#people, #add-person').hide()
  $('#nutzer').hide()
  $('#use-nutzer').show()
}

module.exports.deletePerson = function (pid) {
  model.deletePerson(pid.split('_')[1], $('#' + pid).closest('div.row').remove())
}

module.exports.getFormFieldValues = function (formId) {
  let keyValue = {columns: [], values: []}
  $('#' + formId).find('input:visible, textarea:visible').each(function (idx, obj) {
    keyValue.columns.push($(obj).attr('id'))
    keyValue.values.push($(obj).val())
  })
  return keyValue
}
