const { app, BrowserWindow, screen, Menu } = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {

    console.log("app initialized");
    const { width, height } = screen.getPrimaryDisplay().bounds;

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        backgroundColor: "#ffffff",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'assets/app.png') // Set the icon here
    })
    mainWindow.maximize();

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    /* mainWindow.webContents.openDevTools() */

    process.platform === "win32" || proccess.platform === "linux" && mainWin.removeMenu();
    process.platform === "darwin" && Menu.setApplicationMenu(Menu.buildFromTemplate([]))

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('open-file', (event, filePath) => {
    event.preventDefault();
    console.log('open-file event:', filePath);
    if (mainWindow) {
        mainWindow.webContents.send('open-file', filePath);
    } else {
        app.whenReady().then(() => {
            createWindow();
            mainWindow.webContents.once('did-finish-load', () => {
                mainWindow.webContents.send('open-file', filePath);
            });
        });
    }
});

app.on('ready', () => {
    createWindow();

    // Handle file opening on Windows
    if (process.platform === 'win32' && process.argv.length >= 2) {
        const filePath = process.argv[1];
        console.log('File path from argv:', filePath);
        mainWindow.webContents.once('did-finish-load', () => {
            mainWindow.webContents.send('open-file', filePath);
        });
    }
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})
