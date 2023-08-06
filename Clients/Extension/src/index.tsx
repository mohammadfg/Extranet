import { render } from "preact";
import Advertising from "./Components/Advertising";
import Toggle from "./Components/Toggle";
import Account from "./Components/Account";
import Language from "./Components/Language";
import Theme from "./Components/Theme";
import Footer from "./Components/Footer";
import Switch from "./Components/Switch";
// import { ContextContoroler } from "./Context/Main";
// import type { Main } from "./Types/Global";
import "./style.css";
import Loading from "./Components/Loading";
import useCommonState from "./Hooks/useCommonState";
const { storage } = chrome;
export function App() {
  //  const [state, setState] = useState({});
  // function syncStateWithStorage(key: string, values: any) {
  //   setState((latest) => ({ ...latest, [key]: values }));
  //   chrome.storage.local.set(state);
  // }
  const [state] = useCommonState();


  if (Object.keys(state).length) {
    return (
      <div className={state.internal.theme} dir="ltr">
        <div className="grid w-72 dark:bg-[#0a1722] max-h-[470px] overflow-hidden relative transition-all duration-500">
          {/* <ContextContoroler> */}
          <header className="flex h-6 px-1 rtl:flex-row-reverse">
            <Theme />
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
  } else {
    return (<Loading />)
  }
}

render(<App />, document.getElementById("app") as HTMLElement);
