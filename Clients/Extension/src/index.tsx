import { render } from "preact";
const { storage } = chrome;
import { useEffect } from "preact/hooks";
import "./style.css";
import Advertising from "./Components/Advertising";
import Toggle from "./Components/Toggle";
import Account from "./Components/Account";
import Language from "./Components/Language";
import Theme from "./Components/Theme";
import Footer from "./Components/Footer";
import Switch from "./Components/Switch";
import { useState } from "preact/hooks";
import { ContextContoroler } from "./Context/Main";
import type { Main } from "./Types/Global";
export function App() {
  const [state, setState] = useState({ theme: "light" });
  useEffect(() => {
    storage.local.get((items) => {
     console.log(items)
    })
  }, [])
  function handleTheme() {
    setState((latest) => ({
      ...latest,
      theme: latest.theme === "dark" ? "light" : "dark",
    }));
  }

  return (
    <div className={state.theme} dir="ltr">
      <div className="grid w-72 dark:bg-[#0a1722] max-h-[470px] overflow-hidden relative transition-all duration-500">
        {/* <ContextContoroler> */}
        <header className="flex h-6 px-1 rtl:flex-row-reverse">
          <Theme handleTheme={handleTheme} />
          <Language />
          <Account displayName="Guste" />
        </header>
        <Switch />
        {/* </ContextContoroler> */}
        {/* <Advertising
          link="ss"
          title="ss"
          counter={0}
          size="poster"
          visibility
        /> */}
        <Toggle Status TextValue="سلام" key="1" />
        <Footer />
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app") as HTMLElement);
