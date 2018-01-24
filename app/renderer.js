'use strict'

const fs = require('fs')
const path = require('path')
const app = require('electron').remote.app
const cheerio = require('cheerio')
const dbfParser = require('node-dbf')

console.log('Start renderer');

window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')
//window.BootstrapDatetimepicker = require('bootstrap-datetimepicker')

let webRoot = path.dirname(__dirname)
require(path.join(webRoot, 'jquery.validate.min.js'))
// require(path.join(webRoot, 'bootstrap-datetimepicker.min.js'))
require(path.join(webRoot, 'bootstrap-datepicker.min.js'))
require(path.join(webRoot, 'bootstrap-datepicker.de.min.js'))

// load controllers
let controllersPath = path.join(app.getAppPath(), 'app', 'controllers')
window.login_controller = require(path.join(controllersPath, 'login.js'))
window.beringungen_controller = require(path.join(controllersPath, 'beringungen.js'))
window.start_controller = require(path.join(controllersPath, 'start.js'))

window.view = require(path.join(webRoot, 'view.js'))
window.model = require(path.join(webRoot, 'model.js'))
// window.model.db = path.join(app.getPath('userData'), 'example.db')
//siehe auch model.js module.exports.initDb
window.model.db = path.join(app.getAppPath(), '//app//db//bering.db')

// load models
let modelsPath = path.join(app.getAppPath(), 'app', 'models')
window.models = {};
window.models.beringung = require(path.join(modelsPath, 'beringung.js'))
window.models.dbMapper = require(path.join(modelsPath, 'db-mapper.js'))

// Compose the DOM from separate HTML concerns; each from its own file.
let htmlPath = path.join(app.getAppPath(), 'app', 'html')
let body = fs.readFileSync(path.join(htmlPath, 'body.html'), 'utf8')
let navBar = fs.readFileSync(path.join(htmlPath, 'nav-bar.html'), 'utf8')
let people = fs.readFileSync(path.join(htmlPath, 'people.html'), 'utf8')
//Hinzufügen Navbarelement: wichtig!
let tables = fs.readFileSync(path.join(htmlPath, 'tables.html'), 'utf8')

// load views
let viewsPath = path.join(app.getAppPath(), 'app', 'views')
let login =            fs.readFileSync(path.join(viewsPath, 'login/login.html'), 'utf8')
let beringungen_list = fs.readFileSync(path.join(viewsPath, 'beringungen/list.html'), 'utf8')
let beringungen_edit = fs.readFileSync(path.join(viewsPath, 'beringungen/edit.html'), 'utf8')
let beringungen_menu = fs.readFileSync(path.join(viewsPath, 'beringungen/menu.html'), 'utf8')
let nutzer_menu =      fs.readFileSync(path.join(viewsPath, 'nutzer/menu.html'), 'utf8')

let nutzer = fs.readFileSync(path.join(htmlPath, 'nutzer.html'), 'utf8')
let useNutzer = fs.readFileSync(path.join(htmlPath, 'use-nutzer.html'), 'utf8')
let editPerson = fs.readFileSync(path.join(htmlPath, 'edit-person.html'), 'utf8')

let O = cheerio.load(body)
O('#nav-bar').append(navBar)
O('#nutzer_menu').append(nutzer_menu)
O('#beringungen_menu').append(beringungen_menu)
O('#people').append(people)
//Hinzufügen Navbarelement: wichtig!
O('#tables').append(tables)
O('#beringungen_list_section').append(beringungen_list)
O('#beringungen_edit_section').append(beringungen_edit)
O('#login').append(login)
O('#nutzer').append(nutzer)
O('#use-nutzer').append(useNutzer)
O('#edit-person').append(editPerson)

// Pass the DOM from Cheerio to jQuery.
let dom = O.html()
$('body').html(dom)

