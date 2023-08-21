import Dorpdown from "../Components/Dropdown";
import { useState } from "preact/hooks";
import type { Props } from "../Types/Global";
export default function useDropdown({ children, animations = "scale", manualVisibility = false, closer = true }: { animations?: "slide" | "scale", manualVisibility?: boolean, closer?: boolean } & Props) {
  const [display, setdisplay] = useState({ visibility: manualVisibility });
  function handleDropdown(visibility: boolean) {
    // setdisplay(({ visibility }) => ({ visibility: !visibility }));
    setdisplay({ visibility: visibility });
  }
  console.log(display.visibility)
  return {
    displayComponent:
      <Dorpdown
        animations={animations}
        visibility={display.visibility}
        callbackEvent={handleDropdown}
        closer={closer}
      >
        {children}
      </Dorpdown>
    , handleDropdown
  };
}