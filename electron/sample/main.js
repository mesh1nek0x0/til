const electron = require('electron')

const app           = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  // ブラウザでおなじみの開発者ツールが出る
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null;
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  // macだとxで閉じてもDockに残るため
  if (process.platform != 'darwin') {
    app.quit();
  }
})

app.on('activate', function (){
  // Dockに残って画面が無い状態になる
  if (mainWindow === null) {
    createWindow()
  }
})
