import { render, createContext } from "preact";
import { useContext } from "preact/hooks";
import "./style.css";
import Advertising from "./Components/Advertising";
import Toggle from "./Components/Toggle";
import Dropdown, {DropdownContoroler} from "./Components/Dropdown";
import Account from "./Components/Account";
import Language from "./Components/Language";
import Theme from "./Components/Theme";
import Footer from "./Components/Footer";
import Switch from "./Components/Switch";
import { useState } from "preact/hooks";

interface Main {
  theme: "dark" | "light";
  language: "fa" | "en";
}

const country = [
  { displayName: "فارسی - ایران", CountryFlag: "ir", language: "fa" },
  { displayName: "English - United States", CountryFlag: "us", language: "en" },
];
const proxylust = {
  us: [
    {
      scheme: "https",
      host: "blade6.frankfurt-rack417.nodes.gen4.ninja",
      username: "",
      password: "",
      port: 9002,
      type: "free",
    },
  ],
};

export function App() {
  // const Context = createContext({language: "en" });
  const [state, setState] = useState<Main>({ theme: "light", language: "en" });

  function handleTheme() {
    setState((latest) => ({
      ...latest,
      theme: latest.theme === "dark" ? "light" : "dark",
    }));
  }

  return (
    <div class={state.theme}>
      <div className="grid w-72 dark:bg-[#0a1722] max-h-[470px] relative transition-all duration-500">
        <DropdownContoroler>
          <header class="flex h-6 px-1">
            <Theme handleTheme={handleTheme} />
            <Language />
            <Account />
          </header>
          {/**before:content-['خاموش'] after:content-['روشن'] items-center gap-2 font-bold before:text-red-700 after:text-green-500*/}
          <Switch />
          <Dropdown />
        </DropdownContoroler>
        <Advertising link="" title="" counter={0} size="poster" visibility />
        <Toggle Status TextValue="سلام" directions="rtl" />
        <Footer />
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
