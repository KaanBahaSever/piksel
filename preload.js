const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

contextBridge.exposeInMainWorld('electron', {
  openFile: (callback) => ipcRenderer.on('open-file', (event, filePath) => callback(filePath)),
  path,
  fs
});