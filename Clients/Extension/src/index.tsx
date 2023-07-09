import { render } from "preact";
import { useState } from "preact/hooks";
import "./style.css";
import Advertising from "./Components/Advertising";
import { user, earth, Donate, Telegram, version } from "./Components/Svg";
import Toggle from "./Components/Toggle";
import Dropdown from "./Components/Dropdown";
import Account from "./Components/Account";
import Language from "./Components/Language";
import Theme from "./Components/Theme";
import Footer from "./Components/Footer";
import Switch from "./Components/Switch";
import { theme } from "../tailwind.config";
interface Main {
  theme: "dark" | "light";
}
export function App() {
  const [state, setState] = useState<Main>({
    theme: "light",
  });
  function handleTheme(){ setState((latest)=>({...latest,theme:latest.theme==="dark"?"light":"dark"})) }
  return (
    <div class={state.theme}>
      <div className="w-72 dark:bg-[#0a1722] max-h-[470px] relative transition-all duration-500">
        <header class="flex h-6 px-1">
          <Theme handleTheme={handleTheme} />
          <Language />
          <Account />
        </header>
        {/**before:content-['خاموش'] after:content-['روشن'] items-center gap-2 font-bold before:text-red-700 after:text-green-500*/}
        <Switch />
        <button className="bg-gray-100 rounded-md px-2 pt-1 w-24">
          <img src="/icons/flags/fast.png" className="w-4 inline" />
          IRAN
        </button>
        <Advertising link="" title="" counter={0} size="poster" visibility />
        <Toggle Status TextValue="سلام" directions="rtl" />
        <Footer />
        <Dropdown />
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
