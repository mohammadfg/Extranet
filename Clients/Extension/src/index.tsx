import { render } from "preact";
import { useState } from "preact/hooks";
import "./style.css";
import Advertising from "./Components/Advertising";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="w-72 dark:bg-[#0a1722] max-h-[470px]">
        {/* <Advertising link="" title="" counter={0} /> transform: translate(49%,50%);*/}
        <div className="relative w-5 h-5 rounded-[50%] bg-white cursor-pointer m-2 transition-all duration-[0.5s] before:transition-all before:duration-[0.5s] before:content-[''] before:w-[50%] before:rounded-full before:h-[50%] before:bg-[#ff8d00] before:z-[1] before:absolute before:transform before:translate-y-1/2 before:translate-x-1/2 after:content-[''] dark:before:bg-[#3f3f4c] dark:before:w-1/2 dark:before:h-3 dark:before:transform dark:before:translate-x-[4%] dark:before:translate-y-[13%] dark:before:rotate-[134deg] after:z-[2] after:absolute after:w-full after:h-full after:rounded-[50%] after:border-dotted dark:after:border-solid after:border-[4px] after:box-border after:border-amber-500 after:transition-all after:duration-[0.5s]  dark:after:border-[#3f3f4c] dark:after:shadow-[0_0_0_2px_#cdcdcd]"></div>

        <div className="before:content-['خاموش'] after:content-['روشن'] flex items-center gap-2 font-bold before:text-red-700 after:text-green-500">
          {/** add loading class */}
          <input type="checkbox" id="vpn" className="peer hidden" />
          <label
            for="vpn"
            className="peer-checked:bg-green-600 peer-checked:shadow-green-500 peer-checked:before:w-1 relative w-20 h-20 bg-[#fd1015] rounded-full cursor-pointer block shadow-red-600 shadow-[0_9px_15px_0_#ff0008a6] transition-all before:content-[''] before:w-10 before:h-10 before:absolute before:left-5 before:top-5 peer-checked:before:left-8 before:transition-all before:rounded-full  before:border-white before:animate-none before:border-solid before:border-[9px] peer-[.loading]:before:border-dashed peer-[.loading]:before:animate-[spin_8s_linear_infinite]"
          ></label>
        </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
