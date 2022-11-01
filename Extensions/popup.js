import { Icon, SendMessage, URI, md5 } from "./module.js";

function Elem(SelectorId, Htmlproperty) {
    let querySelector = document.querySelectorAll(SelectorId);
    if (Htmlproperty != undefined) {
        //
        // (( this Code Commented for SpeedUp And Clear Code for App ))
        //
        // this for get one or any element in this function
        for (let iterator of querySelector) {
            // this for get one or any Html property ( in 1 Object ) for example : style , href and ... 
            //   for (let key in Htmlproperty) {
            let key = 'style';
            for (let object in Htmlproperty[key]) {
                iterator[key][object] = Htmlproperty[key][object];
            }
            //  }
        }
    }
    return querySelector.length != 1 ? querySelector : querySelector[0];
}
//== (Feature) ==> document.addEventListener('contextmenu', event => event.preventDefault());

let VpnData = {}, date = new Date(), ctrnimbaha = {};

// Set Proxy System
function SetProxy(vpn) {
    let config = {
        value: {
            mode: "fixed_servers",
            rules: {
                bypassList: [
                    "<local>",
                    "192.168.0.0/16",
                    "172.16.0.0/12",
                    "10.0.0.0/8",
                    "fd00::/8",
                ],
                singleProxy: {
                    scheme: vpn.scheme,
                    host: vpn.host,
                    port: vpn.port,
                }
            },
        },
        scope: "regular",
    };
    chrome.proxy.settings.set(config);
}
// Get ip on open app
async function checkIP() {
    // https://testspeed.ir/backend/getIP.php
    let data = await URI("https://api.linkirani.ir/apiv1/client/current", { method: "GET" })
        .catch((e) => {
            console.log(e);
            return { ip: "درحال برسی ...", error: e }
        });
    Elem("#ip").innerText = data.ip;

    if (data.error) {
        throw (data.error);
    }
}

// Set Theme
function Theme(check) {
    Elem('body').classList.replace(check ? 'dark' : 'night', check ? 'night' : 'dark');
}
//----------- Start --------------
//Check online
function Loading(mesage) {
    /*     Elem(".AD img", {
            style: { margin: "50% auto", width: "10%" },
        }).src = "./icon/wait_32.gif";
        Elem("#close , #redirecAD", { style: { visibility: "hidden" } });
        Elem(".AD", { style: { opacity: "1", visibility: "visible", backgroundColor: "rgb(0 0 0 / 95%)" } }); */
    Elem(".loading", { style: { opacity: "1", visibility: "visible" } });
    Elem("#loading").innerHTML = mesage ?? '';

}
checkIP().catch((e) => {
    Loading(`لطفاً اتصال به شبکه را برسی کنید <br> ${e}`);
})

