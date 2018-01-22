'use strict'

const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const path = require('path')
const config = require(path.join(__dirname, 'package.json'))
const model = require(path.join(__dirname, 'app', 'model.js'))
const controller = require(path.join(__dirname, 'app', 'controller.js'))
const BrowserWindow = electron.BrowserWindow
const dbPath = '//app/db';

app.setName(config.productName)
var mainWindow = null
app.on('ready', function () {
	controller.init('inittext')
  mainWindow = new BrowserWindow({
    backgroundColor: 'lightgray',
    title: config.productName,
    show: false,
	width: 1600,
	height: 1500,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //C:\Users\seip\AppData\Roaming\Local SQLite Example -> wg. ""productName": "Local SQLite Example"," in package.json
  //model.initDb(app.getPath('userData'),
  //Im Ordner der App
  // console.log('Rufe in main.js model.initDb auf');
  model.initDb(app.getAppPath()+dbPath,
    // Load a DOM stub here. See renderer.js for the fully composed DOM.
    mainWindow.loadURL(`file://${__dirname}/app/html/index.html`)
  )
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Enable keyboard shortcuts for Developer Tools on various platforms.
  let platform = os.platform()
  if (platform === 'darwin') {
    globalShortcut.register('Command+Option+I', () => {
      mainWindow.webContents.openDevTools()
    })
  } else if (platform === 'linux' || platform === 'win32') {
    globalShortcut.register('Control+Shift+I', () => {
      mainWindow.webContents.openDevTools()
    })
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.setMenu(null)
    mainWindow.show()
  })

  mainWindow.onbeforeunload = (e) => {
    // Prevent Command-R from unloading the window contents.
    e.returnValue = false
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

app.on('window-all-closed', () => { app.quit() })
