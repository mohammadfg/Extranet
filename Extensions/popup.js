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
    if (check) {
        Elem('body').classList.replace('night', 'dark');
    } else {
        Elem('body').classList.replace('dark', 'night');

    }
}
//----------- Start --------------
//Check online
checkIP().catch(() => {
    Elem(".AD img", {
        style: { margin: "50% auto", width: "10%" },
    }).src = "./icon/wait_32.gif";
    Elem("#close , #redirecAD", { style: { visibility: "hidden" } });
    Elem(".AD", { style: { opacity: "1", visibility: "visible", backgroundColor: "#fff" } });
})

// Sync ( True | false ) check box on open extension
SendMessage({ mesage: "check" }, (data) => {
    for (const key in data) {
        // Use Data from API
        if (key == "contorols") {
            let { alert = [], AD: arrAD = [], bypass = [], off = [], timeAd, up = { top: null, height: null }, version, updateLink, key = "", premium = [], half, donate = "#" } = data.contorols;

            //set proxy from API
            VpnData = {
                bypass: bypass, lablevpn: data.lablevpn,
                user_premium: premium.includes(md5(key))
            };
            // contorol nimbaha
            ctrnimbaha = half;

            //-----Force Update
            // Version Undefined === when api error and not get data
            if (version != chrome.runtime.getManifest().version || version == undefined) {
                Elem(".details", {
                    style: {
                        display: "block",
                        top: "0px",
                        lineHeight: 2,
                        height: "100%",
                        padding: "50% 0",
                    },
                }).innerHTML = `این نسخه از دسترس خارج شده است<br>لطفاً آن را از لینک زیر بروزرسانی کنید<br><a href="${updateLink}" target="_blank">${updateLink}</a>`;
            }

            // Off feture
            if (off.length != 0) {
                off.forEach((val) => {
                    Elem(`#${val}`).style.display = "none";
                });
            }

            // Show Note And Alert
            if (alert.length != 0) {
                let count = alert.length - 1;
                setInterval(() => {
                    Elem(".alert p").innerHTML = alert[count];
                    if (count == 0) {
                        count = alert.length;
                    }
                    count -= 1;
                }, 8000);
            } else {
                Elem(`.alert`).style.display = "none";
            }

            // Show AD
            if (arrAD.length != 0) {
                let random = (obj) => obj[Math.round(Math.random() * (obj.length - 1))];
                //******       HOME  */
                if (date.getTime() > timeAd) {
                    let home = arrAD.filter(({ status }) => status == "home");

                    Elem("#close").disabled = true;
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
                    AD(undefined, "home");
                }
                let section = arrAD.filter(({ status }) => status == "section");
                //******       Banner  */
                if (section.length != 0) {
                    Elem(".alert img").src = random(section).img;
                    Elem(".alert img").onclick = () => {
                        chrome.tabs.create({ url: random(section).src });
                    };
                } else {
                    AD("banner");
                }
            } else {
                AD("banner", "home");
            }
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
            // set donate link
            Elem('#donate').setAttribute('href', donate);

        }
        // Add country list ( Select Box)
        else if (key == "lablevpn") {
            let { name, country } = data.lablevpn;
            Elem('.listcountry').innerHTML = `<img src="./icon/flags/${country}.png" alt="Flag" loading="lazy" />${name}`;
        }
        else if (key == "theme") {
            //set defualt theme
            Theme(data[key]);
            //set event for element
            Elem("#theme").onclick = function () {
                let theme = Elem('body').classList.contains('dark');
                theme ? Theme(false) : Theme(true);
                //save in storage
                SendMessage({ mesage: "update", state: { theme: !theme } });
            };
        }
        else if (!(["VPN", "lablevpn"].includes(key))) {
            // Set Event for All check box and save on database
            Elem("#" + key).onclick = function () {
                SendMessage({
                    mesage: "update",
                    state: { [key]: !data[key] },
                });
                if (["bank", "site"].includes(key)) {
                    Icon();
                }
            };

        }
        // Check off or On checkbox
        Elem("#" + key).checked = !data[key];
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

        SendMessage({ mesage: "update", state: { VPN: false } });
        Icon("./icon/130.png");
        checkIP();
    } else {
        if (VpnData.length == 0) {
            this.checked = false;
        }
        SendMessage({ mesage: "update", state: { VPN: true } });
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
    AD(undefined, "home");
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

    fetch(linkdl, { method: "HEAD" }).then(({ url, headers }) => {

        let fileType = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
        let fileSize = headers.get("content-length") / 1024 / 1024;
        let filename = url.split('/').pop().replace(/(.*)\.[^.]+$/, "$1");
        let apikey = ctrnimbaha.Apikey;

        if (fileSize <= ctrnimbaha.sizeDownload) {
            Elem('.loading').style.visibility = 'visible';


            URI(`https://panel.arvanstorage.com/panel/upload/from_url/bucket/extranet/object/${filename}.${fileType}?is_public=false`, {
                body: JSON.stringify({ url: url }),
                authorization: "Apikey " + apikey
            }).then(({ code }) => {
                if (code == 200) {
                    setTimeout(() => {
                        URI(`https://panel.arvanstorage.com/panel/url/bucket/extranet/object/${filename}.${fileType}?expiry=${ctrnimbaha.expireFile}`, {
                            authorization: "Apikey " + apikey, method: "GET"
                        }).then(value => {
                            console.log(value)
                            Elem('.loading').style.visibility = 'hidden';

                        });
                    }, 10000);
                }
            });
        }

        /*             if (validURL(response.url) && ['mkv', 'mp4', 'mp3', 'rar', 'zip'].includes(filetype)) {
        
                        fetch(`https://linknim.ir/api.php?url=${response.url}&step=download`).then(({ url }) => {
                            let params = (new URL(url)).searchParams;
                            let link = params.get("link");
                            fetch(link).then(data => data.blob()).then((download) => {
                                var a = document.createElement("a");
                                a.href = URL.createObjectURL(download);
                                a.setAttribute("download", '[extranet]-' + filename);
                                a.click();
                                a.remove();
        
                            })
                        });
                    } */
    });

};

//------- Google Analytics
/* 
ga('create', 'UA-177267045-1', 'auto');

// Modifications: 
ga('set', 'checkProtocolTask', null); // Disables file protocol checking.
ga('send', 'pageview', '/popup'); // Set page, avoiding rejection due to chrome-extension protocol 
 */