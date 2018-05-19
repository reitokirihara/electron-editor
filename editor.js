(() => {

    const electron = require("electron")
    const {app, BrowserWindow, Menu} = require('electron')
    const path = require('path')
    const url = require('url')

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
                    click (){
                        console.log("Open")
                    }
                },
                {
                    label: "Save",
                    accelerator: "CmdOrCtrl+S",
                    click (){
                        console.log("Save")
                    }
                }
            ]
        },
    
    ]

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

    const editor = ace.edit("editor")
    editor.setTheme("ace/theme/monokai")

})()