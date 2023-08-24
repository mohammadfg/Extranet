import { useState, useEffect } from "preact/hooks";
import type { Main } from "../Types/Global";
const { storage } = chrome;
export default function useCommonState(): [Main, (key: string, values: any) => void] {
    const [state, setState] = useState<Main>({});
    function syncStateWithStorage(key: string, callback: any | ((state: { [key: string]: any }) => any)) {
        setState((latest) => (
            { ...latest, ...{ internal: { ...latest.internal, [key]: (typeof callback === 'function' ? callback(latest.internal) : callback) } } }
        ));
        // chrome.storage.local.set(state);
    }
    useEffect(() => {
        // storage.local.get((items) => { setState(items) });

        setTimeout(() => {
            setState({
                "external": {
                    "advertising": [
                        {
                            "tpye": "poster|banner",
                            "image_url": "",
                            "target_url": "",
                            "location": "ir|us|global",
                            "showtime": 10000,
                            "expire": ""
                        }
                    ],
                    "proxylist": {
                        "us": [
                            {
                                "scheme": "https",
                                "host": "blade6.frankfurt-rack417.nodes.gen4.ninja",
                                "location": "hesa",
                                "username": "",
                                "password": "",
                                "port": 9002,
                                "type": "free"
                            },
                            {
                                "scheme": "https",
                                "host": "blade6.frankfurt-rack417.nodes.gen4.ninja",
                                "location": "hesa",
                                "username": "",
                                "password": "",
                                "port": 9002,
                                "type": "free"
                            }
                        ],
                        "ir": [
                            {
                                "scheme": "https",
                                "host": "blade6.frankfurt-rack417.nodes.gen4.ninja",
                                "location": "hesa",
                                "username": "",
                                "password": "",
                                "port": 9002,
                                "type": "free"
                            }
                        ]
                    },
                    "languages": {
                        "us": { "displayName": "English - United States", "shorted": "en" },
                        "ir": { "displayName": "فارسی - ایران", "shorted": "fa" }
                    },
                    "premium": [],
                    "donate": "https://zarinp.al/buy",
                    "update": "",
                    "version": "2.0.0"
                },
                internal: { theme: "light", language: {}, switchMode: false, account: { premium: "" }, timeAd: 0, reload: 0 }
            })
        }, 500);
    }, []);
return [state, syncStateWithStorage];
}