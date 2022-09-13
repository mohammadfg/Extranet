import { Icon, SendMessage, Storage, URI } from "./module.js";

function Elem(id) {
    return document.querySelector(id);
}
let VpnData = [], date = new Date();
//----------- Start --------------

//Check online
if (!navigator.onLine) {
    Elem(".AD img").src = "./icon/wait_32.gif";
    Elem(".AD img").style.margin = "50% auto";
    Elem(".AD img").style.width = "10%";

    Elem("#close").style.visibility = 'hidden';
    Elem("#redirecAD").style.visibility = 'hidden';

    Elem(".AD").style.backgroundColor = '#fff';
}

// Get ip on open app
async function checkIP() {
    let data = await URI("https://api.linkirani.ir/apiv1/client/current")
        .catch(() => ({ ip: "درحال برسی ..." }));
    Elem("#ip").innerText = data.ip;
}
checkIP();

// Sync ( True | false ) check box on open extension
SendMessage({ mesage: "check" }, (data) => {
    for (const key in data) {
        // Use Data from API
        if (key == "contorols") {

            let { alert, AD: arrAD, bypassing, off, timeAd, up, version } = data.contorols;

            //set proxy from API
            VpnData = bypassing;

            //-----Force Update
            if (version != chrome.runtime.getManifest().version) {
                Elem(".details").style.display = "block";

                Elem(".details").style.top = "0px";

                Elem(".details").style.lineHeight = 2;

                Elem(".details").style.height = "100%";
                Elem(".details").style.padding = "50% 0";

                Elem(".details").innerHTML = 'این نسخه از دسترس خارج شده است<br>لطفاً آن را از لینک زیر بروزرسانی کنید<br><a href="#" target="_blank">OK</a>';
            }

            // Off feture
            if (off.length != 0) { off.forEach(val => { Elem(`#${val}`).style.display = 'none'; }) }

            // Show Note And Alert
            if (alert.length != 0) {

                let count = alert.length - 1;
                setInterval(() => {
                    Elem('.alert p').innerHTML = alert[count];
                    if (count == 0) { count = alert.length; }
                    count -= 1;
                }, 8000);

            }

            // Show AD
            if (arrAD.length != 0) {
                let section = arrAD.filter(({ status }) => status == 'section');
                let random = (obj) => obj[Math.round(Math.random() * (obj.length - 1))];
                //******       HOME  */
                if (date.getTime() > timeAd) {
                    let home = arrAD.filter(({ status }) => status == 'home');

                    Elem("#close").disabled = true;

                    Elem(".AD img").src = random(home).img;
                    Elem('#redirecAD').onclick = () => {
                        chrome.tabs.create({ url: random(home).src });
                    };

                    Elem('body').style.height = "420px";

                    let time = 5;
                    let interval = setInterval(() => {
                        Elem("#close").innerText = time;

                        if (time == 0) {
                            Elem("#close").innerText = "×";
                            Elem("#close").disabled = false;
                            clearInterval(interval);

                            (async () => {
                                let gtdata = await Storage();
                                gtdata.contorols.timeAd = date.getTime() + (20 * 60 * 1000);
                                Storage('set', gtdata);
                            })();
                        }

                        time -= 1;

                    }, 1000);

                } else { AD(undefined, "home"); }

                //******       Banner  */
                if (section.length != 0) {
                    Elem(".alert img").src = random(section).img;
                    Elem('.alert img').onclick = () => {
                        chrome.tabs.create({ url: random(section).src });
                    };
                } else { AD("banner") }

            } else { 
                 Elem('body').style.height = "420px";
                 //------------
                if(navigator.onLine){AD("banner", "home")} }

            //Show update
            if (up.top != 0 && up.height != 0) {
                Elem(".details").style.display = "block";

                Elem(".details").style.top = up.top + "px";
                Elem(".details").style.height = up.height + "em";
                Elem(".details").style.lineHeight = up.height;

                Elem(".details").innerText = up.text;

            }
        } else {
            Elem("#" + key).checked = !data[key];
        }
    }
});

// Set Event for All check box and save on database
let checkbox = document.getElementsByClassName("checkbox");
for (let i = 0; i < checkbox.length; i++) {

    checkbox[i].onclick = function () {
        SendMessage({ mesage: "update", state: { [this.getAttribute("id")]: !this.checked } })
        if (['bank', 'site'].includes(this.getAttribute("id"))) {
            Icon();
        }
    };
}
//---------------------------------VPN
Elem("#VPN").onclick = function () {
    if (this.checked && VpnData[0].hasOwnProperty('host')) {
        let config = {
            value: {
                mode: "fixed_servers",
                rules: {
                    bypassList: ["<local>", "192.168.0.0/16", "172.16.0.0/12", "10.0.0.0/8", "fd00::/8"],
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
        SendMessage({ mesage: "update", state: { VPN: true } });
        chrome.proxy.settings.clear({ scope: "regular" });
        Icon();
        checkIP();
    }
};

//------ Advertising
function AD(withbanner, withhome) {
    if (withbanner == "banner") {
        Elem(".alert img").style.visibility = 'hidden';
        Elem(".alert img").style.display = 'none';
    }
    if (withhome == "home") {
        let Ad = document.getElementsByClassName("AD")[0];
        Ad.style.visibility = "hidden"; Ad.style.opacity = "0";
        let App = Elem("#root");
        App.style.display = "block";
        Elem('body').style.height = "auto";
    }
}
Elem("#close").onclick = function () {
    AD(undefined, "home");
};

//-------List Vpns
Elem(".listcountry").onclick = function () {
    // Elem(".listVpn").style.display = "block";
    if (Elem(".listVpn").style.top == "46%") {
        Elem(".listVpn").style.top = "100%";
        //    Elem(".listVpn").style.display = "none";
    } else {
        Elem(".listVpn").style.top = "46%";
    }
}
Elem(".listVpn *").onclick = function (e) {
    e.target.parentElement.style.top = "100%";

}


