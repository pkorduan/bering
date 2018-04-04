'use strict'

const fs = require('fs')
const path = require('path')
const app = require('electron').remote.app
const cheerio = require('cheerio')
const dbfParser = require('node-dbf')
const showdown = require('showdown')
const SHA256 = require('crypto-js/sha256')
//const dialog = require('electron').remote.require('dialog')

console.log('Start renderer');

window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')
window.BootstrapTable = require('bootstrap-table')

//window.BootstrapDatetimepicker = require('bootstrap-datetimepicker')

let webRoot = path.dirname(__dirname)
require(path.join(webRoot, 'jquery.validate.min.js'))
// require(path.join(webRoot, 'bootstrap-datetimepicker.min.js'))
require(path.join(webRoot, 'bootstrap-datepicker.min.js'))
require(path.join(webRoot, 'bootstrap-datepicker.de.min.js'))
require(path.join(webRoot,'../node_modules/bootstrap-table/dist/extensions/export/bootstrap-table-export.js'))

window.session = {
  'angemeldet' : false,
  'beringernr' : '',
  'loginname' : ''
}

// load controllers
let controllersPath = path.join(app.getAppPath(), 'app', 'controllers')
window.controllers = {}
window.controllers.settings = require(path.join(controllersPath, 'settings.js'))
window.controllers.users = require(path.join(controllersPath, 'users.js'))
window.controllers.help = require(path.join(controllersPath, 'help.js'))
window.controllers.beringungen = require(path.join(controllersPath, 'beringungen.js'))
window.controllers.login = require(path.join(controllersPath, 'login.js'))
window.controllers.start = require(path.join(controllersPath, 'start.js'))

window.model = require(path.join(webRoot, 'model.js'))
window.model.db = path.join(app.getAppPath(), '//app//db//bering.db')

// load models
let modelsPath = path.join(app.getAppPath(), 'app', 'models')
window.models = {};
window.models.beringung = require(path.join(modelsPath, 'beringung.js'))
window.models.dbMapper = require(path.join(modelsPath, 'db-mapper.js'))
window.models.user = require(path.join(modelsPath, 'user.js'))
window.models.vogelalter = require(path.join(modelsPath, 'vogelalter.js'))
window.models.vogelarten = require(path.join(modelsPath, 'vogelarten.js'))
window.models.fundzustand = require(path.join(modelsPath, 'fundzustand.js'))
window.models.fundursache = require(path.join(modelsPath, 'fundursache.js'))
window.models.brutstatus = require(path.join(modelsPath, 'brutstatus.js'))
window.models.setting = require(path.join(modelsPath, 'setting.js'))

// load views
let viewsPath = path.join(app.getAppPath(), 'app', 'views')
window.views = {}
window.views.body =               fs.readFileSync(path.join(viewsPath, 'body.html'), 'utf8')
window.views.navBar =             fs.readFileSync(path.join(viewsPath, 'nav-bar.html'), 'utf8')
window.views.help =               fs.readFileSync(path.join(viewsPath, 'help/help.html'), 'utf8')
window.views.login =              fs.readFileSync(path.join(viewsPath, 'login/login.html'), 'utf8')
window.views.beringungen_list =   fs.readFileSync(path.join(viewsPath, 'beringungen/list.html'), 'utf8')
window.views.beringungen_edit =   fs.readFileSync(path.join(viewsPath, 'beringungen/edit.html'), 'utf8')
window.views.beringungen_menu =   fs.readFileSync(path.join(viewsPath, 'beringungen/menu.html'), 'utf8')
window.views.beringungen_search = fs.readFileSync(path.join(viewsPath, 'beringungen/search.html'), 'utf8')
window.views.settings_edit =      fs.readFileSync(path.join(viewsPath, 'settings/edit.html'), 'utf8')
window.views.settings_info =      fs.readFileSync(path.join(viewsPath, 'settings/info.html'), 'utf8')

// Compose the DOM from separate HTML concerns; each from its own file.
let O = cheerio.load(window.views.body)
O('#nav-bar').append(window.views.navBar)
O('#beringungen_menu').append(window.views.beringungen_menu)
O('#beringungen_list_section').append(window.views.beringungen_list)
O('#beringungen_edit_section').append(window.views.beringungen_edit)
O('#beringungen_search_section').append(window.views.beringungen_search)
O('#help_section').append(window.views.help)
O('#settings_edit_section').append(window.views.settings_edit)
O('#settings_info_section').append(window.views.settings_info)
O('#login').append(window.views.login)

// Pass the DOM from Cheerio to jQuery.
let dom = O.html()
$('body').html(dom)

$('document').ready(function () {
  console.log('document is ready');
  console.log((window.session.angemeldet ? 'angemeldet als ' + window.session.loginname : 'Kein Nutzer angemeldet'));
  window.controllers.help.init();
  window.controllers.settings.init();
  window.controllers.users.init();
  window.controllers.login.init();
  window.controllers.beringungen.init();
  window.controllers.start.init();
  window.controllers.start.start();
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
