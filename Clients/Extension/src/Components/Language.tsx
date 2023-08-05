// import { useContext } from "preact/hooks";
import { useState } from "preact/hooks";
import useDropdown from "../Hooks/useDropdown";

// import { Context } from "../Context/Main";
export default function Language() {
  // const { handleVisiblity = () => null } = useContext(Context);
  // const [SwitchData, setSwitchData] = useState({ visibility: false });
  // function callbackEvent(event: object) {
  //   console.log(event)
  //   setSwitchData((lts) => ({ ...lts, ...event }));
  // }
  // const listlanguage = useDorpdown({ visibility: SwitchData.visibility, children: <h1>salam</h1>, animations: "scale", callbackEvent: callbackEvent })
  const { displayComponent, Contoroler } = useDropdown({
    children: <h1>salam</h1>,
    animations: "scale"
  });
  // () => {
  //   // handleVisiblity({
  //   //   dropdown: {
  //   //     dataSheet: {
  //   //       ir: { displayName: "فارسی - ایران", rtl: true, language: "fa" },
  //   //       us: {
  //   //         displayName: "English - United States",
  //   //         rtl: false,
  //   //         language: "en",
  //   //       },
  //   //     },
  //   //     visibility: true,
  //   //   },
  //   // });
  //   // setSwitchData({ visibility: true }) 
  // }
  return (
    <>
      <button
        onClick={Contoroler}
        className="w-14 bg-gray-100 dark:bg-slate-400 rounded-b-md ml-1"
      >
        <span class="text-xs">
          <img src="./assets/icons/earth.svg" class="w-4 inline mr-1 mb-1" loading="lazy" />
          EN
        </span>
      </button>
      {displayComponent}
    </>
  );
}
