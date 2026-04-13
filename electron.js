const { app, BrowserWindow, session } = require('electron')
const path = require('path')

function createWindow() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Cross-Origin-Opener-Policy': ['same-origin'],
        'Cross-Origin-Embedder-Policy': ['require-corp'],
      }
    })
  })

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'Faust IDE',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  })

  win.loadFile(path.join(__dirname, 'dist/index.html'))
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
