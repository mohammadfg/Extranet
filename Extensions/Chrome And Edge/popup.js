import { Icon, SendMessage, URI } from "./module.js";

function Elem(SelectorId, Htmlproperty) {
    let querySelector = document.querySelectorAll(SelectorId);
    for (let iterator of querySelector) {
        for (let key in Htmlproperty) {
            for (let object in Htmlproperty[key]) {
                iterator[key][object] = Htmlproperty[key][object];
            }
        }
    }
    return querySelector.length != 1 ? querySelector : querySelector[0];
}
/// document.addEventListener('contextmenu', event => event.preventDefault());
let VpnData = [], date = new Date();
//----------- Start --------------
//Check online
if (!navigator.onLine) {
    //----remove next version
    Elem("body").style.height = "420px";

    Elem(".AD img", {
        style: { margin: "50% auto", width: "10%" },
    }).src = "./icon/wait_32.gif";
    Elem("#close , #redirecAD", { style: { visibility: "hidden" } });
    Elem(".AD").style.backgroundColor = "#fff";

} else {
    // Get ip on open app
    async function checkIP() {
        let data = await URI("https://api.linkirani.ir/apiv1/client/current").catch(
            () => ({ ip: "درحال برسی ..." })
        );
        Elem("#ip").innerText = data.ip;
    }
    checkIP();

    // Sync ( True | false ) check box on open extension
    SendMessage({ mesage: "check" }, (data) => {
        for (const key in data) {
            // Use Data from API
            if (key == "contorols") {
                let { alert = [], AD: arrAD = [], bypassing = [], off = [], timeAd, up = { top: 0, height: 0 }, version, updateLink } =
                    data.contorols;

                //set proxy from API
                VpnData = bypassing;

                //-----Force Update
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
                        //----remove next version
                        Elem("body").style.height = "420px";

                        let time = 5;
                        let interval = setInterval(() => {
                            Elem("#close").innerText = time;

                            if (time == 0) {
                                Elem("#close").disabled = false;
                                Elem("#close").innerText = "×";
                                clearInterval(interval);
                                SendMessage({ mesage: 'update', contorols: { timeAd: date.getTime() + 20 * 60 * 1000 } });
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
                if (up.top != 0 && up.height != 0) {
                    Elem(".details", {
                        style: {
                            display: "block",
                            top: p.top + "px",
                            height: up.height + "em",
                            lineHeight: up.height,
                        },
                    }).innerText = up.text;
                }
            } else {
                Elem("#" + key).checked = !data[key];
            }
        }
    });

    // Set Event for All check box and save on database
    let checkbox = Elem(".checkbox");
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].onclick = function () {
            SendMessage({
                mesage: "update",
                state: { [this.getAttribute("id")]: !this.checked },
            });
            if (["bank", "site"].includes(this.getAttribute("id"))) {
                Icon();
            }
        };
    }
    //---------------------------------VPN
    Elem("#VPN").onclick = function () {
        if (this.checked && VpnData.length != 0) {
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
                            scheme: VpnData[0].scheme,
                            host: VpnData[0].host,
                            port: VpnData[0].port,
                        },
                    },
                },
                scope: "regular",
            };
            chrome.proxy.settings.set(config);
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

            Elem("#root").style.display = "block";
            Elem("body").style.height = "auto";
        }
    }
    Elem("#close").onclick = function () {
        AD(undefined, "home");
    };

    //-------List Vpns
    Elem(".listcountry").onclick = function () {
        if (Elem(".listVpn").style.top == "46%") {
            Elem(".listVpn").style.top = "100%";
        } else {
            Elem(".listVpn").style.top = "46%";
        }
    };
    Elem(".listVpn *").onclick = function (e) {
        e.target.parentElement.style.top = "100%";
    };
}
//------- Google Analytics 

ga('create', 'UA-177267045-1', 'auto');

// Modifications: 
ga('set', 'checkProtocolTask', null); // Disables file protocol checking.
ga('send', 'pageview', '/popup'); // Set page, avoiding rejection due to chrome-extension protocol 
