import { render } from "preact";
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
  const [state, setState] = useState<Main>({
    theme: "light",
    language: "en",
    advertising: [
      {
        tpye: "poster",
        image_url: "",
        target_url: "",
        language: "fa",
        showtime: 10000,
        expire: 10000,
        visibility: true,
      },
    ],
    proxylist: {
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
    },
  });

  function handleTheme() {
    setState((latest) => ({
      ...latest,
      theme: latest.theme === "dark" ? "light" : "dark",
    }));
  }

  return (
    <div class={state.theme} dir="ltr">
      <div className="grid w-72 dark:bg-[#0a1722] max-h-[470px] overflow-hidden relative transition-all duration-500">
        <ContextContoroler>
          <header class="flex h-6 px-1 rtl:flex-row-reverse">
            <Theme handleTheme={handleTheme} />
            <Language />
            <Account />
          </header>
          <Switch />
        </ContextContoroler>
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
