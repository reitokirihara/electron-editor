const electron = require('electron')
const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

const fs = require('fs')

let win = null
let openedFilePath = null

const menuTemplate = [
    {
        label: "Electronπ",
        submenu: [
            {
                label: "Quit Electronπ",
                role: "quit"
            }
        ]
    },
    {
        label: "File",
        submenu: [
            {
                label: "Open",
                accelerator: "CmdOrCtrl+O",
                click: openFileDialog
            },
            {
                label: "Save",
                accelerator: "CmdOrCtrl+S",
                click: saveFileDialog
            }
        ]
    },
]

function openFileDialog () {
    electron.dialog.showOpenDialog(win, {message: "Pick a file to open", properties: ["openFile"]}, filePaths => {
        let filePath = filePaths[0]
        fs.readFile(filePath, "utf8", (error, data) => {
            if(error) {
                throw error
            } else {
                openedFilePath = filePath
                win.webContents.send("file-did-open", data)
            }
        })
    })
}

function saveFileDialog () {
    win.webContents.send("file-will-save")
}

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

function createMenu() {
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
}

app.on('ready', () => {
    createMenu()
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

ipcMain.on('file-ready-to-save', (event, data) => {
    electron.dialog.showOpenDialog(win, {message: "Save File", defaultPath: openedFilePath, buttonLabel: "Save"}, (filePaths) => {
        if (filePaths.length > 0) {
            openedFilePath = filePaths[0]
            fs.writeFile(openedFilePath, data, () => {
                console.log("File saved")
                event.sender.send("file-did-save")
            })
        }
        
    })
})