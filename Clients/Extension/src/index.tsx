import { render } from "preact";
import "./style.css";
import Advertising, {
  type Advertising as AdvertisingInterface,
} from "./Components/Advertising";
import Toggle from "./Components/Toggle";
import Dropdown from "./Components/Dropdown";
import Account from "./Components/Account";
import Language from "./Components/Language";
import Theme from "./Components/Theme";
import Footer from "./Components/Footer";
import Switch from "./Components/Switch";
import { useState } from "preact/hooks";
import {
  ContextContoroler,
  type Server,
  type ServerConfig,
} from "./Context/Main";
interface Main {
  theme: "dark" | "light";
  language: "fa" | "en";
  advertising: Array<AdvertisingInterface>;
  proxylist: Server<Array<ServerConfig>>;
}

const country = {
  ir: { displayName: "فارسی - ایران", rtl: true, language: "fa" },
  us: { displayName: "English - United States", rtl: false, language: "en" },
};
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
    <div class={state.theme}>
      <div className="grid w-72 dark:bg-[#0a1722] max-h-[470px] relative transition-all duration-500">
        <ContextContoroler>
          <header class="flex h-6 px-1">
            <Theme handleTheme={handleTheme} />
            <Language />
            <Account />
          </header>
          {/**before:content-['خاموش'] after:content-['روشن'] items-center gap-2 font-bold before:text-red-700 after:text-green-500*/}
          <Switch />
          <Dropdown />
        </ContextContoroler>
        {/* <Advertising
          link="ss"
          title="ss"
          counter={0}
          size="poster"
          visibility
        /> */}
        <Toggle Status TextValue="سلام" directions="rtl" />
        <Footer />
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app") as HTMLElement);
