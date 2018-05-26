(() => {

    const {ipcMain, ipcRenderer} = require("electron")

    const editor = ace.edit("editor")
    editor.setTheme("ace/theme/monokai")

    ipcRenderer.on("file-did-open", (event, data) => {
        editor.setValue(data)
        document.getElementById("title2").textContent = "Hello, Electronπ UNSAVED"
    })

    ipcRenderer.on("file-will-save", (event) => {
        event.sender.send("file-ready-to-save", editor.getValue())
    })

    ipcRenderer.on("file-did-save", event => {
        document.getElementById("title2").textContent = "Hello, Electronπ"
    })

})()