import Dorpdown from "../Components/Dropdown";
import { useState } from "preact/hooks";
import type { Props } from "../Types/Global";
export default function useDropdown({ children, animations = "scale", manualVisibility = false, closer = true }: { animations?: "slide" | "scale", manualVisibility?: boolean, closer?: boolean } & Props) {
  const [display, setdisplay] = useState({ visibility: manualVisibility });
  function Contoroler() {
    setdisplay(({ visibility }) => ({ visibility: !visibility }));
  }
  return {
    displayComponent:
      <Dorpdown
        animations={animations}
        visibility={display.visibility}
        callbackEvent={Contoroler}
        closer={closer}
      >
        {children}
      </Dorpdown>
    , Contoroler
  };
}