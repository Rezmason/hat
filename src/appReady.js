import { app } from "electron";

export default new Promise(resolve => {
  if (app.isReady()) {
    resolve();
  } else {
    const onReady = () => {
      app.removeListener("ready", onReady);
      resolve();
    };
    app.addListener("ready", onReady);
  }
});
