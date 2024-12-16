const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // تحميل ملف Preload
            contextIsolation: true, // لتأمين الاتصالات بين العمليات
            enableRemoteModule: false, // تعطيل Remote
            nodeIntegration: false // تعطيل التكامل مع Node.js
        }
    });

    mainWindow.loadFile('index.html'); // تحميل واجهة HTML
});

// استماع للأحداث من Renderer Process
ipcMain.on('minimize-window', () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on('close-window', () => {
    if (mainWindow) mainWindow.close();
});
