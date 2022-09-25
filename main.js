const {app, BrowserWindow} = require("electron");
const path = require("path");

// If you use Electron 9.x or later, be sure to set allowRendererProcessReuse as false
app.allowRendererProcessReuse = false;

function createWindow() {
    // Create a browser window
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "renderer.js"),
            nodeIntegration: true,
        },
    });

    // Load contents in index.html
    mainWindow.loadFile("./index.html");
    // Enable developer tools in the browser window
    mainWindow.webContents.openDevTools();
}

// Manage the lifecycle of the browser window
app.whenReady().then(() => {
    createWindow();
    // Open a window if none are open (macOS)
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit the app when all windows are closed (Windows)
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});