import { app, BrowserWindow, Menu, shell } from "electron";
import appReady from "./appReady.js";

const isMac = process.platform === "darwin";
const appMenu = Menu.buildFromTemplate([
  // { role: "appMenu" }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" }, // TODO: remove for release?
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  }] : []),

  // { role: "fileMenu" }
  ...(isMac ? [] : [{
    label: "File",
    submenu: [
      { role: "quit" }
    ]
  }]),

  { role: "editMenu" },

  // { role: "windowMenu" }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" }, // TODO: reimplement for release? Board resizing based on CSS transform?
      ...(isMac ? [
        { type: "separator" },
        { role: "front" },
        { type: "separator" },
        { role: "window" }
      ] : [
        { role: "close" }
      ])
    ]
  },

  {
    role: "help",
    submenu: [
      // TODO: obviously add more help than just a link to my own damn website
      {
        label: "Rezmason.net",
        click: async () => await shell.openExternal("http://www.rezmason.net")
      }
    ]
  }
]);

const init = async () => {
  await appReady;
  Menu.setApplicationMenu(appMenu);

  const browserWindow = new BrowserWindow(
    {
      show: true,
      hasShadow: false,
      roundedCorners: false,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        enableRemoteModule: false,
        worldSafeExecuteJavaScript: true
      },
      width: 500,
      height: 500,
      backgroundColor: "#00000000",
      frame: false,
      transparent: true,
      resizable: false
    }
  );

  app.addListener('before-quit', () => app.exit());

  browserWindow.webContents.openDevTools();

  browserWindow.loadFile("html/index.html");
};

init();
