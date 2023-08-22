import Advertising from "./Components/Advertising";
import Toggle from "./Components/Toggle";
import Account from "./Components/Account";
import Language from "./Components/Language";
import Theme from "./Components/Theme";
import Footer from "./Components/Footer";
import Switch from "./Components/Switch";
import useCommonState from "./Hooks/useCommonState";
import "./style.css";

export default function App() {
     const [{ external = {}, internal }, syncStateWithStorage] = useCommonState();
     if (Object.keys(external).length) {
        return (
            <div className={internal.theme} dir={internal.language.rtl ? "rtl" : "ltr"}>

                <div className="grid w-72 dark:bg-[#0a1722] max-h-[470px] overflow-hidden relative transition-all duration-500">
                    <header className="flex h-6 px-1 rtl:flex-row-reverse">
                        <Theme handleTheme={syncStateWithStorage} />
                        <Language list={{ ext: external.languages, int: internal.language }} handleLanguage={syncStateWithStorage} />
                        <Account displayName="Guste" />
                    </header>
                    <Switch data={{ ext: external.proxylist, int: internal }} handleSwitch={() => (null)} />
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
        return (<></>)
    }
}

