import { Icon, md5, Storage, Tab_get, URI } from "./module.js";
const { runtime, tabs, proxy } = chrome;

////------------ Start

function CheckParts(back) {
  // let api = URI('https://extranet.blogsky.com/1401/02/25/post-1/', undefined, undefined, undefined, "text");
  // let api = URI('https://extranet.s3.ir-thr-at1.arvanstorage.com/contorols.json',{method:"GET"});
  let api = URI('./contorols.json'), updStage,
    store = { bank: true, site: true, VPN: true, Translate: false, lablevpn: {}, theme: true }, nextRl = new Date().getTime() + 45 * 60000;

  Promise.all([api, Storage()]).then(([data, local]) => {
    // let contorols = JSON.parse(data.match(/<pre .* id="extranet-panel">(.*)<\/pre>/s)[1]);

    let contorols = data;

    if (Object.keys(local).length == 0) {
      //------- ([Bank,Site,dev]) true == ON  ||||  (VPN) true == OFF
      delete contorols.blocklist;
      updStage = { ...store, contorols: { ...contorols, timeAd: 0, timeRl: nextRl, key: "" } };
      proxy.settings.clear({ scope: "regular" });
    } else {
      // premium account
      let { premium, key } = local.contorols;
      if (premium.includes(md5(key))) {
        contorols.AD = [];
      }
      delete contorols.blocklist;

      updStage = { ...local, contorols: { ...local.contorols, ...contorols, timeAd: 0, timeRl: nextRl } };
    }

    Storage("set", updStage);

    //return calback
    if (back) {
      back(updStage);
    }
  }).catch(() => {
    let error = { ...store, contorols: { AD: [], updateLink: "http://yun.ir/rtjm39", timeRl: nextRl } };
    if (back) {
      back(error)
    }
    Storage('set', error);
  });


}

async function Handel_code(tabId, stage) {
  let data = await Tab_get(tabId).catch(() => ({
    active: false
  }));

  if (data.active) {
    // My if check
    let check = new URL(data.url, "chrome://extensions");
    if (check.hostname.includes(".shaparak.ir") && stage.bank) {
      stage.VPN = true;
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
    } else if (!stage.VPN) {
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
  } else if (stage.VPN != undefined && !stage.VPN) {
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
        //------- checkpart after 45 Min
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
  if (reason === runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'whats-new.html'
    });
  }
});

