import { Icon, md5, Storage, Tab_get, URI } from "./module.js";
const { runtime, tabs, proxy } = chrome;

////------------ Start

function CheckParts(back) {
  try {
    // let api = URI('https://extranet.blogsky.com/1401/02/25/post-1/', undefined, undefined, undefined, "text");
    let api = URI('./controls.json', undefined, undefined, undefined, "text");

    Promise.all([api, Storage()]).then(([data, local]) => {

      //    let contorols = JSON.parse(data.match(/<pre .* id="extranet-panel">(.*)<\/pre>/s)[1]);
      let contorols = JSON.parse(data);

      // set Data in local for once
      let updStage;
      let nextRl = new Date().getTime() + (45 * 60 * 1000);

      if (Object.keys(local).length == 0) {
        //------- ([Bank,Site,dev]) true == ON  ||||  (VPN) true == OFF
        let store = { bank: true, site: true, VPN: true };
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

      Storage('set', updStage);

      //check Vpn on Startup
      if (!updStage.VPN) { Icon("./icon/130.png"); } else { Icon() }
      //return calback
      if (back) { back(updStage) }
    });
  } catch (e) { }
}

runtime.onStartup.addListener(() => {
  CheckParts();
})



async function Handel_code(tabId, stage) {
  let data = await Tab_get(tabId).catch(() => { active: false });;


  if (data.active) {
    // My if check
    let check = new URL(data.url, "chrome://extensions");
    if (check.hostname.includes(".shaparak.ir") && stage.bank) {

      stage.VPN = true;
      proxy.settings.clear({ scope: "regular" });
      Storage('set', stage);

      Icon("./icon/shaparak.png", "Safe");

    }
    else if ((check.protocol == "https:" || check.protocol == "http:") && stage.site
      && !check.hostname.match(/localhost|192.168.*|172.31.*|10.*|127.0.*/)) {

      try {
        let value = await URI("https://api.linkirani.ir/apiv1/shortlink",
          { "content-type": "application/json;charset=UTF-8" },
          JSON.stringify({ url: check.hostname }), "POST");

        let flags = value.link.netloc.ipCountryCode;

        if (value.isRegistered) {
          Icon(`./icon/flags/${flags}.png`, "0.5");
        } else if (value.isInIran) {
          Icon(`./icon/flags/${flags}.png`, "X1");
        } else {
          Icon(`./icon/flags/${flags}.png`, "X2");
        }

      }
      catch (error) {
        Icon(undefined, "Wait", "black");
        setTimeout(() => {
          Icon();
        }, 5000)
      }

    }
    else if (!stage.VPN) {
      Icon("./icon/130.png");
    } else { Icon(); }
  }

}




async function Checkup({ tabId }) {

  let stage = await Storage();
  if (stage.site || stage.bank) {
    Handel_code(tabId, stage);
  }
  else if (stage.VPN != undefined && !stage.VPN) {
    Icon("./icon/130.png");
  } else { Icon(); }



}

tabs.onActivated.addListener(function (result) {
  Checkup(result);
});
tabs.onUpdated.addListener(function (tabId) {
  Checkup({ tabId: tabId })
});


runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // sender.id == chrome.runtime.id &&

  Storage().then((stage) => {

    if (Object.keys(stage).length == 0) {

      CheckParts(backdata => {
        sendResponse(backdata);
      });

    } else if (msg.mesage == "check") {
      sendResponse(stage);
      //----------------------------------------------
      //------- checkpart after 45 Min
      let time = new Date().getTime();
      if (time > stage.contorols.timeRl) {
        CheckParts()
      }
    }
    else if (msg.mesage == "update") {
      if (msg.hasOwnProperty('state')) {

        // Get name elements
        let keys = Object.keys(msg.state)[0];
        stage[keys] = msg.state[keys];

      }
      Storage('set', stage);
    }
  });

  return true;
});

//var manifestData = runtime.getManifest();
//console.log(manifestData.version);

// chrome.scripting.executeScript({ target: 0, files: "./components/injection.js" })

/*
chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'onboarding.html'
    });
  }

  chrome.runtime.onSuspend.addListener(() => {
  console.log("Unloading.");
  chrome.browserAction.setBadgeText({text: ""});
});

});
*/

