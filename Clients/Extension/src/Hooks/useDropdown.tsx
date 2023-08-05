import Dorpdown from "../Components/Dropdown";
import { useState } from "preact/hooks";
import type { Props } from "../Types/Global";
export default function useDropdown({ children, animations }: { animations: "slide" | "scale" } & Props) {
  const [display, setdisplay] = useState({ visibility: false });
  function Contoroler() {
    setdisplay(({ visibility }) => ({ visibility: !visibility }));
  }
  return {
    displayComponent:
      <Dorpdown
        animations={animations}
        visibility={display.visibility}
        callbackEvent={Contoroler}
      >
        {children}
      </Dorpdown>
    , Contoroler
  };
}