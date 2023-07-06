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
        <div className="toggle">
          <input type="checkbox" />
          <label></label>
        </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
