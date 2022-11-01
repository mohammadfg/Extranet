import { Icon, Storage, Tab_get, URI } from "./module.js";
const { runtime, tabs, proxy } = chrome;

////------------ Start

async function CheckParts(back) {
  // let api = URI('https://extranet.blogsky.com/1401/02/25/post-1/', undefined, undefined, undefined, "text");
  // let api = URI('https://extranet.s3.ir-thr-at1.arvanstorage.com/contorols.json',{method:"GET"});
  let api = URI('./contorols-v2.json'), updStage,
    store = { bank: true, site: true, VPN: false, Translate: false, lablevpn: {}, theme: true }, nextRl = new Date().getTime() + 45 * 60000, storage = await Storage();

  // Promise.all([api, Storage()]).then(([contorols, local]) => {
  api.then(contorols => {


    // let contorols = JSON.parse(data.match(/<pre .* id="extranet-panel">(.*)<\/pre>/s)[1]);
    // let contorols = data;

    //  if (Object.keys(local).length == 0) {
    //------- ([Bank,Site,dev]) true == ON  ||||  (VPN) true == OFF
    //  updStage = { ...store, contorols: { ...contorols, timeAd: 0, timeRl: nextRl, key: "" } };
    updStage = { ...store, ...storage, contorols: { ...storage?.contorols, ...contorols, timeAd: 0, timeRl: nextRl, key: "" } };
    //  } else {
    //    updStage = { ...local, contorols: { ...local.contorols, ...contorols, timeAd: 0, timeRl: nextRl } };
    //   }

    Storage("set", updStage);

    //return calback
    // if (back) {
    //   back(updStage);
    //  }
    // })

  }).catch(() => {
    updStage =
      { ...store, ...storage, contorols: { ...storage?.contorols, AD: [], timeRl: 0, timeAd: 0 } };
    Storage('set', updStage);
  });

  if (back) {
    back(updStage)
  }
}

async function Handel_code(tabId, stage) {
  let data = await Tab_get(tabId).catch(() => ({ active: false }));

  if (data.active) {
    // My if check
    let check = new URL(data.url, "chrome://extensions");
    if (check.hostname.includes(".shaparak.ir") && stage.bank) {
      stage.VPN = false;
      proxy.settings.clear({ scope: "regular" });
      Storage("set", stage);

      Icon("./icon/shaparak.png", "Safe");
    }
    else if ((check.protocol == "https:" || check.protocol == "http:") && stage.site &&
      !check.hostname.match(/localhost|192.168.*|172.31.*|10.*|127.0.*/)) {
      try {
        let value = await URI("https://api.linkirani.ir/apiv1/shortlink",
          { body: JSON.stringify({ url: check.hostname }) });

        let flags = value.link.netloc.ipCountryCode;

        if (value.isRegistered) {
          Icon(`./icon/flags/${flags}.png`, "0.5", "green");
        } else if (value.isInIran) {
          Icon(`./icon/flags/${flags}.png`, "X1");
        } else {
          Icon(`./icon/flags/${flags}.png`, "X2");
        }
      } catch (error) {
        Icon(undefined, "Wait", "black");
        setTimeout(() => {
          Icon();
        }, 5000);
      }
    } else if (stage.VPN) {
      Icon("./icon/130.png");
    } else {
      Icon();
    }
  }
}

async function Checkup({ tabId }) {
  let stage = await Storage();
  if (stage.site || stage.bank) {
    Handel_code(tabId, stage);
  } else if (stage.VPN != undefined && stage.VPN) {
    Icon("./icon/130.png");
  } else {
    Icon();
  }
}

runtime.onStartup.addListener(() => {
  CheckParts();
});
tabs.onActivated.addListener(function (result) {
  Checkup(result);
});

let contorolUpdate;
tabs.onUpdated.addListener(function (tabId, { status }) {
  if (status == "complete" && contorolUpdate != tabId) {
    Checkup({ tabId: tabId }); contorolUpdate = tabId;
  }
});

runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // sender.id == chrome.runtime.id &&
  console.log(msg)
  Storage().then((stage) => {

    if (msg.mesage == "check") {

      if (Object.keys(stage).length == 0) {
        CheckParts((backdata) => {
          sendResponse(backdata);
        });
      } else {
        sendResponse(stage);
        //------- update data Contorols after 45 Min
        let time = new Date().getTime();
        if (time > stage.contorols.timeRl) {
          CheckParts();
        }
      }
    }
    else if (msg.mesage == "update") {
      //--------Set state from Page
      if (Object.hasOwn(msg, "contorols") || Object.hasOwn(msg, "state")) {
        // Get name elements
        stage = { ...stage, ...msg.state, contorols: { ...stage.contorols, ...msg.contorols } }
      }

      Storage("set", stage);
    }
  });

  return true;
});
//-------Oninstall Message to user
runtime.onInstalled.addListener(({ reason }) => {
  //Off All proxy for true Work
  proxy.settings.clear({ scope: "regular" });
  if (reason === runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'whats-new.html'
    });
  }
});

