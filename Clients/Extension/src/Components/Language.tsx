// import { useState } from "preact/hooks";
import useDropdown from "../Hooks/useDropdown";
import { CreateLists } from "./Lists";

export default function Language({ list, handleLanguage }: { list: { ext: object, int: any }, handleLanguage: (key: string, callback: any | ((state: object) => string)) => void }) {

  const displayCurrentChecker = Object.keys(list.int).length;

  function callbackEvent([name]: Array<string | object>) {
    // chrome.runtime.sendMessage({ title: "setLanguage", data: name }, (response) => {
    //   handleLanguage("language", response)
    // })
    handleLanguage("language", {
      "advertising": {
        "message": "رفتن به صفحه مورد نظر"
      },
      "header": {
        "account": "مهمان"
      },
      "switch": {
        "ip": "آیپی",
        "type": "نوع"
      },
      "country": {
        "us": "آمریکا"
      },
      "toggles": {
        "toggle1": "نمایش ترافیک مصرفی سایت ها",
        "toggle2": "هشدار سایت های کلاهبرداری"
      },
      "errors": {},
      "name": "فارسی",
      "rtl": true
    })
    handleDropdown(false)
  }
  const { displayComponent, handleDropdown } = useDropdown({
    children: <CreateLists callbackEvent={callbackEvent} inputData={list.ext} />,
    manualVisibility: (Object.keys(list.int).length ? false : true),
    closer: (Object.keys(list.int).length ? true : false)
  });
  return (
    <>
      <button
        onClick={() => { handleDropdown(true) }}
        className="w-14 bg-gray-100 dark:bg-slate-400 rounded-b-md ml-1"
      >
        <span class="text-xs">
          <img src="./assets/icons/earth.svg" class="w-4 inline ltr:mr-1 rtl:ml-1 mb-1" loading="lazy" />
          {displayCurrentChecker && list.int?.name.substring(0, 2)}
        </span>
      </button>
      {displayComponent}
    </>
  );
}
