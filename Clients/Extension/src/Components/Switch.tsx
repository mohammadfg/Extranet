// import { useContext } from "preact/hooks";
import { useState } from "preact/hooks";
// import { Context } from "../Context/Main";
import useDropdown from "../Hooks/useDropdown";
import { CreateLists } from "./Lists";
export default function Switch() {
  // const { handleVisiblity = () => null } = useContext(Context);
  const [SwitchData, setSwitchData] = useState({ visibility: false });
  function callbackEvent(event: object) {
    console.log(event)
    setSwitchData((lts) => ({ ...lts, ...event }));
  }
  const dropdownHook = useDropdown({
    children: <CreateLists callbackEvent={callbackEvent} />,
    animations: "slide",
    visibility: SwitchData.visibility,
    callbackEvent: callbackEvent,
  });
  return (
    <>
      <div className="flex after:last:gap-2 justify-center mt-5">
        {/** add loading class */}
        <input type="checkbox" id="vpn" className="peer hidden" />
        <label
          for="vpn"
          className="peer-checked:bg-green-600 peer-checked:shadow-green-500 peer-checked:before:w-1 relative w-20 h-20 bg-[#fd1015] rounded-full cursor-pointer block shadow-red-600 shadow-[0_9px_15px_0_#ff0008a6] transition-all before:content-[''] before:w-10 before:h-10 before:absolute before:left-5 before:top-5 peer-checked:before:left-8 before:transition-all before:rounded-full  before:border-white before:animate-none before:border-solid before:border-[9px] peer-[.loading]:before:border-dashed peer-[.loading]:before:animate-[spin_8s_linear_infinite]"
        ></label>
        <div className=" before:content-['/'] before:text-gray-400 before:absolute before:text-8xl before:top-10 before:left-[7.5rem] ltr:ml-9 before:font-mono">
          <div class="ltr:ml-6 rtl:mr-10 mt-4 dark:text-white">
            <p>IP : 1.1.1.1</p>
            <p className="-ml-4">Type: free</p>
            <p className="-ml-7">Country: IRAN</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => { setSwitchData({ visibility: true }) }}
        className="bg-gray-100 rounded-md px-2 pt-1 w-24 justify-self-center mt-1"
      >
        <img
          src="./assets/icons/flags/fast.png"
          loading="lazy"
          alt="Flag"
          className="w-4 inline rtl:float-right"
        />
        IRAN
      </button>
      {dropdownHook}
    </>
  );
}