// Sync ( True | false ) check box on open extension
SendMessage({ mesage: "check" }, (data) => {
    for (const key in data) {
        // Use Data from API
        if (key == "contorols") {
            let chromeVR = chrome.runtime.getManifest().version,
                { alert = [], AD: arrAD = [], proxyList = [], off = [], timeAd, up = { top: null, height: null }, version = chromeVR, updateLink, key = "", premium = [], half, donate = "#" } = data.contorols;

            //-----Force Update
            // Version Undefined === when api error and not get data
            if (version != chromeVR) {
                /*       Elem(".details", {
                          style: {
                              display: "block", top: "0px",
                              lineHeight: 2, height: "100%",
                              padding: "20% 0",
                          },
                      }).innerHTML = `☠️ این ورژن منسخوخ شده است<br>🔗 لطفاً از لینک زیر برای بروزرسانی کنید<br><a href="${updateLink}" target="_blank">${updateLink}</a>`; */
                Loading(`☠️ این ورژن منسخوخ شده است<br>🔗 لطفاً از لینک زیر برای بروزرسانی اقدام کنید<br><a href="${updateLink}" target="_blank">${updateLink}</a>`);
            }

            // Off feture == (feture) ==> On off || save Data Off
            if (off.length != 0) {
                off.forEach((val) => {
                    Elem(`#${val}`).style.display = "none";
                });
            }

            // Show Note And Alert
            if (alert.length != 0) {
                Elem(`.alert p`).style.display = "block";
                let count = alert.length - 1;
                setInterval(() => {
                    Elem(".alert p").innerHTML = alert[count];
                    if (count == 0) {
                        count = alert.length;
                    }
                    count -= 1;
                }, 8000);
            }/*  else {
                Elem(`.alert p`).style.display = "block";
            } */

            // Show AD
            if (arrAD.length != 0 && !premium.includes(md5(key))) {
                let random = (obj) => obj[Math.round(Math.random() * (obj.length - 1))];
                //******       HOME  */
                if (date.getTime() > timeAd) {
                    let home = arrAD.filter(({ status }) => status == "home");

                    // Elem("#close").disabled = true;
                    Elem(".AD img").src = random(home).img;

                    Elem("#redirecAD").onclick = () => {
                        chrome.tabs.create({ url: random(home).src });
                    };

                    Elem(".AD", { style: { opacity: 1, visibility: 'visible' } });

                    //----remove next version
                    Elem("body").style.height = "420px";

                    let time = 5;
                    let interval = setInterval(() => {
                        Elem("#close").innerText = time;

                        if (time == 0) {
                            Elem("#close").disabled = false;
                            Elem("#close").innerText = "×";
                            clearInterval(interval);
                            SendMessage({ mesage: 'update', contorols: { timeAd: date.getTime() + 25 * 60000 } });
                        }

                        time -= 1;
                    }, 1000);
                } else {
                    AD(null, "home");
                }
                let section = arrAD.filter(({ status }) => status == "section");
                //******       Banner  */
                if (section.length != 0) {
                    Elem(".alert img", { style: { display: "block" } }).src = random(section).img;
                    Elem(".alert img").onclick = () => {
                        chrome.tabs.create({ url: random(section).src });
                    };
                }/*  else {
                    AD("banner");
                } */
            }/*  else {
                AD("banner", "home");
            } */
            //Show datails for Off feture
            if (up.top != null && up.height != null) {
                Elem(".details", {
                    style: {
                        display: "block",
                        top: up.top + "px",
                        height: up.height + "em",
                        lineHeight: up.height,
                    },
                }).innerText = up.text;
            }
            //save proxy from API and check Connection
            if (proxyList.length != 0) {
                VpnData = {
                    bypass: proxyList, lablevpn: data.lablevpn,
                    user_premium: premium.includes(md5(key))
                };
                // contorol nimbaha
                ctrnimbaha = half;
            }/*  else { Loading() } */
            // set donate link
            Elem('#donate').setAttribute('href', donate);

        }
        // Add country list ( Select Box)
        else if (key == "lablevpn" && Object.keys(data.lablevpn) != 0) {
            let { name, country } = data.lablevpn;
            Elem('.listcountry').innerHTML = `<img src="./icon/flags/${country}.png" alt="Flag" loading="lazy" />${name}`;
        }
        else if (key == "theme") {
            //set defualt theme
            Theme(data[key]);
            //set event for element
            Elem("#theme").onclick = function () {
                let theme = Elem('body').classList.contains('dark');
                theme ? Theme(true) : Theme(false);
                //save in storage
                SendMessage({ mesage: "update", state: { theme: theme } });
            };
        }
        else if (key != "VPN") {
            // Set Event for All check box and save on database
            Elem("#" + key).onclick = function () {
                SendMessage({
                    mesage: "update",
                    state: { [key]: this.checked },
                });
                //   if (["bank", "site"].includes(key)) {
                Icon();
                //  }
            };

        }

        // Check off or On checkbox
        Elem("#" + key).checked = data[key];
    }
});
//---------------------------------VPN
Elem("#VPN").onclick = function () {
    if (this.checked && VpnData['bypass'].length != 0) {
        //filter list vpn from api
        let filtered = VpnData['bypass'].filter(({ country }) =>
            (VpnData['lablevpn']?.country ?? 'fast') == country
        );
        SetProxy(filtered[0]);

        SendMessage({ mesage: "update", state: { VPN: true } });
        Icon("./icon/130.png");
        checkIP();
    } else {
        if (VpnData.length == 0) {
            this.checked = false;
        }
        SendMessage({ mesage: "update", state: { VPN: false } });
        chrome.proxy.settings.clear({ scope: "regular" });
        Icon();
        checkIP();
    }
};

//------ Advertising
function AD(withbanner, withhome) {
    if (withbanner == "banner") {
        Elem(".alert img", { style: { visibility: "hidden", display: "none" } });
    }
    if (withhome == "home") {
        Elem(".AD", { style: { visibility: "hidden", opacity: 0 } });
        Elem("body").style.height = "auto";
    }
}
Elem("#close").onclick = function () {
    AD(null, "home");
};

//-------List Vpns
Elem(".listcountry").onclick = function () {
    Elem(".listVpn").style.top = "2%";
    /* 
            if (Elem("#VPN").checked) {
                SendMessage({ mesage: "update", state: { VPN: true } });
                chrome.proxy.settings.clear({ scope: "regular" });
                Elem("#VPN").checked = false;
                checkIP();
            } */
    if (Elem('.listVpn').children.length < VpnData['bypass'].length) {
        // Set List Vpn
        VpnData['bypass'].forEach(({ country, name, premium }) => {
            Elem(".listVpn").innerHTML +=
                `<div class="itemflags" id="${country}" data-vip="${!!premium}">
        <img src="./icon/flags/${country}.png" alt="Flag" loading="lazy" />${name}<span class="${(premium ?? 'hidden')}">VIP👑</span></div>`;
        })
    }
};

Elem(".listVpn").onclick = function ({ target }) {
    if (target.getAttribute('data-vip') == 'false' || VpnData.user_premium) {
        let country = target.id, name = target.innerText;
        VpnData['lablevpn'] = { name: name, country: country };
        Elem('.listcountry').innerHTML = `<img src="./icon/flags/${country}.png" alt="Flag" loading="lazy" />${name}`;

        SendMessage({ mesage: 'update', state: { lablevpn: { name: name, country: country } } });

        target.parentElement.style.top = "100%";
    }
};

/// Nimbaha

Elem("#submit_url").onclick = function () {
    let linkdl = Elem('#nimurl').value;

    URI(linkdl, { method: "HEAD" }).then(({ url, headers }) => {

        let fileType = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
        let fileSize = headers.get("content-length") / 1024 / 1024;
        let filename = url.split('/').pop().replace(/(.*)\.[^.]+$/, "$1");
        // let apikey = ctrnimbaha.Apikey;

        if (fileSize <= ctrnimbaha.sizeDownload) {
            Elem('.loading').style.visibility = 'visible';


        }


    });

};

//------- Google Analytics
/* 
ga('create', 'UA-177267045-1', 'auto');

// Modifications: 
ga('set', 'checkProtocolTask', null); // Disables file protocol checking.
ga('send', 'pageview', '/popup'); // Set page, avoiding rejection due to chrome-extension protocol 
 */