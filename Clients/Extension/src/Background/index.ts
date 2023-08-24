// //import { Icon, Storage, Tab_get, URI } from "./module";
import sendRequest from './sendRequest'
const { runtime, tabs, proxy, storage } = chrome;
let root = "http://127.0.0.1:5500/Server/", pages = {
  main: root + "main.json",
  status: root + "status.json",
  languages: (path: string) => root + "languages/" + path + ".json",
  install: root + "welcome",
  uninstall: root + "uninstall",
  update: root + "update"
};

async function SyncData() {
  let finalResult = { internal: { theme: "light", language: {}, switchMode: false, account: { premium: "" }, timeAd: 0, reload: 0 }, external: {} },
    serverData = {};
  try { serverData = await sendRequest(pages.main);} 
  catch (error) {
    try {serverData = await sendRequest("status");} 
    catch (error) { serverData = { status: 404 }; }
  }
  storage.local.get((lts) => {
    finalResult = { ...finalResult, ...lts, external: { ...serverData } }
  });
  storage.local.set(finalResult);
}


runtime.onMessage.addListener((Message: { title: string, data: any }, Sender, sendResponse) => {
  if (Message.title === "setLanguage") {
    sendRequest(pages.languages("fa")).then((res) => sendResponse(res)).catch(() => sendResponse({ status: 404 }))
  }
  return true;
});

runtime.onStartup.addListener(() => {
  SyncData();
});
// //-------Oninstall Message to user
runtime.onInstalled.addListener(({ reason }) => {
  //disable all proxy for true and best work
  proxy.settings.clear({ scope: "regular" });
  if (reason === runtime.OnInstalledReason.INSTALL) {
    SyncData();
    tabs.create({ url: pages.install });
    runtime.setUninstallURL(pages.uninstall);
  } else if (reason === runtime.OnInstalledReason.UPDATE) {
    tabs.create({ url: pages.update });
  }
});