$('document').ready(function () {
  console.log('document is ready');
  console.log((require('electron').remote.getGlobal('sharedObject').session.username == '' ? 'Kein Nutzer angemeldet' : 'angemeldet als ' + require('electron').remote.getGlobal('sharedObject').session.username));
  window.login_controller.init();
  window.beringungen_controller.init();
  window.start_controller.init();

  window.start_controller.start();
/*
  $( "#use-nutzer-form" ).validate( {
  rules: {
    bemerkung: {
      required: true,
      minlength: 5
    },
    lastname: "required",
    username: {
      required: true,
      minlength: 2
    },
    password: {
      required: true,
      minlength: 5
    },
    confirm_password: {
      required: true,
      minlength: 5,
      equalTo: "#password"
    },
    email: {
      required: true,
      email: true
    },
    agree: "required"
  },
  messages: {
    bemerkung: {
      required: "Please enter a username",
      minlength: "Your username must consist of at least 2 characters"
    },
    lastname: "Please enter your lastname",
    username: {
      required: "Please enter a username",
      minlength: "Your username must consist of at least 2 characters"
    },
    password: {
      required: "Please provide a password",
      minlength: "Your password must be at least 5 characters long"
    },
    confirm_password: {
      required: "Please provide a password",
      minlength: "Your password must be at least 5 characters long",
      equalTo: "Please enter the same password as above"
    },
    email: "Please enter a valid email address",
    agree: "Please accept our policy"
  },
  errorElement: "em",
  errorPlacement: function ( error, element ) {
    // Add the `help-block` class to the error element
    error.addClass( "help-block" );
    if ( element.prop( "type" ) === "checkbox" ) {
      error.insertAfter( element.parent( "label" ) );
    } else {
      error.insertAfter( element );
    }
  },
  highlight: function ( element, errorClass, validClass ) {
    $('#bemerkungFB').html("Testxxx");
    $( element ).parents( ".col-sm-5" ).addClass( "has-danger" ).removeClass( "has-success" );
  },
  unhighlight: function (element, errorClass, validClass) {
    $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-danger" );
  }
} );
  //Einstiegspunkt in die App.
  // window.model.getPeople()
  window.model.getNutzer();
  window.model.parseDBF("ARTEN.DBF");
  //window.model.parseDBF("bayarea_zipcodes.dbf");
  //Echte Buttons bzw. deren Funktion
  //Edit/Add User
  $('#edit-person-submit').click(function (e) {
    e.preventDefault()
    let ok = true
    $('#first_name, #last_name').each(function (idx, obj) {
      if ($(obj).val() === '') {
        $(obj).parent().removeClass('has-success').addClass('has-danger')
        ok = false
      } else {
        $(obj).parent().addClass('has-success').removeClass('has-danger')
      }
    })
    if (ok) {
      let formId = $(e.target).parents('form').attr('id')
      let keyValue = window.view.getFormFieldValues(formId)
      window.model.saveFormData('people', keyValue, function () {
        window.model.getPeople()
      })
    }
  })
  $('#use-nutzer-submit').click(function (e) {
    e.preventDefault()
    let ok = true
    $('#bemerkung, #zentrale, #vogelart, #datum, #uhrzeit, #alter, #geschlecht, #fluegellaenge, #teilfederlaenge, #schnabellaenge, #schnabel_kopflaenge, #lauf, #gewicht, #brutstaus, #beringungsort, #koordinaten, #skz_1, #skz_2, #farbring').each(function (idx, obj) {
    // if (jQuery("#use-nutzer-form").valid()) {
      //$(obj).parent().removeClass('has-success').addClass('has-error')
      // ok = false
      // if ($(obj).val() === 'x') {
      if ($(obj).val().length < 4) {
      //Leere alles? TODO
      //Alternative: Helptexte nicht vergewaltigen
      // $("#use-nutzer" ).load("use-nutzer.html" );
      //console.log("Valid?: "+JSON.stringify(jQuery("#use-nutzer-form").validate()));
      // console.log("Problem: "+$(obj).parent().attr('id')+"???");
        $(obj).parent().removeClass('has-success').addClass('has-danger')
    // $(obj).parent().next().removeClass('has-success').addClass('has-danger')
    $(obj).next().html("&nbsp;&nbsp;&nbsp; Bitte mehr als 3 Buchstaben eingeben");
    $(obj).next().next().html("");
    // $(obj).parent().prev().html("Test");
    // $('#bemerkungFB').html("Test");
        ok = false
      } else {
        $(obj).parent().addClass('has-success').removeClass('has-danger')
      }
    })
    if (ok) {
      let formId = $(e.target).parents('form').attr('id')
      let keyValue = window.view.getFormFieldValues(formId)
      window.model.saveFormData('Daten', keyValue, function () {
      //keyValue.values[0] = Beringernr
      console.log(keyValue.values[0]);
      window.view.useNutzerBeringernr(keyValue.values[0]);
      // window.view.useNutzer(keyValue.values[0]);
        //window.model.getNutzer()
      })
    }
  });
  $(function () {
    // $('#datetimepicker1').datetimepicker();
    // $('#datetimepicker1').datepicker();
    $('#datetimepicker1').datepicker({
      language: 'de'
    });
    console.log("datepicker");
  });
*/
})

// Set jQuery.validate settings for bootstrap integration
jQuery.validator.setDefaults({
    highlight: function(element) {
        jQuery(element).closest('.form-group').addClass('has-danger');
    },
    unhighlight: function(element) {
        jQuery(element).closest('.form-group').removeClass('has-danger');
    },
    errorElement: 'span',
    errorClass: 'label label-danger',
    errorPlacement: function(error, element) {
        if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});

