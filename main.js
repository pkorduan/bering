'use strict'

const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const path = require('path')
const config = require(path.join(__dirname, 'package.json'))
const model = require(path.join(__dirname, 'app', 'model.js'))
const BrowserWindow = electron.BrowserWindow
const dbPath = '//app/db';
const dbName = 'bering.db';

app.setName(config.productName)
var mainWindow = null
app.on('ready', function () {
	console.log('App is ready')
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

  model.migrateDb(
    app.getAppPath() + dbPath,
    dbName,
    // Load a DOM stub here. See renderer.js for the fully composed DOM.
    mainWindow.loadURL(`file://${__dirname}/app/views/index.html`)
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
		console.log('mainWindow is ready-to-show');
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
