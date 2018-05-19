const electron = require('electron')
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
    win = new BrowserWindow({width: 800, height: 600, titleBarStyle: "hidden"})

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'editor.html'),
        protocol: 'file:',
        slashes: true
    }))

    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', () => {

    createWindow()

})


app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(win === null){
        createWindow()
    }
})