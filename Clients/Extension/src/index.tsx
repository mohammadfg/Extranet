import { render } from "preact";
import { useState } from "preact/hooks";
import "./style.css";
import Advertising from "./Components/Advertising";
import Toggle from "./Components/Toggle";
import Dropdown from "./Components/Dropdown";
import Account from "./Components/Account";
import Language from "./Components/Language";
import Theme from "./Components/Theme";
import Footer from "./Components/Footer";
import Switch from "./Components/Switch";

interface Main {
  theme: "dark" | "light";
  languages: "fa"|"en";
}
export function App() {
  const [state, setState] = useState<Main>({
    theme: "light",
    languages:"en"
  });
  function handleTheme(){ setState((latest)=>({...latest,theme:latest.theme==="dark"?"light":"dark"})) }
  function handleLanguage() {
  
  }
  return (
    <div class={state.theme}>
      <div className="grid w-72 dark:bg-[#0a1722] max-h-[470px] relative transition-all duration-500">
        <header class="flex h-6 px-1">
          <Theme handleTheme={handleTheme} />
          <Language handleLanguage={handleLanguage} />
          <Account />
        </header>
        {/**before:content-['خاموش'] after:content-['روشن'] items-center gap-2 font-bold before:text-red-700 after:text-green-500*/}
        <Switch />
        <button className="bg-gray-100 rounded-md px-2 pt-1 w-24 justify-self-center mt-1">
          <img src="./assets/icons/flags/fast.png" className="w-4 inline" />
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
