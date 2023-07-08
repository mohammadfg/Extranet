import { render } from "preact";
import { useState } from "preact/hooks";
import "./style.css";
import Advertising from "./Components/Advertising";
import user from "./assets/icons/user.svg";
import earth from "./assets/icons/earth.svg";
import Toggle from "./Components/Toggle";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="w-72 dark:bg-[#0a1722] max-h-[470px]">
        <header class="flex h-6 mt-1">
          <div className=" relative w-5 h-5 rounded-[50%] bg-white cursor-pointer m-1 transition-all duration-[0.5s] before:transition-all before:duration-[0.5s] before:content-[''] before:w-[50%] before:rounded-full before:h-[50%] before:bg-[#ff8d00] before:z-[1] before:absolute before:transform before:translate-y-1/2 before:translate-x-1/2 after:content-[''] dark:before:bg-[#3f3f4c] dark:before:w-1/2 dark:before:h-3 dark:before:transform dark:before:translate-x-[4%] dark:before:translate-y-[13%] dark:before:rotate-[134deg] after:z-[2] after:absolute after:w-full after:h-full after:rounded-[50%] after:border-dotted dark:after:border-solid after:border-[4px] after:box-border after:border-amber-500 after:transition-all after:duration-[0.5s]  dark:after:border-[#3f3f4c] dark:after:shadow-[0_0_0_2px_#cdcdcd]"></div>
          <div className="w-14 bg-gray-100 rounded-full mr-auto">
            <span class="text-xs ml-2">
              <img src={earth} class="w-4 inline mr-1 mb-1" />
              EN
            </span>
          </div>
          <div className="w-20 bg-gray-100 rounded-full ml-auto">
            <span class="text-xs ml-2">
              <img src={user} class="w-5 inline mb-1" />
              Guest
            </span>
          </div>
        </header>
        {/**before:content-['خاموش'] after:content-['روشن'] items-center gap-2 font-bold before:text-red-700 after:text-green-500*/}
        <div className="flex after:last:gap-2 justify-center mt-5">
          {/** add loading class */}
          <input type="checkbox" id="vpn" className="peer hidden" />
          <label
            for="vpn"
            className="peer-checked:bg-green-600 peer-checked:shadow-green-500 peer-checked:before:w-1 relative w-20 h-20 bg-[#fd1015] rounded-full cursor-pointer block shadow-red-600 shadow-[0_9px_15px_0_#ff0008a6] transition-all before:content-[''] before:w-10 before:h-10 before:absolute before:left-5 before:top-5 peer-checked:before:left-8 before:transition-all before:rounded-full  before:border-white before:animate-none before:border-solid before:border-[9px] peer-[.loading]:before:border-dashed peer-[.loading]:before:animate-[spin_8s_linear_infinite]"
          ></label>
          <div className="group-checked:bg-red-700 before:content-['/'] before:text-gray-400 before:absolute before:text-8xl before:top-8 before:left-32 ml-9">
            <div class="ml-4 mt-2">
              <p>ip : 1.1.1.1</p>
              <p className="-ml-4">type: free</p>
              <p className="-ml-7">country: IRAN</p>
            </div>
          </div>
        </div>
        {/* <Advertising link="" title="" counter={0} size="poster" visibility/> */}
        <Toggle Status TextValue="سلام" />
        <Toggle Status TextValue="Show Flag server Sites" />
        <Toggle Status TextValue="" />
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
