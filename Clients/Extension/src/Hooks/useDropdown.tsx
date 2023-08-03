import type { Props } from "../Types/Global";
interface Dropdown extends Props {
  visibility: boolean;
  animations: "slide" | "scale";
  callbackEvent: (input: string) => void;
}
export default function useDorpdown({ visibility, animations, children, callbackEvent }: Dropdown) {
  const selfData = {
    animations: {
      slide: {
        Up: "animate-[moveDowntoUp_0.5s_1] top-1",
        Down: "animate-[moveUptoDown_0.5s_1] top-full invisible",
      },
      scale: {
        Up: "animate-[scaleUp_0.5s_1]",
        Down: "animate-[scaleDown_0.5s_1] invisible",
      },
    },
    visibility: true,
  };
  return (
    <div
      className={
        "shadow-xl  dark:bg-slate-950 rounded-t-md dark:text-white p-1 absolute w-[95%] bg-white z-[2] h-full justify-self-center " +
        (visibility
          ? selfData.animations[animations].Up
          : selfData.animations[animations].Down)
      }
    >
      <button
        className="text-red-700 p-2 pb-0 text-2xl font-medium"
        onClick={() => {
          callbackEvent("Close");
        }}
      >
        X
      </button>
      {children}
    </div>
  );
}

// import Dorpdown from "../Components/Dropdown";
// import { useState } from "preact/hooks";
// import type { Props } from "../Types/Global";
// export default function useDropdown({ children }: Props) {
//   const [first, setfirst] = useState({ visibility: true });
//   function callbackEvent(params: string) {
//     setfirst({ visibility: false });
//   }
//   return (
//     <Dorpdown
//       animations="slide"
//       visibility={first.visibility}
//       callbackEvent={callbackEvent}
//     >
//       {children}
//     </Dorpdown>
//   );
// }
